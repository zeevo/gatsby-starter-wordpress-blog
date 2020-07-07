import React from 'react';
import Header from './Header';
import Categories from './Categories';
import Feed from './Feed';
import Footer from './Footer';

const CategoryTemplateDetails = props => {
  const { data, pageContext } = props;
  const { wp, site } = data;
  const { category } = pageContext;
  const { menu, author, adminUrl, rss } = site.siteMetadata;

  const categories = wp.categories.edges
    .map(edge => edge.node.name)
    .filter(name => name !== 'Uncategorized');
  const posts = wp.posts.edges.map(edge => edge.node);

  return (
    <>
      <Header menu={menu} title={category}>
        <Categories categories={categories} />
      </Header>
      <main className="container container--narrow">
        <Feed posts={posts} />
      </main>
      <Footer author={author} rss={rss} adminUrl={adminUrl} />
    </>
  );
};

export default CategoryTemplateDetails;
