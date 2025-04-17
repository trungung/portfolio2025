import Link from "next/link";

export type ProjectSource = {
  name: string;
  url: string;
};

export type Project = {
  id: string;
  duration: string;
  pictures: string[];
  title: string;
  description: string;
  quickSummary: string;
  extendedDescription: React.ReactNode;
  sources: ProjectSource[];
  stacks: string[];
  isNda: boolean;
};

export const projects: Project[] = [
  {
    id: "global-pricing-platform",
    duration: "Nov 2022 - Mar 2024",
    pictures: [],
    title: "Global Pricing Platform",
    description:
      "A pricing tool for a global energy organization, tailored per region.",
    quickSummary:
      "Redesigned critical UI, improved performance and test coverage, mentored developers, and collaborated on cross-team architecture for a global-scale pricing app.",
    extendedDescription: (
      <>
        <section>
          <h3>Scope</h3>
          <p>
            Worked as a Software Engineer on a pricing platform used by an
            international energy organization. The application served users
            across multiple regions, each with unique business rules.
          </p>
        </section>
        <section>
          <h3>What I did</h3>
          <ul>
            <li>
              Led the redesign of the navigation system and pricing page to
              improve usability, accessibility, and maintainability
            </li>
            <li>Built reusable components with Material UI</li>
            <li>Resolved performance bottlenecks in React</li>
            <li>
              Maintained strong test coverage with 100 percent for new features
              and over 80 percent across the application
            </li>
            <li>
              Updated legacy code to modern standards using backend-generated
              types
            </li>
            <li>
              Helped streamline the development workflow by aligning frontend
              logic with backend schemas
            </li>
          </ul>
        </section>
        <section>
          <h3>Impact</h3>
          <ul>
            <li>Improved UI consistency and accessibility across regions</li>
            <li>Reduced frontend bugs through better type safety</li>
            <li>
              Shortened development cycles with a more maintainable codebase
            </li>
            <li>
              Helped ensure releases stayed predictable through agile
              collaboration
            </li>
          </ul>
        </section>
        <section>
          <h3>Collaboration</h3>
          <ul>
            <li>
              Worked closely with designers and backend developers to ensure a
              consistent experience
            </li>
            <li>
              Mentored junior developers through pair programming and code
              reviews
            </li>
            <li>
              Collaborated with other teams on architectural decisions to
              support a scalable and maintainable system
            </li>
          </ul>
        </section>
      </>
    ),
    sources: [],
    stacks: [
      "react",
      "azure",
      "typescript",
      "mui",
      "jest",
      "cypress",
      "CI/CD",
      "scrum",
    ],
    isNda: true,
  },
  {
    id: "devops-foundation",
    duration: "Apr 2023 - Aug 2023",
    pictures: [],
    title: "DevOps Foundation",
    description:
      "An internal application focused on secure Azure integration and testing automation.",
    quickSummary:
      "Led frontend development for a secure internal tool that automates Azure DevOps project setup. Focused on authentication, test coverage, CI/CD, and close collaboration with backend developers.",
    extendedDescription: (
      <>
        <section>
          <h3>Scope</h3>
          <p>
            This internal application helps teams automate the creation and
            configuration of Azure DevOps projects. It streamlines onboarding
            and enables consistent project setup while ensuring security and
            cost visibility.
          </p>
        </section>

        <section>
          <h3>What I did</h3>
          <ul>
            <li>Led frontend architecture and UX design discussions</li>
            <li>Led the frontend implementation from start to delivery</li>
            <li>
              Built a secure authentication flow using Microsoft Authentication
              Library (MSAL)
            </li>
            <li>Developed end-to-end testing with Cypress</li>
            <li>Maintained 100% code coverage across the frontend</li>
            <li>
              Helped shape and implement the CI/CD pipeline for smoother
              deployment
            </li>
            <li>
              Collaborated with backend developers through pair programming and
              code reviews
            </li>
          </ul>
        </section>

        <section>
          <h3>Impact</h3>
          <ul>
            <li>
              Improved reliability and developer confidence through full test
              coverage and automation
            </li>
            <li>
              Enhanced user authentication and security through proper identity
              integration
            </li>
            <li>Reduced time and effort spent on manual project setup</li>
          </ul>
        </section>

        <section>
          <h3>Collaboration</h3>
          <ul>
            <li>
              Worked closely with backend engineers and product stakeholders
              during design and implementation
            </li>
            <li>Guided technical decisions within the frontend scope</li>
            <li>Shared knowledge through pair programming and peer reviews</li>
          </ul>
        </section>
      </>
    ),
    sources: [],
    stacks: [
      "react",
      "msal",
      "azure",
      "typescript",
      "mui",
      "jest",
      "cypress",
      "CI/CD",
    ],
    isNda: true,
  },
  {
    id: "dashboard",
    duration: "01.11.2019 - 15.04.2022",
    pictures: ["/images/dashboard-2.png", "/images/dashboard-1.png"],
    title: "Venue & Sales Management",
    description:
      "Award-winning hotel venue platform, rebuilt with smoother UX and modern React.",
    quickSummary:
      "I helped modernize a B2B hotel tech platform that won awards two years in a row. From redesigning dashboards to improving developer workflows, I worked across the stack to boost performance, usability, and team productivity.",
    extendedDescription: (
      <>
        <section>
          <h3>Scope</h3>
          <p>
            This project focused on refreshing the core dashboard of a B2B venue
            and sales management platform. I worked on both frontend and backend
            tasks, aiming to improve usability, speed up development, and
            support a growing team of engineers.
          </p>
        </section>
        <section>
          <h3>What I did</h3>
          <ul>
            <li>
              Redesigned and rebuilt legacy dashboard pages for a cleaner, more
              intuitive interface
            </li>
            <li>
              Developed new frontend features using modern React techniques
            </li>
            <li>
              Optimized CI/CD pipelines to improve release speed and reliability
            </li>
            <li>Ran database migrations and contributed to backend logic</li>
          </ul>
        </section>
        <section>
          <h3>Impact</h3>
          <ul>
            <li>
              Platform won *Top Hotel Management Software* awards in both 2021
              and 2022
            </li>
            <li>
              Users consistently praised the interface for being easy to use and
              visually appealing
            </li>
            <li>Improved developer productivity by streamlining deployments</li>
            <li>
              Contributed to a more stable and responsive product experience for
              hotels and venues
            </li>
          </ul>
        </section>
        <section>
          <h3>Collaboration</h3>
          <ul>
            <li>
              Worked closely with designers to implement clean and accessible UI
              updates
            </li>
            <li>
              Partnered with backend engineers to ensure smooth feature
              integrations
            </li>
            <li>
              Paired regularly with junior developers to share knowledge and
              review code
            </li>
            <li>
              Participated in agile planning and team retrospectives to align on
              goals
            </li>
          </ul>
        </section>
      </>
    ),
    isNda: false,
    sources: [
      {
        name: "HotelTechReport on product",
        url: "https://hoteltechreport.com/meetings-and-events/hotel-sales-software/meetingpackagecom-hotels",
      },
      {
        name: "Product/Feature updates",
        url: "https://support.meetingpackage.com/knowledge-base/product-feature-updates",
      },
    ],
    stacks: ["react", "redux", "formik", "mui", "vue", "vuex", "bootstrap"],
  },
  {
    id: "booking-widget",
    duration: "01.10.2019 - 15.04.2022",
    pictures: [
      "/images/booking-widget-1.png",
      "/images/customer-journey-4.png",
      "/images/customer-journey-5.png",
      "/images/customer-journey-6.png",
      "/images/customer-journey-7.png",
    ],
    title: "Booking Engine",
    description:
      "A seamless venue booking flow, modernized for hotel chains across Europe.",
    quickSummary:
      "I helped level up a white-label venue booking platform used by hotel chains across Europe. From frontend polish to backend support, I worked to improve the customer journey and modernize the tech behind it.",
    extendedDescription: (
      <>
        <section>
          <h3>Scope</h3>
          <p>
            This project focused on improving the customer-facing booking
            experience for a white-label platform used by hotels and venues. I
            worked across the stack to streamline the booking flow, modernize
            legacy code, and enhance usability. I also built a lightweight
            widget that venue suppliers can embed directly into their own
            websites to enable seamless bookings.
          </p>
        </section>

        <section>
          <h3>What I did</h3>
          <ul>
            <li>
              Built and maintained booking pages using Vue.js—from front page to
              checkout and order management
            </li>
            <li>
              Improved booking flow efficiency through UI/UX updates and
              thoughtful design
            </li>
            <li>
              Maintained legacy PHP and jQuery codebases while ensuring
              performance and stability
            </li>
            <li>
              Contributed to backend features and integrations supporting the
              booking process
            </li>
          </ul>
        </section>

        <section>
          <h3>Impact</h3>
          <ul>
            <li>
              Improved user experience across the entire customer journey, from
              search to booking confirmation
            </li>
            <li>
              Helped modernize the tech stack while preserving compatibility
              with existing systems
            </li>
            <li>
              The platform was recognized for its innovation in venue booking on{" "}
              <a
                href="https://hoteltechreport.com/meetings-and-events/venue-booking-platforms/meetingpackagecom-booking-engine"
                target="_blank"
              >
                HotelTechReport
              </a>
            </li>{" "}
            <li>
              Trusted by major hotel groups like{" "}
              <Link href="https://www.scandichotels.fi/">Scandic Hotels</Link>{" "}
              and{" "}
              <Link href="https://www.nordicchoicehotels.com/">
                Nordic Choice Hotels
              </Link>{" "}
              through white-label partnerships
            </li>
          </ul>
        </section>

        <section>
          <h3>Collaboration</h3>
          <ul>
            <li>
              Worked closely with designers to implement clean and accessible UI
              updates
            </li>
            <li>
              Partnered with backend engineers to ensure smooth feature
              integrations
            </li>
            <li>
              Paired regularly with junior developers to share knowledge and
              review code
            </li>
            <li>
              Participated in agile planning and team retrospectives to align on
              goals
            </li>
          </ul>
        </section>
      </>
    ),
    isNda: false,
    sources: [
      {
        name: "Widget live usage",
        url: "https://www.scandichotels.com/conferences-meetings",
      },
      {
        name: "Widget creation",
        url: "https://support.meetingpackage.com/knowledge-base/create-booking-engine",
      },
      {
        name: "Scandic Venue page example",
        url: "https://meetingpackage.com/venue/clarion-hotel-helsinki",
      },
      {
        name: "Nordic Choice Venue page example",
        url: "https://bookameeting.se/venue/comfort-hotel-bergen-airport",
      },
      {
        name: "HotelTechReport on product",
        url: "https://hoteltechreport.com/meetings-and-events/venue-booking-platforms/meetingpackagecom-booking-engine",
      },
    ],
    stacks: ["react", "mui", "storybook"],
  },
  {
    id: "data-4-health",
    duration: "25.06.2021 - 31.09.2021",
    pictures: [
      "/images/data-4-health-1.png",
      "/images/data-4-health-4.png",
      "/images/data-4-health-2.png",
      "/images/data-4-health-3.png",
    ],
    title: "Cell-Culture Simulator",
    description:
      "Award-winning simulation dashboard built for scientists that is fast, interactive, and mobile-friendly.",
    quickSummary:
      "I built an interactive dashboard to help scientists simulate cell cultures digitally—right from their laptop or phone. Our solution won first place at the EU's Data 4 Healthy Recovery Accelerator.",
    extendedDescription: (
      <>
        <section>
          <h3>Scope</h3>
          <p>
            This project was part of the Data 4 Healthy Recovery hackathon
            focused on smart health solutions across Europe. Our team set out to
            create a user-friendly tool that lets scientists run cell-culture
            simulations digitally, supporting both research and teaching. The
            tool needed to be interactive, accessible on desktop and mobile, and
            easy to use for non-technical users.
          </p>
        </section>
        <section>
          <h3>Scope</h3>
          <ul>
            <li>
              Designed and developed an interactive dashboard for running
              cell-culture simulations
            </li>
            <li>
              Optimized the UI to work smoothly across both desktop and mobile
              devices
            </li>
            <li>
              Collaborated with the team to understand scientific workflows and
              translate them into an intuitive interface
            </li>
            <li>
              Ensured the dashboard could visualize and respond to user input in
              real time
            </li>
          </ul>
        </section>
        <section>
          <h3>Impact</h3>
          <ul>
            <li>
              Our team was selected as the winning team in the *EU Data 4
              Healthy Recovery Accelerator*
            </li>
            <li>
              Enabled easier experimentation and simulation without requiring
              lab access
            </li>
          </ul>
        </section>
      </>
    ),
    isNda: false,
    sources: [
      {
        name: "Dashboard page",
        url: "https://amcellsim.netlify.app",
      },
      {
        name: "Contribution",
        url: "https://www.linkedin.com/posts/analysismode-labs_analysismode-speeds-up-scientific-discovery-activity-6851868916659056641-AdDm",
      },
      {
        name: "Winner status",
        url: "https://healthincubatorhelsinki.com/news-and-events/analysismode",
      },
    ],
    stacks: ["react", "mui"],
  },
  {
    id: "bumi-cafe",
    duration: "01.06.2020 - 30.06.2020",
    pictures: ["/images/bumi.png", "/images/bumi-2.png"],
    title: "Bumi Cafe",
    description:
      "Jumped in as a freelancer to help Bumi launch on time—built pages, fixed issues, and added admin features.",
    quickSummary:
      "I stepped in as a freelancer to help Bumi meet their project deadline when the original team couldn’t deliver on time. I built two new pages, fixed styling issues, and added features for admin users.",
    extendedDescription: (
      <>
        <section>
          <h3>Scope</h3>
          <p>
            This project started with another team, but due to delays and skill
            gaps, Bumi needed someone to step in quickly and get things done. I
            joined the project as a freelancer to help finish key parts of the
            website—both customer-facing and admin features—before launch.
          </p>
        </section>
        <section>
          <h3>What I did</h3>
          <ul>
            <li>Developed the About and Catering pages from scratch</li>
            <li>
              Fixed layout and styling issues across existing public pages
            </li>
            <li>
              Implemented new features for admin users to manage content more
              easily
            </li>
          </ul>
        </section>
        <section>
          <h3>Impact</h3>
          <ul>
            <li>
              Helped the team meet their launch deadline with a polished and
              functional site
            </li>
            <li>
              Improved visual consistency and user experience across the
              platform
            </li>
            <li>
              Enabled smoother admin workflows through new backend features
            </li>
          </ul>
        </section>
        <section>
          <h3>Collaboration</h3>
          <ul>
            <li>
              Coordinated closely with the Bumi team to align on priorities and
              deliverables
            </li>
            <li>
              Worked independently while keeping the team in the loop with
              regular updates
            </li>
            <li>Adapted quickly to an ongoing codebase and project context</li>
          </ul>
        </section>
      </>
    ),
    isNda: false,
    sources: [
      {
        name: "Bumi frontpage",
        url: "https://bumicafe.com",
      },
    ],
    stacks: ["wordpress"],
  },
  {
    id: "portfolio",
    duration: "05.01.2022 - present",
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
    quickSummary: "",
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
            Brilliant Google Lighthouse report. 💯 on <b>Performance</b>,
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
    isNda: false,
    sources: [
      {
        name: "Live page",
        url: "/",
      },
      {
        name: "Github repo",
        url: "mailto:ungkientrung@gmail.com",
      },
    ],
    stacks: ["react", "nextjs", "tailwindcss"],
  },
  {
    id: "schedulable-todo",
    duration: "20.06.2019 - 31.12.2019",
    pictures: [
      "/images/schedulable-toto-1.png",
      "/images/schedulable-toto-2.png",
      "/images/schedulable-toto-3.png",
      "/images/schedulable-toto-4.png",
    ],
    title: "Schedulable Todo",
    description: "To be updated...",
    quickSummary: "",
    extendedDescription: <div> To be updated...</div>,
    isNda: false,
    sources: [
      {
        name: "Live page",
        url: "https://trinhtodo.netlify.app",
      },
      {
        name: "Github frontend repo",
        url: "https://github.com/ung-trung/react-todo-filterable",
      },
      {
        name: "Github backend repo",
        url: "https://github.com/ung-trung/trinhtodo-apis",
      },
    ],
    stacks: ["react", "redux", "bulma"],
  },
  {
    id: "contact-manager",
    duration: "10.06.2019 - 14.06.2019",
    pictures: [
      "/images/contact-manager-1.png",
      "/images/contact-manager-2.png",
      "/images/contact-manager-3.png",
    ],
    title: "Contact Manager",
    description: "To be updated...",
    quickSummary: "",
    extendedDescription: <div> To be updated...</div>,
    isNda: false,
    sources: [
      {
        name: "Live page",
        url: "https://contact-managee.herokuapp.com",
      },
      {
        name: "Github repo",
        url: "https://github.com/ung-trung/enhanced-contact-manager",
      },
    ],
    stacks: ["react", "react context", "sematic"],
  },
  {
    id: "github-fetcher",
    duration: "07.06.2019 - 09.06.2019",
    pictures: ["/images/github-fetcher-1.png", "/images/github-fetcher-2.png"],
    title: "Github Fetcher",
    description: "To be updated...",
    quickSummary: "",
    extendedDescription: <div> To be updated...</div>,
    isNda: false,
    sources: [
      {
        name: "Live page",
        url: "https://githubfetcher.netlify.app",
      },
      {
        name: "Github repo",
        url: "https://github.com/ung-trung/react-context-github-search",
      },
    ],
    stacks: ["react", "react context", "sematic"],
  },
];
