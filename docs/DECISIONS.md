# Architectural & Design Decisions (ADRs)

## ADR-001: Rendering Engine Strategy for 3D Camera Presentation
- **Context**: The reference video displays full 3D camera rotation, extreme close-up dolly zooms, articulated screen pivoting, SD card ejection, and an exploded view with 70+ components.
- **Decision Candidates**:
  1. *React Three Fiber (R3F) / Three.js*: Native WebGL scene with camera rigging, material shaders, and programmatic mesh manipulation.
  2. *2D Pre-rendered Image Sequence / Canvas Scrubbing*: High-res image frame scrubbers (Apple-style 60-120 WebP frames).
  3. *Hybrid Architecture*: Three.js WebGL canvas for continuous rotation, articulation, and explosion, with procedural/component fallbacks if GLB model sub-meshes are missing.
- **Provisional Decision**: Adopt Three.js / WebGL. It provides true real-time lighting, interactive user dragging ("3D - DRAG TO ROTATE"), dynamic UV texture mapping for the articulated LCD screen video, and precise coordinate interpolation for the 70+ exploded components.
- **Contingency / Fallback**: If full GLB models with separated internal components are not supplied by the user, we will composite high-resolution Pinterest camera views alongside precision procedural 3D internal components (sensor die, PCB ribbons, prism, glass lenses).

## ADR-002: Scroll Synchronization & State Management
- **Context**: Scrolling in the video smoothly coordinates camera orientation, exploded part positions, stage typography, and floating HUD text without jitter.
- **Decision**: Centralize normalized scroll progress ($p \in [0, 1]$) and active scene index ($s \in [0, 11]$) in a lightweight React state/ref store.
- **Rationale**: Keeps React re-renders out of the 60fps render loop (`requestAnimationFrame`) by directly updating Three.js object transforms via refs, while driving HUD text changes through React state transitions.

## ADR-003: Styling & Glass HUD Design System
- **Context**: The left HUD card uses dark obsidian frosted glass with backdrop blur, hairline borders, and tight typography.
- **Decision**: Tailwind CSS v4 with custom utility combinations (`backdrop-blur-xl`, `bg-[#121212]/75`, `border-white/10`). Avoid heavy third-party UI libraries.
- **Rationale**: Minimal bundle size, maximum CSS performance, strict visual control matching the reference.
