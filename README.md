# 🚀 Kethan C — Premium Developer Portfolio

[![Portfolio Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)](http://localhost:3000)
[![Built With](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS-blue?style=for-the-badge)](index.html)
[![UI Design](https://img.shields.io/badge/Design-Dynamic%20Island%20%2B%20Glassmorphism-violet?style=for-the-badge)](assets/css/style.css)

A modern, high-performance interactive developer portfolio showcasing software engineering projects, data structures, full-stack applications, and academic accomplishments. Features Apple-inspired UI elements, a **Dynamic Island** navbar, glassmorphism aesthetics, dynamic dark/light mode, and custom interactive themes.

---

## ✨ Key Features & UI Highlights

- 🏝️ **Apple-Inspired Dynamic Island Navbar**:
  - Centered floating capsule navbar with smooth backdrop blur (`backdrop-filter: blur(24px)`).
  - Morphing scroll physics that shrink the island on scroll.
  - Active section tracer pill (`#nav-active-pill`) that glides fluidly under links on hover, click, or scroll.
  - Fully responsive mobile dynamic island dropdown overlay.

- 🖥️ **macOS Interactive Contact Theme**:
  - Fully interactive macOS window interface for the contact section complete with traffic lights, sidebar app icons, live time display, and mail form.

- 📱 **Interactive Smartphone Frame**:
  - Interactive profile card styled as a mobile phone frame displaying key skills, metrics, and live status.

- 🌗 **Dynamic Dark & Light Mode**:
  - Seamless theme toggle storing user preference in `localStorage`.

- ⚡ **Interactive 3D & Canvas Animations**:
  - Integrated 3D Spline viewer components and interactive particle background canvas.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System, Design Tokens, Flexbox/Grid), JavaScript (ES6+ Vanilla)
- **Icons & Fonts**: FontAwesome 6.4, Google Fonts (*Outfit*, *Inter*)
- **3D & Canvas**: `@splinetool/viewer`, HTML5 Canvas Particle System
- **Server**: Lightweight local HTTP server support (`python -m http.server`)

---

## 📂 Project Structure

```bash
MY PORTFOLIO/
├── index.html                  # Main Portfolio HTML Markup
├── README.md                   # Project Documentation
├── Resume.pdf                  # Curriculum Vitae
├── assets/
│   ├── css/
│   │   └── style.css          # Core Design System, Dynamic Island & Theme Styles
│   ├── js/
│   │   └── main.js           # Dynamic Island Tracer, Scroll Physics, Theme & Interactions
│   └── images/
│       ├── logo.jpg           # Brand Logo
│       └── profile_hero.png   # Hero Profile Showcase
└── certificates/               # Certifications & Project Documentation PDFs
```

---

## 🚀 Local Setup & Development

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Kethanchandrashekarnaik-lang/My-portfolio-.git
   cd My-portfolio-
   ```

2. **Run Locally**:
   You can serve the static files with any HTTP server (e.g. Python, Node, VS Code Live Server):

   *Using Python:*
   ```bash
   python -m http.server 3000
   ```

   *Using Node/npx:*
   ```bash
   npx http-server . -p 3000
   ```

3. **Open in Browser**:
   Navigate to `http://localhost:3000` to view the live portfolio.

---

## 📜 License & Copyright

© 2026 **Kethan C**. Designed & Developed with passion for software architecture and modern web aesthetics.
