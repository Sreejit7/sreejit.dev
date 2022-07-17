import Layout from "../../components/Layout";
import styles from "./intro.module.scss";
import cn from "classnames";
import { forwardRef, MutableRefObject, useEffect, useState } from "react";
import { scrollToSection } from "../../utils/scrollUtils";
import MailButton from "../../components/MailButton";
import { motion } from "framer-motion";

type IntroPropsType = {
  aboutRef: MutableRefObject<HTMLElement>;
  headerRef: MutableRefObject<HTMLElement>;
};

const Introduction = forwardRef<HTMLHeadingElement, IntroPropsType>(
  ({ aboutRef, headerRef }, ref) => {
    const [buttonMode, setButtonMode] = useState("READ");
    // const { scrollYProgress } = useViewportScroll();
    // const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

    useEffect(() => {
      const updateButtonMode = () => {
        const scrollPos = window.scrollY + headerRef.current.offsetHeight;
        if (scrollPos >= aboutRef.current.offsetTop) {
          setButtonMode("MAIL");
        }
      };
      window.addEventListener("scroll", updateButtonMode);
      return () => {
        window.removeEventListener("scroll", updateButtonMode);
      };
    }, []);

    return (
      <Layout cName="section">
        <motion.h1
          ref={ref}
          className={cn(styles["intro-title"], "gradient-text")}
        >
          Hey, I’m Sreejit.
        </motion.h1>
        <h2 className={styles["intro-subtitle"]}>
          <span className={styles["intro-job"]}>Software Engineer</span> based
          in India.
        </h2>
        <span className={styles["intro-text"]}>
          Yeah, I’m one of those folks who just sit in front of their machine,
          and build & break stuff.
          <br />
          (well, most of the times!)
        </span>
        {buttonMode === "READ" ? (
          <button
            className="btn btn-primary btn-md"
            onClick={() =>
              scrollToSection(
                aboutRef.current.offsetTop,
                headerRef.current.offsetHeight
              )
            }
          >
            Keep Reading
          </button>
        ) : (
          <MailButton />
        )}
      </Layout>
    );
  }
);

Introduction.displayName = "Introduction";

export default Introduction;
