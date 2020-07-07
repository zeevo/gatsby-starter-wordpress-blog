import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import PostTemplateDetails from '../components/PostTemplateDetails';

const PostTemplate = props => {
  const { wp } = props.data;
  const { title: siteTitle } = wp.generalSettings;
  const { title: postTitle, tags, description = '' } = wp.post;

  const tagNames = tags.edges;

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${postTitle} - ${siteTitle}`}</title>
          <meta name="description" content={description} />
          <meta name="tags" {...(tags ? { content: tagNames.join(',') } : {})} />
        </Helmet>
        <PostTemplateDetails {...props} />
      </div>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query($id: ID!) {
    site {
      siteMetadata {
        title
        subtitle
        adminUrl
        rss
        menu {
          label
          path
          external
        }
        author {
          name
          twitter
          avatar
        }
      }
    }
    wp {
      generalSettings {
        title
      }
      pages {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
      post(id: $id) {
        id
        title
        date
        excerpt
        content
        slug
        author {
          node {
            name
          }
        }
        categories {
          edges {
            node {
              name
            }
          }
        }
        featuredImage {
          node {
            sourceUrl
            title
          }
        }
        tags {
          edges {
            node {
              name
            }
          }
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;
