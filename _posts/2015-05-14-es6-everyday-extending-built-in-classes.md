---
layout: blog
title: "ES6 Everyday: Extending Built-in Classes"
categories: Tutorials
redirect_from: /blog/864/es6-everyday-extending-built-in-classes/
---

Along with [inheritance of our own classes](http://www.loganfranken.com/blog/855/es6-everyday-class-inheritance/), ES6 also offers us the ability to **extend built-in classes**.

One of the best use cases I've seen of this is Axel Rauschmayer's [example of extending the `Error` class](https://twitter.com/rauschma/status/487607208952479744):

```javascript
class ParsingError extends Error
{
   // ...
}
```

A practice that is common in other languages, like Java and [C#](https://msdn.microsoft.com/en-us/library/vstudio/ms229064%28v=vs.100%29.aspx).

Of course, you can go far beyond this; [this example from StackOverflow](http://stackoverflow.com/questions/26700164/extending-array-with-es6-classes) implements a stack by extending `Array`:

```javascript
class Stack extends Array
{
   constructor(length)
   {
      super(length);
   }

   top()
   {
      return this[this.length - 1];
   }
}
```

According to the [ES6 Compatibility Table](http://kangax.github.io/compat-table/es6/), we should eventually have the option to extend all of the following built-in classes:

- Array
- Boolean
- Error
- Function
- Map
- Number
- Promise
- RegExp
- Set
- String

However, the [ES6 Compatibility Table](http://kangax.github.io/compat-table/es6/) _also_ shows us that this is **basically unsupported across the board** (a board that includes transpilers, browsers, and server runtimes), with a few small exceptions.

So, unfortunately, it's a little too early to take this one out for a spin.
