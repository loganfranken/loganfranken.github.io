---
layout: blog
title: "ES6 Everyday: Arrow Functions"
categories: Tutorials
redirect_from: /blog/850/es6-everyday-arrow-functions
---

Get ready for a fun one!

You know how to write a function in JavaScript:

```javascript
function logSquareRoot(input)
{
  console.log(Math.sqrt(input));
}

logSquareRoot(16); // 4
```

Now let's change this to an anonymous function that gets called on each member of an array:

```javascript
[16, 36, 64].forEach(function(input) {
  
  console.log(Math.sqrt(input));
  
}); // 4, 6, 8
```

With ES6, we now have **arrow functions** that simplify this quite a bit:

```javascript
[16, 36, 64].forEach((input) => {
  
  console.log(Math.sqrt(input));
  
}); // 4, 6, 8
```

And, since our function only has one argument, we can remove those parentheses too:

```javascript
[16, 36, 64].forEach(input => {
  
  console.log(Math.sqrt(input));
  
}); // 4, 6, 8
```

Neat, eh?

## Resources

- [MDN: Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
