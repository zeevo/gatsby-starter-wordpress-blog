module.exports = {
  siteMetadata: {
    title: `WP GraphQL Gatsby Starter`,
    subtitle: `Get started...`,
    rss: '/rss.xml',
    adminUrl: 'https://wp.zeevo.me/wp-login',
    menu: [
      {
        label: 'Twitter',
        path: 'https://twitter.com/zeevosec',
        external: true,
      },
      {
        label: 'Home',
        path: '/',
        external: false,
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
      resolve: 'gatsby-source-graphql',
      options: {
        // This type will contain remote schema Query type
        typeName: `WPGraphQL`,
        // This is field under which it's accessible
        fieldName: `wp`,
        // Url to query from
        url: `https://wp.zeevo.me/graphql`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-zeevo-wordpress`,
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
