import styles from "./footer.module.scss";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles["footer-text"]}>Designed & Built with ❤️ by Sreejit </span>
    </footer>
  );
};

export default Footer;
