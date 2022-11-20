---
layout: blog
title: "ES6 Everyday: Tagged Template Strings"
categories: Tutorials
redirect_from: /blog/825/es6-everyday-tagged-template-strings/
---

Remember the [template strings](http://www.loganfranken.com/blog/821/es6-everyday-template-strings/) from yesterday? Well, we can go one step further with them:

```javascript
var points = 6000;
var badgeName = "ES6 Champion";

var result = generateMessage`Congratulations! You earned ${points} points and unlocked the ${badgeName}`;

function generateMessage(inputString, firstValue, secondValue) {
  
  console.log(inputString[1]);
  // points and unlocked the
  
  console.log(firstValue);
  // 6000
  
  console.log(secondValue);
  // ES6 Champion
  
  return "Different text";
  
}
    
console.log(result);
// Different text
```

(Try it out for yourself in this [ES6 Fiddle](http://www.es6fiddle.net/i6pmuywy/)).

There's a lot going on here, so let's break this down. Basically, the following syntax:

```javascript
generateMessage`Congratulations! You earned ${points} points and unlocked the ${badgeName}`;
```

Translates to:

```javascript
generateMessage(['Congratulations! You earned ',' points and unlocked the '], points, badgeName);
```

This syntax of a function right before a template string is a **tagged template string**.

The tagged string gets split up into chunks (_sans_ the tokens) and put into an array. Next, the parameters are passed as arguments along with this array to the specified function. The basic idea here is that you can do some processing on the template string.

Addy Osmani has a [killer example](http://updates.html5rocks.com/2015/01/ES6-Template-Strings) of using this for building a HTML string.

For another example, let's make a simplistic spoiler alerter:

```javascript
function spoilers(input, ...spoilers)
{
  var output = input[0];
  
  for(var i=0; i<spoilers.length; i++)
  {
    output += `*BEGIN SPOILER* ${spoilers[i]} *END SPOILER* ${input[i + 1]}`;
  }
  
  return output;
}

var message = spoilers`He wouldn't vacation on Planet Rabulon
because the ${"Rabulons banish him in season 6"}
right after he ${"confesses to murdering their High Priestess"}.`

console.log(message);
// He wouldn't vacation on Planet Rabulon because the
// *BEGIN SPOILER* Rabulons banish him in season 6 *END SPOILER* right after he
// *BEGIN SPOILER* confesses to murdering their High Priestess *END SPOILER*.
```

(Here's the [ES6 Fiddle](http://www.es6fiddle.net/i6prdmv4/))

## Resources

- [HTML5 Rocks: Getting Literal With ES6 Template Strings](http://updates.html5rocks.com/2015/01/ES6-Template-Strings)
- [ECMAScript Wiki: Tagged Template Strings](http://tc39wiki.calculist.org/es6/template-strings/)
- [MDN: Template Strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)
