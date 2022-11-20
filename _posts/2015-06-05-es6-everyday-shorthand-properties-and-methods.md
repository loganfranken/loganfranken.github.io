---
layout: blog
title: "ES6 Everyday: Shorthand Properties and Methods"
categories: Tutorials
redirect_from: /blog/910/es6-everyday-shorthand-properties-and-methods/
---

Take a look at this:

```javascript
var name = "Logan";
var age = 27;

var person = {
  
  name: name,
  age: age
  
};

console.log(person.name); // Logan
```

Something about `name: name` and `age: age` seems so silly and redundant, right?

ES6 agrees and provides us with a **shorthand property** syntax:

```javascript
var name = "Logan";
var age = 27;

var person = {
  
  name,
  age
  
};

console.log(person.name); // Logan
```

Here we are just plopping a reference to our `name` variable directly in the object literal, which ES6 expands for us into a property.

Similarly, didn't the syntax for specifying a function in an object literal always seem a little verbose to you?

```javascript
var person = {
  
  greet: function() {
    console.log('Hello!');
  }
  
};

person.greet(); // Hello!
```

Well, ES6 provides us with a **shorthand method** syntax too:

```javascript
var person = {
  
  greet() {
    console.log('Hello!');
  }
  
};

person.greet(); // Hello!
```

Hey! Take this for a spin yourself in an [ES6 Fiddle](http://www.es6fiddle.net/iaj75fvo/) and enjoy your weekend!

## Resources

- [MDN: Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
- [Ariya Hidayat's Blog: ECMAScript 6 and Object Literal Property Value Shorthand](http://ariya.ofilabs.com/2013/02/es6-and-object-literal-property-value-shorthand.html)
