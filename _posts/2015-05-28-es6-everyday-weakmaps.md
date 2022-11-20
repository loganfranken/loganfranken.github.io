---
layout: blog
title: "ES6 Everyday: WeakMaps"
categories: Tutorials
redirect_from: /blog/890/es6-everyday-weakmaps
---

A couple days ago, we learned about [Maps](http://www.loganfranken.com/blog/888/es6-everyday-maps/) in ES6. There is a strange counterpart to the new map data structure: the **`WeakMap`**.

If you rememember, `Map`s could take _any_ data type as a key. By contrast, `WeakMap`s only takes _objects_ as keys:

```javascript
var tenants = new Map();
tenants.set(345, "Linda and Steve");

var weakTenants = new WeakMap();
weakTenants.set(567, "George and Sam");
// TypeError: Invalid value used as weak map key
```

But using objects as keys works just fine:

```javascript
var weakTenants = new WeakMap();
weakTenants.set({ roomNumber: 567 }, "Tamy and Beth");
```

You're likely wondering: why the _weak_ prefix?

Well, it's called a `_Weak_Map`, because it references keys "weakly," which means that it _won't_ prevent garbage collection on the key-value pairs.

So, if the JavaScript garbage collector discovers there are no more references to a key held within a `WeakMap`, it will go ahead and clean up the key, removing the corresponding value as well.

If this were a traditional `Map`, the fact that a key is even used within a `Map` is reason enough for the garbage collector to leave the key-value pair alone.

[Nicholas Zakas](http://www.nczonline.net/blog/2012/11/06/ecmascript-6-collections-part-3-weakmaps/) gives one of the best use cases for this: using DOM elments as keys to store values associated with those DOM elements. When the DOM element no longer exists, the key-value pair will automatically get garbage collected, with no explicit clean-up required.

Also, unlike `Map`, `WeakMap` is not [iterable](http://www.loganfranken.com/blog/884/es6-everyday-for-of-loops-and-the-iterable-protocol/). So no `for..of` fun this time.

Obviously, `WeakMap` is a very unique data structure that targets a pretty specific use case. We probably won't get too much use out of it in our day-to-day.

## Resources

- [Nicholas Zakas: ECMAScript 6 collections, Part 3: WeakMaps](http://www.nczonline.net/blog/2012/11/06/ecmascript-6-collections-part-3-weakmaps/)
- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
