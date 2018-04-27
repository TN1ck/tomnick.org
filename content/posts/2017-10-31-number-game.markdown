---
layout: post
title:  "Numbers Game - Minimal Solution"
date:   2017-10-31 19:21:33 +0100
categories: blog
author: Tom Nick
excerpt: One of the games bored students play, is the "Numbers Game". Also known as "Take Tens" or in german "Zahlenspiel". I once implemented it and wrote a solver to find the minimum amount of steps to solve the game. Here is the solution.
---

The Numbers Game is a game you normally play sheets of paper, you write the numbers from 1 to 19 next to each other
```
1 2 3 4 5 6 7 8 9
```
Afterwards you write the numbers from 11 to 19 below, but so, that you have 9 columns and three rows:
```
1 2 3 4 5 6 7 8 9
1 1 1 2 1 3 1 4 1
5 1 6 1 7 1 8 1 9
```

You are allowed to strike through numbers that are next to each other that are the same or add up to 10, no diagonals though, but the left/right neighbour of the outermost numbers are the right/left outermost of the column before/after. So the the 9 in the first row could be striked with the left 1 in the second row.
After there are now possibilities left, one must write all remaining numbers below. This repeats after no numbers are left. To get a feeling got to the implementation and play around a bit, I mark the possible matches: [http://tn1ck.github.io/numbers-game/](http://tn1ck.github.io/numbers-game/).

Three years ago I wanted to learn React.js. The best way to learn a new library or framework is to build something with it, for me this was the Numbers Game. Just head straight to [http://tn1ck.github.io/numbers-game/](http://tn1ck.github.io/numbers-game/), to play it.

The game itself is really hard to finish, but also strangely addictive. When I started I actually thought that by changing the used numbers range (in the original it is 1 to 9), I could vary the difficulty, but 1 to 9 seems to be the sweet spot. 1 to 8 is really easy to solve, and 1 to A is super hard.

It's frustrating to write a game which you haven't solved by yourself and because I was curious what the minimum amount of steps would be, I wrote myself a backtracking solver.

I'm a fan of Clojure, so the solver is also written in it. The source code can be found [here](https://gist.github.com/TN1ck/ae36604c63673ffab275). It's not perfect, but straight forward and works.
There is one magic number there, I put 74 there to filter every solution that was bigger than that. Why? Because I knew that this a valid solution, and I used a depth-first search and I didn't want the solver to run forever, I wasn't sure then what the minimum amount would be, so a depth first search, where I always lower the possible solutions with any solution that used less steps than the current minimum, seemed like a good idea. A breadth first would have also worked probably, but haven't tried yet.

The code is old and I just changed some things and commented here and there, I _should_ rewrite it... but you know how it is, hard enough to find time to write this blog post. I will probably update the post then.

Anyway! Let's look at the solution, what is the minimum amount of steps needed?
You need __34__ steps at minimum to solve this game. Here are the steps, to be read as match: `index1 - index2`. So the first step would be to match the 1 on the left in the first row, with the 1 on the left in the second row.

```
1.    0  - 9
2.    8  - 17
3.    10 - 11
4.    7  - 12
5.    25 - 26
6.    20 - 29
7.    19 - 21
8.    24 - 27
9.    33 - 42
10.   32 - 34
11.   43 - 44
12.   41 - 45
13.   23 - 50
14.   22 - 28
15.   18 - 30
16.   3  - 39
17.   16 - 31
18.   13 - 40
19.   6  - 14
20.   15 - 35
21.   5  - 36
22.   4  - 37
23.   56 - 65
24.   55 - 57
25.   46 - 64
26.   49 - 51
27.   54 - 58
28.   53 - 59
29.   52 - 60
30.   48 - 61
31.   47 - 62
32.   38 - 63
33.   2  - 66
34.   1  - 67
```

It feels kind of awesome to solve the game with these steps, as you normally take quite a long time to solve it.