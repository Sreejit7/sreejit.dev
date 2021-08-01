import { query } from "../data/blogQuery";
export const fetchPosts = async () => {
  const response = await fetch('https://api.hashnode.com', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'User-Agent': '*',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  const ApiResponse = await response.json();
  return ApiResponse.data.user.publication.posts;
};