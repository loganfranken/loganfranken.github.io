---
layout: blog
title: "ES6 Everyday: Modules"
categories: Tutorials
redirect_from: /blog/906/es6-everyday-modules/
---

For a lot of longtime JavaScript developers (and especially those from the Node world), this is long overdue: yes, ES6 has **modules**.

When writing a JavaScript-heavy application, things always seem to start simply:

```javascript
function displayCampingSites() {
  // ...logic to display camping sites
}
```

And then things get a little more complex:

```javascript
function getCampingSites() {
  // ...logic to pull camping sites from an API
}

function parseCampingSites() {
  // ...logic to parse data from API
}

function displayCampingSites() {
  // ...logic to display camping sites
}
```

And, then, even more complex:

```javascript
function getUserLocation() { /* ... */ }
function getGeoBoundingBox() { /* ... */ }
function getCampingApiUri() { /* ... */ }
function makeJsonpRequest() { /* ... */ }
function getCampingSites() { /* ... */ }
function parseCampingSites() { /* ... */ }
function displayCampingSites() { /* ... */ }>
```

Until you've got a single JavaScript file stuffed to the brim with all of your code.

ES6 introduces a **module** syntax that lets you split this logic off into separate files.

You start by siphoning off your code into a module and _exporting_ the members for public consumption using the **`export`** keyword:

```javascript
// In a separate file: "geolocation.js"

export function getUserPosition() {
  // ...logic to get a user's current geolocation position
}
```

And then importing that module using the **`import`** keyword:

```javascript
// In a separate file: "main.js"

import Geolocation from "geolocation.js";

Geolocation.getUserPosition()
```

As you can see, this puts `Geolocation` into the current scope with the member that we exported using `export`.

We aren't tied to any specific name for our module:

```javascript
import GeoUtility from "geolocation.js";

GeoUtility.getUserPosition();
```

We can also export multiple members, including variables:

```javascript
// In a separate file: "geo-math.js"

export var defaultRadius = 20;

export function convertLatLonToXY() { /* ... */ }

export function convertXYToLatLon() { /* ... */ }
```

Which, if we like, we can express more cleanly as follows:

```javascript
// In a separate file: "geo-math.js"

var defaultRadius = 20;

function convertLatLonToXY() { /* ... */ }

function convertXYToLatLon() { /* ... */ }

export { defaultRadius, convertLatLonToXY, convertXYToLatLon };
```

To import these multiple members, we can do the same thing as before:

```javascript
import GeoMath from "geo-math.js";

GeoMath.convertLatLonToXY();
```

Or we can import individual members, in which case the individual members get dumped into our current scope:

```javascript
import { defaultRadius, convertLatLonToXY } from "geo-math.js";

console.log(defaultRadius); // 20
convertLatLonToXY();
```

And we can provide aliases as well:

```javascript
import { convertLatLonToXY as latLonToXY } from "geo-math.js";

latLonToXY();
```

Unfortunately, you can't really see this one live in browsers yet: to try it for yourself, you'll need to make use of a transpiler or polyfill; this [24 Ways article](http://24ways.org/2014/javascript-modules-the-es6-way/) includes a number of resources for using ES6 modules today.

## Resources

- [MDN: import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [2ality: ECMAScript 6 Modules](http://www.2ality.com/2014/09/es6-modules-final.html)
- [Brief Overview of ES6 Module Syntax](https://github.com/ModuleLoader/es6-module-loader/wiki/Brief-Overview-of-ES6-Module-syntax)
- [JavaScript Modules the ES6 Way](http://24ways.org/2014/javascript-modules-the-es6-way/)
