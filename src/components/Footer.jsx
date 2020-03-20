import React from 'react';

import Avatar from './Avatar';

const Footer = props => {
  console.log(props);
  const { author } = props;
  const { twitter, rss, avatar, motto, name } = author;
  return (
    <footer className="container container--narrow js-blog-posts" style={{ marginBottom: '10px' }}>
      <Avatar avatar={avatar} motto={motto} name={name} twitter={twitter} />
      <a className="header__tab__link faded faded--60" href={twitter}>
        Discuss on Twitter
      </a>
      <a className="header__tab__link faded faded--60" href={rss} style={{ float: 'right' }}>
        Subscribe to RSS
      </a>
    </footer>
  );
};

export default Footer;
