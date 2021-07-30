import Layout from "../../components/Layout";
import styles from "./intro.module.scss";
import cn from "classnames";
import { MutableRefObject } from "react";
import { scrollToSection } from "../../utils/scrollUtils";

type IntroProps = {
  aboutRef: MutableRefObject<HTMLElement>;
  headerRef: MutableRefObject<HTMLElement>;
};
const Introduction = ({ aboutRef, headerRef }: IntroProps) => {
  return (
    <Layout cName="section">
      <h1 className={cn(styles["intro-title"], "gradient-text")}>
        Hey, I’m Sreejit.
      </h1>
      <h2 className={styles["intro-subtitle"]}>
        <span className={styles["intro-job"]}>Software Engineer</span> based in{" "}
        <span className={styles["intro-country"]}>India.</span>
      </h2>
      <span className={styles["intro-text"]}>
        Yeah, I’m one of those folks who just sit in front of their machine and
        build and break stuff.
        <br />
        (well, most of the times!)
      </span>
      <button
        className="btn btn-primary btn-md"
        onClick={() => scrollToSection( aboutRef.current?.offsetTop, headerRef.current?.offsetHeight )}
      >
        Keep Reading
      </button>
    </Layout>
  );
};

export default Introduction;
