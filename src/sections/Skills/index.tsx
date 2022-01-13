import { forwardRef, MouseEvent, MutableRefObject, useRef } from "react";
import cn from "classnames";
import Layout from "../../components/Layout";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./skills.module.scss";
import layoutStyles from "../../components/Layout/layout.module.scss";
import sectionStyles from "../section.module.scss";
import { skills } from "../../data/skills";
import { IconContext } from "react-icons/lib";
import {
  TooltipActionTypes,
  useTooltipContext,
} from "../../context/useTooltipContext";

const Skills = forwardRef<HTMLElement>((props, ref) => {
  const { isMobileView } = useWindowDimensions();

  const { dispatch } = useTooltipContext();

  const displayTooltip = (e: MouseEvent<HTMLElement>, title: string) => {
    const pos = e.currentTarget.getBoundingClientRect();
    const center = (pos.left + pos.right) / 2;
    const bottom = pos.bottom + 15;

    if (title) {
      dispatch({
        type: TooltipActionTypes.CREATE_TOOLTIP,
        text: title,
        location: { center, bottom },
      });
    }
  };

  const closeTooltip = () => {
    dispatch({
      type: TooltipActionTypes.DELETE_TOOLTIP,
    });
  };

  return (
    <IconContext.Provider
      value={{
        color: "#e8e8e8",
        size: isMobileView ? "4.5rem" : "6.5rem",
        className: styles["skills-icon"],
      }}
    >
      <Layout>
        <section ref={ref} className={layoutStyles.section}>
          <h1 className={cn("section-title", styles["skills-title"])}>
            Skills
          </h1>
          <span
            className={cn(sectionStyles["section-text"], styles["skills-text"])}
          >
            Being a developer is to be always learning and evolving constantly.
            Currently while building things for the web, I’m working on and
            learning these technologies and trying to grasp a few others like{" "}
            <a
              href="https://nodejs.org/en/"
              target="_blank"
              rel="noreferrer"
              className={sectionStyles["section-text-highlight"]}
            >
              Node JS
            </a>
            ,{" "}
            <a
              href="https://www.mongodb.com/"
              target="_blank"
              rel="noreferrer"
              className={sectionStyles["section-text-highlight"]}
            >
              MongoDB
            </a>{" "}
            etc.
          </span>
          <ul className={styles["skills-list"]}>
            {skills.map(({ title, icon }, index) => (
              <li key={index} className={styles["skills-list-item"]}>
                <span
                  className={styles["skills-icon"]}
                  onMouseEnter={(e) => displayTooltip(e, title)}
                  onMouseLeave={() => closeTooltip()}
                >
                  {icon}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    </IconContext.Provider>
  );
});

Skills.displayName = "Skills";

export default Skills;
