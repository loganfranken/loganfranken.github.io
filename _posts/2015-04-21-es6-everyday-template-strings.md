---
layout: blog
title: "ES6 Everyday: Template Strings"
categories: Tutorials
redirect_from: /blog/821/es6-everyday-template-strings
---

I'm pretty pumped about this one.

ES6 introduces **template strings**, delimited by back ticks:

```javascript
var message = `Order submitted.`;

console.log(message); // Order submitted
```

I know, I know, nothing exciting yet. But check this out: with template strings, you can now have **multiline strings**:

```javascript
var message = `Order submitted.

Thank you for submitting your order!`;
```

Not only that, the real magic of template strings is **string interpolation**:

```javascript
var orderNumber = "5678";
var message = `Order ${orderNumber} submitted!`

console.log(message);
// Order 5678 submitted!
```

And string interpolation doesn't just stop at swapping out simple variables; you can stick code in there too:

```javascript
var orderNumber = "5678";

var price = "10";
var quantity = "3";

function getCustomerName()
{
  return "Abraham Lincoln";
}

var message = `Order #${orderNumber} submitted for \$${price * quantity}.

Thank you, ${getCustomerName()}, for submitting your order!`;

console.log(message);
// Order #5678 submitted for $30. Thank you, Abraham Lincoln, for submitting your order!
```

Give it a spin for yourself in this [ES6 Fiddle](http://www.es6fiddle.net/i6plw1dg/)

## Resources

- [HTML5 Rocks: Getting Literal With ES6 Template Strings](http://updates.html5rocks.com/2015/01/ES6-Template-Strings)
- [ECMAScript Wiki: Template Strings](http://tc39wiki.calculist.org/es6/template-strings/)
- [MDN: Template Strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)
