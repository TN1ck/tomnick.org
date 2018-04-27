---
layout: post
title:  "Recreating the new dropbox header animation"
date:   2017-11-20 19:21:33 +0100
categories: blog
author: Tom Nick
excerpt: Dropbox just revamped their branding - and also their website. The new header uses a cool clipping effect, which we'll recreate.
---

If you haven't checked out the new dropbox landing page, do it and pay special attention to the header as it moves over the different colored sections. You can see the effect in the gif below.

<div class="post-image-container">
    <div class="post-image-image">
        <img src="/assets/dropbox-header/dropbox-animation.gif" alt="The header effect dropbox uses to highlight their new brand colors.">
    </div>
    <div class="post-image-text">
        The header effect dropbox uses to highlight their new brand colors.
    </div>
</div>

So how is it done? It can't be blend-modes, as those only work in Chrome and Safari works as well.

When inspecting the dom, one quickly notices, that the header is inside every section - always with the correct colors for this section. It has `position: fixed`, so why isn't it permantly visible and only retains to the parent section? CSS masks, which fortunately [most browsers support](https://caniuse.com/#search=css%20masks).

<div class="post-image-container">
    <div class="post-image-image">
        <img src="/assets/dropbox-header/dropbox-dom.png" alt="The clip property accompanied with the absolute positioning will clip containing fixed positioned elements.">
    </div>
    <div class="post-image-text">
        The clip property accompanied with the absolute positioning will clip containing fixed positioned elements.
    </div>
</div>

So to make it work one needs:

1. A relatively positioned section which will hold the content

```css
.section {
    position: relative;
}
```
2. inside it an absoletely positioned container that spans the whole section and clips its content. When set to `auto`, it will automatically use 100%.

```css
.section__absolute-container {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    clip: rect(auto, auto, auto, auto);
}
```
3. Inside the absolute positioned container, the fixed positioned element with a `transform` to make Safari happy.

```css
.section__fixed-element {
    position: fixed;
    top: 0;
    left: 0;
    // whitout a transform, safari will have weird rendering bugs
    // transform: translate3D(0, 0, 0) and similiar also work
    transform: translateZ(0);
    will-change: transform;
}
```

This would be valid html with these classes:

```html
<div class="section">
    <div class="section__absolute-container">
        <div class="section__fixed-element">
        </div>
    </div>
</div>
```

[Here is a good jsFiddle that shows this technique.](http://jsfiddle.net/lmeurs/jf3t0fmf/)

### Update

[/u/usmonov](https://www.reddit.com/r/web_design/comments/7ed42q/recreating_the_new_dropbox_header_animation/dq4do10/) mentioned on reddit, that the jQuery plugin [Midnight.js](http://aerolab.github.io/midnight.js/) achieves the same effect in all browsers. It uses a combination of `overflow: hidden` and javascript applied transforms to achieve this. The transforms are applied using a `requestAnimationFrame`, so no active scroll-listener - which is really good! Using CSS masks is still better imho, as it doesn't need javascript running every 1/60s to work.
