# Engineering Rules & Agent Guidelines

## 1. Core Operating Principles
- **Inspect Before Changing**: Always read and verify existing files before making edits.
- **Plan Before Coding**: No speculative code edits. Every code change must trace back to an approved phase and task in the implementation plan.
- **Evidence-Driven Fidelity**: Base visual decisions strictly on video frame analysis, extracted color values, and provided assets. Never invent decorative elements (e.g. gratuitous gradients, floating badges, ungrounded blobs).
- **Scope Discipline**: Implement strictly what is visible in the reference. Do not add mock e-commerce carts, user logins, fake dashboards, or unrequested features.
- **Zero Broken Affordances**: Every visible button, indicator, or interactive control must have a working handler or state response. No non-functional placeholder buttons.

## 2. Technical Standards
- **Framework**: React 19 + TypeScript + Vite.
- **Styling**: Tailwind CSS v4. No inline style hacks where clean utility classes or CSS custom properties suffice.
- **3D & Canvas Strategy**: WebGL / Three.js for 3D camera geometry and exploded spatial choreography. Fallback layered CSS/2.5D compositing for reduced-motion or low-spec devices.
- **Motion & Scroll Architecture**: Compositor-only properties (`transform`, `opacity`, `filter`). Animation timeline strictly bound to normalized scroll progress ($0.0 \rightarrow 1.0$).
- **Accessibility & UX**: Comply with `prefers-reduced-motion: reduce`. Maintain minimum WCAG AA contrast (4.5:1 text, 3:1 large text). No layout thrashing or unconstrained resize jumps.

## 3. Verification Protocol
- Run `npm run lint` and verify build status before marking any task complete.
- Verify visual composition against reference timestamps at standard desktop (1440×900) and mobile (390×844) viewports.
- Never state that a feature is verified without running the build tool and inspecting the resulting state.
