---
layout: blog
title: "ES6 Everyday: WeakSets"
categories: Tutorials
redirect_from: /blog/1095/es6-everyday-weaksets/
---

If you've been following along, you might have expected this one: [`Map`](http://www.loganfranken.com/blog/888/es6-everyday-maps/), [`Set`](http://www.loganfranken.com/blog/890/es6-everyday-weakmaps/), [`WeakMap`](http://www.loganfranken.com/blog/890/es6-everyday-weakmaps/), and now (_drumroll_) **`WeakSet`**.

Like `Map` versus `WeakMap`, `WeakSet` is very similar to `Set`, except for a few key differences:

- `WeakSet` can only store objects (no primitive values)
- `WeakSet` holds values "weakly" and does not prevent garbage collection on values
- `WeakSet` is not iterable

Just like `WeakMap`, it's not likely you'll be using `WeakSet` too frequently.

## Resources

- [Sitepoint: Preparing for ECMAScript 6: Set and WeakSet](http://www.sitepoint.com/preparing-ecmascript-6-set-weakset/)
- [MDN: WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)
