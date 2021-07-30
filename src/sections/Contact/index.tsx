import { forwardRef } from "react";
import cn from "classnames";
import Layout from "../../components/Layout";
import layoutStyles from "../../components/Layout/layout.module.scss";
import styles from "./contact.module.scss";
import sectionStyles from "../section.module.scss";
import { socialHandles } from "../../data/socialHandles";

const Contact = forwardRef<HTMLElement>((props, ref) => {
  return (
    <Layout>
      <section ref={ref} className={layoutStyles.section}>
        <h1 className={cn("section-title", styles["contact-title"])}>
          Wanna say hi?
        </h1>
        <span className={sectionStyles["section-text"]}>
          I’m always excited to meet and hear from new people!
          <br />
          Have a question or just want to drop a hello?
        </span>
        <a
          href="mailto:sreejitde7@gmail.com"
          target="_top"
          className="btn btn-primary btn-md"
        >
          Drop a message
        </a>
        <h3 className={styles["contact-subtitle"]}>Let’s get connected!</h3>
        <ul className={styles["contact-socials"]}>
          {socialHandles.map(({ icon, link, social }, index) => (
            <li key={index}>
              <a
                className={styles["contact-link"]}
                title={social}
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
});

Contact.displayName = "Contact";

export default Contact;
