---
layout: blog
title: "A Closer Look at Minification"
categories: Research
redirect_from: /blog/725/a-closer-look-at-minification
---

Here's an embarrassing anecdote: when I entered the [JS13K competition](http://www.loganfranken.com/blog/603/what-i-learned-from-js13k/), I was under the impression that the entire, uncompressed file size of your submission had to be under 13 kilobytes.

That's not true.

The entire, _compressed_ zip archive needs to be under 13 kilobytes.

On the night before the submission deadline, I did some final bug fixes here and there and then sent my JavaScript through a minification tool. To my dismay, it came out to _18k_, a whole 5k over the mark (or what I thought was the mark).

So that's when I did the unthinkable: I [hand-minified the file down to size](https://twitter.com/loganfranken/status/510519277469040641) with a series of nerve-wracking find-and-replaces.

## Vanilla Minification

Up until that point, this is how I thought about minification: you put the finishing touches on your JavaScript, pass it off to a minifier like [YUI Compressor](http://yui.github.io/yuicompressor/), admire the smaller file size, and move onto something else. In other words, I never really took a closer look at the process because I never had a hard-and-fast benchmark.

But now I did.

## The Set-up

The source for the game had some interesting characteristics in regards to minification. Here's some code with a similar structure:

```
// Utility namespace
var UTILITY = {

  getRandomNumber: function(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
  }

};

// Global settings object
var GAME_SETTINGS = {
  LowerBound: 0,
  UpperBound: 10
};

// Game constructor
function Game() {
  this.targetNumber = UTILITY.getRandomNumber(GAME_SETTINGS.LowerBound, GAME_SETTINGS.UpperBound);
}

Game.prototype.guess = function(guessNumber) {
  return (guessNumber === this.targetNumber);
}

// Play the game
var game = new Game();
for(var i=0; i<=GAME_SETTINGS.UpperBound; i++) {

  if(game.guess(i)) {
    console.log(i + " was the secret number!");
  }

}
```

There are two things to note here:

First, I'm using a **basic form of namespacing**, using object literals with uppercase names. `GAME_SETTINGS` is an exception: instead of defining a namespace, it defines a global set of key-value pairs.

Second, the code to define the game and to launch the game are all next to each other, so there's **no need to preserve a public interface** for later scripts. In other words, the minifier tool is free to mangle the namespace, class, function, and variable names all it wants, as long as the references still hold together internally.

## Let's Minify

With that, let's try running the code above through [UglifyJS2](https://github.com/mishoo/UglifyJS2) with only the default options:

```
var UTILITY={getRandomNumber:function(min,max){return Math.floor(Math.random()*(max+1-min)+min)}};var GAME_SETTINGS={LowerBound:0,UpperBound:10};function Game(){this.targetNumber=UTILITY.getRandomNumber(GAME_SETTINGS.LowerBound,GAME_SETTINGS.UpperBound)}Game.prototype.guess=function(guessNumber){return guessNumber===this.targetNumber};var game=new Game;for(var i=0;i<=GAME_SETTINGS.UpperBound;i++){if(game.guess(i)){console.log(i+" was the secret number!")}}
```

As you can see, the code's only been through some bare compression (removal of spaces and line breaks): it weighs in at **1,461 characters**.

Let's try enabling UglifyJS's "mangle" (`-m`) option:

```
var UTILITY={getRandomNumber:function(e,r){return Math.floor(Math.random()*(r+1-e)+e)}};var GAME_SETTINGS={LowerBound:0,UpperBound:10};function Game(){this.targetNumber=UTILITY.getRandomNumber(GAME_SETTINGS.LowerBound,GAME_SETTINGS.UpperBound)}Game.prototype.guess=function(e){return e===this.targetNumber};var game=new Game;for(var i=0;i<=GAME_SETTINGS.UpperBound;i++){if(game.guess(i)){console.log(i+" was the secret number!")}}
```

With mangling enabled, UglifyJS has gone ahead and renamed some variables that it knows it can "safely" rename. For example, it knows the `max` local variable in the `getRandomNumber` function won't be used anywhere outside that function, so why not rename it to the shorter `r`? With that, we shave off 30 characters, getting our total down to **1,431 characters**.

Honestly, this is what I usually deemed as "minified" in the past: we've removed unnecessary white space and shortened variable names where we can. But, just looking at the code, you can see there's so much more that could be done. Look at those lengthy, repeated namespace names. Look at those wordy function names that will never get called beyond the current scope.

One minifcation trick I've heard mentioned here and there is stuffing all of your code into a self-executing function: that way everything sits in a local function scope where the minifier can feel more comfortable mangling things. Luckily, UglifyJS has an option for this built-in (`-e`). Let's give it a shot:

```
(function(){var r={getRandomNumber:function(r,e){return Math.floor(Math.random()*(e+1-r)+r)}};var e={LowerBound:0,UpperBound:10};function o(){this.targetNumber=r.getRandomNumber(e.LowerBound,e.UpperBound)}o.prototype.guess=function(r){return r===this.targetNumber};var n=new o;for(var t=0;t<=e.UpperBound;t++){if(n.guess(t)){console.log(t+" was the secret number!")}}})();
```

We pick up a few extra characters because of the enclosing `(function() { })();`, but you can see that UglifyJS was a little more aggressive with mangling, specifically with the namespaces, getting us down to **1,373 characters**.

## The Finale

At this point, I kept fiddling around with [UglifyJS options](https://github.com/mishoo/UglifyJS2#compressor-options), but could never get it to condense down much further. To be fair, though, it's gotten us pretty far.

Next, I decided to give Google's [Closure Compiler](https://developers.google.com/closure/compiler/) a shot. Here's a run-through with the default options:

```
var UTILITY={getRandomNumber:function(a,b){return Math.floor(Math.random()*(b+1-a)+a)}},GAME_SETTINGS={LowerBound:0,UpperBound:10};function Game(){this.targetNumber=UTILITY.getRandomNumber(GAME_SETTINGS.LowerBound,GAME_SETTINGS.UpperBound)}Game.prototype.guess=function(a){return a===this.targetNumber};for(var game=new Game,i=0;i<=GAME_SETTINGS.UpperBound;i++)game.guess(i)&&console.log(i+" was the secret number!");
```

Big whoop, right? We're back at **1,418 characters** with the usual white space removal and cautious mangling that we expect.

But let's give the [`ADVANCED_OPTIMIZATIONS` flag](https://developers.google.com/closure/compiler/docs/compilation_levels) a go:

```
for(var a=new function(){this.a=Math.floor(11*Math.random()+0)},b=0;10>=b;b++)b===a.a&&console.log(b+" was the secret number!");
```

_Holy crap_: **129 characters**.

The biggest change is that the Google Closure Compiler has went through and inlined the calls to our functions (changing them from true, separated function calls to local, inline statements). The entire namespacing structure has been effectively torn down and smashed into the smallest space possible.
