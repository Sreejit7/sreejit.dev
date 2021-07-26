import { ProjectItemInterface } from "../../data/projects";
import styles from "./projects.module.scss";
import Image from "next/image";
import cn from "classnames"
import { VscLinkExternal, VscGithub } from "react-icons/vsc";
import { TiPointOfInterest } from "react-icons/ti";


type projectProps = {
  project: ProjectItemInterface;
  odd: boolean;
};
const ProjectItem = ({ project, odd }: projectProps) => {
  const { title, desc, techStack, imageUrl, githubLink, url } = project;

  return (
    <section className={cn(styles.project)}>
      <header className={styles["project-header"]}>
        <h2 className={cn(styles["project-title"], odd && styles["project-title-odd"] )}>{title}</h2>
        <nav className={styles["peoject-header-nav"]}>
          <a
            title="Source Code"
            className={styles["project-link"]}
            href={githubLink}
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
      <article className={cn(styles["project-body"], odd && styles["project-odd"])}>
        <Image
          alt={title}
          src={imageUrl}
          layout="intrinsic"
          height={300}
          width={480}
          className={styles["project-image"]}
        />
        <section className={styles["project-desc"]}>
          <p>{desc}</p>
          <ul className={styles["project-stack"]}>
            {techStack.map((stack, index) => (
              <li key={index} className={styles["project-stack-item"]}>
                <TiPointOfInterest />
                {stack}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </section>
  );
};

export default ProjectItem;
