## About Me

### Q: Tell me about yourself

I’m a Senior Full-stack Developer with 5+ years of experience, specializing in TypeScript, React, and Node.js. I focus on performance, maintainability, and UI modernization in hospitality and energy sectors.

### Q: What’s your background and industry experience?

I’ve worked in hospitality (hotel booking platforms), energy (cloud pricing platforms), SaaS, and developer tools. I’m most interested in SaaS and cloud infrastructure.

### Q: What programming languages and frameworks are you most proficient in?

TypeScript, JavaScript, Node.js, React, Vue.js, Express, and Prisma ORM.

### Q: Do you prefer frontend, backend, or full-stack development?

I enjoy full-stack work but have a passion for frontend engineering, with an emphasis on accessible and scalable UIs.

### Q: What are your career goals for the next few years?

I want to deepen my expertise in frontend architecture and cloud-native solutions, and move toward a tech leadership or staff engineer role.

## Projects

### Q: What projects have you worked on?

Global Pricing Platform (Nordcloud): UI/UX rebuild, performance optimizations, typesafe API integration.
Booking Engine & Venue Sale Management (MeetingPackage): React migration, data modeling, third-party integrations.
AI Portfolio (trungung.com): Next.js, Vercel AI SDK, custom RAG pipeline.
EU Hackathon (2021): Cell culture simulation dashboard (1st place).
Others: DevOps automation, Bumi Cafe website.

### Q: Which project are you most proud of?

My portfolio at trungung.com , which features a context-aware, AI-powered RAG bot for answering questions about my work.

## Teamwork

### Q: Tell me about the teams you’ve worked on.

Startup (MeetingPackage): Small, <10 devs, close collaboration, end-to-end ownership.
Enterprise (Nordcloud): Cross-functional squads (~10 ppl), mentorship, code reviews, best practices advocacy.

### Q: Describe a time you had a conflict with a coworker.

When designs became inconsistent with custom UI, I initiated a discussion with the design lead. Together, we enhanced our component system, balancing creativity and consistency.

### Q: How have you mentored junior developers?

Through pair programming, regular feedback, code reviews, and encouraging documentation updates. I help juniors reach feature ownership quickly.

### Q: How do you promote knowledge sharing within your team?

I encourage pair programming, host short tech talks or workshops, and keep shared notes or guides accessible. I also ask team members to present solutions after solving tricky issues.

### Q: How do you handle disagreements in engineering design discussions?

I advocate for open, respectful debate, using data or prototypes to support positions. Ultimately, I work towards consensus and am happy to defer to the group or senior architect if consensus can’t be reached quickly.

### Q: How do you keep cross-functional teams aligned during fast-paced projects?

I favor clear documentation of decisions, regular standups, transparent issue tracking, and quick feedback cycles with designers, product owners, and QA.

## Technical Decisions

### Q: Describe a technical decision that had a big impact.

Introducing backend-generated TypeScript types and React Query to the Nordcloud pricing platform, which reduced bugs and improved performance significantly.

### Q: How do you approach legacy code?

Gradually modernizing, isolating legacy code, and migrating components incrementally to prevent regressions and enable parallel feature development.

### Q: How have you optimized React data tables and reduced API calls?

Used react-window for virtualization and react-query for data caching, which minimized re-renders and API traffic.

### Q: How do you decide when to refactor legacy code versus rewrite it from scratch?

I weigh the scale of tech debt, business deadlines, and risk of breaking existing functionality. If refactoring unlocks new features safely and incrementally, I favor that; if the code is unmanageable or blocking architecture, I propose a rewrite with staged rollouts.

### Q: What criteria do you use to select new libraries or tools for a project?

I evaluate community support, documentation, extensibility, compatibility with our stack, and potential to reduce long-term maintenance cost. I always prototype and review with the team before adoption.

## Testing & CI/CD

### Q: What’s your philosophy on testing?

I focus on confidence and maintainability. Favor clear, reliable unit (Jest), integration (Supertest), and E2E (Playwright/Cypress) tests.

### Q: How do you balance unit, integration, and end-to-end testing?

Emphasize unit testing, use integration tests for critical data flows, and E2E for user journeys.

### Q: Which CI/CD tools have you used, and how do you implement pipelines?

