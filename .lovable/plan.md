## CAPACITI Success Coach — PowerPoint Deck

Generate a downloadable, competition-ready `.pptx` presentation that mirrors the Project Presentation page and follows CAPACITI branding.

### Brand
- Deep Navy `1A2B4A` · CAPACITI Purple `5B3DBB` · Vibrant Red `FF3B4E` · White `FFFFFF` · Light Grey `F7F8FA`

### Slides (12)
1. **Title** — CAPACITI Success Coach + tagline (navy hero, purple/red accents)
2. **Project Overview** — Problem statement · Solution · Target users · Expected impact
3. **Problem Being Solved** — 6 cards: attendance, daily reporting, communication, AI tool overload, info overload, career uncertainty
4. **Key Features (1/2)** — Email Assistant, Daily Report, AI Tool Finder, Research Assistant
5. **Key Features (2/2)** — Study Planner, Career Advisor, Wellness Check-In, Attendance Risk
6. **Project Impact** — Bar chart of 6 metrics (92/85/88/90/78/82%)
7. **Responsible AI** — 4 principles + "Responsible AI Certified" badge
8. **Technology Stack** — Lovable, AI Gateway, React, TypeScript, Tailwind, Responsive
9. **Live Demo Guide (1/2)** — Steps 1–5
10. **Live Demo Guide (2/2)** — Steps 6–10
11. **Competition Summary** — Highlighted summary statement
12. **Thank You / Q&A**

### Technical Approach
- Generate with `pptxgenjs` via a Node script (`/tmp/gen-deck.js`)
- 16:9 layout, navy hero slides + light grey content slides, purple/red accent bars
- Modern card layout (rounded rectangles, icon circles), bar chart for impact, no plain bullet lists
- Output: `/mnt/documents/CAPACITI_Success_Coach.pptx`

### QA (mandatory)
- Convert to PDF via LibreOffice → render slide JPGs at 150dpi
- Inspect every slide for overflow, overlap, contrast, alignment, placeholder leftovers
- Run `markitdown` on the .pptx to verify content
- Fix and re-render until clean, then deliver via `<presentation-artifact>`