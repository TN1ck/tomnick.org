import * as React from 'react';
import {default as PostComponent} from '../containers/Post';
import { Post } from '../types';
import Markdown from '../util/Markdown';
import ScatterD3 from './DataViz/Scatter-d3';
import ScatterReact from './DataViz/Scatter-React';

// @ts-ignore
import scatterd3code from '!raw-loader!./DataViz/Scatter-d3.tsx';

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

* New / changing datapoints need to be handlen gracefully. A new point should fade in, a deleted one should fade out.

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
The code for this chart can be seen below. We use a React component called \`ScatterD3\` to create the dom element and manage the data updates of the d3 code. We do this by creating a \`svg\`, which ref we're saving and using this ref to initialize the d3 code by calling \`scatterD3\` with it. \`scatterD3\` returns a function that takes the movie data as an argument und does its thing. We're saving this function in our component and call it everytime we update our data.
\`\`\`tsx
${scatterd3code}
\`\`\`

So far so good. The result works as expected, we have some points which gracefully animate between each state update. Try to click really fast and see what happens - the state is always animated from the current state of the last animation, exactly as it shoud be!
The shortcomings of this solution are the general shortcomings when using d3:

* It's not possible to server side render this easily, d3s rendering heavily relies on the dom
* Transitions are JS-based and a switch to CSS animations would either be hacky or not as beatiful. CSS animations are needed when the amount of elements grows really large. The normal way here is to use canvas rendering.
* It's a pain to create more and more dom nodes, even the simple text hover increased the complexity a lot. It also gets really confusing quickly.

# React

We now build this chart with React and use TransitionGroup and CSSTransition for the animations. Let's see how this works.

`
}
</Markdown>
<ScatterReact />
      </PostComponent>
    );
  }
}

export default DataVizWithReact;
