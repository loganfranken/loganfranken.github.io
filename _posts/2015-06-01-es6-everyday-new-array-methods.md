---
title: "ES6 Everyday: New Array Methods"
date: "2015-06-01"
categories: 
  - "development"
tags: 
  - "es6"
  - "es6everyday"
  - "javascript"
---

ES6 brings a whole slew of new `Array` methods. Let's check them out:

## Array.from

Creates a new array from an array-like object (has a `length` property and indexed elements) or an [iterable object](http://www.loganfranken.com/blog/884/es6-everyday-for-of-loops-and-the-iterable-protocol/):

```javascript
var menu = new Map();
menu.set("Hamburger", 5.50);
menu.set("Soda", 2.50);
menu.set("Fries", 3.00);

var menuArray = Array.from(menu);
console.log(menuArray[1][0]); // Soda
console.log(menuArray[1][1]); // 2.5
```

You can provide an optional mapping function as well:

```javascript
var name = "Logan";
var splitUppercaseName = Array.from(name, letter => letter.toUpperCase());
console.log(splitUppercaseName[2]); // G
```

[MDN: Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) and an [ES6 Fiddle](http://www.es6fiddle.net/iad3x1a7/).

## Array.of

Creates an array of the variable arguments passed to the function:

```javascript
var supplies = Array.of("Keyboard", "Stapler", "Binder");
console.log(supplies[1]); // Stapler
```

[MDN: Array.of()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of) and an [ES6 Fiddle](http://www.es6fiddle.net/iad429p4/).

## Array.prototype.copyWithin

This one's a little confusing: `copyWithin` overwrites elements within an array with other elements from the array:

```javascript
var letters = ["A", "B", "C", "D", "E", "F"];

// Start copying the letters *from* position 0
// *over* the letters at position 3
letters.copyWithin(3, 0);

console.log(letters); // [ "A", "B", "C", "A", "B", "C" ]
```

There's an optional parameter to indicate where the copying and overwriting should stop:

```javascript
var letters = ["A", "B", "C", "D", "E", "F"];

// Start copying the letters *from* position 0
// *over* the letters at position 3, but *stop*
// once you reach position 2
letters.copyWithin(3, 0, 2);

console.log(letters); // [ "A", "B", "C", "A", "B", "F" ]
```

[MDN: Array.prototype.copyWithin()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin) and a [JSFiddle](http://jsfiddle.net/49ao78ys/) (only works in Firefox right now).

## Array.prototype.fill

Fills an array with a value:

```javascript
var letters = ["A", "B", "C", "D", "E", "F"];

letters.fill("X");

console.log(letters); // [ "X", "X", "X", "X", "X", "X" ]
```

You can provide an optional start index:

```javascript
var letters = ["A", "B", "C", "D", "E", "F"];

letters.fill("X", 3);

console.log(letters); // [ "A", "B", "C", "X", "X", "X" ]
```

And an optional end index:

```javascript
var letters = ["A", "B", "C", "D", "E", "F"];

letters.fill("X", 2, 4);

console.log(letters); // [ "A", "B", "X", "X", "E", "F" ]
```

[MDN: Array.prototype.fill()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) and an [ES6 Fiddle](http://www.es6fiddle.net/iad5lhv8/).

## Array.prototype.find

Searches an array using a functon:

```javascript
var games = ["Spelunky", "Hotline Miami", "The Binding of Isaac"];

var favorite = games.find(title => title.startsWith("H"));
console.log(favorite); // Hotline Miami
```

[MDN: Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) and an [ES6 Fiddle](http://www.es6fiddle.net/iad4q8b9/).

## Array.prototype.findIndex

Same as above, except we return the index instead:

```javascript
var games = ["Spelunky", "Hotline Miami", "The Binding of Isaac"];

var favoriteIndex = games.findIndex(title => title.startsWith("H"));
console.log(favoriteIndex); // 1
```

[MDN: Array.prototype.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) and an [ES6 Fiddle](http://www.es6fiddle.net/iad4zr0m/).

## Array.prototype.keys

Returns an iterator that iterates over the indexes of the array:

```javascript
var fruits = ["Apple", "Pear", "Mango"];

for(let index of fruits.keys())
{
  console.log(index);
  // 0
  // 1
  // 2
}
```

[MDN: Array.prototype.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys) and an [ES6 Fiddle](http://www.es6fiddle.net/iad55qsk/).

## Array.prototype.values

The counterpart to our friend `keys()` above:

```javascript
var fruits = ["Apple", "Pear", "Mango"];

for(let value of fruits.values())
{
  console.log(value);
  // Apple
  // Pear
  // Mango
}
```

[MDN: Array.prototype.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values) and an [ES6 Fiddle](http://www.es6fiddle.net/iad59ttw/).

## Array.prototype.entries

Following the lead of `keys()` and `values()` above, `entries()` iterates over key-value pairs:

```javascript
var fruits = ["Apple", "Pear", "Mango"];

for(let entry of fruits.entries())
{
  console.log(entry[0]);
  // 0
  // 1
  // 2
  
  console.log(entry[1]);
  // Apple
  // Pear
  // Mango
}
```

[MDN: Array.prototype.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries) and an [ES6 Fiddle](http://www.es6fiddle.net/iad5e5l5/).
