import { GetStaticProps, InferGetStaticPropsType } from "next";
import { MutableRefObject, useRef, useState } from "react";
import { fetchPosts } from "../src/utils/blogUtils";
import Navbar from "../src/components/Navbar";
import Introduction from "../src/sections/Introduction";
import { GlobalContext } from "../src/context/useGlobalContext";
import Sidebar from "../src/components/Sidebar";
import About from "../src/sections/About";
import { navItemTitles } from "../src/data/navItems";
import Skills from "../src/sections/Skills";
import Projects from "../src/sections/Projects";
import Contact from "../src/sections/Contact";
import { IntroHeading } from "../src/data/sections";
import Footer from "../src/components/Footer";
import BlogSection from "../src/sections/Blog";
import Head from "next/head";
import { TooltipProvider } from "../src/context/useTooltipContext";
import Tooltip from "../src/components/Tooltip";

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
  const sectionRefs = [
    { section: navItemTitles.About, ref: aboutRef },
    { section: navItemTitles.Skills, ref: skillsRef },
    { section: navItemTitles.Projects, ref: projectsRef },
    { section: navItemTitles.Blog, ref: blogRef },
    { section: navItemTitles.Contact, ref: contactRef },
    { section: IntroHeading, ref: introHeadingRef },
  ];
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
