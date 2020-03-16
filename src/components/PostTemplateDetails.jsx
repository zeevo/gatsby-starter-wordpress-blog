import React from 'react';
import { Link } from 'gatsby';
import Header from './Header';
import Categories from './Categories';
import background from '../assets/background.jpg';
import Footer from './Footer';

const PostTemplateDetails = props => {
  const { data } = props;
  const { menu, author } = data.site.siteMetadata;
  const { name } = author;
  const { title, date, content, featured_media: featuredMedia } = data.wordpressPost;

  const categories = data.allWordpressPost.distinct.filter(
    category => category.toLowerCase() !== 'uncategorized'
  );

  return (
    <React.Fragment>
      <Header
        date={date}
        background={featuredMedia ? featuredMedia.source_url : background}
        title={title}
        subtitle={name}
        menu={menu}
      >
        <Categories categories={categories} />
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
        <Footer />
      </main>
    </React.Fragment>
  );
};

export default PostTemplateDetails;
