export const query = `
  query {
  publication(host: "blog.sreejit.dev") {
      posts(first: 3) {
        edges {
          node {
            brief
            title
            slug
            coverImage {
              url
            }
          }
        }
      }
    }
  }
  `;

export interface BlogPostType {
  brief: string;
  coverImage: {
    url: string;
  };
  slug: string;
  title: string;
}

export interface BlogPostNode {
  node: BlogPostType;
}
