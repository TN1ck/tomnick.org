---
layout: post
title:  "Building a simple website for a friend in 2018"
date:   2018-05-20 19:21:33 +0100
categories: blog
author: Tom Nick
excerpt: >
  How to build a simple website/blog etc. without having to maintain a server and still have a simple CMS like interface to change the content.
---

Ever had a friend or family member ask you if you can build them a simple website? First you thought: "Yeah, sure I can" - but then you realise, oh no - I need a CMS so they can change the content or they always call me to change something. And I also need to deploy it somewhere... and then you slowly change the topic.

As a coder you could build your own website with a static site creater like Jekyll, React Native, Hugo or Gatbsy. Content is held in markdown or yaml files and you update it with a simple `git push`. Serving is then done by Github, Gitlab or Netlify. Static site hosting is free nowadays. Netlify even offers you free custom domains and automatic SSL certificates for this.

But for your non technical friends you need to have an interface. Some kind of CMS to back this site.
Recently this became a bigger topic for me, as I actually said _yes_ to one of these requests. My first plan was to actually write super simple HTML and let them change the content like this, this would have been ok, as the page was a simple business card like website.
But a recent open source project felt like a godsend and I'm sure it will gain a lot more momentum in the future. I'm talking about [Netlify CMS](https://github.com/netlify/netlify-cms).

The project combines multiple things that make it usable for the real world.
It actually has a __nice and fast interface__, it has __secure authentication__ via Netlify identity or Github (other backends are in development), __supports image uploads__ and you can __live preview the changes__.
These things make netlify CMS actually better than most CMS backends, things like live preview are nowhere to be seen in classic CMS systems, but easily achievable with a react based static site generator + netlify cms.


## Building a simple website

Enough talk, let's start. For this I assume you have

1. A Github account, if not [create one](https://github.com/join?source=header-home).
2. A Netlify account, if not [sign up](https://app.netlify.com/signup).


At the end I will offer a link to the complete code, go ahead if you don't like reading.

### Setting up react-static
