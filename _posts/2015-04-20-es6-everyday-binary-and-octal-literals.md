---
layout: blog
title: "ES6 Everyday: Binary and Octal Literals"
categories: Tutorials
redirect_from: /blog/817/es6-everyday-binary-and-octal-literals
---

Here's a nice and easy one to start our week; you can now represent **binary** and **octal** numbers with literals:

```javascript
console.log(parseInt("101011", 2)); // 43
console.log(0b101011); // 43

console.log(parseInt("0543", 8)); // 355
console.log(0o543); // 355
```

Check it out for yourself in a [ES6 Fiddle](http://www.es6fiddle.net/i6pj11yk/).

## Resources

- [GitHub: ES6 Features: Binary and Octal Literals](https://github.com/lukehoban/es6features#binary-and-octal-literals)
