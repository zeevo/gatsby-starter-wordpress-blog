import React from 'react';
import moment from 'moment';

const PostPreview = ({ post }) => {
  const { title, date, excerpt, slug } = post.node;

  const uri = `/${moment(new Date(date)).format('YYYY/MM/DD')}/${slug}`;

  return (
    <article className="post-preview">
      <header className="post-preview__header">
        <h2>
          <a href={uri}>{title}</a>
        </h2>
        <small className="post__meta">
          <time dateTime={moment(date).format('MMMM D, YYYY')} className="faded">
            {moment(date).format('MMMM D, YYYY')}
          </time>
        </small>
      </header>
      <section
        className="longform longform--short"
        dangerouslySetInnerHTML={{ __html: excerpt.replace(/\s\[&hellip;]/, '...') }}
      />
      <a href={uri} className="button faded">
        Read more
      </a>
    </article>
  );
};

export default PostPreview;
