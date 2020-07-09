import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import parse from 'html-react-parser';

import Layout from '../components/Layout';
import PageTemplateDetails from '../components/PageTemplateDetails';

const PageTemplate = props => {
  const { wpPage, wp } = props.data;
  const { title } = wp.generalSettings;
  const { title: postTitle, description = '', tags } = wpPage;

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${postTitle} - ${parse(title)}`}</title>
          <meta name="description" content={parse(description)} />
          <meta name="tags" {...(tags ? { content: tags.join(',') } : {})} />
        </Helmet>
        <PageTemplateDetails {...props} />
      </div>
    </Layout>
  );
};

export default PageTemplate;

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
    wp {
      generalSettings {
        title
        description
      }
    }
    wpPage(id: { eq: $id }) {
      id
      slug
      title
      content
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
