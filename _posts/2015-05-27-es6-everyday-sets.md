---
layout: blog
title: "ES6 Everyday: Sets"
categories: Tutorials
redirect_from: /blog/892/es6-everyday-sets
---

Along with [Map](http://www.loganfranken.com/blog/888/es6-everyday-maps/), ES6 also gives us another data structure: the **`Set`**!

A set is a grouping of _unique_ values.

Take a look:

```javascript
var primes = new Set();

primes.add(2);
console.log(primes.size); // 1

primes.add(3);
console.log(primes.size); // 2

primes.add(5);
console.log(primes.size); // 3

primes.add(5);
console.log(primes.size); // 3
```

In this example, you'll note the `size` property of our `Set` object keeps growing with each new call to `add`, until we attempt to `add` the value "5" twice.

Since a `Set` only contains _unique_ values, the "5" only gets added once. Thus, the size of our `Set` doesn't change.

We can check if a set has a value by calling the `has` method:

```javascript
var fruits = new Set();

fruits.add('Banana');
fruits.add('Strawberry');

console.log(fruits.has('Banana')); // true
console.log(fruits.has('Orange')); // false
```

Like map, we can store objects too, with the caveat that _reference equality_ (are these variables pointing to the same object?) is used to compare objects and _not_ _value equality_ (are the values of the object the same?).

So, watch what happens here:

```javascript
var dogs = new Set();

dogs.add({ name: 'Clifford', color: 'Red' });
console.log(dogs.size); // 1

dogs.add({ name: 'Clifford', color: 'Red' });
console.log(dogs.size); // 2
```

Versus:

```javascript
var dogs = new Set();

var clifford = { name: 'Clifford', color: 'Red' };

dogs.add(clifford);
console.log(dogs.size); // 1

dogs.add(clifford);
console.log(dogs.size); // 1
```

And, yes, it's [iterable](http://www.loganfranken.com/blog/884/es6-everyday-for-of-loops-and-the-iterable-protocol/)! Bring on the `for..on`:

```javascript
var colors = new Set();

colors.add('Blue');
colors.add('Red');
colors.add('Orange');

for(let value of colors)
{
  console.log(value);
  // Blue
  // Red
  // Orange
}
```
