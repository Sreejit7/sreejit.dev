export const query = `
    {
      user(username: "Sreejit7") {
        publication {
          posts{
            slug
            title
            brief
            coverImage
          }
        }
      }
    }
  `;

export type BlogPostType = {
  brief: string;
  coverImage: string;
  slug: string;
  title: string;
}