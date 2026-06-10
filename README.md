# README.md

# CAPACITI AI Student Assistant

## Project Overview

CAPACITI AI Student Assistant is a web-based AI productivity tool designed to support students participating in the CAPACITI AI Skills Accelerator Programme.

The application helps students overcome common programme challenges by providing AI-powered assistance for communication, progress tracking, and tool recommendations.

The solution is designed for both onsite and online participants and focuses on improving productivity, reducing confusion, and helping students stay on track throughout the five-day programme.

---

## Features

### 1. Smart Email Assistant

Students can quickly generate professional emails for programme facilitators and day managers.

Supported scenarios:

* Can't upload my work
* I don't understand today's delivery
* I will be late
* Tool access issue
* Loadshedding
* Code error / bug
* Personal emergency
* Internet connection problem

Day Managers:

* Omphile
* Brandon
* Liyabona
* Other

Email types:

* Request Extension
* Ask for Help
* Progress Update
* Report a Blocker

---

### 2. Attendance Mode

Students can select:

* Onsite
* Online

The assistant adapts recommendations and communication accordingly.

---

### 3. Programme Progress Tracker

Students select their current programme day:

* Day 1 – Research & Planning
* Day 2 – Development Phase 1
* Day 3 – Development Phase 2
* Day 4 – Optimization & Responsible AI
* Day 5 – Final Presentation

Students can also indicate their progress status:

* On Track
* Need Help
* Behind Schedule

The AI then provides personalised guidance and recommendations.

---

### 4. AI Tool Finder

The AI recommends the most suitable tool based on the student's task.

Examples:

| Task            | Recommended Tool |
| --------------- | ---------------- |
| Create a UI     | Lovable          |
| Create Slides   | Gamma            |
| Research        | Perplexity       |
| Generate Images | ChatGPT / DALL-E |
| Coding Help     | ChatGPT / Claude |

Each recommendation includes:

* Tool explanation
* Suggested use case
* Starter prompt

---

### 5. Responsible AI Notice

The application reminds users that:

"AI-generated content may contain inaccuracies. Always verify outputs before submission."

---

## Tools Used

### Development

* Lovable
* React
* TypeScript
* Tailwind CSS

### AI Tools

* OpenAI API / ChatGPT
* Claude AI
* Perplexity AI
* Gamma
* Lovable

### Design

* CAPACITI Brand Colours
* Responsive Mobile-First Design
* Modern Dashboard UI

---

## Setup Instructions

### Prerequisites

Install:

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project folder:

```bash
cd capaciti-ai-student-assistant
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Run Production Preview

```bash
npm run preview
```

---

## Project Goal

The goal of this project is to demonstrate how AI can improve student productivity by automating communication, providing guidance, recommending tools, and helping learners successfully complete the CAPACITI AI Skills Accelerator Programme.
