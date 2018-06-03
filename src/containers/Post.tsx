import React from "react";
import { withRouteData, Link } from "react-static";

import {dateFormatter} from '../utils';
import { Post } from "../types";

interface Props {
  post: Post;
}

export default withRouteData(({ post }: Props) => (
  <div>

    <article className="post">

      <a href="" className="post-url">
        <header className="post-header">
          <h1 className="post-title">{post.attributes.title}</h1>
          <time itemProp="datePublished" className="post-date">
            {dateFormatter(post.attributes.date)}
          </time>
        </header>
      </a>

      <div className="post-excerpt">
        <span className="post-excerpt-inner"
          dangerouslySetInnerHTML={{
            __html: post.attributes.excerpt,
          }}
        />
      </div>

      <div className="post-content"
        dangerouslySetInnerHTML={{
          __html: post.body,
        }}
      />

      <div className="post-author-container">
        <span className="post-author" itemProp="author">
            {post.attributes.author}
        </span>
      </div>

    </article>
  </div>
));
