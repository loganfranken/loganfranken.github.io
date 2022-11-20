---
layout: blog
title: "ES6 Everyday: for..of Loops and the Iterable Protocol"
categories: Tutorials
redirect_from: /blog/884/es6-everyday-for-of-loops-and-the-iterable-protocol/
---

Remember yesterday when we learned about this weird new data type called [symbols](http://www.loganfranken.com/blog/882/es6-everyday-symbols/)?

We're going to use that knowledge today.

Along with a [bounty of new features](http://www.loganfranken.com/blog/tag/es6everyday/), ES6 also defines a "protocol," called the **iterable protocol**. Objects that adhere to this protocol are considered "iterable."

To adhere to this protocol, an object must implement the **"@@iterator" method**, which means that the object must have a method that loops through a set of elements, returning one at a time.

Furthermore, in [yesterday's post](http://www.loganfranken.com/blog/882/es6-everyday-symbols/) we discussed how symbols can be used as a key to reference a _type_ of function across different implementations.

Similarly, the last piece of implementing `@@iterator` is having a property on your object that references your looping method with a "well-known" symbol, called `Symbol.iterator`.

That was a lot at once, so let's back up and piece this all together.

There's a "well-known" symbol out there called "iterator" that is globally defined as a property on the `Symbol` class:

```javascript
console.log(Symbol.iterator.toString()) // Symbol(Symbol.iterator)
```

To fully implement the `@@iterator` method, our object must use `Symbol.iterator` as a key to reference our looping method described above:

```javascript
iterableObject[Symbol.iterator] = function() { /* ...looping logic */ };
```

Wow, so who would bother going through all of this trouble? Well, in fact, many of the built-in classes within ES6 would:

```javascript
var testString = new String();
console.log(testString[Symbol.iterator]);
// function [Symbol.iterator]() { [native code] }

var testArray = new Array();
console.log(testArray[Symbol.iterator]);
// function ArrayValues() { [native code] }
```

Okay, so that's nice and all, but what's the point of going through all of this trouble?

If `@@iterator` is implemented then a new type of loop, **`for..of`**, can be used. `for..of` allows us to loop over the _values_ of an _iterable_ object.

With strings:

```javascript
var greeting = "Hello";

for(let letter of greeting)
{
  console.log(letter); // H, e, l, l, o
}
```

And arrays:

```javascript
var fruits = ["Apple", "Strawberry", "Orange"];

for(let item of fruits)
{
  console.log(item); // Apple, Strawberry, Orange
}
```

This may seem vaguely familiar to you, but it's likely you're thinking of the `for..in` construct, which loops over property _names_:

```javascript
var person = {
  
  firstName: 'Logan',
  lastName: 'Franken',
  age: 27
  
};

for(let propName in person)
{
  console.log(propName); // firstName, lastName, age
}
```

So, if we used it on an array:

```javascript
var fruits = ["Apple", "Strawberry", "Orange"];

for(let item in fruits)
{
  console.log(item); // 0, 1, 2
}
```

## Resources

- [MDN: Iteration Protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
