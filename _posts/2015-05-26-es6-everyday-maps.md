---
layout: blog
title: "ES6 Everyday: Maps"
categories: Tutorials
redirect_from: /blog/888/es6-everyday-maps/
---

ES6 gives us a new, native data structure: the **`Map`**!

A map is just a bunch of key/value pairs:

```javascript
var colorHexCodes = new Map();
colorHexCodes.set('blue', '#0051FF');
colorHexCodes.set('red', '#D40000');

console.log(colorHexCodes.get('blue')); // '#0051FF'
```

We can use any data type we want for the keys and values:

```javascript
var employees = new Map();
employees.set(6785, { 'name': 'Larry' });
employees.set(3465, { 'name': 'Stan' });

console.log(employees.get(3465).name); // Stan
```

We can even use objects as keys!

Although, be careful to remember that object keys are considered equal if they are _references that point to the same instance_, not if they are equal via comparing their values.

In other words, this doesn't work:

```javascript
var grades = new Map();
grades.set({ name: 'Gordon Freeman' }, 'A+');

console.log(grades.get({ name: 'Gordon Freeman' })); // undefined
```

But this does:

```javascript
var grades = new Map();

var gordon = { name: 'Gordon Freeman' };

grades.set(gordon, 'A+');

console.log(grades.get(gordon)); // A+
```

And Map is [iterable](http://www.loganfranken.com/blog/884/es6-everyday-for-of-loops-and-the-iterable-protocol/), so let's bring out the `for..of`:

```javascript
var coordinates = new Map();

coordinates.set('Seattle', '47.614848, -122.3359058');
coordinates.set('Santa Barbara', '34.4281937, -119.702067');

for(let coord of coordinates)
{
  console.log(coord[0]);
  // Seattle
  // Santa Barbara
  
  console.log(coord[1]);
  // 47.614848, -122.3359058
  // 34.4281937, -119.702067
}
```

As you can see, an array is passed into `coord`, with the key assigned to the first spot in the array and the corresponding value assigned to the second spot.

With the help of [destructuring](http://www.loganfranken.com/blog/837/es6-everyday-destructuring/), we can make this a little more clear:

```javascript
var coordinates = new Map();

coordinates.set('Seattle', '47.614848, -122.3359058');
coordinates.set('Santa Barbara', '34.4281937, -119.702067');

for(let [key, value] of coordinates)
{
  console.log(key);
  // Seattle
  // Santa Barbara
  
  console.log(value);
  // 47.614848, -122.3359058
  // 34.4281937, -119.702067
}
```

Give it a spin in a [ES6 Fiddle](http://www.es6fiddle.net/ia1z4c2c/)!

## Resources

- [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
