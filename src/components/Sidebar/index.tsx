import styles from './sidebar.module.scss';
import cn from 'classnames';
import { useGlobalContext } from '../../context/useGlobalContext';
import { navbarItems } from '../../data/navItems';
import Link from 'next/link';

const Sidebar = () => {
  const { isSidebarOpen, setSidebar } = useGlobalContext();
  return (
    <aside className={cn(styles.sidebar, isSidebarOpen && styles["sidebar-active"])}>
      <ul className={styles["sidebar-item-list"]}>
        {navbarItems.map(({ link, title }, index) => (
          <Link key={index} href={link} passHref>
            <li className={styles["sidebar-item"]}>
                {title}
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
