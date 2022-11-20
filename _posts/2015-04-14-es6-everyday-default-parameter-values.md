---
layout: blog
title: "ES6 Everyday: Default Parameter Values"
categories: Tutorials
redirect_from: /blog/800/es6-everyday-default-parameter-values
---

Our first one's pretty self-explanatory: with ES6, you can now provide **default values** for function parameters:

```javascript
function getWelcomeMessage(name, greeting="Hello") {
  return greeting + " " + name + "! Welcome to the app!";
}

console.log(getWelcomeMessage("Logan"));
// Hello Logan! Welcome to the app!

console.log(getWelcomeMessage("Gordon", "Good evening"));
// Good evening Gordon! Welcome to the app!
```

Try it out for yourself in this [ES6 Fiddle](http://www.es6fiddle.net/i6pef3rb/).

## Resources

- [ECMAScript Wiki: Default parameter values](http://tc39wiki.calculist.org/es6/default-parameter-values/)
