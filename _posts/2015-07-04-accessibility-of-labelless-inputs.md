---
layout: blog
title: "Accessibility of Labelless Inputs"
categories: Research
redirect_from: /blog/1196/accessibility-of-labelless-inputs/
---

When reading about web accessibility, you tend to hear a couple of axioms repeated over and over, like:

> Always provide labels for your inputs

Truthfully, web accessibility is an ongoing practice that can't be boiled down to a few tips. However, I've always felt this tip in particular was a Golden Accessibility Truth no one could argue against. Have an input? You always need a label. No matter what.

Right?

In most cases, this is a pretty easy guideline to follow: you generally _want_ a label with your inputs to help users understand your form.

But what about the cases where you _don't_ want a label?

For example, check out this search form:

![Search Input with Label](/blog/images/search_bar_with_label.png)

The additional "Search Query" `label` is so visually redundant: it's likely understood by users that whatever they enter into the search box will serve as the query for their search. In fact, this is a pattern ingrained into the brains of most users by search engines:

![Google Search Bar](/blog/images/google_search_bar.png)

![Bing Search Bar](/blog/images/bing_search_engine.png)

![Yahoo! Search Bar](/blog/images/yahoo_search_engine.png)

## Dropping the Label

So how should we go about getting rid of the label?

The first option is to simply drop it it; take it out of the markup altogether. And, actually, there is a WCAG 2.0 accessibility technique ([G167](http://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140408/G167)) suggesting just that:

> When a button invokes a function on an input field, has a clear text label, and is rendered adjacent to the input field, the button also acts as a label for the input field. This label helps users understand the purpose of the field without introducing repetitive text on the Web page. Buttons that label single text fields typically follow the input field.

However, despite this general recommendation, you _don't_ want to just drop the label altogether.

[Eric Mayes](http://www.simplyemazing.com/) and I conducted some [tests](https://github.com/ucsb-wsg/ucsb-wsg.github.io/issues/30) and confirmed that, while the field's purpose is _visually_ obvious, it's not at all obvious at first to a user with a screenreader.

Take the following markup for our simple search bar _with a label_:

```markup
<label for="query">Search Query</label>
<input type="text" name="query" id="query">
<input type="submit" value="Search">
```

Encountering this, the screenreader says the following when the text input field gains focus:

> Search Query, Edit Text

(The "Edit Text" piece varies from screenreader to screenreader and browser to browser, but the basic idea is that the label is read first)

Let's try just popping out the label:

```markup
<input type="text" name="query" id="query">
<input type="submit" value="Search">
```

The screenreader says (as you might expect):

> Edit Text

Of course, once we tab over to the adjacent search button, the screenreader will announce the search button and we'll understand what the previous field was all about; but up until that point, we're in the dark.

So, to that end, we _do_ want to include some kind of label, we just _don't_ it to display visually.

## Hiding the Label

Our first option to include the `label` in the markup but _not_ visually, is to use the [ol' standby](http://webaim.org/techniques/css/invisiblecontent/#absolutepositioning) of just shoving the label offscreen with CSS:

```css
/* Source: http://webaim.org/techniques/css/invisiblecontent/#absolutepositioning */
.hidden
{
  height: 1px;
  left: -10000px;
  overflow: hidden;
  position: absolute;
  top: auto;
  width: 1px;
}
```

With this approach, the `label` element is absolutely positioned and then pushed way outside the screen. This works really well: the `label` acts just as a `label` should for screenreaders and our search form is left visually clean.

But doesn't it just feel _gross_ somehow?

I mean, the web is moving forward at full speed: we have native responsive images. JavaScript on the client-side and server-side. Browser support for virtual reality.

And our _de facto_ solution for this classic problem in front-end web development is: "I don't know, just put it somewhere you can't see it."

## Label Without a Label

So can we visually hide the label using a less hacky technique?

The first candidate is the `title` attribute:

```markup
<input type="text" name="query" id="query" title="Search Query">
<input type="submit" value="Search">
```

There's a lot of [caution](http://www.paciellogroup.com/blog/2012/01/html5-accessibility-chops-title-attribute-use-and-abuse/) _against_ using the `title` attribute since it's not accessible across the board (for example, it historically hasn't held up well for `a` elements).

However, the case of the visually-redundant-label is special. From one [one article](http://www.paciellogroup.com/blog/2012/01/html5-accessibility-chops-title-attribute-use-and-abuse/) cautioning against the `title` attribute:

> Only use it to label a form control when the same text is provided as visible text.

And [another](http://www.paciellogroup.com/blog/2010/11/using-the-html-title-attribute/):

> Providing a programmatically associated label for a control in situations where a visible text label would be redundant

The [WCAG 2.0 accessibility technique H65](http://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140408/H65.html) also explicitly includes this very example:

> A Web page contains a text field where the user can enter search terms and a button labeled "Search" for performing the search. The title attribute is used to identify the form control and the button is positioned right after the text field so that it is clear to the user that the text field is where the search term should be entered.

Furthermore, our [tests](http://loganfranken.github.io/web-standards-testing/title-as-label/results.html) demonstrated that this works quite well as a pseudo-`label`: with a sampling of the latest screenreaders across a sampling of the latest browsers, the `title` attribute was always read as if it were a label.

However, `title` also exhibits this specific behavior where it causes a tooltip to appear (often on mouse hover, sometimes on keyboard focus):

![Use of title attribute on a field without a label in Chrome](/blog/images/title_search_bar_chrome.png)

![Use of title attribute on a field without a label in Firefox](/blog/images/title_search_bar_firefox.png)

![Use of title attribute on a field without a label in Internet Explorer ](/blog/images/title_search_bar_ie.png)

We're definitely better off than we were before: we've got a screenreader-accessible label without any CSS hacks. But the fact that `title` is considered brittle for accessibility and that looming tooltip make me nervous: can't we do better than `title`?

## ARIA to the Rescue

We can!

The Accessible Rich Internet Applications (ARIA) standard provides us with a new HTML attribute that we can use in this situation, `aria-label`:

```markup
<input type="text" name="query" id="query" aria-label="Search Query">
<input type="submit" value="Search">
```

Given that it's a relatively new attribute, there are fewer recommendations for this technique: both the [WCAG Working Group wiki](http://www.w3.org/WAI/GL/wiki/Using_aria-label_to_provide_an_invisible_label) and [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) recommend this approach, although the recommendations are bare-bones nods to the idea, couched in caveats about the volatility of screenreader support.

However, at least in our [limited tests](http://loganfranken.github.io/web-standards-testing/title-as-label/results.html) (with the latest screenreaders and the latest browsers), `aria-label`, like `title`, performed just as well as a regular `label`.

For now, I think the most forward-looking recommendation is the use of `aria-label`. More testing is needed to confirm an acceptable level of support for the attribute, but our run of tests was promising.
