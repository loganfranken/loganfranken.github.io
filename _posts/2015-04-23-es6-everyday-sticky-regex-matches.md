---
title: "ES6 Everyday: Sticky Regex Matches"
date: "2015-04-23"
categories: 
  - "development"
tags: 
  - "es6"
  - "es6everyday"
  - "javascript"
---

So you know the `lastIndex` property of regular expressions in JavaScript? If not, here's a review:

```javascript
var message = "Today, the man and the dog went to the park."

var pattern = /the [a-zA-Z]+/g;

// First match
console.log(pattern.exec(message)); // "the man"
console.log(pattern.lastIndex); // 10


// Second match
console.log(pattern.exec(message)); // "the dog"
console.log(pattern.lastIndex); // 22


// Third match
console.log(pattern.exec(message)); // "the park"
console.log(pattern.lastIndex); // 38
```

As you can see, when we use the global (`g`) flag to return all instances of the string "the", our `RegExp` finds an occurrence on each call to `exec`, sets the `lastIndex` to mark where the occurrence ends within the string, and then starts from that `lastIndex` marker in the next call to `exec`.

If we remove the global flag, however, our pattern will only match the first occurrence:

```javascript
var message = "Today, the man and the dog went to the park."

var pattern = /the [a-zA-Z]+/;

// First match
console.log(pattern.exec(message)); // "the man"
console.log(pattern.lastIndex); // 0


// Second match
console.log(pattern.exec(message)); // "the man"
console.log(pattern.lastIndex); // 0

pattern.lastIndex = 10;

// Third match
console.log(pattern.exec(message)); // "the man"
console.log(pattern.lastIndex); // 10
```

You can see that even setting `lastIndex` doesn't do anything for us here: the property gets updated but we still only get the first result.

With ES6, we can now use the **"sticky" flag (`y`)** to control exactly where the `RegExp` looks for the pattern:

```javascript
var message = "Today, the man and the dog went to the park."

var pattern = /the [a-zA-Z]+/y;

console.log(pattern.exec(message)); // null
console.log(pattern.lastIndex); // 0

pattern.lastIndex = 19;

console.log(pattern.exec(message)); // "the dog"
console.log(pattern.lastIndex); // 26

console.log(pattern.exec(message)); // null
console.log(pattern.lastIndex); // 0
```

You'll notice that we get no matches in our first attempt because no matches occur specifically at position 0 in the string. Once we set `lastIndex` to position 19, we find the match at that location. The `lastIndex` property gets updated again (just like with the global flag), but since we don't find anything in position 26, it gets reset to zero again.

(Here's a [JSFiddle](https://jsfiddle.net/jLyx5zqk/) to check this out, although it only worked in Firefox for me)

## Resources

- [MDN: RegExp.lastIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)
- [MDN: RegExp.prototype.sticky](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky)
