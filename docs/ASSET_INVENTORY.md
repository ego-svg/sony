# Phase 2: Pinterest Asset Checklist & Ingestion Specification

## 1. Overview
This document specifies all visual and 3D assets required to recreate the Canon EOS 60D interactive experience observed in the reference video. Assets collected from Pinterest or reference archives are organized by component role, format requirements, transparency, and fallback strategies.

---

## 2. Organized Asset Checklist by Category

### Category A: Core Product 3D Assets (Primary Recommendation)
*To achieve authentic 3D rotation, screen flipping, SD ejection, and exploded disassembly.*

| Asset ID | Asset Name | Description & Usage | Target Format | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **3D-01** | **Canon EOS 60D Full 3D Model (GLB/GLTF)** | Complete 3D mesh of the camera body + EF-S 18-135mm lens. Used for 360° rotation, close-up orbits, and lighting. | `.glb` or `.gltf` (with PBR textures, $\le 25\text{MB}$) | **Critical** |
| **3D-02** | **Articulated LCD Screen Sub-Mesh / Node** | Separable rear monitor mesh on a defined hinge pivot point on the left side of the camera body. Used for the $180^\circ$ flip-out motion. | Included in 3D-01 or separate `.glb` | **High** |
| **3D-03** | **SD Card Door & SD Card Sub-Mesh** | Separable memory card door and blue SD card mesh with gold contacts. Used for Scene 7 ejection animation. | Included in 3D-01 or separate `.glb` | **High** |
| **3D-04** | **Exploded Internal Components** | Separated sub-meshes for internal parts: APS-C CMOS sensor package, pentaprism glass, mirror box, DIGIC 4 PCB board, shutter curtains, screws, ribbon cables. | Named sub-meshes inside 3D-01 or modular `.glb` files | **High** |

---

### Category B: Transparent 2D Render Sprites (Fallback / 2.5D Strategy)
*If a fully separable 3D model with 70+ internal meshes cannot be supplied, we require high-resolution transparent PNG/WebP multi-angle renders to composite.*

| Asset ID | Asset Name | Angle / Subject | Format & Resolution | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **2D-01** | **Camera Hero Angle** | 3/4 front-left angle with 18-135mm lens, pristine studio lighting on transparent alpha. | PNG / WebP, $\ge 2400\times 2400\text{px}$ | Scene 1 Hero |
| **2D-02** | **Pentaprism Macro** | Extreme macro close-up of prism hump with white Canon logo. | PNG / WebP, $\ge 2400\times 1800\text{px}$ | Scene 2 Optical Heritage |
| **2D-03** | **Top Plate Controls** | Top-down angled view showing mode dial, top LCD, shutter button. | PNG / WebP, $\ge 2400\times 1800\text{px}$ | Scene 3 Ergonomics |
| **2D-04** | **Grip & Shutter Profile** | Close-up of contoured rubber grip and angled shutter button. | PNG / WebP, $\ge 2400\times 1800\text{px}$ | Scene 4 Shutter Feel |
| **2D-05** | **Rear Profile with Flipped Screen** | Rear view of camera body with Vari-angle LCD extended and swiveled outward (with transparent screen window). | PNG / WebP, $\ge 2400\times 1800\text{px}$ | Scene 5 Vari-Angle LCD |
| **2D-06** | **SD Card Door Open + Floating SD Card** | Side profile showing open door with blue SDHC card hovering separately on alpha. | 2 separate PNGs (Camera body + SD card) | Scene 7 Storage |
| **2D-07** | **Exploded Parts Array (Alpha Sprites)** | Individual isolated transparent cuts of: sensor chip, pentaprism, lens elements, circuit board, front/rear magnesium chassis plates. | PNG set (10–25 layer cuts) | Scene 8 Exploded View |
| **2D-08** | **Isolated CMOS Sensor Chip** | High-res macro photo of Canon 18MP APS-C sensor die with green/gold micro-lens iridescence. | PNG / WebP, $\ge 1600\times 1600\text{px}$ | Scene 9 Sensor Core |
| **2D-09** | **DIGIC 4 Logic Board** | Macro top view of the circuit board and DIGIC 4 processor chip. | PNG / WebP, $\ge 1600\times 1600\text{px}$ | Scene 10 Processor |
| **2D-10** | **Frontal Lens Alignment** | Direct front view of camera with circular lens element centered. | PNG / WebP, $\ge 2400\times 2400\text{px}$ | Scene 12 Monogram Finale |

---

### Category C: UI Media & Texture Assets

| Asset ID | Asset Name | Description | Target Format | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **MED-01** | **LCD Video Reel (3 Clips)** | Short 5–10 second looping cinematic clips (e.g. landscape, cinematic street, filmmaker b-roll) to display on the camera's rear screen. | MP4 / WebM ($\le 720\text{p}$, compressed, $\le 3\text{MB}$ each) | Scene 5 LCD Screen Texture |
| **MED-02** | **Shutter Preview Portraits** | 2 high-quality editorial portrait photographs captured with a Canon camera. | WebP / JPEG ($800\times 600\text{px}$) | Scene 4 "Feel the two-stage shutter" tray |
| **MED-03** | **Sensor Gallery Photos** | 3 photographs demonstrating 18MP dynamic range, macro resolution, and low-light fidelity. | WebP / JPEG ($800\times 600\text{px}$) | Scene 9 "Vision begins inside the image" tray |

---

### Category D: Vector & Brand Assets

| Asset ID | Asset Name | Description | Target Format | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **VEC-01** | **Canon Wordmark** | Exact vectorized white logo of Canon. | SVG | Scene 0 intro, Scene 2 backdrop |
| **VEC-02** | **EOS Emblem & Monogram** | Lowercase stylized `eos` typography. | SVG | Top navigation & Scene 12 Monogram |
| **VEC-03** | **UI Control Icons** | 360° orbit drag loop, scroll mouse wheel, directional arrows. | SVG / Lucide | Viewport chrome & HUD cards |

---

## 3. Asset Quality & Production Standards
- **Backgrounds**: All product renders and exploded elements **must have clean alpha transparency** (no baked white, black, or grey backgrounds).
- **Lighting Consistency**: Studio lighting with top-left key and subtle rim lighting to blend seamlessly against the warm `#EA580C` orange stage background.
- **Color Space**: sRGB format with no embedded ICC profile mismatches.
- **File Organization**: Place supplied assets into `/public/assets/camera/` and `/public/assets/media/`.
