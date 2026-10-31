# MacBook Landing Page

An interactive MacBook Pro landing page built with React, Vite, GSAP, Lenis, and React Three Fiber. The project combines scroll-driven storytelling, 3D MacBook models, video textures, responsive layouts, and Apple-inspired visual effects.

> This project was inspired by [Adrian Hajdin's GSAP MacBook landing page](https://github.com/adrianhajdin/gsap_macbook_landing) and adapted with Portuguese content, custom assets, Redux state, and additional 3D sections.

## Features

- Responsive MacBook Pro product landing page.
- Hero section with video and initial loading protection.
- Smooth scrolling powered by Lenis.
- Scroll-linked animations powered by GSAP and ScrollTrigger.
- Interactive 3D MacBook models with React Three Fiber.
- MacBook size switching between 14-inch and 16-inch models.
- MacBook color switching between light and dark finishes.
- Video and image textures inside 3D scenes.
- Responsive behavior for desktop, tablet, and mobile layouts.
- Mobile-friendly navigation with Lottie animation.
- Tailwind CSS utility styling through the Vite plugin.

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [GSAP](https://gsap.com/) and ScrollTrigger
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- [React Three Fiber](https://r3f.docs.pmnd.rs/)
- [Drei](https://github.com/pmndrs/drei)
- [Three.js](https://threejs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lottie React](https://github.com/Gamote/lottie-react)

## Requirements

- Node.js 18 or newer
- pnpm, npm, or another Node-compatible package manager

## Getting Started

Clone the repository and install its dependencies:

```bash
git clone https://github.com/yKaayo/macbook.git
cd macbook
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Vite will print the local URL, normally:

```text
http://localhost:5173
```

The equivalent npm commands are:

```bash
npm install
npm run dev
```

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the Vite development server with hot reload. |
| `pnpm build` | Creates an optimized production build in `dist/`. |
| `pnpm preview` | Serves the production build locally. |
| `pnpm lint` | Runs ESLint across the project. |

Before opening a pull request, run:

```bash
pnpm lint
pnpm build
```

## Project Structure

```text
.
├── public/
│   └── models/                  # GLB files loaded by Three.js
├── src/
│   ├── assets/
│   │   ├── icons/               # SVG interface and feature icons
│   │   ├── images/              # Product and section images
│   │   ├── lottie/              # Navigation animation data
│   │   └── videos/              # Hero and product videos
│   ├── components/
│   │   ├── models/              # Generated GLTF model components
│   │   ├── three/               # Three.js lighting and model switching
│   │   ├── Hero.jsx
│   │   ├── Product.jsx
│   │   ├── Showcase.jsx
│   │   └── System.jsx
│   ├── constants/               # Navigation links and feature data
│   ├── store/                   # Redux store and laptop slice
│   ├── App.jsx                  # Page composition and global scroll setup
│   ├── index.css                # Tailwind import and global styles
│   └── main.jsx                 # React entry point and GSAP registration
├── index.html
├── package.json
└── vite.config.js
```

## How It Works

### Application flow

`src/main.jsx` registers GSAP plugins and mounts the React application with the Redux provider. `src/App.jsx` composes the page sections and initializes Lenis.

The page waits for the Hero video to become playable before starting Lenis. After the Hero is ready, ScrollTrigger refreshes its measurements so pinned sections use the correct layout dimensions.

### Hero

The Hero section:

- Displays the main product message and CTA.
- Loads the Hero MP4 video.
- Uses `onCanPlayThrough` to notify the application when scrolling can begin.
- Uses a fallback timeout so a video delivery problem does not permanently block the page.

### Product 3D viewer

`Product.jsx` mounts a React Three Fiber canvas and renders:

- `StudioLights` for the lighting setup.
- `ModelSwitcher` for the 14-inch and 16-inch models.
- Controls for changing the model size and color.

The selected color and size are stored in `src/store/slices/laptopSlice.js`, allowing the UI and 3D scene to stay synchronized.

### Scroll animations

GSAP timelines are used for the Graphic, Showcase, System, and Characteristics sections. ScrollTrigger controls pinning, scrubbing, and section progress. Lenis emits scroll updates to ScrollTrigger so smooth scrolling and scroll-linked animations stay synchronized.

### Responsive behavior

The application uses responsive Tailwind classes and `react-responsive` media queries. Heavy 3D interaction is reduced or disabled on mobile where touch gestures should remain available for normal page scrolling.

## Performance Notes

- Keep 3D assets compressed and avoid unnecessary duplicate models.
- Prefer transforms and opacity for animated DOM elements.
- Keep Canvas pixel ratio bounded on mobile and lower-end devices.
- Do not create ScrollTriggers before the layout and media assets have stable dimensions.
- Call `ScrollTrigger.refresh()` only after an actual layout change.
- Use browser DevTools Performance and Network panels to inspect video, GLB, and texture loading.
- Test scroll behavior on both a desktop mouse wheel and a mobile touch device.

## Adding or Replacing Assets

### 3D models

Place GLB files in `public/models/` and load them with Drei's `useGLTF`. If a model is generated with `gltfjsx`, keep the generated component in `src/components/models/` and preserve its source attribution.

### Videos

Place videos in `src/assets/videos/`, import them from the component that uses them, and provide `muted` and `playsInline` when autoplay is required. Always consider the cost of large MP4/WebM files before adding them to the first viewport.

### Images

Place imported images in `src/assets/images/`. Use modern formats such as WebP where possible and provide meaningful `alt` text for content images.

## Troubleshooting

### The page starts with no scrolling

The application intentionally waits for the Hero video. Check that the Hero asset exists and that the browser can decode it. The fallback timeout should eventually release scrolling even if the video fails.

### A pinned section jumps or skips

Check the section's layout before changing its animation. In particular:

1. Make sure the pinned element has a stable height.
2. Avoid changing layout dimensions while ScrollTrigger is active.
3. Confirm that `pinSpacing` matches the intended document flow.
4. Refresh ScrollTrigger only after images, fonts, or videos change layout.

### The 3D model does not appear

Verify that the expected GLB file is available under `public/models/` and that the browser Network panel does not show a 404. WebGL must also be enabled in the browser.

### The 3D scene is slow

Reduce the model complexity, texture resolution, Canvas DPR, lighting resolution, or number of simultaneous canvases. Profile on a mobile device instead of relying only on a development laptop.

## Production Build

Build and preview the production output:

```bash
pnpm build
pnpm preview
```

The generated files are placed in `dist/`. Deploy that directory with any static hosting provider that supports single-page applications.

## Credits and Licensing

- The page structure and animation direction were inspired by [Adrian Hajdin's GSAP MacBook landing page](https://github.com/adrianhajdin/gsap_macbook_landing).
- The MacBook model comments identify the original Sketchfab source and CC-BY-4.0 attribution in the generated model components.
- Project source code is licensed under the [MIT License](./LICENSE).
- Review the license and attribution requirements of every third-party asset before redistributing the production build.

## Contributing

1. Create a focused branch.
2. Keep changes scoped to one feature or fix.
3. Preserve responsive and reduced-motion behavior.
4. Run `pnpm lint` and `pnpm build`.
5. Test the changed section on desktop and mobile.
6. Open a pull request describing the behavior change and validation performed.
