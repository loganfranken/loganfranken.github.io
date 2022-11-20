---
title: "ES6 Everyday: New Number Methods and Properties"
date: "2015-05-01"
categories: 
  - "development"
tags: 
  - "es6"
  - "es6everyday"
  - "javascript"
---

(After this post, I'll be taking a week off, so I'll see you all in a week!)

## New Methods

A couple new methods have been added on to the `Number` object:

- [Number.isInteger()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger): Determines whether or not a value is an integer
- [Number.isSafeInteger()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger): Determines whether or not a value is a "safe" integer (essentially, whether or not the value can be exactly represented as an IEEE-754 double precision number)

## Moved Methods

A couple methods that were originally global methods have now been moved to the `Number` object:

- [Number.isFinite()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite): Determines if a value is a finite number
- [Number.isNaN()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN): Determines if a value is `NaN`

In their global forms, both of these methods would convert a non-number parameter into a number. This is no longer true.

## New Properties

Along with new methods, some new properties have been added too:

- [Number.EPSILON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON): Equal to the difference between 1 and the smallest value greater than 1
- [Number.MAX\_SAFE\_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER): Equal to the maximum safe integer
- [Number.MIN\_SAFE\_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER): Equal to the minimum safe integer
