import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Categories from '../components/Categories';

const NotFoundRoute = props => {
  const { site, allWpPage, allWpCategory } = props.data;
  const { menu } = site.siteMetadata;

  const categories = allWpCategory.nodes
    .map(node => node.name)
    .filter(name => name !== 'Uncategorized');

  const fullMenu = allWpPage.edges.map(edge => edge.node).concat(menu);

  return (
    <Layout>
      <Header menu={fullMenu} title="Page not found...">
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
          title
          uri
          external
        }
        author {
          name
          twitter
        }
      }
    }
    allWpCategory {
      nodes {
        name
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
  }
`;
