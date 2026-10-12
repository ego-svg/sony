# System Architecture & Component Hierarchy

## 1. High-Level Component Structure
```
src/
├── main.tsx                         # Entry point
├── App.tsx                          # App root & providers
├── index.css                        # Tailwind CSS v4 & custom variables
├── components/
│   ├── chrome/
│   │   ├── TopNav.tsx               # Top Bar contract: wordmark, nav pills, CTA
│   │   ├── BottomControls.tsx       # Scroll indicator, chapter counter
│   │   └── DragIndicator.tsx        # "3D - DRAG TO ROTATE" indicator pill
│   ├── stage/
│   │   ├── CameraCanvas.tsx         # WebGL / Three.js canvas viewport
│   │   ├── CameraScene.tsx          # 3D Scene: camera model, lighting, articulated parts
│   │   ├── ExplodedAssembly.tsx     # 70+ internal component exploded mesh controller
│   │   ├── StageTypography.tsx      # Giant cyan typography ("EOS 60D", "CREATE", "INSIDE")
│   │   └── ScreenTextureVideo.tsx   # Live video canvas/texture on articulated LCD
│   ├── hud/
│   │   ├── HudCard.tsx              # Floating obsidian glass container
│   │   ├── ChapterContent.tsx       # Text, kicker, headline, and primary button per scene
│   │   ├── ShutterPreviewStrip.tsx  # Interactive shutter feel & photo cards (Scene 4)
│   │   ├── ScreenSwitcher.tsx       # Articulated screen video switcher pills (Scene 5)
│   │   └── SensorGalleryStrip.tsx   # Micro-lens sample gallery (Scene 9)
│   ├── intro/
│   │   └── PreloaderIntro.tsx       # Angular cone reveal and tilted brand tiles
│   └── modals/
│       └── TechSpecsModal.tsx       # Interactive specification sheet drawer
├── hooks/
│   ├── useScrollProgress.ts         # Normalized scroll interpolation hook
│   └── useReducedMotion.ts          # Accessibility preference hook
├── types/
│   └── scene.ts                     # Chapter definitions, camera poses, text content
└── constants/
    └── scenesData.ts                # Static canonical data extracted from video audit
```

## 2. Animation & Render Loop Strategy
- **Layer 1 (WebGL Canvas)**: Independent `requestAnimationFrame` loop. Interpolates target camera position, target lookAt, rotation quats, and exploded component offsets using lerp dampening for silky smooth motion.
- **Layer 2 (Stage Typography)**: CSS transforms (`translate3d`, `scale`) driven by active scene transitions or continuous CSS parallax.
- **Layer 3 (DOM HUD & Navigation)**: Framer Motion / Motion v12 variants with `AnimatePresence` for text crossfades and metric badge entrances.
