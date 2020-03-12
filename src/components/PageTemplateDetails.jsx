import React from 'react';
import Header from './Header';
import Categories from './Categories';
import background from '../assets/background.jpg';

const PageTemplateDetails = props => {
  const { data } = props;
  const { menu } = data.site.siteMetadata;
  const { title, content, featured_media: featuredMedia } = data.wordpressPage;

  const categories = data.allWordpressPost.distinct.filter(
    name => name.toLowerCase() !== 'uncategorized'
  );

  return (
    <React.Fragment>
      <Header
        menu={menu}
        background={featuredMedia ? featuredMedia.source_url : background}
        title={title}
      >
        <Categories categories={categories} />
      </Header>
      <article className="post">
        <section className="longform drop container container--narrow">
          <div
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      </article>
    </React.Fragment>
  );
};

export default PageTemplateDetails;
