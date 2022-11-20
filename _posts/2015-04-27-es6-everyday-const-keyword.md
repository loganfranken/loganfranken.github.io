---
title: "ES6 Everyday: const Keyword"
date: "2015-04-27"
categories: 
  - "development"
tags: 
  - "es6"
  - "es6everyday"
  - "javascript"
---

Starting off our week with one that's pretty straightforward: the `const` keyword.

So, let's say we have a constant value that we _don't_ want changed after assignment:

```javascript
var appName = "The Fantastic Editor";
appName = "The TERRIBLE Editor";

console.log(appName); // The TERRIBLE Editor
```

We can use the `const` keyword to prevent reassignment:

```javascript
const appName = "The Fantastic Editor";
appName = "The TERRIBLE Editor";

console.log(appName); // EXCEPTION: "appName is read-only"
```

Check it out for yourself in this [ES6 Fiddle](http://www.es6fiddle.net/i7r6w5gi/).

## Resources

- [MDN: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
