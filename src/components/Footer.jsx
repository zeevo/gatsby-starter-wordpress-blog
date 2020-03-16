import React from 'react';

const Footer = props => {
  const { twitter, rss } = props;
  return (
    <footer style={{ marginBottom: '10px' }}>
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
