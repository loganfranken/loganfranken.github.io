---
layout:	blog
title: Capturing Cursor Speed with jQuery
categories: Projects
redirect_from: /blog/49/capturing-cursor-speed/
---
I’ve been playing around with the canvas element lately, and I came up with a few fun ideas that would require capturing the speed of the User’s cursor movements. I looked around a little and only found a few bare scripts here and there, so I decided to package the logic into a jQuery plug-in called **Cursometer**.

## How to Use

Using Cursometer is easy. Simply include the core jQuery library (1.6.2+) and the [Cursometer plug-in script](https://raw.githubusercontent.com/loganfranken/Cursometer/master/script/jquery.cursometer.1.0.0.js):

{% highlight html %}
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
<script src="script/jquery.cursometer.1.0.0.js"></script>
{% endhighlight %}

And then hook up Cursometer to an element:

{% highlight javascript %}
$('canvas').cursometer();
{% endhighlight %}

Now Cursometer will start tracking the speed of the User’s cursor movements whenever they move their mouse over the `canvas` elements on the page. You can retrieve the User’s cursor speed at any time with the `getCurrentSpeed` function:

{% highlight javascript %}
var currSpeed = $('canvas').cursometer('getCurrentSpeed');
{% endhighlight %}

The speed is measured in **pixels per milliseconds**.

## Options

Cursometer provides a few options to let you customize the behavior of the plug-in:

{% highlight javascript %}
$('canvas').cursometer({
	onUpdateSpeed: function(speed) { },
	updateSpeedRate: 20
);
{% endhighlight %}

The **onUpdateSpeed** is a callback function that is called whenever the plug-in polls the User’s cursor movements for calculating speed. The User’s current cursor speed is passed as the first parameter. Thus, if you have something that is dynamically controlled by the speed of the User’s cursor movements, you would want to put the logic for updating that dynamic piece within this function. [Check out this example](https://loganfranken.github.io/Cursometer/), in which the speed of your cursor determines how fast Mario runs.

On a related note, the **updateSpeedRate** controls how often (in milliseconds) the plug-in polls (or checks) the User’s cursor movements. The higher the number, the more accurate the measurement but the lower the performance. The default value is `20` milliseconds.

## Behind the Scenes

This plug-in was a little trickier to write than I originally anticipated because I ended up needing two polling loops: one for continuously checking the User’s cursor speed (controlled by the `updateSpeedRate` described above) and another for checking the the current position of the User’s mouse (controlled by a secret option called `captureMouseMoveRate`). The reason for this second loop was to create an adhoc event that would capture the User’s cursor position, without pounding the DOM with an unnecessary and relentless series of `mousemove` events (I got the idea from this [Stackoverflow article](https://stackoverflow.com/questions/1133807/determine-mouse-position-outside-of-events-using-jquery)).