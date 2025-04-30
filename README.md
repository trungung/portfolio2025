# Trung Ung | Portfolio 2025

> Code meets creativity in Helsinki 🇫🇮 | Visit [trungung.com](https://trungung.com)

![Portfolio Preview - Light Mode](/public/images/portfolio-2025-1.png)  
![Portfolio Preview - Dark Mode](/public/images/portfolio-2025-2.png)

---

## ✨ Highlights

- Lightning-fast, visually stunning web portfolio
- AI-powered chatbot (context-aware, RAG-based)
- MDX-driven project showcase with interactive galleries
- Built with Next.js 15, React 19, Tailwind CSS 4
- Accessible, performant, and fun to explore

---

## 👋 Welcome!

This is the codebase behind my personal slice of the internet: a portfolio designed not just to showcase my work, but to demonstrate how I think, build, and innovate.

I built this site with three goals:

1. Deliver an engaging, ultra-fast experience
2. Showcase clean architecture and thoughtful problem-solving
3. Create a platform that's genuinely fun to interact with

You’re welcome to dive into the code, borrow ideas, or reach out if you'd like to collaborate or chat about development!

---

## 🤖 TrungBot: AI Assistant

The portfolio features **TrungBot**, an intelligent AI chat assistant that enhances visitor interaction:

- **Context-Aware Chat**: Powered by Retrieval-Augmented Generation (RAG) with conversation history awareness for coherent multi-turn dialogues.
- **Optimized Semantic Chunking**: Using high-overlap (70%) text processing for better context preservation and query relevance.
- **Real-Time Semantic Search**: Using vector embeddings (MiniLM + Transformers.js) for lightning-fast, relevant retrieval.
- **Natural Conversational UX**: Streaming responses for a fluid, human-like chat experience powered by DeepSeek Chat.

### 🧠 RAG Architecture Highlights

- **Conversational Memory**: Enhanced query understanding that considers previous exchanges
- **Query Expansion**: Intelligent incorporation of conversation context for better search relevance
- **Advanced Text Preprocessing**: High-overlap content chunking that preserves semantic connections
- **Confidence-Based Responses**: Smart evaluation of matching quality for appropriate answers

> TrungBot demonstrates production-ready techniques for context-aware assistants that are fast, scalable, and accurate.

---

## 🛠️ Tech Stack & Architecture

This project reflects my technical philosophy: modern, performant, accessible, and maintainable.

### Core Technologies

- **Next.js 15** — App Router, Server Components, full-stack optimizations
- **React 19** — Latest patterns, hooks, and rendering strategies
- **TypeScript** — Type safety and developer tooling
- **Tailwind CSS v4** — Custom design system and utility extensions
- **next-mdx-remote** — Optimized MDX rendering for rich content
- **gray-matter** — Frontmatter parsing for project metadata

### AI & NLP Features

- **@ai-sdk/react** — Streaming chat UI with `useChat` hook
- **@ai-sdk/deepseek** — High-quality LLM integration
- **Transformers.js** — Local, efficient embedding generation
- **Edge-optimized AI** — Next.js-friendly vector retrieval

### Content & Documentation

- MDX-enhanced project descriptions with component embedding
- Automatic syntax highlighting for code samples
- Dynamic content loading with graceful fallbacks

### UI & Interaction

- Animated reveals and transitions via **Framer Motion**
- **Shadcn UI** primitives for accessible, high-quality components
- Responsive design: desktop-first, mobile-optimized
- Theme switching with system preference detection via `next-themes`

### Developer Experience

- Type-safe props and reusable component patterns
- Built-in accessibility (a11y) support
- Animation and image performance optimizations

### Fun Extras

- Audio guide for name pronunciation
- "Minimal Mode" toggle for distraction-free browsing
- Reduced motion support
- Hidden Easter eggs across the site 🎯

---

## 📸 Featured Projects

The portfolio showcases client work and personal experiments, featuring:

- Interactive galleries and project previews
- Tech stacks and implementation highlights
- My specific role and problem-solving contributions
- Live links where possible (some projects remain NDA-protected)

### 📝 MDX-Powered Documentation

Each project uses MDX to deliver rich, interactive content:

- Structured markdown with embedded components
- Custom styling and behavior overrides
- Fast, optimized content delivery

---

## 🚀 Running Locally

Want to explore under the hood? Set it up locally:

```bash
# Clone the repo
git clone https://github.com/ung-trung/portfolio2025.git

# Install dependencies
npm install

# Start the development server
npm run dev

# (Optional) Generate chatbot embeddings
npm run embed
```

The site will be available at http://localhost:3000

## 📁 Project Structure

```
/src
  /app          # Next.js App Router pages and layouts
    /api        # API routes including chat endpoint
  /components   # Reusable UI components
    /ui         # Base UI primitives
    /chat       # AI chat components
    /RecentProjects  # Project showcase UI
      /project-content  # MDX files for project details
  /lib          # Utility functions and logic
    /embed      # Embedding + retrieval system
  /vectors      # Precomputed chatbot embeddings
  /icons        # Custom SVG icons
  /assets       # Static assets (images, etc.)
```

## 🤝 Let's Connect

I'm always open to interesting conversations, collaboration opportunities, or new challenges!

- 💼 [LinkedIn](https://linkedin.com/in/trung-ung)
- 🐙 [GitHub](https://github.com/ung-trung)
- 📧 Email: ungkientrung@gmail.com

## 📋 License

MIT © Trung Ung
