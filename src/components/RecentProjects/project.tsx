import Link from "next/link";

export type ProjectSource = {
  name: string;
  url: string;
};

export type Project = {
  id: string;
  duration: string;
  modalId: string;
  pictures: string[];
  title: string;
  description: string;
  extendedDescription: React.ReactNode;
  sources: ProjectSource[];
  stacks: string[];
  isNda: boolean;
};

export const projects: Project[] = [
  {
    id: "global-pricing-platform",
    duration: "Nov 2022 - Mar 2024",
    modalId: "globalPricing",
    pictures: [],
    title: "Global Pricing Platform",
    description:
      "A pricing tool for a global energy organization, tailored per region.",
    extendedDescription: (
      <>
        <p>
          Developed a scalable pricing application used worldwide by pricing
          analysts to streamline decision-making. Redesigned the UI with a
          vertical navigation layout for improved usability, and launched a new
          pricing page that replaced legacy systems. Enhanced code
          maintainability by adopting backend-generated types and ensured 90%+
          test coverage across applications using Jest and Cypress.
        </p>
        <p>
          Led frontend modernization efforts using React, Redux Toolkit, and
          Material UI. Worked closely with the DevOps team on microservice
          deployments and conducted code reviews while mentoring junior
          developers. All work was executed in a cross-functional Scrum team of
          10.
        </p>
      </>
    ),
    sources: [],
    stacks: [
      "react",
      "typescript",
      "mui",
      "Jest",
      "Cypress",
      "Storybook",
      "Azure",
      "CI/CD",
      "Scrum",
    ],
    isNda: true,
  },
  {
    id: "devops-foundation",
    duration: "Apr 2023 - Jul 2023",
    modalId: "devopsFoundation",
    pictures: [],
    title: "DevOps Foundation",
    description:
      "An internal application focused on secure Azure integration and testing automation.",
    extendedDescription: (
      <>
        <p>
          Built secure authentication features using Microsoft Authentication
          Library (MSAL) and integrated the application with Azure services. Led
          the effort to create a robust integration testing suite using Cypress.
        </p>
        <p>
          Contributed to CI/CD pipelines and collaborated with backend
          developers through pair programming and code reviews. Participated in
          the application&apos;s architectural design and helped ensure the
          system was production-ready with 100% test coverage.
        </p>
      </>
    ),
    sources: [
      {
        name: "Internal Project Wiki",
        url: "https://nordcloud.atlassian.net/wiki/spaces/Iron/pages/828000512/DevOps+Foundation",
      },
    ],
    stacks: [
      "MSAL",
      "Cypress",
      "Azure",
      "CI/CD",
      "TypeScript",
      "React",
      "Scrum",
    ],
    isNda: true,
  },
  {
    id: "dashboard",
    duration: "01.11.2019 - present",
    modalId: "dashboard-modal-open",
    pictures: [
      "/images/dashboard-2.png",
      "/images/dashboard-1.png",
      "/images/customer-journey-4.png",
      "/images/customer-journey-5.png",
      "/images/customer-journey-6.png",
      "/images/customer-journey-7.png",
    ],
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
          and providing good user experiences. The white-label solution is used
          by many hotel chains:{" "}
          <Link href="https://www.scandichotels.fi/">Scandic Hotels</Link> and{" "}
          <Link href="https://www.nordicchoicehotels.com/">
            Nordic Choice Hotels
          </Link>{" "}
          to name a few.
        </p>
      </>
    ),
    isNda: false,
    sources: [
      {
        name: "Venue & Sales Management",
        url: "https://support.meetingpackage.com/knowledge-base/cloud-based-venue-sales-management",
      },
      {
        name: "HotelTechReport on product",
        url: "https://hoteltechreport.com/news/best-hotel-software",
      },
      {
        name: "Product/Feature updates",
        url: "https://support.meetingpackage.com/knowledge-base/product-feature-updates",
      },
      {
        name: "Venue page example",
        url: "https://meetingpackage.com/venue/clarion-hotel-helsinki",
      },
      {
        name: "Partner example",
        url: "https://meetingpackage.com/booking-engine-customers",
      },
      {
        name: "HotelTechReport on product",
        url: "https://hoteltechreport.com/meetings-and-events/venue-booking-platforms/meetingpackagecom-booking-engine",
      },
    ],
    stacks: ["react", "redux", "formik", "mui", "vue", "vuex", "bootstrap"],
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
    isNda: false,
    sources: [
      {
        name: "Live usage",
        url: "https://www.scandichotels.com/conferences-meetings",
      },
      {
        name: "Widget creation",
        url: "https://support.meetingpackage.com/knowledge-base/create-booking-engine",
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
    modalId: "contact-manager-modal-open",
    pictures: [
      "/images/contact-manager-1.png",
      "/images/contact-manager-2.png",
      "/images/contact-manager-3.png",
    ],
    title: "Contact Manager",
    description: "To be updated...",
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
    modalId: "github-fetcher-modal-open",
    duration: "07.06.2019 - 09.06.2019",
    pictures: ["/images/github-fetcher-1.png", "/images/github-fetcher-2.png"],
    title: "Github Fetcher",
    description: "To be updated...",
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
