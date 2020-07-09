import React from 'react';
import { Link } from 'gatsby';
import Header from './Header';
import Categories from './Categories';
import background from '../assets/background.jpg';
import Footer from './Footer';

const PostTemplateDetails = props => {
  const { site, wpPost, allWpCategory, allWpPage } = props.data;
  const { menu, author, adminUrl, rss } = site.siteMetadata;
  const { name } = author;
  const { title, date, content, featuredImage } = wpPost;

  const categoryNames = allWpCategory.nodes
    .map(node => node.name)
    .filter(category => category !== 'Uncategorized');

  const fullMenu = allWpPage.edges.map(edge => edge.node).concat(menu);

  return (
    <>
      <Header
        date={date}
        background={featuredImage ? featuredImage.node.sourceUrl : background}
        title={title}
        subtitle={name}
        menu={fullMenu}
      >
        <Categories categories={categoryNames} />
      </Header>
      <main className="container container--narrow js-blog-posts">
        <article className="post">
          <section
            className="longform drop"
            dangerouslySetInnerHTML={{ __html: `${content}<hr />` }}
          />
          <div className="container container--narrow">
            <Link className="button" to="/">
              Read more posts
            </Link>
          </div>
        </article>
      </main>
      <Footer author={author} rss={rss} adminUrl={adminUrl} />
    </>
  );
};

export default PostTemplateDetails;
