import * as React from 'react';
import {default as PostComponent} from '../containers/Post';
import { Post } from '../types';
import Markdown from '../util/Markdown';
import ScatterD3 from './DataViz/Scatter-d3';

const post: Post = {
  body: '',
  id: 'data-viz-with-react',
  attributes: {
    title: 'The best way to build animated charts with React',
    date: '2018-07-22',
    author: 'Tom Nick',
    categories: [],
    excerpt: `
      The enter/update/exit lifecycle created by d3.js
 revolutonized interactive visualisations on the web,
 but now we almost want to exclusively use React for building frontends.
 Reacts lifetime cycles are not suited for creating interactive visualisations that are animation heavy.
 By using React and mobx we build a custom and super fast lifetime mechanism that directly solves this problem.`,
  },
}

class DataVizWithReact extends React.Component {

  render() {
    return (
      <PostComponent
        post={post}
      >
        <Markdown>
          {`
Everyone who build (or tried to build) a chart with React knows its biggest pain point: How to gracefully handle new elements and elements that will be removed. By using [TransitionGroup](https://reactcommunity.org/react-transition-group/transition-group) and [CSSTransition](https://reactcommunity.org/react-transition-group/css-transition) one can try to emulate something that might come close, but it's not possible with them to completely simulate the enter/update/exit cycle of d3.
          `}
        </Markdown>
        <Markdown>
        {`
# Building a scatter plot for comparing imbd and rotten tomatoe ratings

We'll build a scatter plot as shown below, first in d3, then in React, then in React + mobx.
The scatter plot compares the ratings of imdb and rotten tomatoes by using the imdb ratings on the x axis, and the rotten tomatoes on the y axis. The underlying data looks like

\`\`\`js
const someMovie = {
  rotten: 8.5,
  imdb: 9,
  title: "Some movie";
  genres: ["Action", "Sci-Fi", "Drama"],
  picture: "https://cdn.domain.com/somepicture.jpg";
}
\`\`\`

You can download the data [here](https://tomnick.org/TODO). I actually created the dataset, because I wasn't satisfied with the ones I found online.
        `}
        </Markdown>
        <Markdown>
          {`
# Requirements

The resulting chart should look like this and also have these requirements:

* New / changing datapoints need to be handlen gracefully. A new point should fade in, a deleted one should fade out - while also still changing its position according to the new axis scales.

* No jumps! A point should never jump - it doesn't matter the user abuses the controls and doesn't let the animation finish.

* Good performance - the visualisations should run at 60fps, even on low end devices
          `}
        </Markdown>
        <Markdown>
          {`
# D3

Let's start with the d3 version, it will be easy to do and create a high bar of what we want to do with React.
          `}
        </Markdown>
        <ScatterD3 />
<Markdown>
{
`
\`\`\`
TODO: Insert Code
\`\`\`
`
}
</Markdown>
      </PostComponent>
    );
  }
}

export default DataVizWithReact;
