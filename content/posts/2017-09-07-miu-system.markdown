---
layout: post
title:  "The MIU System"
date:   2017-09-07 19:21:33 +0100
categories: blog
author: Tom Nick
excerpt: The first exercise introduced in "Gödel Escher Bach" is the MIU System, this post describes the system and how to solve it.
---

I'm currently reading "Gödel Escher Bach" by Douglas Hofstadter, which is in general about _strange loops_.

> A strange loop is a cyclic structure that goes through several levels in a hierarchical system. It arises when, by moving only upwards or downwards through the system, one finds oneself back where one started.
> [source](https://en.wikipedia.org/wiki/Strange_loop)

One of the strange loops Hofstadter describes is a formal system. The first formal system the author describes is the MIU System.
The MIU System has four rules.

1. If you posses a string whose last letter is `I`, you can add on a `U` at the end.
2. Suppose you have `Mx`. Then you may add `Mxx` to your collection.
3. If `III` occurs in one of the string in your collection, you may make a new string with `U` in place of `III`
4. If `UU` occurs inside one of your strings, you can drop it.

The Goal of the Book is to get from MI to MU. [I wrote an applet, where you can try it out yourself](https://tn1ck.github.io/MIU/). Part of the blog post is also available there.

### So how to get from `I` to the `U`?

The only rule that can reduce the number of `I` the the 3rd rule, so we should focus on that. To remove all `I`, we need to fulfill `count(I) mod 3 = 0`, which means that the number of `I` must be divisible by 3. count represents the number of `I`, mod is the mathematical operation modulo.

With the second rule, we can duplicate the starting I. But doubling a number that is not divisible by 3 will never make it divisible by 3.

> **Proof sketch:**
>
> Suppose you have a number `n` that is not divisible by 3, so `n mod 3 != 0`, which means that `n = x * 3 + y`, where `x` can be any natural number and `y` is 1 or 2.
> When doubling the number we get `n * 2 = x * 6 + y * 2`. `y * 2` is now 2 or 4, both numbers are still not divisible by 2. `x * 6` is divisible by 3, so adding 2 or 4 will make it not divisible by 3.

Reducing the number of `I` by 3 obviously won't help, we can only use this rule in a useful way when we already have a number that is divisible by 3. All other rules don't affect the number of `I`.

So the first exercise given by Douglas Hofstadter in "Gödel Escher Bach" is impossible to solve.

When you don't believe this proof, simply try it out and check if you're able to find a solution. _You won't_.

### But why give the reader an exercise that is not solvable?

Because on encounters a lot of loops in the system. Everytime you think "I might try this" you'll get to a previous point and you notice that the whole system loops itself. You figure out, that you can't escape and it doesn't matter how often or long you try, you'll always go back to where you started.