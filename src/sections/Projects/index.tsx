import { forwardRef, useEffect, useState } from "react";
import cn from "classnames";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Layout from "../../components/Layout";
import styles from "./projects.module.scss";
import sectionStyles from "../section.module.scss";
import layoutStyles from "../../components/Layout/layout.module.scss";
import ProjectItem from "./ProjectItem";
import { VscGithub } from "react-icons/vsc";
import { fetchProjects } from "../../services";

export interface ProjectItemInterface {
  title: string;
  techStack: { title: string }[];
  image: { url: string };
  github: string;
  url: string;
  desc: string;
}

const Projects = forwardRef<HTMLElement>((props, ref) => {
  const [projectList, setProjectList] = useState<ProjectItemInterface[]>([]);

  useEffect(() => {
    fetchProjects()
      .then((result: { node: ProjectItemInterface }[]) => {
        setProjectList(result.map((res) => res.node));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Layout>
      <section ref={ref} className={layoutStyles.section}>
        <h1 className="section-title">Projects</h1>
        {projectList.length > 0 && (
          <>
            <ul className={styles["projects-list"]}>
              {projectList.map((project, index) => (
                <li key={index}>
                  <ProjectItem project={project} odd={index % 2 === 1} />
                </li>
              ))}
            </ul>
            <footer className={sectionStyles["section-footer"]}>
              <a
                className={cn(sectionStyles["section-footer-text"], "btn-3d")}
                target="_blank"
                rel="noreferrer"
                href="https://github.com/Sreejit7"
              >
                View other projects
                <VscGithub />
              </a>
            </footer>
          </>
        )}
        {projectList.length === 0 && (
          <>
            <h2>Loading projects ...</h2>
            <SkeletonTheme baseColor="#887ef8" highlightColor="#e8e8e8">
              <Skeleton count={4} height={80} style={{ marginBottom: 20 }} />
            </SkeletonTheme>
          </>
        )}
      </section>
    </Layout>
  );
});

Projects.displayName = "Projects";

export default Projects;
