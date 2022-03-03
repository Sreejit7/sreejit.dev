export interface ProjectItemInterface {
  title: string;
  techStack: string[];
  imageUrl: string;
  githubLink: string;
  url: string;
  desc: string;
}
export const projects: ProjectItemInterface[] = [
  {
    title: "The Next Read",
    imageUrl: "/images/nextread.png",
    githubLink: "https://github.com/Sreejit7/The-Next-Read",
    url: "https://main.dgp6mnjdp6gab.amplifyapp.com/",
    desc: `The Next Read is an online book exchange platform for exchanging books among bibliophiles. 
          One can list a book for sell/rent and rent/buy a book on and from the platform.`,
    techStack: ["React", "Firebase", "Stripe Payments API"],
  },
  {
    title: "Sample Next.js Blog",
    imageUrl: "/images/nextjs-blog.png",
    githubLink: "https://github.com/Sreejit7/sample-nextjs-blog",
    url: "https://sreejit-tech-blog.vercel.app/",
    desc: `A sample Next.js blog website displaying a bunch of blogs on separate categories. 
          Readers can view blogs related to a particular category, and post comments.`,
    techStack: ["Next.js", "GraphQL", "Tailwind CSS"],
  },
  {
    title: "Covid Care",
    imageUrl: "/images/covid-care.png",
    githubLink: "https://github.com/Sreejit7/COVID-care",
    url: "https://covid-19care.web.app/",
    desc: `COVID-CARE is a website designed for tracking the COVID-19 pandemic data 
          like deaths, cases & recoveries, upcoming vaccine information & top headlines related to COVID-19.`,
    techStack: ["React", "Chart.js", "disease.sh API", "GNews API"],
  },
];
