import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';

import Layout from '../components/Layout';
import PageTemplateDetails from '../components/PageTemplateDetails';

const PageTemplate = props => {
  const { wp } = props.data;
  const { title } = wp.generalSettings;
  const { title: postTitle, description = '', tags } = wp.page;

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
  query($id: ID!) {
    site {
      siteMetadata {
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
        description
      }
      page(id: $id) {
        id
        slug
        title
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
