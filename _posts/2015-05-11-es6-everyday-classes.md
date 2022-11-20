---
layout: blog
title: "ES6 Everyday: Classes"
categories: Tutorials
redirect_from: /blog/852/es6-everyday-classes
---

After a week hiatus, we're back!

And, starting off this week, hold on to your pants: JavaScript has **classes**!

```javascript
class Dog
{
  bark()
  {
    console.log("Bark!");
  }
}

var spot = new Dog();
spot.bark();
```

Yup, and you get **constructors** too:

```javascript
class Person
{
  constructor(firstName, lastName)
  {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  getFullName()
  {
    return this.firstName + " " + this.lastName;
  }
}

var person = new Person("Logan", "Franken");
console.log(person.firstName); // Logan
console.log(person.getFullName()); // Logan Franken
```

Check it out for yourself in [this ES6 fiddle](http://www.es6fiddle.net/i7rxmv50/).

## Resources

- [JavaScript Playground: An introduction to ES6 classes](http://javascriptplayground.com/blog/2014/07/introduction-to-es6-classes-tutorial/)
