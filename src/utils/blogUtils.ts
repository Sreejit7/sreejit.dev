import { BlogPostNode, query } from "../data/blogQuery";

export const fetchPosts = async (): Promise<BlogPostNode[]> => {
  const response = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "User-Agent": "*",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const ApiResponse = await response.json();

  return ApiResponse.data.publication.posts.edges;
};
