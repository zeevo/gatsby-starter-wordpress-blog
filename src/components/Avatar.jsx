import React from 'react';

const Avatar = props => {
  const { avatar, motto, name, twitter } = props;
  return (
    <div style={{ display: 'flex' }}>
      <a href={twitter}>
        <img src={avatar} alt="avatar" style={{ marginRight: '10px', width: '50px' }} />
      </a>
      <p className="header__tab__link faded faded--60" style={{ maxWidth: '3600px' }}>
        <a href={twitter}>Personal Blog by {name}</a>. {motto}
      </p>
    </div>
  );
};

export default Avatar;
