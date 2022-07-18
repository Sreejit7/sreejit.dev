import styles from "./sidebar.module.scss";
import cn from "classnames";
import {
  GlobalContextActionsTypes,
  useGlobalContext,
} from "../../context/useGlobalContext";
import { navbarItems } from "../../data/navItems";
import Link from "next/link";
import { scrollToSection } from "../../utils/scrollUtils";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";

interface SidebarProps {
  refs: {
    section: string;
    ref: MutableRefObject<HTMLElement>;
  }[];
  headerHeight: number;
  sidebarButtonRef: MutableRefObject<HTMLElement>;
}

const Sidebar = ({ refs, headerHeight, sidebarButtonRef }: SidebarProps) => {
  const {
    state: { isSidebarOpen },
    dispatch,
  } = useGlobalContext();

  const handleCloseSidebar = useCallback(() => {
    dispatch({
      type: GlobalContextActionsTypes.SET_SIDEBAR,
      setSidebar: "closed",
    });
  }, []);

  const handleScrollToSection = (sectionTitle: string) => {
    const section = refs.find(({ section }) => section === sectionTitle);
    scrollToSection(section?.ref.current?.offsetTop, headerHeight);
    // close the sidebar after scrolling to section
    handleCloseSidebar();
  };

  const sidebarRef = useRef() as MutableRefObject<HTMLElement>;

  useEffect(() => {
    const sidebarNode = sidebarRef.current;

    /**
     * @description  Closes the sidebar if user clicks outside the sidebar & sidebar toggle button
     * @param event the mouse down event
     */
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarNode &&
        !sidebarNode.contains(event.target as Node) &&
        !sidebarButtonRef.current.contains(event.target as Node)
      ) {
        handleCloseSidebar();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSidebarOpen, handleCloseSidebar]);

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
