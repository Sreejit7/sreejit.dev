module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.hashnode.com", "media.graphassets.com"],
  },
  env: {
    GRAPHCMS_PROJECTS_ENDPOINT: process.env.GRAPHCMS_PROJECTS_ENDPOINT,
  },
  swcMinify: true,
};
