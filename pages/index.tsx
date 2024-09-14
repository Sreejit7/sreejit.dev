import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { MutableRefObject, useMemo, useRef } from "react";
import yaml from "yaml";
import fs from "fs";

import { fetchPosts } from "../src/utils/blogUtils";
import { GlobalContextProvider } from "../src/context/useGlobalContext";
import { TooltipProvider } from "../src/context/useTooltipContext";
import Introduction from "../src/sections/Introduction";
import About from "../src/sections/About";
import Skills from "../src/sections/Skills";
import Projects from "../src/sections/Projects";
import BlogSection from "../src/sections/Blog";
import Contact from "../src/sections/Contact";
import Navbar from "../src/components/Navbar";
import Sidebar from "../src/components/Sidebar";
import Footer from "../src/components/Footer";
import Tooltip from "../src/components/Tooltip";
import { navItemTitles } from "../src/data/navItems";
import { sections } from "../src/data/sections";
import { WorkplaceType } from "../src/components/Workplace/types";
import { BlogPostType } from "../src/data/blogQuery";

export default function Home({
  posts,
  workInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const headerRef = useRef() as MutableRefObject<HTMLElement>;
  const introHeadingRef = useRef() as MutableRefObject<HTMLHeadingElement>;
  const aboutRef = useRef() as MutableRefObject<HTMLElement>;
  const skillsRef = useRef() as MutableRefObject<HTMLElement>;
  const projectsRef = useRef() as MutableRefObject<HTMLElement>;
  const blogRef = useRef() as MutableRefObject<HTMLElement>;
  const contactRef = useRef() as MutableRefObject<HTMLElement>;
  const sidebarButtonRef = useRef() as MutableRefObject<HTMLElement>;

  const sectionRefs = useMemo(
    () => [
      { section: navItemTitles.About, ref: aboutRef },
      { section: navItemTitles.Skills, ref: skillsRef },
      { section: navItemTitles.Projects, ref: projectsRef },
      { section: navItemTitles.Blog, ref: blogRef },
      { section: navItemTitles.Contact, ref: contactRef },
      { section: sections.IntroHeading, ref: introHeadingRef },
    ],
    [],
  );

  return (
    <>
      <Head>
        <title>Sreejit De</title>
      </Head>
      <GlobalContextProvider>
        <TooltipProvider>
          <Tooltip />
          <Navbar
            refs={sectionRefs}
            sidebarButtonRef={sidebarButtonRef}
            ref={headerRef}
          />
          <Sidebar
            refs={sectionRefs}
            headerHeight={headerRef.current?.offsetHeight}
            sidebarButtonRef={sidebarButtonRef}
          />
          <Introduction
            ref={introHeadingRef}
            aboutSectionTop={aboutRef.current?.offsetTop}
            headerHeight={headerRef.current?.offsetHeight}
          />
          <About workInfo={workInfo} ref={aboutRef} />
          <Skills ref={skillsRef} />
          <Projects ref={projectsRef} />
          <BlogSection ref={blogRef} posts={posts} />
          <Contact ref={contactRef} />
          <Footer />
        </TooltipProvider>
      </GlobalContextProvider>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  posts: BlogPostType[];
  workInfo: Record<string, WorkplaceType>;
}> = async () => {
  const postNodes = await fetchPosts();
  const posts = postNodes.map((post) => post.node);

  const workplacesFile = fs.readFileSync("./src/data/work.yaml", "utf-8");
  const workInfo: Record<string, WorkplaceType> = yaml.parse(workplacesFile);

  return {
    props: { posts, workInfo },
    revalidate: 1800,
  };
};
