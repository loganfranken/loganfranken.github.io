---
layout: blog
title: "ES6 Everyday: Static Class Members"
categories: Tutorials
redirect_from: /blog/1027/es6-everyday-static-class-members/
---

Along with [classes](http://www.loganfranken.com/blog/852/es6-everyday-classes/), ES6 also gives us **static class members**.

First, let's remind ourselves of _instance_ members:

```javascript
class PhoneNumber
{
  constructor(number)
  {
    var numberParts = number.split('-');
    this.areaCode = numberParts[0];
    this.exchange = numberParts[1];
    this.lineNumber = numberParts[2];
  }
  
  getRawNumber()
  {
    return this.areaCode + this.exchange + this.lineNumber;
  }
  
  getFormattedNumber()
  {
    return `(${this.areaCode}) ${this.exchange}-${this.lineNumber}`;
  }
}
```

So here we have a `PhoneNumber` class that takes in a number string, in the format `XXX-XXX-XXXX`, and splits it up into various properties and methods that can be referenced using an _instance_ of the `PhoneNumber` class:

```javascript
var newNumber = new PhoneNumber("123-456-7890");
console.log(newNumber.exchange); // 456
console.log(newNumber.getRawNumber()); // 1234567890
console.log(newNumber.getFormattedNumber()); // (123) 456-7890
```

These properties and methods are _instance members_. In other words, we _can't_ access them through the class itself:

```javascript
console.log(PhoneNumber.getRawNumber());
// TypeError: PhoneNumber.getRawNumber is not a function at eval
```

With the **`static` keyword**, however, we _can_ define static members:

```javascript
class PhoneNumber
{
  // (Pretend all the stuff from above is here too!)
  
  static isValidNumber(input)
  {
    return /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(input);
  }
}

console.log(PhoneNumber.isValidNumber('123456')); // false
console.log(PhoneNumber.isValidNumber('123-456-7890')); // true
```

As you can see, this method is now available at the class level. In fact, we _can't_ call this method from an instance of the class:

```javascript
console.log(newNumber.isValidNumber('123-456-7890'));
// TypeError: newNumber.isValidNumber is not a function at eval
```

Give it a spin for yourself in this [ES6 Fiddle](http://www.es6fiddle.net/i9lf18iw/)!

## Resources

- [2ality: Classes in ECMAScript 6 (final semantics)](http://www.2ality.com/2015/02/es6-classes-final.html)
- [Ode to Code: Static Members in ES6](http://odetocode.com/blogs/scott/archive/2015/02/02/static-members-in-es6.aspx)
