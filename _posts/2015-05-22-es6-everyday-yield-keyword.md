---
layout: blog
title: "ES6 Everyday: yield* Keyword"
categories: Tutorials
redirect_from: /blog/1069/es6-everyday-yield-keyword
---

To finish up our discussion on generators, let's try something:

```javascript
function* getCounter()
{
  yield [1, 2, 3];
}
```

What's going to happen when we call this generator function?

```javascript
function* getCounter()
{
  yield [1, 2, 3];
}

var counter = getCounter();
console.log(counter.next().value); // [1,2,3]
console.log(counter.next().value); // undefined
```

Oh.

If you're like me, you _might_ have held out some brief hope that it would somehow iterate over the values of the array. But, I mean, of course it doesn't. `yield` is doing exactly what it should be doing.

Luckily, we have the `yield*` keyword:

```javascript
function* getCounter()
{
  yield* [1, 2, 3];
}

var counter = getCounter();
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
console.log(counter.next().value); // 3
```

(Yes, you're seeing that right: it's `yield` with an asterisk on the end)

Nice!

The `yield*` keyword allows us to yield the individual values of _another_ iterable.

In other words, this:

```javascript
yield* [1, 2, 3];
```

Becomes:

```javascript
yield 1;
yield 2;
yield 3;
```

Similarly, we can also yield to other generators too:

```javascript
function* getVegetableLister()
{
  yield "Carrot";
  yield "Beet";
}

function* getFruitLister()
{
  yield "Apple";
  yield "Banana";
}

function* getShoppingLister()
{
  yield "Milk";
  yield* getVegetableLister();
  yield* getFruitLister();
}

var lister = getShoppingLister();
console.log(lister.next().value); // Milk
console.log(lister.next().value); // Carrot
console.log(lister.next().value); // Beet
console.log(lister.next().value); // Apple
```

## Resources

- [MDN: yield\*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*)
