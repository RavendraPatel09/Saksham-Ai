# Saksham AI ♿

**Empowering every ability with AI.**

Saksham AI is a career platform built for people with disabilities in India — helping them build skills, discover accessible job opportunities, and connect with inclusive employers. It also gives employers the tools to audit their own accessibility and reach a wider, underserved talent pool.

> "Saksham" (सक्षम) means "capable" in Hindi — the platform is built around the idea that the right accommodations and matching remove the barrier, not the ability.

---

## ✨ Key Features

**For job seekers**
- 🧠 **AI Skills Assessment** — a short, adaptive assessment that surfaces strengths and suggests career paths
- 🎯 **Inclusive Job Matching** — jobs ranked by fit *and* by whether an employer offers the specific accommodations a candidate needs
- 📚 **Skill Building** — curated courses with progress tracking to close skill gaps for target roles
- 🎤 **AI Interview Coaching** — practice interviews with feedback before the real thing
- 📄 **Resume Builder & Resume Bank** — build an accessible resume, or get discovered by employers directly
- 🏛️ **Reserved Jobs (Govt. Quota)** — a dedicated feed of PwD-reserved government and PSU listings (SSC, banking, state secretariats, etc.) with category and document requirements
- ✉️ **Accommodation Letter Generator** — generate formal requests for workplace accommodations
- 👥 **Mentorship** — connect with mentors who share similar disabilities and have navigated the same career paths
- 🗣️ **Communication Assistant & Document Simplifier** — AI tools to simplify complex text and support workplace communication
- 📅 **Application Tracker, Calendar & Saved Items** — keep the whole job search organized in one place
- 🌐 **Offline Mode** — core features remain usable with unreliable connectivity
- 🌏 **Multi-language support** (English/Hindi, extensible)

**For employers**
- 🏢 **Employer Dashboard** — post jobs, manage applicants, and browse the candidate resume bank
- ♿ **Accessibility Audit** — assess and improve the accessibility of the employer's own hiring process and workplace
- 📊 **Employers Directory** — public-facing diversity & accessibility scores to help candidates find genuinely inclusive companies

**Accessibility-first, by design**
- Built-in accessibility wizard, live captions, text-to-speech, voice assistant, and a cognitive/simplified reading mode
- Adjustable motion, contrast, and focus-management baked into the app shell — not bolted on after

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript + Vite |
| Routing | React Router v7 |
| Styling | Tailwind CSS + shadcn/ui + `class-variance-authority` |
| Animation | Framer Motion |
| Icons | Lucide React |
| Charts | Recharts |
| Accessibility | `@axe-core/react`, `focus-trap-react`, custom `AccessibilityContext` |
| i18n | Custom lightweight translation context |
| Testing | Vitest + React Testing Library |
| Linting | Oxlint |

> **Note:** This is currently a frontend prototype — job listings, mentors, match scores, and "AI" responses are powered by local mock data (`src/data/mockData.ts`) and browser `localStorage`, with no backend or live model calls yet. See [Roadmap](#-roadmap) below.

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/RavendraPatel09/Saksham-Ai.git
cd Saksham-Ai

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other scripts

```bash
npm run build      # Type-check and build for production
npm run preview    # Preview the production build locally
npm run lint        # Run Oxlint
npm run test        # Run tests once
npm run test:watch  # Run tests in watch mode
```

---

## 📁 Project Structure

```
src/
├── accessibility/     # Core a11y engine: TTS, speech recognition, focus manager, cognitive mode
├── components/        # Reusable UI (shadcn primitives, layout, accessibility widgets)
├── context/            # App-wide state: workspace mode, offline mode, overlays
├── data/                # Mock data (jobs, mentors, employers, courses, assessments)
├── i18n/                # Language context + translation files
├── pages/               # Route-level pages (Jobs, Dashboard, Employer, Learning, etc.)
└── App.tsx              # Route definitions and provider tree
```

---

## 🗺️ Roadmap

- [ ] Connect a real backend (auth, persistence, job postings) instead of `localStorage`
- [ ] Wire AI features (assessment, job matching, document simplifier, interview coaching) to a real LLM API
- [ ] Replace mock job/employer data with a live or verified data source
- [ ] Add real employer-side job posting flow that feeds the candidate-facing job list
- [ ] SEO metadata, Open Graph tags, and proper page titles
- [ ] Deploy pipeline / CI

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/RavendraPatel09/Saksham-Ai/issues).

## 📄 License

*Add your chosen license here (e.g. MIT).*

## 👤 Author

**Ravendra Patel**
GitHub: [@RavendraPatel09](https://github.com/RavendraPatel09)
