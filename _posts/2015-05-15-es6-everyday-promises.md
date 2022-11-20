---
title: "ES6 Everyday: Promises"
date: "2015-05-15"
categories: 
  - "development"
tags: 
  - "es6"
  - "es6everyday"
  - "javascript"
---

Let's close out the week with something really exciting!

If you've been doing JavaScript for awhile, then you're all-too-familiar with the asynchronous nature of JavaScript and the concept of callbacks. If not, let's review:

Let's say you have a function that takes awhile, like animating a block across a screen:

```javascript
function moveBlock() {
   // ...long-running code for animation
}
```

Since we likely won't be able to (and wouldn't want to) block the main thread of execution while the block is moving across the screen, we provide a "callback" parameter where a developer can pass in a function that executes once the animation is complete:

```javascript
function moveBlock(onFinished) {
   // ...long-running code for animation

   // After the animation has finished:
   onFinished();
}
```

So we would use this as follows:

```javascript
moveBlock(function() {
   console.log("The animation has finished!");
});
```

On top of this, we may also want to provide a callback if an error occurs:

```javascript
function moveBlock(onFinished, onError) {
   try
   {
      // ...long-running code for animation

      // After the animation has finished:
      onFinished();
   }
   catch(e)
   {
      onError(e);
   }
}
```

Which now stretches out our example as follows:

```javascript
moveBlock(

   function() {
      console.log("The animation has finished!");
   },

   function() {
      console.log("An error occurred while we were animating!");
   }
);
```

And, finally, if we wanted to pass in parameters to control the behavior of `moveBlock`, those arguments would need to sit alongside our callbacks:

```javascript
function moveBlock(distance, onFinished, onError) {
   // ...code from above
}
```

Which we would call as follows:

```javascript
moveBlock(30, function() {}, function() {});
```

A real-life example of this is the [HTML5 geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation):

```javascript
navigator.geolocation.getCurrentPosition(

  // On success
  function(position) {

    // We now have the user's position
    console.log(position.coords.latitude);

  },

  // On error
  function(error) {

    // Something happened while trying to get the user's position

  },

  // Settings
  {
    enableHighAccuracy: true
  }

);
```

As you can see, callbacks can lead to a bit of a mess: not only are we defining all of our callback logic within parameter lists, the order and purpose of the callbacks in the parameter list are completely arbitrary.

To help alleviate this, ES6 provides us with **promises**. With promises, we can now write our asynchronous functions to work like this:

```javascript
moveBlock(30)
   .then(function() { console.log("The animation has finished!"); })
   .catch(function() { console.log("An error occurred while we were animating!"); });
```

Promises are a little confusing at first, but the basic idea here is that `moveBlock` now returns a `Promise` object with a `then()` method where you can assign your "on success" callback and a `catch()` method where you can assign your "on error" callback.

Here's how we would implement this:

```javascript
function moveBlock(distance) {
   return new Promise(function(resolve, reject) {
      try
      {
         // ...long-running code for animation

         // After the animation has finished:
         resolve();
      }
      catch(e)
      {
         reject(e);
      }
   });
}
```

You'll note it's pretty similar to our logic before, except that we immediately return a new `Promise` object from `moveBlock`. The `Promise` class has a constructor which takes a function that takes two callback functions of its own (`resolve` and `reject`), which we use to indicate when our asynchronous operation has either succeeded or failed.

Here's another example where we have rewritten `getCurrentPosition` to use promises:

```javascript
function getPosition(settings) {

   return new Promise(function(resolve, reject) {

      navigator.geolocation.getCurrentPosition(

         // On Success
         function(position) {
            resolve(position);
         },

         // On Error
         function(error) {
            reject(error);
         },

         settings

      );

   });
}
```

Which now we can call as follows:

```javascript
getPosition({enableHighAccuracy: true})
   .then(function(position) { console.log(position.coords.latitude); })
```

Have a good weekend!

## Resources

- [MDN: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
