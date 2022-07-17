import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { MutableRefObject, useMemo, useRef, useState } from "react";
import { fetchPosts } from "../src/utils/blogUtils";
import { GlobalContext } from "../src/context/useGlobalContext";
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

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [sidebar, setSidebar] = useState(false);
  const [visibleSection, setVisibleSection] = useState("");

  const headerRef = useRef() as MutableRefObject<HTMLElement>;
  const introHeadingRef = useRef() as MutableRefObject<HTMLHeadingElement>;
  const aboutRef = useRef() as MutableRefObject<HTMLElement>;
  const skillsRef = useRef() as MutableRefObject<HTMLElement>;
  const projectsRef = useRef() as MutableRefObject<HTMLElement>;
  const blogRef = useRef() as MutableRefObject<HTMLElement>;
  const contactRef = useRef() as MutableRefObject<HTMLElement>;

  const sectionRefs = useMemo(
    () => [
      { section: navItemTitles.About, ref: aboutRef },
      { section: navItemTitles.Skills, ref: skillsRef },
      { section: navItemTitles.Projects, ref: projectsRef },
      { section: navItemTitles.Blog, ref: blogRef },
      { section: navItemTitles.Contact, ref: contactRef },
      { section: sections.IntroHeading, ref: introHeadingRef },
    ],
    []
  );

  return (
    <>
      <Head>
        <title>Sreejit De</title>
      </Head>
      <GlobalContext.Provider
        value={{
          isSidebarOpen: sidebar,
          setSidebar,
          visibleSection,
          setVisibleSection,
        }}
      >
        <TooltipProvider>
          <Tooltip />
          <Navbar refs={sectionRefs} ref={headerRef} />
          <Sidebar refs={sectionRefs} />
          <Introduction
            ref={introHeadingRef}
            aboutRef={aboutRef}
            headerRef={headerRef}
          />
          <About ref={aboutRef} />
          <Skills ref={skillsRef} />
          <Projects ref={projectsRef} />
          <BlogSection ref={blogRef} posts={posts} />
          <Contact ref={contactRef} />
          <Footer />
        </TooltipProvider>
      </GlobalContext.Provider>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetchPosts();

  return {
    props: { posts },
    revalidate: 1800,
  };
};
