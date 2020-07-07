import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Categories from '../components/Categories';

const NotFoundRoute = props => {
  const { site, wp } = props.data;
  const { menu } = site.siteMetadata;
  const categories = wp.categories.edges
    .map(edge => edge.node.name)
    .filter(name => name !== 'Uncategorized');

  return (
    <Layout>
      <Header menu={menu} title="Page not found...">
        <Categories categories={categories} />
      </Header>
      <article className="post">
        <section className="longform drop container container--narrow">
          <div style={{ textAlign: 'center' }}>Oops!</div>
        </section>
      </article>
    </Layout>
  );
};

export default NotFoundRoute;

export const pageQuery = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        title
        subtitle
        adminUrl
        rss
        menu {
          label
          path
        }
        author {
          name
          twitter
        }
      }
    }
    wp {
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
