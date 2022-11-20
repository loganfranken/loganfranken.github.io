---
layout: blog
title: "ES6 Everyday: Destructuring"
categories: Tutorials
redirect_from: /blog/837/es6-everyday-destructuring/
---

We've got a really exciting one to close out our week!

Okay, so you know how to assign a variable:

```javascript
var x = 30;
```

And then, of course, you know how to assign _two_ variables:

```javascript
var x = 30;
var y = 50;
```

With **destructuring**, we can do the following instead:

```javascript
var [x, y] = [30, 50];
console.log(x); // 30
console.log(y); // 50
```

This is called the **"array pattern"** of destructuring. We can use it to return multiple values from a function like so:

```javascript
function getCoords()
{
  return [30, 50];
}

var [x, y] = getCoords();
console.log(x); // 30
console.log(y); // 50
```

Alternatively, we can use the **"object pattern"**:

```javascript
function getCoords()
{
  return { x: 30, y: 50 };
}

var {x, y} = getCoords();
console.log(x); // 30
console.log(y); // 50
```

Give it a spin in [this ES6 fiddle](http://www.es6fiddle.net/i8lpxxsd/).

## Resources

- [MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Ariya Hidayat: ECMAScript 6 and Destructuring Assignment](http://ariya.ofilabs.com/2013/02/es6-and-destructuring-assignment.html)
