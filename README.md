# Om Aide — Portfolio

Personal portfolio website built with React, TypeScript, Tailwind CSS, and Motion. Designed with an editorial, minimalist dark aesthetic, smooth section transitions, and interactive components.

**Live Site:** [om-2006-portfolio.netlify.app](https://om-2006-portfolio.netlify.app/)

---

## Overview

This project is my personal space on the web to showcase my background, technical skills, academic journey, and design interests. Rather than using an off-the-shelf template, I built it from scratch to experiment with smooth page transitions, typography-first layouts, and interactive UI details.

### What's Inside

- **Hero / Home:** Minimalist landing screen with an editorial layout, rotating tagline, and quick navigation.
- **About Me:** Short bio, current focus, and a dual-photo card with monochrome hover interaction.
- **Technical Skills & Design:** Skew-card showcases covering programming languages (TypeScript, Java, Python, C#, Kotlin), web tools (React, Node.js, Tailwind), and creative work (video editing, graphic design, motion).
- **Academic Background:** Interactive tabbed cards displaying education details (B.Tech CSE at SIRTE/RGPV, Senior Secondary, Secondary) with GPA and timeline records.
- **Get in Touch:** Simple contact cards with one-click email copying, GitHub, LinkedIn, and Instagram links.
- **Interactive Footer:** Clean footer featuring an interactive cat companion that wanders around, tracks the mouse cursor, and can be dragged anywhere on the screen.

---

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Animations:** Motion (`motion/react`)
- **Icons:** Lucide React
- **Build Tool:** Vite

---

## Getting Started

### Prerequisites

Make sure you have Node.js (v18 or higher recommended) and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/omaide06/my-portfolio.git
   ```

2. Navigate into the directory:
   ```bash
   cd my-portfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## Project Structure

```text
my-portfolio/
├── public/              # Static assets and profile pictures
├── src/
│   ├── components/      # Section components (Hero, About, Skills, Experience, Contact, Footer)
│   │   └── ui/          # Reusable UI widgets and custom animations
│   ├── App.tsx          # Main layout and full-viewport section controller
│   ├── main.tsx         # React root entry point
│   └── index.css        # Global CSS variables, fonts, and scrollbar rules
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Contact

Feel free to reach out if you'd like to connect or talk about projects:

- **Email:** [omaide2006@gmail.com](mailto:omaide2006@gmail.com)
- **GitHub:** [@omaide06](https://github.com/omaide06)
- **Instagram:** [@ommmm___006](https://www.instagram.com/ommmm___006/)
- **LinkedIn:** [Om Aide](https://www.linkedin.com)

---

## License

This project is open source and available under the [MIT License](LICENSE).
