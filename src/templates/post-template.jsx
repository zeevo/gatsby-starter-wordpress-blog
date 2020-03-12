import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import PostTemplateDetails from '../components/PostTemplateDetails';

const PostTemplate = props => {
  const { data } = props;
  const { title: siteTitle } = data.site.siteMetadata;
  const { title: postTitle, description = '', tags } = data.wordpressPost;

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${postTitle} - ${siteTitle}`}</title>
          <meta name="description" content={description} />
          <meta name="tags" {...(tags ? { content: tags.join(',') } : {})} />
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
        title
        subtitle
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
    wordpressPost(id: { eq: $id }) {
      id
      title
      date
      excerpt
      content
      type
      slug
      acf {
        description
      }
      author {
        name
      }
      categories {
        name
      }
      featured_media {
        source_url
        title
      }
      tags {
        name
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
