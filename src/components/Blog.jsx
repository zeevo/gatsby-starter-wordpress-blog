import React from 'react';
import parse from 'html-react-parser';

import Header from './Header';
import Categories from './Categories';
import Feed from './Feed';
import Footer from './Footer';

const Blog = props => {
  const { allWpPost, allWpPage, allWpCategory, wp, site } = props.data;

  const { menu, author, adminUrl, rss } = site.siteMetadata;
  const { generalSettings } = wp;
  const { title, description } = generalSettings;

  const postNodes = allWpPost.edges.map(edge => edge.node);

  const categories = allWpCategory.nodes
    .map(node => node.name)
    .filter(name => name !== 'Uncategorized');

  const fullMenu = allWpPage.edges.map(edge => edge.node).concat(menu);

  return (
    <>
      <Header title={parse(title)} menu={fullMenu} subtitle={parse(description)}>
        <Categories categories={categories} />
      </Header>
      <main className="container container--narrow js-blog-posts">
        <Feed posts={postNodes} />
      </main>
      <Footer author={author} adminUrl={adminUrl} rss={rss} />
    </>
  );
};

export default Blog;