GitHub Actions, Azure DevOps, Travis CI. Pipelines run lint checks, tests, and deploy to staging; support PR-based deployments and previews.

### Q: Can you share a time when automated tests prevented a major issue?

At Nordcloud, a Playwright test caught a critical regional regression before it could ship to production.

## Cloud & DevOps

### Q: What’s your current tech stack?

Frontend: TypeScript + React/Next.js
Backend: Node.js + Prisma/PostgreSQL + MongoDB
Cloud: Azure and AWS

### Q: How do your cloud certifications apply to real projects?

Built SSO and automated Azure DevOps project setup; designed serverless solutions with AWS Lambda.

### Q: How did you automate Azure DevOps project setup at Nordcloud?

Created a React tool that configures projects, pipelines, and permissions using Azure DevOps APIs—reducing setup from hours to minutes.

## Architecture & System Design

### Q: How do you design scalable systems?

Start modular; leverage cloud-native scaling (Auto Scaling/App Service/Kubernetes); enable independent scaling of components.

### Q: Monolith or microservices?

Begin with a modular monolith; migrate to microservices as scaling needs grow, using managed API gateways.

### Q: How do you handle multi-region or multi-tenant systems?

Use tenant-aware services, regional endpoints, global replication, and strict data segregation.

### Q: How do you handle data consistency?

Use DynamoDB/Cosmos DB options for eventual/strong consistency or Postgres replication/locking for stronger requirements.

### Q: REST or GraphQL for APIs?

Typically REST—clear URLs, proper HTTP methods, Zod for schema validation, and robust error handling.

### Q: What’s your approach to designing scalable APIs?

I use RESTful, versioned endpoints, modular code structure, and separation of concerns. I leverage validation libraries (like Zod), proper error handling, and documentation tools like OpenAPI/Swagger.

### Q: How do you make systems resilient to partial service failures?

I implement retry logic, graceful degradation (feature toggling if possible), circuit breakers, fallback paths, and monitor with alerts to catch and recover from failures fast.

### Q: How do you manage schema changes in production databases with zero downtime?

I apply migration scripts incrementally, use feature flags to hide in-progress changes, and monitor carefully after rollout. I prefer backward-compatible changes and dual-write strategies when shifting critical data models.

## Security & Compliance

### Q: How do you securely integrate third-party systems like Stripe or Oracle?

Through API gateways, OAuth2 flows, end-to-end data validation, and continuous monitoring.

### Q: How do you ensure compliance in cloud-native apps?

Least-privilege IAM, TLS, secrets management, provider best practices, and monitoring.

### Q: How do you handle API rate limiting and traffic spikes?

Use API Gateway/native rate limits, autoscaling, CDN edge caching, and Redis/Varnish or similar as cache layers.

## UI, Accessibility & Performance

### Q: How do you ensure accessible UIs?

Start with accessibility: semantic HTML, ARIA roles, keyboard navigation, and WCAG audits.

### Q: How do you choose or build component libraries?

Prefer scalable libraries like Material UI/shadcn/ui; build custom when app needs are unique.

### Q: How do you optimize frontend performance?

Data virtualization, memoization, code-splitting/lazy loading, and minimizing render/blocking paths.

## Collaboration & Culture

### Q: How do you work with designers and product owners?

Participate early, provide technical feedback, ensure feasibility and scalability.

### Q: How do you prefer to work: remote, hybrid, or in-office?

Open to remote or hybrid roles with occasional on-site collaboration.

### Q: What kind of team environment do you thrive in?

Open, collaborative, feedback-driven teams where innovation is valued.

### Q: How do you manage deadlines and pressure?

Prioritize tasks, communicate clearly, and deliver high-impact outcomes first.

### Q: What do you value most in a company culture?

Transparency, respect, continuous learning, and a focus on building great products.

## Miscellaneous

### Q: How do you keep your skills up to date?

Follow ByteByteGo, Theo T3, daily.dev, Dev.to; take online courses; build side projects; join hackathons.

### Q: What developer tools/platforms boost your productivity?

VSCode, GitHub Actions, Figma, Postman, Playwright.

### Q: Are you open to new tech stacks or domains?

Absolutely. I love learning new technologies and adapting to new challenges.
