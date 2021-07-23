import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.scss";
import { navbarItems } from "../../data/navItems";
import { useGlobalContext } from "../../context/useGlobalContext";
import { RefObject, useRef } from "react";
import { scrollToSection } from "../../utils/scrollUtils";

type NavbarProps = {
  refs: {
    section: string;
    ref: RefObject<HTMLElement>
  }[]
}
const Navbar = ({ refs }: NavbarProps) => {
  const { isSidebarOpen, setSidebar } = useGlobalContext();
  const headerRef = useRef<HTMLElement>(null);

  const handleScrollToSection = (sectionTitle: string) => {
    const section = refs.find(({ section }) => section === sectionTitle);
    scrollToSection(section?.ref.current?.offsetTop, headerRef.current?.offsetHeight);
  }
  return (
    <header className={styles.navbar} ref={headerRef}>
      <h3 className={styles["navbar-text"]}>Hey, I’m Sreejit.</h3>
      <nav className={styles["navbar-list"]}>
        {navbarItems.map(({ link, title }, index) => {
          return (
            <li key={index} className={styles["navbar-list-item"]} onClick={() => handleScrollToSection(title)}>
              <Link href={`${link}`} scroll={false} passHref>{title}</Link>
            </li>
          );
        })}
      </nav>
      {!isSidebarOpen && (
        <div className={styles["sidebar-icon"]} onClick={() => setSidebar(true)}>
          <Image
            alt="Sidebar Icon"
            src="/images/SidebarIcon.svg"
            height={30}
            width={30}
          />
        </div>
      )}
      {isSidebarOpen && (
        <div className={styles["sidebar-icon"]} onClick={() => setSidebar(false)}>
          <Image
            alt="Sidebar Close Icon"
            src="/images/SidebarCloseIcon.svg"
            height={30}
            width={30}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;
