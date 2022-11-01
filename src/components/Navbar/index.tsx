import Link from "next/link";
import Image from "next/image";
import { MutableRefObject, forwardRef } from "react";
import cn from "classnames";
import styles from "./navbar.module.scss";
import { navbarItems } from "../../data/navItems";
import {
  GlobalContextActionsTypes,
  useGlobalContext,
} from "../../context/useGlobalContext";
import { scrollToSection } from "../../utils/scrollUtils";
import useScroll from "../../hooks/useScroll";
import ScrollIndicator from "../ScrollIndicator";

export type NavbarProps = {
  refs: {
    section: string;
    ref: MutableRefObject<HTMLElement>;
  }[];
  sidebarButtonRef: MutableRefObject<HTMLElement>;
};
const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ refs, sidebarButtonRef }, ref) => {
    const {
      state: { isSidebarOpen, visibleSection },
      dispatch,
    } = useGlobalContext();

    const { transparentNavbar } = useScroll({
      refs,
      headerHeight: (ref as MutableRefObject<HTMLElement>).current
        ?.offsetHeight,
    });

    const handleScrollToSection = (sectionTitle: string) => {
      const section = refs.find(({ section }) => section === sectionTitle);
      scrollToSection(
        section?.ref.current?.offsetTop,
        (ref as MutableRefObject<HTMLElement>).current?.offsetHeight
      );
    };

    return (
      <header
        className={cn(
          styles.navbar,
          !transparentNavbar && styles["navbar-opaque"]
        )}
        ref={ref}
      >
        <ScrollIndicator />
        <ul className={styles["navbar-list"]}>
          {navbarItems.map(({ title }) => {
            return (
              <li
                key={title}
                className={cn(
                  styles["navbar-list-item"],
                  visibleSection === title && styles["navbar-list-item-visible"]
                )}
                onClick={() => handleScrollToSection(title)}
              >
                {title}
              </li>
            );
          })}
        </ul>
        <span
          ref={sidebarButtonRef}
          className={styles["sidebar-icon"]}
          onClick={() =>
            dispatch({
              type: GlobalContextActionsTypes.SET_SIDEBAR,
              setSidebar: isSidebarOpen ? "closed" : "open",
            })
          }
        >
          <Image
            alt={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            src={
              isSidebarOpen
                ? "/images/SidebarCloseIcon.svg"
                : "/images/SidebarIcon.svg"
            }
            height={30}
            width={30}
          />
        </span>
      </header>
    );
  }
);

Navbar.displayName = "Navbar";

export default Navbar;
