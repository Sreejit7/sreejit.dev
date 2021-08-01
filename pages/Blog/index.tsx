import Layout from "../../src/components/Layout";
import styles from "./blog.module.scss";
import layoutStyles from "../../src/components/Layout/layout.module.scss";
import sectionStyles from "../../src/sections/section.module.scss";
import { GetStaticProps } from "next";
import cn from "classnames";
import { ParsedUrlQuery } from "querystring";
import { BlogPostType } from "../../src/data/blogQuery";
import { fetchPosts } from "../../src/utils/blogUtils";
import BlogPost from "../../src/components/BlogPost";

type Props = {
  posts: BlogPostType[];
};

const BlogSection = ({ posts }: Props) => {
  return (
    <Layout>
      <section className={layoutStyles.section}>
        <h1 className="section-title">Blogs</h1>
        <span className={cn(sectionStyles["section-text"], styles["blog-text"])}>
          I started my technical blog with the motivation of document my learnings 
          as well as sharing bits and pieces of whatever I was learning with the wonderful tech community.
          I{" '"}m still trying to be more regular in penning down my learnings.
        </span>
        <ul className={styles["blog-list"]}>
          {posts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </ul>
      </section>
    </Layout>
  );
};

interface Params extends ParsedUrlQuery {}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  const posts = await fetchPosts();
  return {
    props: { posts },
  };
};

export default BlogSection;
