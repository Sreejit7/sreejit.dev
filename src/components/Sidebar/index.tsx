import styles from './sidebar.module.scss';
import cn from 'classnames';
import { useGlobalContext } from '../../context/useGlobalContext';
import { navbarItems } from '../../data/navItems';
import Link from 'next/link';
import { NavbarProps } from '../Navbar';
import { scrollToSection } from '../../utils/scrollUtils';

const Sidebar = ({ refs }: NavbarProps) => {
  const { isSidebarOpen, setSidebar } = useGlobalContext();
  const handleScrollToSection = (sectionTitle: string) => {
    const section = refs.find(({ section }) => section === sectionTitle);
    scrollToSection(section?.ref.current?.offsetTop, 80);
    setSidebar(false);
  }
  return (
    <aside className={cn(styles.sidebar, isSidebarOpen && styles["sidebar-active"])}>
      <ul className={styles["sidebar-item-list"]}>
        {navbarItems.map(({ link, title }, index) => (
          <Link key={index} href={link} passHref>
            <li onClick={() => handleScrollToSection(title)} className={styles["sidebar-item"]}>
                {title}
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
