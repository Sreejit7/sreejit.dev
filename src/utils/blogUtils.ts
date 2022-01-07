import { BlogPostType, query } from "../data/blogQuery";
export const fetchPosts = async (): Promise<BlogPostType[]> => {
  const response = await fetch("https://api.hashnode.com", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "User-Agent": "*",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const ApiResponse = await response.json();

  // Return only latest 3 posts
  return ApiResponse.data.user.publication.posts.slice(0, 3);
};
