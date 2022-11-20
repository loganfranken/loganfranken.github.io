---
layout: blog
title: "ES6 Everyday: Spread Operator"
categories: Tutorials
redirect_from: /blog/813/es6-everyday-spread-operator
---

This one can be a little confusing at first: ES6 provides a new **spread operator** (`...`) that allows you to expand an expression into multiple elements.

Got it? Me neither.

Let's look at an example.

What if we had an array of fruits we want to buy and we want to insert them within an existing `groceryList` array:

```javascript
var fruitList = ['apple', 'strawberries', 'oranges'];

var groceryList = ['trash bags', fruitList, 'yogurt'];

// We end up with an array within an array:
// ['trash bags', ['apple', 'strawberries', 'oranges'], 'yogurt']

console.log(groceryList[1]);
// apple,strawberries,oranges
```

In the example above, the array is just sitting within the other array. But with the spread operator:

```javascript
var fruitList = ['apple', 'strawberries', 'oranges'];

var groceryList = ['trash bags', ...fruitList, 'yogurt'];

// Now we have just one array:
// ['trash bags', 'apple', 'strawberries', 'oranges', 'yogurt']

console.log(groceryList[1]);
// apple

console.log(groceryList[2]);
// strawberries
```

The array has been expanded into just another list of elements. Cool, right?

(Check it out for yourself in a [ES6 Fiddle](http://www.es6fiddle.net/i8ixnd0d/).)

## Resources

- [MDN: Spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)
- [Ariya Hidayat's Blog: ECMAScript 6 and Spread Operator](http://ariya.ofilabs.com/2013/03/es6-and-spread-operator.html)
