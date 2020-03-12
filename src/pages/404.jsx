import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Categories from '../components/Categories';

const NotFoundRoute = props => {
  const { data } = props;

  const { menu } = data.site.siteMetadata;

  const categories = data.allWordpressPost.distinct.filter(
    name => name.toLowerCase() !== 'uncategorized'
  );

  return (
    <Layout>
      <Header menu={menu} title={'Page not found...'}>
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
        copyright
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
    allWordpressPost {
      distinct(field: categories___name)
    }
  }
`;
