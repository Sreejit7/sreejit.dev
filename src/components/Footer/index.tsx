import { AiFillGithub } from "react-icons/ai";
import styles from "./footer.module.scss";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles["footer-text"]}>
        Designed & Built with ❤️ by Sreejit
      </p>
    </footer>
  );
};

export default Footer;
