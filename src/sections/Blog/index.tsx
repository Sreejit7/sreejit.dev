import cn from "classnames";
import { forwardRef } from "react";
import { IoIosPaper } from 'react-icons/io';
import Layout from "../../components/Layout";
import layoutStyles from "../../components/Layout/layout.module.scss";
import { BlogPostType } from "../../data/blogQuery";
import styles from "./blog.module.scss";
import sectionStyles from '../section.module.scss';
import BlogPost from "../../components/BlogPost";

type BlogPropsType = {
  posts: BlogPostType[];
}

const BlogSection = forwardRef<HTMLElement, BlogPropsType>(({ posts }, ref ) => {
  return (
    <Layout>
      <section ref={ref} className={layoutStyles.section}>
        <h1 className="section-title">Recent Posts</h1>
        <span className={cn(sectionStyles["section-text"], styles["blog-text"])}>
          I started my technical blog with the motivation of documenting my learnings 
          as well as sharing bits and pieces of whatever I was learning with the wonderful tech community.
          I{" '"}m still trying to be more regular in penning down my learnings. Here are some of my recent posts.
        </span>
        <ul className={styles["blog-list"]}>
          {posts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </ul>
        <footer className={sectionStyles["section-footer"]}>
          <a className={cn(sectionStyles["section-footer-text"], "btn-3d")} target="_blank" rel="noreferrer" href="https://blog.sreejit.dev">
            Read all posts
            <IoIosPaper />
          </a>
        </footer>
      </section>
    </Layout>
  );
});

BlogSection.displayName = 'BlogSection';

export default BlogSection;
