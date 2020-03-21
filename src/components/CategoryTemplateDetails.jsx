import React from 'react';
import Header from './Header';
import Categories from './Categories';
import Feed from './Feed';
import Footer from './Footer';

const CategoryTemplateDetails = props => {
  const { data, pageContext } = props;
  const { category } = pageContext;
  const { menu, author, adminUrl, rss } = data.site.siteMetadata;

  const categories = data.allWordpressPost.edges
    .map(edge => edge.node.categories)
    .reduce((accumulator, cats) => accumulator.concat(cats), [])
    .map(cate => cate.name)
    .reduce((uniques, item) => (uniques.includes(item) ? uniques : [...uniques, item]), [])
    .filter(title => title.toLowerCase() !== 'uncategorized');

  const filteredPosts = data.allWordpressPost.edges.filter(edge => {
    const names = edge.node.categories.map(cat => cat.name);
    return names.includes(category);
  });

  return (
    <React.Fragment>
      <Header menu={menu} title={category}>
        <Categories categories={categories} />
      </Header>
      <main className="container container--narrow">
        <Feed posts={filteredPosts} />
      </main>
      <Footer author={author} rss={rss} adminUrl={adminUrl} />
    </React.Fragment>
  );
};

export default CategoryTemplateDetails;
