import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.scss";
import { navbarItems } from "../../data/navItems";
import { useGlobalContext } from "../../../context/useGlobalContext";

const Navbar = () => {
  const { isSidebarOpen, setSidebar } = useGlobalContext();
  return (
    <header className={styles.navbar}>
      <h3 className={styles["navbar-text"]}>Hey, I’m Sreejit.</h3>
      <nav className={styles["navbar-list"]}>
        {navbarItems.map((item, index) => {
          return (
            <li key={index} className={styles["navbar-list-item"]}>
              <Link href={`${item.link}`} scroll={false} passHref>{item.title}</Link>
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
