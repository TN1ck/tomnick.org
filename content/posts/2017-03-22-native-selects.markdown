---
layout: post
title:  "Native vs custom selects"
date:   2017-03-22 19:21:33 +0100
categories: blog
author: Tom Nick
excerpt: With CSS you can style every input element, except one - the select. It's impossible to change the look of the options without rebuilding the whole select. Is it worth it to rebuild it? If so, when should you do it?
---

As part of corporate branding, a lot of times the restyling of the select options is desired.

In terms of implementation and features, selects are probably one of the most complex UI-elements in the browser. We often overlook which features it offers, because often we don't even think about when we use it. But let's quickly list things you might forget:
1. Especially smartphones implement often their own select. For example take the select in iOS Safari, it is highly optimized for touch input and offers a completely different way of input.
1. It will always render appropriately, which means, you'll always be able to click all the options: If it is on top of the screen, it will render below the cursor, if it is on the bottom, it will render above.
1. When you type inside the input-field, the selection will change according to the characters you entered.
1. You can use the keyboard to control it.

So why even bother to re-implement it? Users like to use stuff they know how to use. Every user will know how to use a select.
The only reason is that you can decide the UX and the look.

## Examples
I looked at multiple popular websites and asked some other frontend developers about their opinions. Below are some selects of some of the biggest websites in the world.

When you look at the biggest websites in the world, you'll notice selects all over around:

<div class="post-image-container">
    <div class="post-image-image">
      <img src="/assets/selects/facebook-native-select.png" alt="Facebook has the manpower to do basically anything, but they decided it's a good idea to use native elements in their settings.">
    </div>
    <div class="post-image-text">
        Facebook has the manpower to do basically anything, but they decided it's a good idea to use native elements in their settings.
    </div>
</div>

<div class="post-image-container">
    <div class="post-image-image">
      <img src="/assets/selects/google-native-select.png" alt="Same as Facebook, the Gmail settings exclusively use native selects.">
    </div>
    <div class="post-image-text">
        Same as Facebook, the Gmail settings exclusively use native selects.
    </div>
</div>

<div class="post-image-container">
    <div class="post-image-image">
      <img src="/assets/selects/airbnb-native-selects.png" alt="Even airbnb, known for their drive to create the perfect user-input element (their datetimepicker is probably the most advanced ever conceived), use selects were appropriate.">
    </div>
    <div class="post-image-text">
        Even airbnb, known for their drive to create the perfect user-input element (their datetimepicker is probably the most advanced ever conceived), use selects were appropriate.
    </div>
</div>


The pictures should make it clear, that even the big players, who can afford to rebuild a select in every programming language ever created, that it's not worth it for things that are just a simple select.

But... there are some custom selects...

<div class="post-image-container">
    <div class="post-image-image">
      <img src="/assets/selects/airbnb-custom-select.png" alt="Airbnb select for how many guests will arrive is a perfect example. You could have solved this differently, but never as smooth as this custom select.">
    </div>
    <div class="post-image-text">
        Airbnb select for how many guests will arrive is a perfect example. You could have solved this differently, but never as smooth as this custom select.
    </div>
</div>

<div class="post-image-container">
    <div class="post-image-image">
      <img src="/assets/selects/airbnb-custom-select.png" alt="This is a select as well, but the benefit of this custom select is clear: By using the icons, the user can grasp much faster what he actually wants to select.">
    </div>
    <div class="post-image-text">
        This is a select as well, but the benefit of this custom select is clear: By using the icons, the user can grasp much faster what he actually wants to select.
    </div>
</div>

<div class="post-image-container">
    <div class="post-image-image">
      <img src="/assets/selects/google-custom-select2.png" alt="This menu of Gmail could have been done as a select, but there are mostly only 3 options. In these cases a simple menu often improves the UX. IMHO a select here would have been slightly worse.">
    </div>
    <div class="post-image-text">
        This menu of Gmail could have been done as a select, but there are mostly only 3 options. In these cases a simple menu often improves the UX. IMHO a select here would have been slightly worse.
    </div>
</div>

## Conclusion
After looking myself at how other websites do it and a discussion with other developers, this is the conclusion:

1. When you can use a simple select, do it. Accessibility is good, users know how to use it, it works on every platform.
1. When it's actually not an option but more of an action (language select vs. edit/delete) use a dropdown.
1. When the functionality is super specific (re-fetching data when you type) or the UX hugely benefits from it, use a custom select.

Despite this, here are some nice projects which re-implement select:

* [react-select](https://github.com/JedWatson/react-select)
* [jquery.selectBox.js](https://github.com/gfranko/jquery.selectBoxIt.js)
* [select2](https://select2.github.io/)


