import { BlogPostType } from "../../data/blogQuery";
import Image from "next/image";
import styles from "./blogpost.module.scss";

const BlogPost = (blogPost: BlogPostType) => {
  const { title, coverImage, brief, slug } = blogPost;
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
          src={coverImage}
          height={180}
          width={350}
          className={styles["blogpost-image"]}
        />
        <h2 className={styles["blogpost-title"]}>{title}</h2>
        <span className={styles["blogpost-brief"]}>{brief}</span>
      </article>
    </a>
  );
};

export default BlogPost;
