import Layout from "../../src/components/Layout";
import styles from "./blog.module.scss";
import layoutStyles from "../../src/components/Layout/layout.module.scss";
import { GetStaticProps } from "next";
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
