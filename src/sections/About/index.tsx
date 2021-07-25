import Layout from "../../components/Layout";
import styles from "./about.module.scss";
import sectionStyles from "../section.module.scss";
import cn from "classnames";
import Image from "next/image";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import React from "react";

const About = React.forwardRef<HTMLElement>((props, ref) => {
  const { isMobileView } = useWindowDimensions();

  return (
    <Layout cName="section">
      <section ref={ref} className={cn(styles.about)}>
        <section className={styles["about-left"]}>
          <h1 className="section-title">About Me</h1>
          <span
            className={cn(styles["about-text"], sectionStyles["section-text"])}
          >
            Hello, my name is Sreejit De. I’m a{" "}
            <span
              className={cn(
                styles["about-text-highlight"],
                sectionStyles["section-text-highlight"]
              )}
            >
              Software Engineer
            </span>{" "}
            based in India, passionate about building things for the web. I love
            learning new technologies & getting my hands dirty playing around
            with them.
          </span>
          <span
            className={cn(styles["about-text"], sectionStyles["section-text"])}
          >
            Currently, I’m working at{" "}
            <a
              className={cn(
                styles["about-text-highlight"],
                sectionStyles["section-text-highlight"]
              )}
              target="_blank"
              rel="noreferrer"
              href="https://hashedin.com/"
            >
              HashedIn
            </a>
            , collaborating on building SaaS products for a wide range of
            clients.
          </span>
          <span
            className={cn(styles["about-text"], sectionStyles["section-text"])}
          >
            I’m an avid{" "}
            <span
              className={cn(
                styles["about-text-highlight"],
                sectionStyles["section-text-highlight"]
              )}
            >
              sports fan
            </span>{" "}
            - from Football to F1!
          </span>
        </section>
        <section className={styles["about-right"]}>
          <Image
            src="/images/Sreejit De dp.png"
            alt="Sreejit De"
            height={280}
            width={isMobileView ? 180 : 280}
            className={styles["about-img"]}
          />
        </section>
      </section>
    </Layout>
  );
});

About.displayName = "About";

export default About;
