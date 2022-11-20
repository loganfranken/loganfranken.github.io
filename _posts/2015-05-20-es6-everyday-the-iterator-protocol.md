---
title: "ES6 Everyday: The Iterator Protocol"
date: "2015-05-20"
categories: 
  - "development"
tags: 
  - "es6"
  - "es6everyday"
  - "javascript"
---

[Yesterday](http://www.loganfranken.com/blog/884/es6-everyday-for-of-loops-and-the-iterable-protocol/), we learned that ES6 defines a new "iterable protocol." Along with that protocol, ES6 also introduces the **"iterator protocol."**

First, what's an **"iterator"**?

An iterator is something that allows you to loop through a series of values in a sequential order. By defining an "iterator protocol," ES6 is defining how to make an "iterator" within the world of JavaScript.

To adhere to this iterator protocol, an object _must_ have a method defined called `next()` that returns an object with two properties:

- `done`: A boolean indicating whether or not you have finished looping through the series of values
- `value`: The current value produced by the iterator (omitted if `done` is true)

Let's make one:

```javascript
var lamestIteratorEver = {
  next: function()
  {
    return { done: true };
  }
}
```

Introducing: the lamest iterator ever.

To make an actual iterator that does something useful, we'll need to create a function that _generates_ an iterator:

```javascript
function getIterator()
{
  var values = ['Alligator', 'Bear', 'Lion'];
  var currIndex = 0;
  
  return {
    
    next: function() {
      
      if(currIndex >= values.length)
      {
        
        return {
          done: true
        }; 
        
      }
      else
      {
        
        return {
          done: false,
          value: values[currIndex++]
        };
        
      }
      
    }
    
  };
  
}

var myIterator = getIterator();
console.log(myIterator.next().value); // Alligator
console.log(myIterator.next().value); // Bear
console.log(myIterator.next().value); // Lion
console.log(myIterator.next().done); // true
```

Whoa, that's a lot at once:

Essentially, our `getIterator` function returns an anonymous object with a `next()` method. Due to [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) in JavaScript, this anonymous object will still have access to its own copies of the `values` and `currIndex` variables from the outer scope.

Repeated calls to the `next()` method loop through each of the values until we reach the end, where `done` is finally set to true.

This anonymous object _is_ our iterator.

Remember [yesterday](http://www.loganfranken.com/blog/884/es6-everyday-for-of-loops-and-the-iterable-protocol/) when I said: "To fully implement the `@@iterator` method, our object must use `Symbol.iterator` as a key to reference our looping method"

And gave you this example:

```javascript
iterableObject[Symbol.iterator] = function() { /* ...looping logic */ };
```

The secret here is that this mysterious function that handles looping is actually the iterator-generating function described above!

Pulling this all together:

```javascript
var greetingFactory = {};

greetingFactory[Symbol.iterator] = function()
{
  var names = ['Logan', 'George', 'Cindy'];
  var currIndex = 0;
  
  return {
    
    next: function() {
      
      return (currIndex >= names.length)
      	? { done: true }
      	: { done: false, value: `Hello, my name is ${names[currIndex++]}` };
      
    }

  };
}
```

Although I've tightened up the `return` logic in our iterator-generating function, everything is pretty much the same: we loop through a series of names, returning a greeting constructed from each name.

Instead of defining an explicit name for our function, however, we have hooked it to our `greetingFactory` using `Symbol.iterator` as a key.

Wait, does that mean we can now use `for..of` on `greetingFactory`?

```javascript
for(let greeting of greetingFactory)
{
  console.log(greeting);
  // Hello, my name is Logan
  // Hello, my name is George
  // Hello, my name is Cindy
}
```

_Nice!_

Check it out for yourself in this [ES6 Fiddle](http://www.es6fiddle.net/i9wu8i3u/).

## Resources

- [MDN: Iteration Protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
