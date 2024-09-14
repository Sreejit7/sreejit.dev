import React, { useState } from "react";
import cn from "classnames";
import Image from "next/image";
import { motion } from "framer-motion";

import Layout from "../../components/Layout";
import styles from "./about.module.scss";
import sectionStyles from "../section.module.scss";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import type { WorkplaceType } from "../../components/Workplace/types";
import Workplace from "../../components/Workplace";

interface AboutPropsType {
  workInfo: Record<string, WorkplaceType>;
}

const About = React.forwardRef<HTMLElement, AboutPropsType>(
  ({ workInfo }, ref) => {
    const { isMobileView } = useWindowDimensions();

    const [highlightedWorkPlaceIndex, setHighlightedWorkPlaceIndex] =
      useState(0);

    const [workplaceDescList, _] = useState<string[]>(
      Object.values(workInfo).map((work) => work.desc),
    );

    return (
      <Layout cName="section">
        <section ref={ref}>
          <h1 className={cn("section-title", styles["about-title"])}>
            About Me
          </h1>
          <section className={styles.about}>
            <section className={styles["about-left"]}>
              <span
                className={cn(
                  styles["about-text"],
                  sectionStyles["section-text"],
                )}
              >
                Hello, my name is Sreejit De. I &apos;m a{" "}
                <span className={cn(styles["about-text-highlight"])}>
                  Software Engineer
                </span>{" "}
                based in India, passionate about building things for the web. I
                love learning new technologies &amp; getting my hands dirty
                playing around with them. I &apos;m sharing my journey &amp;
                learnings on my
                {"  "}
                <a
                  className={cn(
                    styles["about-text-highlight"],
                    sectionStyles["section-text-highlight"],
                  )}
                  target="_blank"
                  rel="noreferrer"
                  href="https://blog.sreejit.dev"
                >
                  tech blog
                </a>{" "}
                sometimes.
              </span>

              <span
                className={cn(
                  styles["about-text"],
                  sectionStyles["section-text"],
                )}
              >
                I’m an avid sports fan - from Football to F1!
              </span>
            </section>
            <section className={styles["about-right"]}>
              <Image
                src="/images/Sreejit_dp.webp"
                alt="Sreejit De"
                height={280}
                width={isMobileView ? 180 : 280}
                className={styles["about-img"]}
              />
            </section>
          </section>
          <section className={styles["about-workplaces"]}>
            <h2 className={cn("section-title")}>I have broken things at</h2>
            <ul
              className={cn(
                "flex",
                "flex-wrap",
                styles["about-workplaces-list"],
              )}
            >
              {Object.entries(workInfo).map(([name, info], index) => (
                <li key={name}>
                  <Workplace
                    index={index}
                    name={name}
                    info={info}
                    handleHighlight={(index) =>
                      setHighlightedWorkPlaceIndex(index)
                    }
                    highlighted={index === highlightedWorkPlaceIndex}
                  />
                </li>
              ))}
            </ul>
            {!isMobileView && (
              <motion.p
                className={styles["about-workplaces-desc"]}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.75, ease: "easeInOut" },
                }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
              >
                {workplaceDescList[highlightedWorkPlaceIndex]}
              </motion.p>
            )}
          </section>
        </section>
      </Layout>
    );
  },
);

About.displayName = "About";

export default About;
