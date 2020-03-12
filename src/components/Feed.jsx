import React from 'react';
import PostPreview from './PostPreview';

const Feed = props => {
  const { posts } = props;
  const len = posts.length;
  if (len) {
    return props.posts.map((edge, i) => <PostPreview key={i} post={edge} />);
  }
  const message = "There's nothing here yet...";
  return (
    <p className="post-preview" style={{ textAlign: 'center' }}>
      {message}
    </p>
  );
};

export default Feed;
