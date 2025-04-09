"use client";

import { useState } from "react";
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
import { ProjectModal, Project } from "./ProjectModal";
import { Badge } from "./ui/badge";
import Link from "next/link";

// Sample project data with the extended information
const projects = [
  {
    id: "customer-journey",
    duration: "01.12.2019 - present",
    modalId: "customer-journey-modal-open",
    pictures: [
      "/images/customer-journey-4.png",
      "/images/customer-journey-5.png",
      "/images/customer-journey-6.png",
      "/images/customer-journey-7.png",
    ],
    title: "Customer Journey",
    description: `MeetingPackage's Customer Journey project involves all the development in customer-facing pages. A typical journey includes 6 pages: Front page, Search page, Venue page, Checkout page, Order confirmation page, and Order management page.`,
    extendedDescription: (
      <>
        <p className="mb-2">
          MeetingPackage&#39;s Customer Journey project involves all the
          development in customer-facing pages. This is a white-label solution,
          meaning different hotels can have the looks and feels that match their
          brands, thus making the booking flow from host website to
          MeetingPackage solution as seamless as possible. A typical journey
          includes 6 pages:
        </p>
        <ul className="steps-vertical lg:steps-horizontal steps mb-2 w-full md:mb-4">
          <li className="step step-primary">Front page</li>
          <li className="step step-primary">Search page</li>
          <li className="step step-primary">Venue page</li>
          <li className="step step-primary">Checkout page</li>
          <li className="step step-primary">Order confirmation page</li>
          <li className="step step-primary">Order management page</li>
        </ul>
        <p className="mb-2">My main responsibilities include:</p>
        <ul className="mb-2 ml-10 list-disc">
          <li>Develop, Design, and Maintain customer-facing pages in Vue</li>
          <li>Maintain legacy projects</li>
          <li>Assist in backend development</li>
        </ul>
        <p>
          The white-label solution is used by many hotel chains:{" "}
          <Link href="https://www.scandichotels.fi/">Scandic Hotels</Link> and{" "}
          <Link href="https://www.nordicchoicehotels.com/">
            Nordic Choice Hotels
          </Link>{" "}
          to name a few.
        </p>
      </>
    ),
    type: "internal",
    sources: [
      {
        name: "Venue page example",
        url: "https://meetingpackage.com/venue/clarion-hotel-helsinki",
        urlText: "https://meetingpackage.com/venue/clarion-hotel-helsinki",
      },
      {
        name: "Partner example",
        url: "https://meetingpackage.com/booking-engine-customers",
        urlText: "https://meetingpackage.com/booking-engine-customers",
      },
      {
        name: "HotelTechReport on product",
        url: "https://hoteltechreport.com/meetings-and-events/venue-booking-platforms/meetingpackagecom-booking-engine",
        urlText:
          "https://hoteltechreport.com/meetings-and-events/venue-booking-platforms/meetingpackagecom-booking-engine",
      },
    ],
    stacks: ["vue", "vuex", "bootstrap"],
  },
  {
    id: "dashboard",
    duration: "01.11.2019 - present",
    modalId: "dashboard-modal-open",
    pictures: ["/images/dashboard-1.png", "/images/dashboard-2.png"],
    title: "Venue & Sales Management",
    description: `MeetingPackage's Venue and Sales management software is an all-in-one solution that helps venue suppliers easily manage their contents, inventory, and sale analytics.`,
    extendedDescription: (
      <>
        <p className="mb-2">
          MeetingPackage&#39;s Venue and Sales management software is an
          all-in-one solution that helps venue suppliers easily manage their
          contents, inventory, and sale analytics. During my position here as a
          Frontend Developer, my main tasks in the project include:
        </p>

        <ul className="mb-2 ml-10 list-disc">
          <li>Redesigning and Maintaining legacy dashboard pages</li>
          <li>Initiating and Developing new pages in React</li>
          <li>Assist in backend development</li>
        </ul>
        <p>
          The software is voted as the winners for Multiple Categories in the{" "}
          <Link href="https://hoteltechreport.com/news/best-hotel-software">
            Top Hotel Management Software in 2021 and 2022
          </Link>{" "}
          Many hoteliers has reviewed this software as easy-to-use, appealing,
          and providing good user experiences.
        </p>
      </>
    ),
    type: "internal",
    sources: [
      {
        name: "Venue & Sales Management",
        url: "https://support.meetingpackage.com/knowledge-base/cloud-based-venue-sales-management",
        urlText:
          "https://support.meetingpackage.com/knowledge-base/cloud-based-venue-sales-management",
      },
      {
        name: "HotelTechReport on product",
        url: "https://hoteltechreport.com/news/best-hotel-software",
        urlText: "https://hoteltechreport.com/news/best-hotel-software",
      },
      {
        name: "Product/Feature updates",
        url: "https://support.meetingpackage.com/knowledge-base/product-feature-updates",
        urlText:
          "https://support.meetingpackage.com/knowledge-base/product-feature-updates",
      },
    ],
    stacks: ["react", "redux", "formik", "mui"],
  },

  {
    id: "booking-widget",
    duration: "01.10.2019 - present",
    modalId: "booking-widget-modal-open",
    pictures: ["/images/booking-widget-1.png"],
    title: "Booking Engine Widget",
    description: `MeetingPackage's Booking Engine Widget allows customer to easily make a search to venue's meeting room and event space services. It is a piece of HTML code that even a novice developer can copy and paste and use it on any websites. This is a white-label solution, meaning different hotels can have the looks and feels that match their brands, thus increasing the customer experiences.`,
    extendedDescription: (
      <>
        <p className="mb-2">
          MeetingPackage&#39;s Booking Engine Widget allows customer to easily
          make a search to venue&#39;s meeting room and event space services. It
          is a piece of HTML code that even a novice developer can copy and
          paste and use it on any websites. This is a white-label solution,
          meaning different hotels can have the looks and feels that match their
          brands, thus increasing the customer experiences.
        </p>
        <p>
          In this project, my responsibility is to develop and design the whole
          widget solution. This project gives me a perfect opportunity to try
          out <Link href="https://storybook.js.org/">Storybook</Link>, it helps
          me easily share the design between team members and receive quick
          feedbacks.
        </p>
      </>
    ),
    type: "internal",
    sources: [
      {
        name: "Live usage",
        url: "https://www.scandichotels.com/conferences-meetings",
        urlText: "https://www.scandichotels.com/conferences-meetings",
      },
      {
        name: "Widget creation",
        url: "https://support.meetingpackage.com/knowledge-base/create-booking-engine",
        urlText:
          "https://support.meetingpackage.com/knowledge-base/create-booking-engine",
      },
    ],
    stacks: ["react", "mui", "storybook"],
  },
  {
    id: "data-4-health",
    duration: "25.06.2021 - 31.09.2021",
    modalId: "data-4-health-modal-open",
    pictures: [
      "/images/data-4-health-1.png",
      "/images/data-4-health-4.png",
      "/images/data-4-health-2.png",
      "/images/data-4-health-3.png",
    ],
    title: "Cell-Culture Simulator",
    description:
      "In this hackathon, I am in Cell-Culture Simulator team and my responsibility is to create an interactive dashboard that enable scientist to perform cell-culture simulations.",
    extendedDescription: (
      <>
        <p className="mb-2">
          Data 4 Healthy Recovery is a hackathon with an emphasis on smart
          health, dedicated to solving this sectore&#39;s most pressing
          challenges.
        </p>
        <p className="mb-2">
          In this hackathon, I am in Cell-Culture Simulator team and my
          responsibility is to create an interactive dashboard that enables
          scientists to perform cell-culture simulations on a computer or mobile
          devices.
        </p>
        <p>
          As a result, our team was chosen as the winning team in the EU Data 4
          Healthy Recovery Accelerator.
        </p>
      </>
    ),
    type: "hackathon",
    sources: [
      {
        name: "Dashboard page",
        url: "https://amcellsim.netlify.app",
        urlText: "https://amcellsim.netlify.app",
      },
      {
        name: "Contribution",
        url: "https://www.linkedin.com/posts/analysismode-labs_analysismode-speeds-up-scientific-discovery-activity-6851868916659056641-AdDm",
        urlText:
          "https://www.linkedin.com/posts/analysismode-labs_analysismode-speeds-up-scientific-discovery-activity-6851868916659056641-AdDm",
      },
      {
        name: "Winner status",
        url: "https://healthincubatorhelsinki.com/news-and-events/analysismode",
        urlText:
          "https://healthincubatorhelsinki.com/news-and-events/analysismode",
      },
    ],
    stacks: ["react", "mui"],
  },
  {
    id: "portfolio",
    duration: "05.01.2022 - present",
    modalId: "portfolio-modal-open",
    pictures: [
      "/images/portfolio-1.png",
      "/images/portfolio-2.png",
      "/images/portfolio-3.png",
      "/images/portfolio-4.png",
      "/images/portfolio-5.png",
    ],
    title: "This Portfolio :)",
    description:
      "This is the project of the Portfolio you are seeing. It is built from scratch using NextJs and Tailwind CSS with a focus on user experience, web performance, and best practices. Some highlights of the websites include",
    extendedDescription: (
      <>
        <p className="mb-2">
          This is the project of the Portfolio you are seeing. It is built from
          scratch using NextJs and Tailwind CSS with a focus on user experience,
          web performance, and best practices. Some highlights of the websites
          include:
        </p>
        <ul className="mb-2 ml-10 list-disc">
          <li>
            Brilliant Google Lighthouse report. 💯 on <b>Performance</b>,{" "}
            <b>Best Practices</b> and <b>SEO</b>; 97 on <b>Accessibility</b>.
          </li>
          <li>
            Project is themable. Theme value is stored on <b>cookie</b>, thus
            making theme applied on the server. Prevent either flickering (bad
            UX) or delay rendering (bad performance and SEO) issues that happen
            to client-side theme-detecting methods.
          </li>
        </ul>
      </>
    ),
    type: "hobby",
    sources: [
      {
        name: "Live page",
        url: "/",
        urlText: "you are viewing it :)",
      },
      {
        name: "Github repo",
        url: "mailto:ungkientrung@gmail.com",
        urlText: "Contact me",
      },
    ],
    stacks: ["react", "nextjs", "tailwindcss"],
  },
  {
    id: "bumi-cafe",
    duration: "01.06.2020 - 30.06.2020",
    modalId: "bumi-cafe-modal-open",
    pictures: ["/images/bumi.png", "/images/bumi-2.png"],
    title: "Bumi Cafe",
    description:
      "The project was initiated and maintained by another team. However, due to late response and lack of competencies, the other team was not able to meet the deadline of this project. Because of this, I took the opportunity to work for Bumi as a freelancer",
    extendedDescription: (
      <>
        <p className="mb-2">
          The project was initiated and maintained by another team. However, due
          to late response and lack of competencies, the other team was not able
          to meet the deadline of this project. Because of this, I took the
          opportunity to work for Bumi as a freelancer.
        </p>
        <p className="mb-2">My responsibilities in this project includes</p>

        <ul className="mb-2 ml-10 list-disc">
          <li>Develop two new pages: About page and Catering page</li>
          <li>Fix styling issues in existing customer-facing pages</li>
          <li>Develop some new features for admin users</li>
        </ul>
      </>
    ),
    type: "freelance",
    sources: [
      {
        name: "Bumi frontpage",
        url: "https://bumicafe.com",
        urlText: "https://bumicafe.com",
      },
    ],
    stacks: ["wordpress"],
  },

  {
    id: "schedulable-todo",
    duration: "20.06.2019 - 31.12.2019",
    modalId: "schedulable-todo-modal-open",
    pictures: [
      "/images/schedulable-toto-1.png",
      "/images/schedulable-toto-2.png",
      "/images/schedulable-toto-3.png",
      "/images/schedulable-toto-4.png",
    ],
    title: "Schedulable Todo",
    description: "To be updated...",
    extendedDescription: <div> To be updated...</div>,
    type: "hobby",
    sources: [
      {
        name: "Live page",
        url: "https://trinhtodo.netlify.app",
        urlText: "https://trinhtodo.netlify.app",
      },
      {
        name: "Github frontend repo",
        url: "https://github.com/ung-trung/react-todo-filterable",
        urlText: "https://github.com/ung-trung/react-todo-filterable",
      },
      {
        name: "Github backend repo",
        url: "https://github.com/ung-trung/trinhtodo-apis",
        urlText: "https://github.com/ung-trung/trinhtodo-apis",
      },
    ],
    stacks: ["react", "redux", "bulma"],
  },
  {
    id: "contact-manager",
    duration: "10.06.2019 - 14.06.2019",
    modalId: "contact-manager-modal-open",
    pictures: [
      "/images/contact-manager-1.png",
      "/images/contact-manager-2.png",
      "/images/contact-manager-3.png",
    ],
    title: "Contact Manager",
    description: "To be updated...",
    extendedDescription: <div> To be updated...</div>,
    type: "hobby",
    sources: [
      {
        name: "Live page",
        url: "https://contact-managee.herokuapp.com",
        urlText: "https://contact-managee.herokuapp.com",
      },
      {
        name: "Github repo",
        url: "https://github.com/ung-trung/enhanced-contact-manager",
        urlText: "https://github.com/ung-trung/enhanced-contact-manager",
      },
    ],
    stacks: ["react", "react context", "sematic"],
  },
  {
    id: "github-fetcher",
    modalId: "github-fetcher-modal-open",
    duration: "07.06.2019 - 09.06.2019",
    pictures: ["/images/github-fetcher-1.png", "/images/github-fetcher-2.png"],
    title: "Github Fetcher",
    description: "To be updated...",
    extendedDescription: <div> To be updated...</div>,
    type: "hobby",
    sources: [
      {
        name: "Live page",
        url: "https://githubfetcher.netlify.app",
        urlText: "https://githubfetcher.netlify.app",
      },
      {
        name: "Github repo",
        url: "https://github.com/ung-trung/react-context-github-search",
        urlText: "https://github.com/ung-trung/react-context-github-search",
      },
    ],
    stacks: ["react", "react context", "sematic"],
  },
];
export const RecentProjects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

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
                className="force-motion-safe:inline force-motion-reduce:hidden pointer-events-none absolute inset-0 -z-10 hidden rounded-2xl opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 motion-safe:inline motion-reduce:hidden"
                style={{
                  background:
                    "linear-gradient(130deg, #7dd3fc, #c084fc, #facc15)",
                  filter: "blur(30px)",
                }}
              ></div>

              <CardHeader className="p-0">
                <CardTitle className="text-lg font-semibold">
                  {project.title}
                  <Badge className="mt-1 block" variant="secondary">
                    {project.type}
                  </Badge>
                </CardTitle>
                <CardDescription className="mt-2 line-clamp-5 text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <div>
                <Button
                  className="group"
                  onClick={() => openProjectModal(project)}
                  aria-label={`See more about ${project.title}`}
                >
                  See more
                  <ChevronRight className="duration-200 group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={closeProjectModal}
        />
      )}
    </section>
  );
};
