import React from 'react';
import Header from './Header';
import Categories from './Categories';
import background from '../assets/background.jpg';
import Footer from './Footer';

const PageTemplateDetails = props => {
  const { site, allWpPage, wpPage, allWpCategory } = props.data;
  const { menu, author, adminUrl, rss } = site.siteMetadata;
  const { title, content, featuredMedia } = wpPage;

  const categoryNames = allWpCategory.nodes
    .map(node => node.name)
    .filter(name => name !== 'Uncategorized');

  const fullMenu = allWpPage.edges.map(edge => edge.node).concat(menu);

  return (
    <>
      <Header
        menu={fullMenu}
        background={featuredMedia ? featuredMedia.source_url : background}
        title={title}
      >
        <Categories categories={categoryNames} />
      </Header>
      <article className="post">
        <section className="longform drop container container--narrow">
          <div
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      </article>
      <Footer author={author} rss={rss} adminUrl={adminUrl} />
    </>
  );
};

export default PageTemplateDetails;
