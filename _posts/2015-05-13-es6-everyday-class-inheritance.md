---
layout: blog
title: "ES6 Everyday: Class Inheritance"
categories: Tutorials
redirect_from: /blog/855/es6-everyday-class-inheritance
---

Continuing our exploration of classes in ES6, we also get **classical-style inheritance** too.

Again, here's a class in ES6:

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

Let's create a class that "inherits" from the `Person` class using the ES6 `extends` keyword:

```javascript
class Student extends Person
{
}

var student = new Student("John", "Doe");
console.log(student.getFullName()); // John Doe
```

Nice! As you can see, we automatically get access to the `getFullName` method declared on our parent class `Person`. But what if we want to add our own constructor to `Student`?

```javascript
class Student extends Person
{
  constructor(firstName, lastName, classLevel)
  {
    this.classLevel = classLevel;
  }
}

var student = new Student("John", "Doe", "Undergraduate");
console.log(student.classLevel); // Undergraduate
console.log(student.getFullName()); // undefined undefined
```

Hrm, that's not quite right: how do we access our parent constructor in `Person`? With the `super` keyword!

```javascript
class Student extends Person
{
  constructor(firstName, lastName, classLevel)
  {
    this.classLevel = classLevel;
    super(firstName, lastName);
  }
}

var student = new Student("John", "Doe", "Undergraduate");
console.log(student.classLevel); // Undergraduate
console.log(student.getFullName()); // John Doe
```

Bingo!

Take it for a spin for yourself in [this ES6 fiddle](http://www.es6fiddle.net/i7ry3q3l/).
