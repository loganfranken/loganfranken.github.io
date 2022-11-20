---
title: "How To Be Self-Absorbed With CSS"
date: "2014-09-30"
categories: 
  - "design"
  - "development"
tags: 
  - "css"
  - "css3"
---

When I redesigned my website a few months ago, I wanted to do something fun with the title. So I decided to **recreate my initials ("LF") with CSS**. To take it up a notch, I wanted to leave open the background of the initials to be filled with whatever I saw fit (a color, an image, a video, whatever).

So here's how I did it.

First, I started with a base of semantic HTML:

```markup
<div class="header-wrapper">
  <header>
	  <h1><a href="/">Logan Franken</a></h1>
  </header>
</div>
```

You might wonder why I didn't choose to put my actual initials within the `h1`, instead of my full name. Well, in this case, I felt the initials were essentially a logo that stood in for "Logan Franken." I wanted to retain "Logan Franken" as the title of my website for screen readers and search engines; the fact that I'm displaying my initials is just an aesthetic choice particular to this website design.

Now that we have that nice, semantic title in there, let's shove it way off the page:

```css
header h1 a
{
    position: absolute;
    text-indent: -200%;
}
```

Next, we need a block that will contain the letters. When I first put this experiment together, I drew out diagrams calculating the required distances between the various pieces of the "L" and "F" and then just stuck them into a block that could take on any height and width of its container. This was pretty messy: the letters came out stretched and awkward.

To address this, we need to create a block with a [fixed, intrinsic ratio](http://www.fredparke.com/blog/css-padding-trick-responsive-intrinsic-ratios):

```css
header h1
{
    background-color: #FF8030;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 50%;
    position: relative;
    width: 80%;
}
```

Here's what we get:

<p data-height="268" data-theme-id="0" data-slug-hash="zbhiL" data-default-tab="result" data-user="loganfranken" class="codepen">See the Pen <a href="http://codepen.io/loganfranken/pen/zbhiL/">Initial Ratio Block</a> by Logan Franken (<a href="http://codepen.io/loganfranken">@loganfranken</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

Now we need to stick in some white blocks over the background to create the letters. To do this without adding unnecessary markup, we're going to use psuedo elements. Luckily, we have four readily at our disposal here (`header h1 a::before`, `header h1 a::after`, `header h1::before`, `header h1::after`).

We start off by morphing each of them into white blocks we can use:

```css
header h1 a::before, header h1 a::after, header h1::before, header h1::after
{
    background: #FFF;
    content: '';
    display: block;
    position: absolute;
}
```

And now we simply slot them into place:

```css
/* White space block that forms the "L" */
header h1 a::before
{
    height: 80%;
    left: 15%;
    top: 0;

    /* 30% actual width + 15% of space between the "L" and "F" to avoid tears */
    width: 45%;
}

/* White space block between the "L" and "F" */
header h1 a::after
{
    height: 100%;
    left: 45%;
    top: 0;
    width: 15%;
}

/* White space block that forms the upper part of the "F" */
header h1::before
{
    height: 20%;
    left: 75%;
    top: 20%;
    width: 30%;
}

/* White space block that forms the bottom part of the "F" */
header h1::after
{
    /* 40% actual height + 10% beyond the bottom to avoid tears */
    height: 50%;
    left: 75%;
    top: 60%;
    width: 30%;
}
```

You'll notice I mention "tears" in the comments above. What I mean is that, in certain places where two blocks would _exactly_ meet, the percentage math would end up in such a way that a small space of a pixel or two would appear between the blocks. To avoid that, I simply overlap the blocks in those sensitive areas.

And we're done!

Now for the fun stuff. First, here are the plain old initials:

<p data-height="268" data-theme-id="0" data-slug-hash="zgbCl" data-default-tab="result" data-user="loganfranken" class="codepen">See the Pen <a href="http://codepen.io/loganfranken/pen/zgbCl/">Plain Initials</a> by Logan Franken (<a href="http://codepen.io/loganfranken">@loganfranken</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

Let's add a pop of color:

<p data-height="268" data-theme-id="0" data-slug-hash="hvlqe" data-default-tab="result" data-user="loganfranken" class="codepen">See the Pen <a href="http://codepen.io/loganfranken/pen/hvlqe/">Colorful Initials</a> by Logan Franken (<a href="http://codepen.io/loganfranken">@loganfranken</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

Or how about a [striped CSS gradient background](http://lea.verou.me/css3patterns/#diagonal-stripes):

<p data-height="268" data-theme-id="0" data-slug-hash="LqtFu" data-default-tab="result" data-user="loganfranken" class="codepen">See the Pen <a href="http://codepen.io/loganfranken/pen/LqtFu/">Striped Initials</a> by Logan Franken (<a href="http://codepen.io/loganfranken">@loganfranken</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

Hell, we could even put a whole page back there:

<p data-height="268" data-theme-id="0" data-slug-hash="kxmvL" data-default-tab="result" data-user="loganfranken" class="codepen">See the Pen <a href="http://codepen.io/loganfranken/pen/kxmvL/">Iframe Initials</a> by Logan Franken (<a href="http://codepen.io/loganfranken">@loganfranken</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

Or a hard-to-see video!

<p data-height="268" data-theme-id="0" data-slug-hash="fKBeu" data-default-tab="result" data-user="loganfranken" class="codepen">See the Pen <a href="http://codepen.io/loganfranken/pen/fKBeu/">Video Initials</a> by Logan Franken (<a href="http://codepen.io/loganfranken">@loganfranken</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>
