---
layout: blog
title: "ES6 Everyday: New String Methods"
categories: Tutorials
redirect_from: /blog/869/es6-everyday-new-string-methods/
---

Let's end the week with an easy topic: some handy new String methods in ES6.

## String.prototype.repeat()

```javascript
console.log("bum ".repeat(3)); // "bum bum bum"
```

[MDN: String.prototype.repeat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat) and a [ES6 Fiddle](http://www.es6fiddle.net/i7vzhh9u/).

## String.prototype.startsWith()

```javascript
var quote = "Toto, I've a feeling we're not in Kansas anymore.";
console.log(quote.startsWith("Toto")); // true
console.log(quote.startsWith("feeling")); // false
```

There's an optional position parameter that can be used to control which position is considered the start of the string:

```javascript
var quote = "Toto, I've a feeling we're not in Kansas anymore."
console.log(quote.startsWith("feeling", 13)); // true
```

[MDN: String.prototype.startsWith()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startswith) and a [ES6 Fiddle](http://www.es6fiddle.net/i8vrgmro/).

## String.prototype.endsWith()

```javascript
var quote = "I'm going to make him an offer he can't refuse";
console.log(quote.endsWith("refuse")); // true
console.log(quote.endsWith("offer")); // false
```

As with `startsWith`, there's a position parameter to control which position is considered the _end_ of the string:

```javascript
var quote = "I'm going to make him an offer he can't refuse";
console.log(quote.endsWith("offer", 30)); // true
```

[MDN: String.prototype.endsWith()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endswith) and a [ES6 Fiddle](http://www.es6fiddle.net/i8vrhfd6/).

## String.prototype.includes()

I know it's small, but I'm really excited about this one:

```javascript
var quote = "Go ahead, make my day.";
console.log(quote.includes('ahead')); // true
console.log(quote.includes('night')); // false
```

That's right, no more `indexOf` nonsense!

There's also an optional position parameter here, that behaves the same as the `startsWith` position parameter:

```javascript
var quote = "Go ahead, make my day.";
console.log(quote.includes('ahead', 10)); // false
```

[MDN: String.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes) and a [ES6 Fiddle](http://www.es6fiddle.net/i8vrckbc/).
