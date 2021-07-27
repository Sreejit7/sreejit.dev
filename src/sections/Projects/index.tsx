import { forwardRef } from "react";
import Layout from "../../components/Layout";
import styles from "./projects.module.scss";
import layoutStyles from "../../components/Layout/layout.module.scss";
import { projects } from "../../data/projects";
import ProjectItem from "./ProjectItem";
import { VscGithub } from "react-icons/vsc";

const Projects = forwardRef<HTMLElement>((props, ref) => {
  return (
    <Layout>
      <section ref={ref} className={layoutStyles.section}>
        <h1 className="section-title">Projects</h1>
        <ul className={styles["projects-list"]}>
          {projects.map((project, index) => (
            <ProjectItem key={index} project={project} odd={index % 2 === 1} />
          ))}
        </ul>
        <footer className={styles["projects-footer"]}>
          <a className={styles["projects-view-all"]} target="_blank" rel="noreferrer" href="https://github.com/Sreejit7">
            View other projects
            <VscGithub />
          </a>
        </footer>
      </section>
    </Layout>
  );
});

Projects.displayName = "Projects";

export default Projects;
