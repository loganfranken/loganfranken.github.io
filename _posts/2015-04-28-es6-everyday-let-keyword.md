---
layout: blog
title: "ES6 Everyday: let Keyword"
categories: Tutorials
redirect_from: /blog/845/es6-everyday-let-keyword/
---

JavaScript does something you might not expect with local variable scoping:

```javascript
function calculate(input)
{
  var i = 100;
  
  for(var i=0; i<input; i++)
  {
    // Perform some calculation
  }
  
  return i;
}

console.log(calculate(20)); // 100, right?
```

(Sorry, I know how stupid this example is: I couldn't come up with anything better)

We've declared the variable `i` in two scopes within our function: (1) at the function level and (2) within the for loop scope.

There's something strange going on here: if you're coming from a language with traditional block-level scoping rules, we might expect that the result would be 100 since it appears we are returning the `i` from that function level scope.

But it's not: it's 20.

This is because JavaScript scopes local variables to the function level. In other words, our code gets translated as follows:

```javascript
function calculate(input)
{
  var i = 100;
  
  // We are reassigning i, NOT declaring a new i in a inner scope
  for(i=0; i<input; i++)
  {
    // Perform some calculation
  }
  
  return i;
}

console.log(calculate(20)); // 100, right?
```

But the `let` keyword in ES6 is here to help:

```javascript
function calculate(input)
{
  var i = 100;
  
  for(let i=0; i<input; i++)
  {
    // Perform some calculation
  }
  
  return i;
}

console.log(calculate(20)); // 100
```

With the `let` keyword, we now have true block-level scoping!

## Resources

- [MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
