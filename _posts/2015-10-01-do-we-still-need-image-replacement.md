---
title: "Do We Still Need Image Replacement?"
date: "2015-10-01"
categories: 
  - "development"
tags: 
  - "accessibility"
  - "css"
  - "html"
---

Let's have a history lesson.

## An Old Problem

A long time ago (~10 years ago), web people ran into this problem a lot.

Let's say you had a piece of text on a page, like your website's title:

```markup
<h1>My Website</h1>
```

But you didn't want just styled text for your website's title, you wanted to **use an image**, like a logo. So, you took the practical approach and popped an `img` in there:

```markup
<h1><img src="images/logo.jpg" alt="My Website" /></h1>
```

This worked and all, but we didn't really _want_ an `img` element in there, **we just wanted the text to be styled like our logo**. The fact that we _had_ to use an `img` was just a limitation of our capabilities with CSS.

This also **violated the [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)** between our HTML and CSS: now the HTML was responsible for handling the visual presentation of our website's title.

If we wanted to make changes to the look of the website's title, we'd have to make changes in both the HTML and the CSS.

But wasn't the look and feel side of things CSS's job?

On top of that, there was a strong belief at the time that this also had **negative impacts on search engine optimization (SEO) and accessibility**. (An argument that makes _conceptual_ sense, given you're using HTML elements in non-semantic ways, but an argument for which I can't seem to drum up hard evidence)

Taking all of this into account, what we really wanted was our original markup...

```markup
<h1>My Website</h1>
```

...but somehow **have CSS swap out (_"replace"_ even) the text with our image**.

## An Old Solution

