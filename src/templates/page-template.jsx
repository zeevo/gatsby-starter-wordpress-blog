import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';

import Layout from '../components/Layout';
import PageTemplateDetails from '../components/PageTemplateDetails';

const PageTemplate = props => {
  const { data } = props;
  const { name } = data.wordpressSiteMetadata;
  const { title: postTitle, description = '', tags } = data.wordpressPage;

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${postTitle} - ${parse(name)}`}</title>
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
        copyright
        profilePic
        menu {
          label
          path
          external
        }
        author {
          name
          twitter
        }
      }
    }
    wordpressSiteMetadata {
      name
      description
    }
    wordpressPage(id: { eq: $id }) {
      id
      title
      date
      excerpt
      content
      type
      slug
      author {
        name
      }
      featured_media {
        source_url
        title
      }
    }
    allWordpressPage {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
    allWordpressPost {
      distinct(field: categories___name)
    }
  }
`;
