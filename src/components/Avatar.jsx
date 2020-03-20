import React from 'react';

const Avatar = props => {
  const { avatar, motto, name, twitter } = props;
  return (
    <div style={{ display: 'flex' }}>
      <img src={avatar} alt="avatar" style={{ marginRight: '10px' }} />
      <p style={{ maxWidth: '310px' }}>
        Personal Blog by{' '}
        <a style={{ fontWeight: 'bold' }} href={twitter}>
          {name}
        </a>
        . {motto}
      </p>
    </div>
  );
};

export default Avatar;
