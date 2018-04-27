import React from "react";
import { withRouteData, Link } from "react-static";
import { Post } from "../types";
import {dateFormatter} from '../utils';

interface Props {
  posts: Post[];
}

export default withRouteData(({ posts }: Props) => (
  <div>
    <h1>Blog Posts</h1>
    <ul className="post-list">
      {posts.map(post => (
        <li key={post.id}>
          <Link to={`/blog/post/${post.id}/`}>
            {post.attributes.title}
            {" - "}
            <time
              itemProp="datePublished"
              className="post-list-date"
            >{dateFormatter(post.attributes.date)}</time>
          </Link>
        </li>
      ))}
    </ul>
  </div>
));
