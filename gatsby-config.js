const lost = require('lost');
const pxtorem = require('postcss-pxtorem');

const url = 'http://zeevo-playground.com.s3-website.us-east-2.amazonaws.com/';

module.exports = {
  siteMetadata: {
    url,
    siteUrl: url,
    title: "Zeevo's Starter",
    subtitle: '',
    copyright: '© All rights reserved.',
    profilePic: './src/pages/photo.jpg',
    menu: [
      {
        label: 'Twitter',
        path: 'https://twitter.com/zeevosec',
        external: true,
      },
      {
        label: 'About',
        path: '/about/',
        external: false,
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
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                url
                title
                description: subtitle
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allWordpressPost } }) =>
              allWordpressPost.edges.map(edge => ({
                description: edge.node.acf.description,
                date: edge.node.date,
                url: site.siteMetadata.url + edge.node.slug,
                guid: site.siteMetadata.url + edge.node.slug,
                custom_elements: [{ 'content:encoded': edge.node.content }],
              })),
            query: `
            {
                allWordpressPost(limit: 1000, sort: {fields: date, order: DESC}, filter: {title: {regex: "/^((?!dummy).)*$/igm"}}) {
                edges {
                  node {
                    content
                    slug
                    title
                    date
                    acf {
                      description
                    }
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
            title: "Zeevo's Gatsby Starter RSS Feed",
          },
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-favicon',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: '' },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['roboto:400,400i,500,700'],
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          lost(),
          pxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propList: [
              'font',
              'font-size',
              'line-height',
              'letter-spacing',
              'margin',
              'margin-top',
              'margin-left',
              'margin-bottom',
              'margin-right',
              'padding',
              'padding-top',
              'padding-left',
              'padding-bottom',
              'padding-right',
              'border-radius',
              'width',
              'max-width',
            ],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
          }),
        ],
        precision: 8,
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // baseUrl: 'http://ec2-3-15-175-195.us-east-2.compute.amazonaws.com/blog/index.php/',
        baseUrl: 'https://admin.zeevo.me/',
        protocol: 'https',
        hostingWPCOM: false,
        useACF: true,
        verboseOutput: false,
      },
    },
  ],
};
