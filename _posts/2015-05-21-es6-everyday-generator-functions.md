---
title: "ES6 Everyday: Generator Functions"
date: "2015-05-21"
categories: 
  - "development"
tags: 
  - "es6"
  - "es6everyday"
  - "javascript"
---

Remember [yesterday](http://www.loganfranken.com/blog/886/es6-everyday-the-iterator-protocol/) when I showed you how to write a function that would _generate_ an iterator?

```javascript
function getIterator()
{
  var values = ['Alligator', 'Bear', 'Lion'];
  var currIndex = 0;
  
  return {
    
    next: function() {
      
      return currIndex >= values.length
        ? { done: true }
      	: { done: false, value: values[currIndex++] };
      
    }
    
  };
}

var myIterator = getIterator();
console.log(myIterator.next().value); // Alligator
console.log(myIterator.next().value); // Bear
console.log(myIterator.next().value); // Lion
console.log(myIterator.next().done); // true
```

Cool and all, but _phew_, that's a lot to write.

Luckily, ES6 provides an easier way to write these functions that _generate_ iterators. Actually, they are called **generator functions** and you define them using **`function*`**:

```javascript
function* myGeneratorFunction()
{
}
```

Within our generator function, we can use the **`yield`** keyword to sequentially return values:

```javascript
function* getIterator()
{
  yield "Alligator";
  yield "Bear";
  yield "Lion";
}

var iterator = getIterator();
console.log(iterator.next().value); // Alligator
console.log(iterator.next().value); // Bear
console.log(iterator.next().value); // Lion
console.log(iterator.next().done); // true
```

These generator functions return a [Generator object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator), an object that adheres to both the [iterable](http://www.loganfranken.com/blog/884/es6-everyday-for-of-loops-and-the-iterable-protocol/) and [iterator protocols](http://www.loganfranken.com/blog/886/es6-everyday-the-iterator-protocol/).

So, of course, we can use them in a `for..of` loop:

```javascript
function* getMenu()
{
  yield "Steak";
  yield "Mashed Potatoes";
  yield "Porter";
}

for(let item of getMenu())
{
  console.log(item); // Steak, Mashed Potatoes, Porter
}
```

And, if you're wondering, yes, you can have anonymous generator functions too:

```javascript
var getPalette = function*()
{
  yield "Blue";
  yield "Red";
  yield "Orange";
}
```
