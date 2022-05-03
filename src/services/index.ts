import request, { gql } from "graphql-request";

const graphQLUrl = process.env.GRAPHCMS_PROJECTS_ENDPOINT;

export const fetchProjects = async () => {
  const query = gql`
    query MyProjects() {
      projectsConnection() {
        edges {
          node {
            desc
            image {
              url
            }
            title
            url
            github
            techStack {
              title
            }
          }
        }
      }
    }
  `;

  if (graphQLUrl) {
    const result = await request(graphQLUrl, query);
    return result.projectsConnection.edges;
  }

  throw new Error(`Invalid url: ${graphQLUrl}`);
};
