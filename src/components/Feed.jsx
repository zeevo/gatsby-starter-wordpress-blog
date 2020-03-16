import React from 'react';
import PostPreview from './PostPreview';

const Feed = props => {
  const { posts } = props;
  if (!posts.length) {
    const message = "There's nothing here yet...";
    return (
      <p className="post-preview" style={{ textAlign: 'center' }}>
        {message}
      </p>
    );
  }
  console.log(props);
  return (
    <React.Fragment>
      {posts.map(edge => (
        <PostPreview key={edge.node.slug} post={edge} />
      ))}
    </React.Fragment>
  );
};

export default Feed;
