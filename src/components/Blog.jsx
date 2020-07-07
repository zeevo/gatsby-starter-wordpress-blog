import React from 'react';
import parse from 'html-react-parser';

import Header from './Header';
import Categories from './Categories';
import Feed from './Feed';
import Footer from './Footer';

const Blog = props => {
  const { wp, site } = props.data;

  const { menu, author, adminUrl, rss } = site.siteMetadata;
  const { title, description } = wp.generalSettings;

  const posts = wp.posts.edges.map(edge => edge.node);

  const categories = wp.categories.edges
    .map(edge => edge.node.name)
    .filter(name => name !== 'Uncategorized');

  return (
    <>
      <Header title={parse(title)} menu={menu} subtitle={parse(description)}>
        <Categories categories={categories} />
      </Header>
      <main className="container container--narrow js-blog-posts">
        <Feed posts={posts} />
      </main>
      <Footer author={author} adminUrl={adminUrl} rss={rss} />
    </>
  );
};

export default Blog;
