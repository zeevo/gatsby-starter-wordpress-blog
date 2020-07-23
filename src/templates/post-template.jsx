import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import parse from 'html-react-parser';

import Layout from '../components/Layout';
import PostTemplateDetails from '../components/PostTemplateDetails';

const PostTemplate = props => {
  const { wp, wpPost } = props.data;
  const { title: siteTitle } = wp.generalSettings;
  const { title: postTitle, tags, description = '' } = wpPost;

  const tagNames = tags.nodes.map(node => node.name);

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${postTitle} - ${parse(siteTitle)}`}</title>
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
  query($id: String!) {
    site {
      siteMetadata {
        adminUrl
        rss
        menu {
          title
          uri
          external
        }
        author {
          name
          twitter
          avatar
        }
      }
    }
    allWpPage {
      edges {
        node {
          uri
          title
        }
      }
    }
    wpPost(id: { eq: $id }) {
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
        nodes {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          title
        }
      }
      tags {
        nodes {
          name
        }
      }
    }
    allWpCategory {
      nodes {
        name
      }
    }
    wp {
      generalSettings {
        title
      }
    }
  }
`;
