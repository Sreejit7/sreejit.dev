import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.scss";
import { navbarItems } from "../../data/navItems";
import { useGlobalContext } from "../../context/useGlobalContext";
import { MutableRefObject, forwardRef } from "react";
import cn from "classnames";
import { scrollToSection } from "../../utils/scrollUtils";
import useScroll from "../../hooks/useScroll";
import ScrollIndicator from "../ScrollIndicator";

export type NavbarProps = {
  refs: {
    section: string;
    ref: MutableRefObject<HTMLElement>;
  }[];
};
const Navbar = forwardRef<HTMLElement, NavbarProps>(({ refs }, ref) => {
  const { isSidebarOpen, setSidebar } = useGlobalContext();
  const { transparentNavbar, visibleSection } = useScroll({ refs, headerHeight: (ref as MutableRefObject<HTMLElement>).current?.offsetHeight });
  const handleScrollToSection = (sectionTitle: string) => {
    const section = refs.find(({ section }) => section === sectionTitle);
    scrollToSection(
      section?.ref.current?.offsetTop,
      (ref as MutableRefObject<HTMLElement>).current?.offsetHeight
    );
  };
  return (
    <header className={cn(styles.navbar, !transparentNavbar && styles["navbar-opaque"])} ref={ref}>
      <h3 className={styles["navbar-text"]}>Hey, I’m Sreejit.</h3>
      <ScrollIndicator />
      <nav className={styles["navbar-list"]}>
        {navbarItems.map(({ link, title }, index) => {
          return (
            <li
              key={index}
              className={cn(styles["navbar-list-item"], visibleSection === title && styles["navbar-list-item-visible"])}
              onClick={() => handleScrollToSection(title)}
            >
              <Link href={`${link}`} scroll={false} passHref>
                {title}
              </Link>
            </li>
          );
        })}
      </nav>
      {!isSidebarOpen && (
        <div
          className={styles["sidebar-icon"]}
          onClick={() => setSidebar(true)}
        >
          <Image
            alt="Sidebar Icon"
            src="/images/SidebarIcon.svg"
            height={30}
            width={30}
          />
        </div>
      )}
      {isSidebarOpen && (
        <div
          className={styles["sidebar-icon"]}
          onClick={() => setSidebar(false)}
        >
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
});

Navbar.displayName = "Navbar";

export default Navbar;
