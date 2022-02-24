import { AiFillGithub } from "react-icons/ai";
import styles from "./footer.module.scss";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles["footer-text"]}>
        Designed & Built with ❤️ by Sreejit
      </p>
      <a
        className={styles["footer-link"]}
        href="https://github.com/Sreejit7/nextjs-portfolio"
        target="_blank"
        rel="noreferrer"
      >
        <span>Find the code on</span>
        <AiFillGithub className={styles["footer-icon"]} />
      </a>
    </footer>
  );
};

export default Footer;
