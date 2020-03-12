import React from 'react';
import Header from './Header';
import Categories from './Categories';
import Feed from './Feed';

const CategoryTemplateDetails = props => {
  const { data, pageContext } = props;
  const { category } = pageContext;
  const { menu } = data.site.siteMetadata;

  const allCategories = data.allWordpressPost.edges
    .map(edge => edge.node.categories)
    .reduce((accumulator, cats) => accumulator.concat(cats), [])
    .map(cate => cate.name)
    .filter(name => name.toLowerCase() !== 'uncategorized');

  const filteredPosts = data.allWordpressPost.edges.filter(edge => {
    const names = edge.node.categories.map(cat => cat.name);
    return names.includes(category);
  });

  return (
    <React.Fragment>
      <Header menu={menu} title={category}>
        <Categories categories={allCategories} />
      </Header>
      <main className="container container--narrow">
        <Feed posts={filteredPosts} />
      </main>
    </React.Fragment>
  );
};

export default CategoryTemplateDetails;
