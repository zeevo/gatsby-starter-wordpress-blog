import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import parse from 'html-react-parser';

import Layout from '../components/Layout';
import TagTemplateDetails from '../components/TagTemplateDetails';

const TagTemplate = props => {
  const { data, pageContext } = props;
  const { title } = data.wp.generalSettings;
  const { tag } = pageContext;

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${tag} - ${parse(title)}`}</title>
          <meta name="description" content={`${title} - ${tag}`} />
        </Helmet>
        <TagTemplateDetails {...props} />
      </div>
    </Layout>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query($tag: String!) {
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
    wp {
      generalSettings {
        title
        description
      }
    }
    allWpPost(filter: { tags: { nodes: { elemMatch: { name: { eq: $tag } } } } }) {
      edges {
        node {
          title
          date
          excerpt
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
    allWpCategory {
      nodes {
        name
      }
    }
  }
`;
