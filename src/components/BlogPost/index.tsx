import { BlogPostType } from "../../data/blogQuery";
import Image from "next/image";
import styles from "./blogpost.module.scss";
import React, { useEffect, useState } from "react";

const BlogPost = (blogPost: BlogPostType) => {
  const { title, coverImage, brief, slug } = blogPost;
  const [modifiedBrief, setModifiedBrief] = useState("");

  useEffect(() => {
    /** modify the brief and replace links and embeds */
    const linesInBrief = brief.split(/\n/);

    const modBrief = linesInBrief
      .map((line) => {
        if (line.startsWith("https")) {
          return `[some link]`;
        } else {
          return line;
        }
      })
      .join(" ");

    setModifiedBrief(modBrief);
  }, [brief]);

  return (
    <a
      href={`https://blog.sreejit.dev/${slug}`}
      target="_blank"
      rel="noreferrer"
      referrerPolicy="no-referrer"
    >
      <article className={styles.blogpost}>
        <Image
          alt={title}
          src={coverImage.url}
          height={180}
          width={350}
          className={styles["blogpost-image"]}
        />
        <h2 className={styles["blogpost-title"]}>{title}</h2>
        <span className={styles["blogpost-brief"]}>{modifiedBrief}</span>
      </article>
    </a>
  );
};

export default BlogPost;
