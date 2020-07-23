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
  return posts.map(post => <PostPreview key={post.slug} post={post} />);
};

export default Feed;
