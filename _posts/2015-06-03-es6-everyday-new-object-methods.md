---
title: "ES6 Everyday: New Object Methods"
date: "2015-06-03"
categories: 
  - "development"
tags: 
  - "es6"
  - "es6everyday"
  - "javascript"
---

Hey, you want some new object methods? ES6's got 'em:

## Object.is

Determines if two values are the same value.

MDN has a pretty stellar [criteria](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) for whether or not two values are the "same value"; it essentially boils down to a more complete implementation of the strict equality operator (`===`):

```javascript
// Similarities Between Object.is and ===

console.log(Object.is("Apple", "Apple")); // true
console.log("Apple" === "Apple"); // true

console.log(Object.is(20, 30)); // false
console.log(20 === 30); // false

var studentA = { name: "Logan" };
var studentB = { name: "Fred" };
var studentC = studentA;

console.log(Object.is(studentA, studentB)); // false
console.log(studentA === studentB); // false

console.log(Object.is(studentA, studentC)); // true
console.log(studentA === studentC); // true


// Differences Between Object.is and ===

console.log(Object.is(+0, -0)); // false
console.log(+0 === -0); // true

console.log(Object.is(NaN, NaN)); // false
console.log(NaN === NaN); // false
```

[MDN: Object.is()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) and an [ES6 Fiddle](http://www.es6fiddle.net/iagbgg6q/).

## Object.assign

Copies properties from one or more objects into another object:

```javascript
var cat = {
  name: 'Mr. Fluffy',
  meow: function() { console.log('Meow!'); } 
};

var dog = {
  name: 'Spot',
  bark: function() { console.log('Bark!'); } 
};

var lion = {
  name: 'Aslan',
  roar: function() { console.log('Roar!'); }
};

Object.assign(cat, dog, lion);

console.log(cat.name); // Aslan
cat.meow(); // Meow!
cat.bark(); // Bark!
cat.roar(); // Roar!
```

[MDN: Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) and an [ES6 Fiddle](http://www.es6fiddle.net/iaguzspf/).

## Object.setPrototypeOf

Allows you to set the prototype of an object of an object to another object (or null).

This is a pretty hardcore one: check out [MDN: Object.setPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) for more information and examples.
