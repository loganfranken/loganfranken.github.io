---
title: "ES6 Everyday: Reflect"
date: "2015-06-10"
categories: 
  - "development"
tags: 
  - "es6"
  - "es6everyday"
  - "javascript"
---

Yesterday, we talked about the new [`Proxy`](http://www.loganfranken.com/blog/900/es6-everyday-proxies/) object in ES6, a construct that enables meta-programming in JavaScript. While we're on that topic, let's look at a new built-in object within ES6: **`Reflect`**.

`Reflect` is a global object with a slew of static methods to use in JavaScript meta-programming.

Let's check out a few.

The `Reflect.get()` and `Reflect.set()` methods allow you to manipulate properties on an object:

```javascript
var game = {
  title: "Grim Fandango",
  genre: "Adventure"
};

console.log(Reflect.get(game, "title")); // "Grim Fandango"

Reflect.set(game, "genre", "Timeless");
console.log(Reflect.get(game, "genre")); // "Timeless"
```

Reflect also offers explicit, verbose, method equivalents of operators. Instead of using the `new` operator, for example, you can use `Reflect.construct`:

```javascript
function Employee(name) {
  this.name = name;
}

var logan = new Employee("Logan");
console.log(logan.name); // "Logan"

var sarah = Reflect.construct(Employee, ["Sarah"]);
console.log(sarah.name); // "Sarah"
```

Furthermore, some Reflect methods overlap with static `Object` methods, like `getPrototypeOf`:

```javascript
function Employee(name) {
  this.name = name;
}

var logan = new Employee("Logan");

console.log(Object.getPrototypeOf(logan)); // Employee
console.log(Reflect.getPrototypeOf(logan)); // Employee
```

And also overlap with `Function` methods, like `apply()`:

```javascript
function add(a, b) {
  console.log(`'this' is ${this}`);
  return a + b;
}

console.log(add(5, 6));
// 'this' is undefined
// 11

console.log(add.apply(document, [13, 15]));
// 'this' is [object HTMLDocument]
// 28

console.log(Reflect.apply(add, window, [65, 31]));
// 'this' is [object Window]
// 96
```

Browser support is pretty sparse on this one: as of right now, only the (unreleased) IE12 supports the Reflect API.

However, you _can_ start using it today with this [handy polyfill](https://github.com/tvcutsem/harmony-reflect).

## Resources

- [MDN: Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
- [Hermanth.HM: ES6 Reflect API](http://h3manth.com/new/blog/2015/es6-reflect-api/)
- [ECMAScript Wiki: Reflect API](http://wiki.ecmascript.org/doku.php?id=harmony:reflect_api)
