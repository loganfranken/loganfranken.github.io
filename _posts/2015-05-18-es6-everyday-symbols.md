---
title: "ES6 Everyday: Symbols"
date: "2015-05-18"
categories: 
  - "development"
tags: 
  - "es6"
  - "es6everyday"
  - "javascript"
---

Alright, get yourself a cup of coffee: this one can be confusing.

With ES6, we have a new primitive data type called the **symbol**:

```javascript
var newSymbol = Symbol();
```

You'll notice I left off `new` here. That's not a typo:

```javascript
var newSymbol = new Symbol();
// TypeError: Symbol is not a constructor at new Symbol
```

A **symbol** is _unique_ and _immutable_ (can't change):

```javascript
var newSymbol = Symbol();
var otherSymbol = Symbol();
console.log(newSymbol == otherSymbol); // false
```

We can provide an optional description for our symbol if we want:

```javascript
var symbolA = Symbol();
var symbolB = Symbol("My new symbol");

console.log(symbolA.toString()); // Symbol()
console.log(symbolB.toString()); // Symbol(My new symbol)
```

(Notice I have to explicitly call `toString()` here, symbols can not be coerced into strings)

Uhh, _neato_?

Really, though, what are we supposed to do with this weird new data type?

Well, given a symbol is both unique and immutable, it's a perfect candidate for a **key**:

```javascript
var STUDENT_ID = Symbol('Student ID');

class Student
{
  constructor(studentId)
  {
    this[STUDENT_ID] = studentId;
  }
}

var george = new Student('123456');
console.log(george[STUDENT_ID]); // 123456
```

Now we can refer to this student ID property without depending on a loose, arbitrary string.

Similarly, symbols can provide a common key _across_ different implementations:

```javascript
var MAKE_SOUND = Symbol();

var cat = {};
cat[MAKE_SOUND] = function() { console.log("Meow!"); };

class Dog
{
  constructor()
  {
    this[MAKE_SOUND] = function() { console.log("Woof!"); };
  }
}

var dog = new Dog();

var animal = cat;
animal[MAKE_SOUND](); // Meow!

animal = dog;
animal[MAKE_SOUND](); // Woof!
```

In both the case of the `Dog class` and the `Cat anonymous object`, the common `MAKE_SOUND` symbol identifies a method that makes a sound.

I could extend this and write something that depends on this function existing:

```javascript
function echo(target) {
  
  // Make sound three times
  target[MAKE_SOUND]();
  target[MAKE_SOUND]();
  target[MAKE_SOUND]();
  
}

echo(dog); // Woof! Woof! Woof!
```

Of course, our symbols will disappear as soon as we leave this scope, so how can we use them globally? Using `Symbol.for`:

```javascript
// The symbol is created
var symbolA = Symbol.for("New symbol");

// The existing symbol is retrieved
var symbolB = Symbol.for("New symbol");

console.log(symbolA == symbolB); // true
```

If a global symbol corresponding to the key "New symbol" doesn't already exist, it gets created. Otherwise, the existing symbol is returned.

We can work backwards, getting the key corresponding to a symbol using `Symbol.keyFor`:

```javascript
console.log(Symbol.keyFor(symbolB)); // "New symbol"
```

Try messing around with symbols for yourself in this [ES6 fiddle](http://www.es6fiddle.net/i9rgxe5q/).

## Resources

- [MDN: Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [2ality: Symbols in ECMAScript 6](http://www.2ality.com/2014/12/es6-symbols.html)
- [Ode to Code: Symbols in ES6](http://odetocode.com/blogs/scott/archive/2015/01/26/symbols-in-es6.aspx)
