---
layout: post
title:  "The best way to build animated charts with React"
date:   2017-11-20 19:21:33 +0100
categories: blog
author: Tom Nick
excerpt: The enter/update/exit lifecycle created by d3.js revolutonized interactive visualisations on the web, but now we almost want to exclusively use React for building frontends. Reacts lifetime cycles are not suited for creating interactive visualisations that are animation heavy. By using React and mobx we build a custom and super fast lifetime mechanism that directly solves this problem.
---

Everyone who build (or tried to build) a chart with React knows its biggest pain point: How to gracefully handle new elements and elements that will be removed. By using `TransitionGroup` or `CSSTransitionGroup` one can try to emulate something that might come close, but it's not possible with them to completely simulate the enter/update/exit cycle of d3.

# Building a scatter plot for comparing imbd and rotten tomatoe ratings

We'll build a scatter plot as shown below, first in d3, then in React, then in React + mobx.
The scatter plot compares the ratings of imdb and rotten tomatoes by using the imdb ratings on the x axis, and the rotten tomatoes on the y axis. The underlying data looks like

```ts
const someMovie = {
  ratingRotten: 8.5,
  ratingImdb: 9,
  title: "Some movie";
  picture: "https://cdn.domain.com/somepicture.jpg";
}

```

The requirements are:

* New / changing datapoints need to be handlen gracefully. A new point should fade in, a deleted one should fade out - while also still changing its position according to the new axis scales.

* No jumps! A point should never jump - it doesn't matter the user abuses the controls and doesn't let the animation finish.

* Performance. The visualisations should be 60fps and should also run on low end devices.

# Build a simple chart with d3

Let's start and build a scatter plot with d3, we will skip handling axis for now, because they just introduce unecessary complexity here.

# Translating the view layer to React

# Try to build it with TranistionGroup

# Remove Transition Group and build something with mobx

# Explain why this yields such a good performance
