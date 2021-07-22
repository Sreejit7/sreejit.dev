import Layout from "../../components/Layout";
import styles from "./about.module.scss";
import cn from "classnames";
import Image from "next/image";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useMemo } from "react";

const About = () => {
  const {
    dimensions: { width },
  } = useWindowDimensions();

  const isMobileView = useMemo(() => {
    return width <= 768;
  }, [width]);
  return (
    <Layout cName="section">
      <section className={cn(styles.about)}>
        <section className={styles["about-left"]}>
          <h1 className="section-title">About Me</h1>
          <span className={styles["about-text"]}>
            Hello, my name is Sreejit De. I’m a{" "}
            <span className={styles["about-text-highlight"]}>
              Software Engineer
            </span>{" "}
            based in India, passionate about building things for the web. I love
            learning new technologies & getting my hands dirty playing around
            with them.
          </span>
          <span className={styles["about-text"]}>
            Currently, I’m working at{" "}
            <a
              className={styles["about-text-highlight"]}
              target="_blank"
              rel="noreferrer"
              href="https://hashedin.com/"
            >
              HashedIn
            </a>
            , collaborating on building SaaS products for a wide range of
            clients.
          </span>
          <span className={styles["about-text"]}>
            I’m an avid{" "}
            <span className={styles["about-text-highlight"]}>sports fan</span> -
            from Football to F1!
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
};

export default About;