And someone did just that, with a technique called [**Fahrner Image Replacement**](https://en.wikipedia.org/wiki/Fahrner_Image_Replacement).

First, you put an **additional `span` inside the element** you wanted to swap out with an image:

```markup
<h1><span>My Website</span></h1>
```

And then you introduced some CSS that **_hid_ the inner `span`** and put your desired image in the background of the original element:

```css
h1
{
    background: url(logo.jpg) no-repeat;
    height: 50px;
    width: 100px;
}

h1 span
{
	display: none;
}
```

It was later discovered that this actually rendered the text **completely inaccessible to screen readers**, and so another method became popular, called **Phark image replacement**. With this technique, you could keep your original markup:

```markup
<h1>My Website</h1>
```

And then just shove the offending **text offscreen using `text-indent`**, leaving your logo as the background image in-place:

```css
h1
{
    background: url(logo.jpg) no-repeat;
    height: 50px;
    text-indent: -9999px;
    width: 100px;
}
```

This pushed the text offscreen so it couldn't be seen, but it was still floating out there _somewhere_ so **screen readers could parse it**.

We actually haven't stopped at the Phark method either: a [number of techniques](https://css-tricks.com/examples/ImageReplacement/) have cropped up over the last few years to further refine the approach.

## A New Problem

Since that time, the web has shifted: instead of lacquering pages with images, we now have a whole slew of tools at our disposal, from web fonts to CSS gradients. There are **a lot less `img`s** holding together website layouts these days.

And that's a good thing: it's an opportunity for websites to become leaner, more flexible.

Along with this, the **use of image replacement has slowly evaporated too**: in fact, HTML5 Boilerplate [dropped their image replacement support](https://github.com/h5bp/html5-boilerplate/commit/2e80e8be81d08b5202f0928d75757e4b94b867fd) altogether two years ago, citing that there weren't "enough use cases within modern web development."

So that's that, right? We've closed the book on image replacement.

Well, not so fast.

Even though we no longer use `img` tags for text, it's not as if we stopped representing text with images: instead of using JPEGs for our logos, we've moved onto using SVGs. Instead of using GIFs for our button icons, we use icon fonts.

So, even though the technology has changed, the core problem feels familiar. Given that, **do we still need image replacement techniques?**

Let's investigate with two case studies: **SVG logos** and **icon fonts**.

## Case Study: SVG Logos

This will be a pretty open-and-shut case since **we can embed SVGs in the very same way that we embed images**.

In other words, we're free to drop in the image:

```markup
<h1><img src="logo.svg" alt="Website Logo" /></h1>
```

Or, if we want, we can use the same image replacement techniques from before:

```css
h1
{
    background: url(logo.svg) no-repeat;
    height: 50px;
    text-indent: -9999px;
    width: 100px;
}
```

But, hey, trivial or not, this provides us a good opportunity to **test image replacement in general**. To that end, I cooked up [a few tests](http://loganfranken.github.io/web-standards-testing/svg-image-replacement/index.html) that cover the following use cases:

```markup
<!-- Standard Header -->
<h1>Website Name</h1>

<!-- Header with img Element Using PNG -->
<h1><img src="logo.png" alt="Website Name" /></h1>

<!-- Header with Image Replacement Using PNG -->
<h1 class="image-replacement image-replacement-png">Website Name</h1>

<!-- Header with img Element Using SVG -->
<h1><img src="logo.svg" alt="Website Name" /></h1>

<!-- Header with Image Replacement Using SVG -->
<h1 class="image-replacement image-replacement-svg">Website Name</h1>
```

I ran each of these through the NVDA and JAWS screen readers and came up with little difference: both announced the headers without issue, although the word "graphic" preceded the announcement of headers where the PNG/SVG was embedded directly within the header. In other words, this...

```markup
<h1 class="image-replacement image-replacement-svg">Website Name</h1>
```

...would get read as "Header, Level 1, Website Name," while this...

```markup
<h1><img src="logo.svg" alt="Website Name" /></h1>
```

...would get read as "Header, Level 1, Graphic, Website Name."

As for **search engines**, there isn't much out there.

Google has [stated they support image replacement](http://mezzoblue.com/archives/2008/05/05/image_replac/), but I could find little support that image replacement is a _better_ approach for search engine spiders than using images directly within the HTML. I remember strongly believing this was the case myself: now I think it's just a [thing we said](https://css-tricks.com/header-text-image-replacement/).

Either way, given the (1) slight usability improvement for screen readers, (2) the semantic use of elements, and (3) the maintained separation of concerns between HTML and CSS, my verdict is that **we should continue to use image replacement with SVG**.

## Case Study: Icon Fonts

Our next investigation: **icon fonts**.

With icon fonts, you can display a symbol using a font filled with icons, rather than using image files. [Twitter Bootstrap](http://getbootstrap.com/2.3.2/base-css.html#icons), for example, comes packed with a subset of [Glyphicons](http://glyphicons.com/), an icon font.

Font icon libraries often provide simple hooks for inserting an icon. For example, with [Font Awesome](https://fortawesome.github.io/Font-Awesome/), the following:

```markup
<i class="fa fa-camera"></i>
```

Outputs this little camera:



This is wonderful because now, when we use this camera icon on our website, it will scale and shrink just like a character in a font would:



Neat!

Now, let's look at the various ways in which frameworks encourage you to embed these default ways you can embed these in each framework:

```markup
<-- Font Awesome -->
<i class="fa fa-bicycle"></i>

<-- Twitter Bootstrap -->
<i class="icon-search"></i>

<-- Zurb Foundation -->
<i class="fi-heart"></i>
```

(**UPDATE:** My Twitter Bootstrap examples are pulled from older documentation; in the [latest version](http://getbootstrap.com/components/#glyphicons-examples), `aria-label` is now used on icons without supplemental text)

(**UPDATE:** Zurb Foundation also includes an [example](http://foundation.zurb.com/docs/components/icon-bar.html) further down on the page)

The biggest thing you'll notice in all of these examples is **no accompanying text**.

Right away this should raise a red flag for you in regards to screen readers: the specific problem being that, well, you know, there's no text for them to read.

Of course, this isn't a problem when the icon is nestled against some explanatory text:

```markup
<i class="icon-search"></i> Search
```

But what about the times when the icon is standing on its own? For example, when you have a hamburger menu icon:

```markup
<a href="#menu"><i class="fa fa-bars"></i></a>
```

In the past, I've always stuck to my guns and **applied image replacement here too**.

First, I start with a fresh, semantic element (in this case, a link to my blog's RSS feed):

```markup
<a href="/blog/feed/" class="icon icon-rss">RSS Feed</a>
```

Then I remove the text using Phark image replacement (along a little fiddling to place the icon correctly):

```css
.icon
{
    display: inline-block;
    font-size: 3em;
    line-height: 1em;
    margin-top: -.75em;
    text-indent: -9999px;
    width: 1em;
}
```

And then I pop the icon in using a `::after` pseudo element:

```css
.icon::after
{
  display: block;
  font-family: FontAwesome,sans-serif;
  text-indent: 0;
}

.rss::after
{
  content: "\f143"; // RSS Icon
}
```

You can see a few more examples of this in a [CodePen](http://codepen.io/loganfranken/pen/oXBWME).

But maybe the use of hacks like this is misguided?

To find out, I pulled together some [examples](http://loganfranken.github.io/web-standards-testing/icon-font-replacement/index.html):

```markup
<!-- Standard Link -->
<a href="#">Menu</a>

<!-- Standard Phark Image Replacement -->
<a href="#" class="image-replacement">Menu</a>

<!-- Standard Font Icon with Accompanying Text -->
<a href="#"><i class="fa fa-bars"></i> Menu</a>

<!-- Standard Font Icon -->
<a href="#" class="fa fa-bars"></a>

<!-- Font Icon With aria-label -->
<a href="#" class="fa fa-bars" aria-label="Menu"></a>

<!-- Font Icon With title -->
<a href="#" class="fa fa-bars" title="Menu"></a>

<!-- Font Icon Using Replacement -->
<a href="#" class="icon menu-icon">Menu</a>
```

In both NVDA and JAWS, the word "Menu" was read when tabbing to the link in every case _except_ "Standard Font Icon" (as you probably guessed, since there's nothing to read in that example).

In comparing `title` and `aria-label`, [past research](https://www.loganfranken.com/blog/1196/accessibility-of-labelless-inputs/) favors `aria-label`, since (1) `title` has the side effect of displaying a tooltip to the user and (2) this is `aria-label`'s actual stated purpose.

Taking all of that into account, we're left with the following: **at the very least, include an `aria-label` attribute** if there is no accompanying text.

Although I personally prefer the use of the image replacement-style techniques in the case of an icon without accompanying text (for the semantics, for the control through CSS), I can't in good faith broadly recommend it over the simplicity of the `aria-label` attribute.

## Wrapping-Up

Phew. That was a lot of words.

All in all, it looks like there is still a place, albeit a minor one, for image replacement techniques in the modern web landscape: specifically, **SVGs standing in place for text** can still benefit from the use of image replacement.

Furthermore, image replacement-style techniques can also be useful in the use of **icon fonts without accompanying text**, although `aria-label` will likely meet your needs.

(For more on this topic, check out the UCSB Web Standards Guide [GitHub issue](https://github.com/ucsb-wsg/ucsb-wsg.github.io/issues/31) that started it all!)
