import React from 'react';

import Avatar from './Avatar';

const Footer = props => {
  const { author, adminUrl, rss } = props;
  const { twitter, avatar, motto, name } = author;

  return (
    <footer className="container container--narrow js-blog-posts" style={{ marginBottom: '10px' }}>
      <Avatar avatar={avatar} motto={motto} name={name} twitter={twitter} />
      <a className="header__tab__link faded faded--60" href={twitter} style={{ paddingBottom: 0 }}>
        Discuss on Twitter
      </a>
      <a
        className="header__tab__link faded faded--60"
        href={rss}
        style={{ paddingBottom: 0, float: 'right' }}
      >
        Subscribe to RSS
      </a>
      <div>
        <a className="header__tab__link faded faded--60" href={adminUrl} style={{ padding: 0 }}>
          Admin
        </a>
      </div>
    </footer>
  );
};

export default Footer;
