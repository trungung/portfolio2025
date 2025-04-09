"use client";

import {
  CardHeader,
  CardTitle,
  CardDescription,
  Card,
} from "@/components/ui/card";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Global Pricing Platform",
    description:
      "Built a B2B SaaS tool to automate product pricing using machine learning and customer segmentation.",
    tech: ["Next.js", "Python", "Tailwind", "Supabase", "PostgreSQL"],
    href: "/projects/pricing-platform",
  },
  {
    title: "Global Analytics Dashboard",
    description:
      "Streamed user activity and performance metrics in real time using WebSockets and Redis.",
    tech: ["Next.js", "Redis", "Socket.IO", "Chart.js"],
    href: "/projects/analytics-dashboard",
  },
  {
    title: "Serverless CMS Starter",
    description:
      "Custom headless CMS with authentication, content management, and Markdown editing.",
    tech: ["React", "Next.js", "Clerk", "Prisma", "Vercel"],
    href: "/projects/cms-starter",
  },
  {
    title: "Hotel Booking Engine",
    description:
      "Optimized a complex hotel reservation flow with calendar sync, filters, and Stripe checkout.",
    tech: ["Vue.js", "Express", "Stripe", "MongoDB"],
    href: "/projects/booking-engine",
  },
  {
    title: "Scalable API Monitoring",
    description:
      "Created a distributed system for tracking uptime, latency, and error rates across endpoints.",
    tech: ["Node.js", "Prometheus", "Grafana", "Docker", "PostgreSQL"],
    href: "/projects/api-monitoring",
  },
  {
    title: "Resume Builder App",
    description:
      "User-friendly tool to generate beautiful, ATS-friendly resumes with live preview and export to PDF.",
    tech: ["React", "Tailwind", "React Hook Form", "Puppeteer"],
    href: "/projects/resume-builder",
  },
];

export const RecentProjects = () => {
  return (
    <section id="projects" className="mt-20 mb-16 scroll-mt-20">
      <SectionHeader title="Recent projects" />
      <p className="mt-4 max-w-prose">
        These are things I&apos;ve worked on across teams, companies, and my own
        time.
      </p>

      <div className="relative mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Card
              className={cn(
                "group/card bg-background/80 relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-4 transition-shadow hover:shadow-xl",
              )}
            >
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-200 group-hover/card:opacity-100"
                style={{
                  background:
                    "linear-gradient(130deg, #7dd3fc, #c084fc, #facc15)",
                  filter: "blur(30px)",
                }}
              />

              <CardHeader className="p-0">
                <CardTitle className="text-lg font-semibold">
                  {project.title}
                </CardTitle>
                <CardDescription className="mt-2 text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <div>
                <Button className="group">
                  See more
                  <ChevronRight className="duration-200 group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
