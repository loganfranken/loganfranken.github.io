---
layout: blog
title: "ES6 Everyday: Rest Parameters"
categories: Tutorials
redirect_from: /blog/807/es6-everyday-rest-parameters
---

With ES6, you can now provide a **rest parameter** to a function that takes a variable amount of parameters and passes them as an array to a function. First thing I thought of creating with this was a simple string formatting function:

```javascript
function formatString(input, ...args)
{
  var output = input;
  
  for(var i=0; i<args.length; i++) {
    output = output.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
  }
  
  return output;
}

console.log(formatString("Invalid {0} provided. A {1} must be provided for {0}.", "age", "number"));
// Invalid age provided. A number must be provided for age.
```

Try it yourself in this [ES6 Fiddle](http://www.es6fiddle.net/i6pgl2p6/).

## Resources

- [Ariya Hidayat's Blog: ECMAScript 6 and Rest Parameter](http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
- [ECMAScript Wiki: Rest Parameters](http://tc39wiki.calculist.org/es6/rest-parameters/)
