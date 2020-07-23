require('dotenv').config();

module.exports = {
  siteMetadata: {
    rss: '/rss.xml',
    adminUrl: process.env.WP_ADMIN_URL, // Something like https://mywpsite.com/wp-login
    menu: [
      {
        title: 'Twitter',
        uri: 'https://twitter.com/zeevosec',
        external: true,
      },
      {
        title: 'Home',
        uri: '/',
      },
    ],
    author: {
      name: "Shane O'Neill",
      twitter: 'https://twitter.com/zeevosec',
      github: 'https://github.com/zeevosec',
      avatar: '/icon.png',
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: process.env.WPGRAPHQL_URL,
        verbose: true,
        develop: {
          hardCacheMediaFiles: true,
        },
        debug: {
          graphql: {
            writeQueriesToDisk: true,
          },
        },
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves.
                  50
                : // max of 50k posts
                  50000,
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-wordpress-zeevo`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
};
