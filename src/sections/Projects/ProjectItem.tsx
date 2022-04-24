import { ProjectItemInterface } from "./";
import styles from "./projects.module.scss";
import Image from "next/image";
import cn from "classnames";
import { VscLinkExternal, VscGithub } from "react-icons/vsc";
import { TiPointOfInterest } from "react-icons/ti";
import useWindowDimensions from "../../hooks/useWindowDimensions";

type projectProps = {
  project: ProjectItemInterface;
  odd: boolean;
};
const ProjectItem = ({ project, odd }: projectProps) => {
  const {
    title,
    desc,
    techStack,
    image: { url: imageUrl },
    github,
    url,
  } = project;

  const { isMobileView } = useWindowDimensions();

  return (
    <section className={cn(styles.project)}>
      <header className={styles["project-header"]}>
        <h2
          className={cn(
            styles["project-title"],
            odd && styles["project-title-odd"]
          )}
        >
          {title}
        </h2>
        <nav className={styles["project-header-nav"]}>
          <a
            title="Source Code"
            className={styles["project-link"]}
            href={github}
            target="_blank"
            rel="noreferrer"
          >
            <VscGithub />
          </a>
          <a
            title="Project Link"
            className={styles["project-link"]}
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            <VscLinkExternal />
          </a>
        </nav>
      </header>
      <article
        className={cn(styles["project-body"], odd && styles["project-odd"])}
      >
        <Image
          alt={title}
          src={imageUrl}
          height={isMobileView ? 200 : 300}
          width={isMobileView ? 360 : 480}
          className={styles["project-image"]}
        />
        <section className={styles["project-desc"]}>
          <p>{desc}</p>
          <ul className={styles["project-stack"]}>
            {techStack.map((stack, index) => (
              <li key={index} className={styles["project-stack-item"]}>
                <TiPointOfInterest />
                {stack.title}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </section>
  );
};

export default ProjectItem;
