<div align="center">

# ✨ OM AIDE — PORTFOLIO

**An editorial, minimalist personal portfolio crafted with React 19, TypeScript, Tailwind CSS v4, and Motion.**

[![Live Site](https://img.shields.io/badge/Live_Demo-om--2006--portfolio.netlify.app-F4A623?style=for-the-badge&logo=netlify&logoColor=black)](https://om-2006-portfolio.netlify.app/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

<br />

[Explore Live Demo](https://om-2006-portfolio.netlify.app/) · [Report Bug](https://github.com/omaide06/my-portfolio/issues) · [Get in Touch](mailto:omaide2006@gmail.com)

</div>

---

## 💡 About The Project

Rather than settling for standard cookie-cutter templates, this portfolio was engineered from the ground up as an interactive digital playground. Built with an **editorial, typography-first aesthetic**, it combines high-contrast dark modes, fluid multi-viewport transitions, and micro-interactions that make exploring the site tactile and memorable.

> *"Crafted to bridge structural problem solving with clean visual storytelling."*

---

## 🌟 Key Highlights & Engineering Details

### 🐱 1. Interactive Companion Cat (`FooterCat`)
- **Physics-Inspired Mouse Drag:** Click and toss or place the cat anywhere across the screen using Framer Motion's unconstrained motion values (`x`, `y`).
- **Autonomous Screen Wandering:** When left alone, a custom randomized wandering loop animates natural trotting strides, body bobbing, tail wagging, and directional turns.
- **Real-Time Cursor Eye-Tracking:** Trigonometric calculation (`Math.atan2`) dynamically tracks cursor coordinates, keeping pupils locked on the user.
- **Dynamic Speech Bubble:** Cycles warm farewell and thank-you messages, with instant heart-pop reactions on petting.

### 📐 2. Throttled Viewport Gesture Architecture
- **Boundary-Aware Navigation:** Integrated scroll/wheel/touch gesture engine in `App.tsx` calculates viewport boundaries (`scrollTop` vs `scrollHeight`) before initiating full-viewport slide transitions.
- **Micro-Flicker Prevention:** Built-in transition throttling ref blocks rapid duplicate scroll triggers, delivering a clean desktop app feel.

### 🎴 3. Editorial Visual Elements
- **Dynamic Dual-Photo Reveal:** Custom hover interaction on the About card smoothly transitions a full-frame color portrait into an editorial monochrome overlay.
- **Ambient Marquee Layers:** Continuous typography loops (`about`, `skills`, `academic`, `connect`) running subtly in the background with calibrated low opacity.
- **3D Perspective Skew Cards:** Showcases languages, frameworks, and design capabilities with glowing ambient gradient backdrop blur effects.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19, TypeScript (Strict Mode) |
| **Styling & Design** | Tailwind CSS v4, Custom CSS Variables, Lucide Icons |
| **Motion & Physics** | Motion (`motion/react`) — Layout Animations, Drag, Gestures |
| **Bundler & Tooling** | Vite 6, PostCSS, ESLint |
| **Hosting & CI/CD** | Netlify Continuous Deployment |

---

## 📂 Project Structure

```text
my-portfolio/
├── public/                 # Static assets, avatars & profile photography
├── src/
│   ├── components/         # Modular section views
│   │   ├── About.tsx       # Bio, overview & dual-photo hover effect
│   │   ├── Contact.tsx     # Direct email copy-to-clipboard & social hubs
│   │   ├── Experience.tsx  # Interactive academic records & degree timeline
│   │   ├── Footer.tsx      # Footer layout with typography watermark
│   │   ├── FooterCat.tsx   # Autonomous wandering & draggable animated cat
│   │   ├── Header.tsx      # Smart auto-hiding editorial navigation bar
│   │   ├── Hero.tsx        # High-impact typography landing screen
│   │   ├── Preloader.tsx   # Initial brand loading transition
│   │   ├── Skills.tsx      # Technical capabilities section
│   │   └── ui/             # Reusable UI widgets & gradient cards
│   ├── App.tsx             # Master viewport gesture controller & routing
│   ├── index.css           # Global typography, color tokens & custom scrollbars
│   └── main.tsx            # Application entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ Quick Start (Run Locally)

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm** / **yarn**

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/omaide06/my-portfolio.git

# Move into project directory
cd my-portfolio

# Install project dependencies
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The app will be available locally at `http://localhost:3000`.

### 3. Production Build & Preview

```bash
# Compile and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📬 Let's Connect

Have questions, collaboration ideas, or just want to say hi? Feel free to reach out:

<p align="left">
  <a href="mailto:omaide2006@gmail.com">
    <img src="https://img.shields.io/badge/Email-omaide2006@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
  <a href="https://github.com/omaide06">
    <img src="https://img.shields.io/badge/GitHub-@omaide06-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.linkedin.com/in/om-aide-1a2158337">
    <img src="https://img.shields.io/badge/LinkedIn-Om_Aide-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://www.instagram.com/ommmm___006">
    <img src="https://img.shields.io/badge/Instagram-@ommmm____006-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" />
  </a>
</p>

---

<div align="center">

Made with passion & curiosity by **[Om Aide](https://github.com/omaide06)** • Licensed under [MIT](LICENSE)

</div>
