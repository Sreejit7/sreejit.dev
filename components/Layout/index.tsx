import { ReactNode } from 'react';
import cn from 'classnames';
import styles from './layout.module.scss';
type LayoutProps = {
  children: ReactNode,
  cName?: string
}
const Layout = ({ children, cName }: LayoutProps) => {
  return (
    <main className={cn(styles.layout, styles[`${cName}`])}>
      {children}
    </main>
  )
}

export default Layout
