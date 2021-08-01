import Head from "next/head";
import { MutableRefObject, useRef, useState } from "react";
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

export default function Home() {
  const [sidebar, setSidebar] = useState(false);
  const [visibleSection, setVisibleSection] = useState("");
  const headerRef = useRef() as MutableRefObject<HTMLElement>;
  const introHeadingRef = useRef() as MutableRefObject<HTMLHeadingElement>; 
  const aboutRef = useRef() as MutableRefObject<HTMLElement>;
  const skillsRef = useRef() as MutableRefObject<HTMLElement>;
  const projectsRef = useRef() as MutableRefObject<HTMLElement>;
  const contactRef = useRef() as MutableRefObject<HTMLElement>;
  const sectionRefs = [
    { section: navItemTitles.About, ref: aboutRef },
    { section: navItemTitles.Skills, ref: skillsRef },
    { section: navItemTitles.Projects, ref: projectsRef },
    { section: navItemTitles.Contact, ref: contactRef },
    { section: IntroHeading, ref: introHeadingRef }
  ];
  return (
    <>
      <GlobalContext.Provider
        value={{
          isSidebarOpen: sidebar,
          setSidebar,
          visibleSection,
          setVisibleSection,
        }}
      >
        <Navbar refs={sectionRefs} ref={headerRef} />
        <Sidebar refs={sectionRefs} />
        <Introduction ref={introHeadingRef} aboutRef={aboutRef} headerRef={headerRef} />
        <About ref={aboutRef} />
        <Skills ref={skillsRef} />
        <Projects ref={projectsRef} />
        <Contact ref={contactRef} />
        <Footer />
      </GlobalContext.Provider>
    </>
  );
}
