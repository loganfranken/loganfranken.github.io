---
layout: blog
title: "ES6 Everyday: Computed Properties"
categories: Tutorials
redirect_from: /blog/912/es6-everyday-computed-properties/
---

You're familiar with creating an object literal in JavaScript:

```javascript
var animal = {
  name: "Horse",
  species: "E. Ferus"
};

console.log(animal.name); // Horse
```

In this example, `name` and `species` are _properties_ on the `animal` object. You'll notice that "name" and "species" must be statically written. In other words, we can't specify _dynamic_ property names.

To do that, we would have to define properties on the object using array syntax:

```javascript
var propName = "kingdom";
animal[propName] = "Animalia";

console.log(animal.kingdom); // Animalia
```

This is kind of annoying because we _can_ define dynamically-defined properties on objects, we just can't do it within the familiar object literal syntax above.

But with ES6, we can!

```javascript
var propName = "kingdom";

function getPropertyName()
{
  return "genus";
}

var animal = {
  
  name: "Horse",
  species: "E. Ferus",
  
  [propName]: "Animalia",
  
  [getPropertyName()]: "Equus",
  
  ["FAMILY".toLowerCase()]: "Equidae"
  
};

console.log(animal.name); // Horse
console.log(animal.species); // E. Ferus
console.log(animal.kingdom); // Animalia
console.log(animal.genus); // Equus
console.log(animal.family); // Equidae
```

Here's an [ES6 Fiddle](http://www.es6fiddle.net/iaib7efa/). Have fun!

## Resources

- [MDN: Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
