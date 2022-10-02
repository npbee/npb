---
title: Double overflow with CSS grid
date: 2022-10-02
description: A deceptively tricky layout
layout: ../../layouts/Post.astro
---

# Double Overflowing Columns with CSS Grid

Here's a deceptively tricky layout I encountered at work recently:

<div class="not-prose full-width flex justify-center">
<img alt="Sketch of layout" src="/posts/css-grid-double-overflow-sketch.svg" />
</div>

<h3>It has:</h3>

- Flex and grid layouts combined
- Multiple overflow containers
- Set and variable width columns

Here's how I solved it!

<div class="not-prose full-width w-75">
<p class="codepen" data-height="700" data-default-tab="css,result" data-slug-hash="ExLLRaQ" data-user="npbee" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/npbee/pen/ExLLRaQ">
  Double Overflowing Columns with CSS Grid</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
</div>
