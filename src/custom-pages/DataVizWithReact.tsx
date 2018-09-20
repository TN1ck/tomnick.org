import * as React from 'react';
import {default as PostComponent} from '../containers/Post';
import { Post } from '../types';
import Markdown from '../util/Markdown';
import ScatterD3 from './DataViz/Scatter-d3';
import ScatterReact from './DataViz/Scatter-React';
import ScatterReactMobx from './DataViz/Scatter-React-Mobx';

// @ts-ignore
import scatterd3code from '!raw-loader!./DataViz/Scatter-d3.tsx';
// @ts-ignore
import scatterReactcode from '!raw-loader!./DataViz/Scatter-React.tsx';
// @ts-ignore
import scatterReactMobxCode from '!raw-loader!./DataViz/Scatter-React-Mobx.tsx';

const post: Post = {
  body: '',
  id: 'data-viz-with-react',
  attributes: {
    title: 'Comparing D3, React and React + Mobx for building charts',
    date: '2018-09-22',
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
**This post is not yet published and still wip! You can read it, but a lot of things are missing.**
          `}
        </Markdown>
        <Markdown>
          {`
Everyone who build (or tried to build) a chart with React knows its biggest pain point: How to gracefully handle new elements and elements that will be removed. By using [TransitionGroup](https://reactcommunity.org/react-transition-group/transition-group) and [CSSTransition](https://reactcommunity.org/react-transition-group/css-transition) one can try to emulate something that might come close, but it's not possible with them to completely simulate the enter/update/exit cycle of d3.
          `}
        </Markdown>
        <Markdown>
        {`
# Building a scatter plot for comparing imbd and rotten tomatoe ratings

We'll build a simple scatter plot, first in d3, then in React, then in React + mobx.
The scatter plot compares the ratings of imdb and rotten tomatoes by using the imdb ratings on the x axis, and the rotten tomatoes on the y axis. The underlying data looks like

\`\`\`javascript
const someMovie = {
  rotten: 8.5,
  imdb: 9,
  title: "Some movie",
  description: "Such a good movie.",
};
\`\`\`

**The current data is fake**, maybe I'll update the data to look more real, but it makes reading the code a bit simpler.
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
\`\`\`javascript
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
      <Markdown>
        {`
The code below now uses React for rendering the chart. We still use d3 to set up the scales, but nothing more. The code is exactly the same as in the version above. We now use \`setState\` to update the state and let React handle the rest. \`TransitionGroup\` and \`CSSTransition\` are used for animated new and deleted elements. As we are now using CSS for the animation, there are also some new CSS classes. Beware that this code currently does not work in Edge, as SVG CSS animations are not functional there.

\`\`\`javascript
${scatterReactcode}
\`\`\`

The code above looks a lot simpler. I can totally understand the created html and everything looks more friendly. From a user perspective, it's hard to see a difference. CSS animations work amazingly well here and it is as fluid as the React version.
When one often changes the state, it becomes clear, that only the updated elements are updated from their current position, new and deleted elements fade in and out, despite the animation never finishing. But who really cares?
Because I have some experience with this approach, some things are not that obvious here:

* Performance wise, it's quite expensive to use this approach, as when the number of elements grows, React needs to execute the lifecycle for each element.
* It's not as powerful as the d3 version. For example, it's not possibleu to let the deleted elements move with the new scales, with d3 it would be trivial
* We can only use CSS transitions here, which makes it impossible to animate things like \`<path />\`.
* Some browsers won't animate the style in SVGs
        `}
      </Markdown>
      <Markdown>
        {`
# React with Mobx

We now build it with Mobx and React. For this we need a lot of more work, as we won't rely on CSS transitions or
D3s \`transition\` function which does all the heavy lifting for us.
        `}
      </Markdown>
      <ScatterReactMobx />
      <Markdown>
        {`
Oh wow, that's a lot more code 276 lines vs 108 lines. Why's there so much more code?
That's due to the fact, that we do the complete interpolation ourselves, it's like rebuilding
d3s \`transition\`. We have to modes of operating: using javascript for the actual transition or
use CSS for the transition.

\`\`\`javascript
${scatterReactMobxCode}
\`\`\`
        `}
      </Markdown>
      </PostComponent>
    );
  }
}

export default DataVizWithReact;
