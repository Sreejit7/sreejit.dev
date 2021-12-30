import styles from "./sidebar.module.scss";
import cn from "classnames";
import { useGlobalContext } from "../../context/useGlobalContext";
import { navbarItems } from "../../data/navItems";
import Link from "next/link";
import { NavbarProps } from "../Navbar";
import { scrollToSection } from "../../utils/scrollUtils";
import { MutableRefObject, useEffect, useRef } from "react";

const Sidebar = ({ refs }: NavbarProps) => {
  const { isSidebarOpen, setSidebar } = useGlobalContext();
  const handleScrollToSection = (sectionTitle: string) => {
    const section = refs.find(({ section }) => section === sectionTitle);
    scrollToSection(section?.ref.current?.offsetTop, 80);
    setSidebar(false);
  };
  const sidebarRef = useRef() as MutableRefObject<HTMLElement>;

  useEffect(() => {
    // Closes the sidebar if user clicks outside
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebar(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setSidebar, isSidebarOpen]);

  return (
    <aside
      className={cn(styles.sidebar, isSidebarOpen && styles["sidebar-active"])}
      ref={sidebarRef}
    >
      <ul className={styles["sidebar-item-list"]}>
        {navbarItems.map(({ link, title }, index) => (
          <Link key={index} href={link} passHref>
            <li
              onClick={() => handleScrollToSection(title)}
              className={styles["sidebar-item"]}
            >
              {title}
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
};
export default Sidebar;
