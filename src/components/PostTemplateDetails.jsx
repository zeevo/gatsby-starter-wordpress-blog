import React from 'react';
import { Link } from 'gatsby';
import Header from './Header';
import Categories from './Categories';
import background from '../assets/background.jpg';
import Footer from './Footer';

const PostTemplateDetails = props => {
  const { wp, site } = props.data;
  const { menu, author, adminUrl, rss } = site.siteMetadata;
  const { name } = author;
  const { post, categories } = wp;
  const { title, date, content, featuredMedia } = post;

  const categoryNames = categories.edges
    .map(edge => edge.node.name)
    .filter(category => category !== 'Uncategorized');

  return (
    <>
      <Header
        date={date}
        background={featuredMedia ? featuredMedia.sourceUrl : background}
        title={title}
        subtitle={name}
        menu={menu}
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
