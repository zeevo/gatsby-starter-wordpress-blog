import React from 'react';
import Header from './Header';
import Categories from './Categories';
import Feed from './Feed';
import Footer from './Footer';

const TagTemplateDetails = props => {
  const { data, pageContext } = props;
  const { site, allWpPage, allWpPost, allWpCategory } = data;
  const { tag } = pageContext;
  const { menu, author, adminUrl, rss } = site.siteMetadata;

  const categories = allWpCategory.nodes
    .map(node => node.name)
    .filter(name => name !== 'Uncategorized');

  const posts = allWpPost.edges.map(edge => edge.node);

  const fullMenu = allWpPage.edges.map(edge => edge.node).concat(menu);

  return (
    <>
      <Header menu={fullMenu} title={`Tag - ${tag}`}>
        <Categories categories={categories} />
      </Header>
      <main className="container container--narrow">
        <Feed posts={posts} />
      </main>
      <Footer author={author} rss={rss} adminUrl={adminUrl} />
    </>
  );
};

export default TagTemplateDetails;
