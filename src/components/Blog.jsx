import React from 'react';
import parse from 'html-react-parser';

import Header from './Header';
import Categories from './Categories';
import Feed from './Feed';

const Blog = props => {
  const { data } = props;

  const { menu } = data.site.siteMetadata;
  const { name, description } = data.wordpressSiteMetadata;

  const categories = data.allWordpressPost.edges
    .map(edge => edge.node.categories)
    .reduce((accumulator, cats) => accumulator.concat(cats), [])
    .map(cate => cate.name)
    .reduce((uniques, item) => (uniques.includes(item) ? uniques : [...uniques, item]), [])
    .filter(title => title.toLowerCase() !== 'uncategorized');

  return (
    <React.Fragment>
      <Header title={parse(name)} menu={menu} subtitle={parse(description)}>
        <Categories categories={categories} />
      </Header>
      <main className="container container--narrow js-blog-posts">
        <Feed posts={data.allWordpressPost.edges} />
      </main>
    </React.Fragment>
  );
};

export default Blog;
