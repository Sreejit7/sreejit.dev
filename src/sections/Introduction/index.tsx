import Layout from "../../components/Layout";
import styles from "./intro.module.scss";
import cn from "classnames";
import { forwardRef, MutableRefObject } from "react";
import { scrollToSection } from "../../utils/scrollUtils";

type IntroPropsType = {
  aboutRef: MutableRefObject<HTMLElement>;
  headerRef: MutableRefObject<HTMLElement>;
};

const Introduction = forwardRef<HTMLHeadingElement, IntroPropsType>(
  ({ aboutRef, headerRef }, ref) => {
    return (
      <Layout cName="section">
        <h1 ref={ref} className={cn(styles["intro-title"], "gradient-text")}>
          Hey, I’m Sreejit.
        </h1>
        <h2 className={styles["intro-subtitle"]}>
          <span className={styles["intro-job"]}>Software Engineer</span> based
          in <span className={styles["intro-country"]}>India.</span>
        </h2>
        <span className={styles["intro-text"]}>
          Yeah, I’m one of those folks who just sit in front of their machine
          and build and break things.
          <br />
          (well, most of the times!)
        </span>
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
      </Layout>
    );
  }
);

Introduction.displayName = "Introduction";

export default Introduction;
