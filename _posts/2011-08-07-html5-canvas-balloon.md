---
layout:	blog
title: HTML5 Canvas Balloon
categories: Doodles
redirect_from: /blog/64/html5-canvas-balloon/
---
Today we’re going to draw a balloon on the HTML5 canvas element. Why not, right? Here’s the final result:

![HTML5 Canvas Balloon](/blog/images/canvas_balloon.jpg)

The balloon shape is basically a circle stretched out in various places. However, it’s not that straightforward to simply draw a circle and then stretch it with the canvas API. Instead, we need to recreate a circle using four cubic Bézier curves:

![Circle Bezier Curve Count](/blog/images/circle_bezier_count.png)

After beginning this process, I discovered that it is actually *impossible* to create a perfect circle using cubic Bézier curves. Instead, you can only get a very close approximation using a constant called “kappa”. So to calculate the length of the “handles” (or the distance from a control point to a corresponding point on the curve), we use the following formula:

{% highlight javascript %}
var KAPPA = (4 * (Math.sqrt(2) - 1))/3;
var handleLength = KAPPA * radius;
{% endhighlight %}

Now we can create a near-perfect circle using four, separate cubic Bézier curves, created with the [bezierCurveTo method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo):

{% highlight javascript %}
// Begin balloon path

gfxContext.beginPath();

// Top Left Curve
	
var topLeftCurveStartX = centerX - radius;
var topLeftCurveStartY = centerY;
	
var topLeftCurveEndX = centerX;
var topLeftCurveEndY = centerY - radius;
	
gfxContext.moveTo(topLeftCurveStartX, topLeftCurveStartY);
gfxContext.bezierCurveTo(topLeftCurveStartX, topLeftCurveStartY - handleLength,
			topLeftCurveEndX - handleLength, topLeftCurveEndY,
			topLeftCurveEndX, topLeftCurveEndY);
							
// Top Right Curve
	
var topRightCurveStartX = centerX;
var topRightCurveStartY = centerY - radius;
	
var topRightCurveEndX = centerX + radius;
var topRightCurveEndY = centerY;
	
gfxContext.bezierCurveTo(topRightCurveStartX + handleLength, topRightCurveStartY,
			topRightCurveEndX, topRightCurveEndY - handleLength,
			topRightCurveEndX, topRightCurveEndY);
										
// Bottom Right Curve
	
var bottomRightCurveStartX = centerX + radius;
var bottomRightCurveStartY = centerY;
	
var bottomRightCurveEndX = centerX;
var bottomRightCurveEndY = centerY + radius;
	
gfxContext.bezierCurveTo(bottomRightCurveStartX, bottomRightCurveStartY + handleLength,
			bottomRightCurveEndX + handleLength, bottomRightCurveEndY,
			bottomRightCurveEndX, bottomRightCurveEndY);							
	
// Bottom Left Curve
	
var bottomLeftCurveStartX = centerX;
var bottomLeftCurveStartY = centerY + radius;
	
var bottomLeftCurveEndX = centerX - radius;
var bottomLeftCurveEndY = centerY;
	
gfxContext.bezierCurveTo(bottomLeftCurveStartX - handleLength, bottomLeftCurveStartY,
			bottomLeftCurveEndX, bottomLeftCurveEndY + handleLength,
			bottomLeftCurveEndX, bottomLeftCurveEndY);
{% endhighlight %}

Once we have our circle in place, we can stretch out the curves to create the balloon shape. I just fiddled around and came out with arbitrary values for the factors used to stretch the shape. For example, I stretched out the bottom using a heightDiff value, calculated as follows:

{% highlight javascript %}
var heightDiff = (radius * 0.4);
{% endhighlight %}

We can now modify the above circle equation to use these values:

{% highlight javascript %}
var balloonBottomY = centerY + radius + heightDiff

// Updated Bottom Right Curve Value
var bottomRightCurveEndY = balloonBottomY;

// Updated Bottom Left Curve Value
var bottomLeftCurveStartY = baloonBottomY;
{% endhighlight %}

To add color to the balloon, I used a [radial gradient](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#a_createradialgradient_example) with, again, some arbitrary values thrown in there:

{% highlight javascript %}
var gradientOffset = (radius/3);
	
var balloonGradient =
	gfxContext.createRadialGradient(centerX + gradientOffset,
					centerY - gradientOffset, 3,
					centerX, centerY,
					radius + heightDiff);

	balloonGradient.addColorStop(0, this.lightColor.rgbString());
	balloonGradient.addColorStop(0.7, this.darkColor.rgbString());
	
	gfxContext.fillStyle = balloonGradient;
	gfxContext.fill();
{% endhighlight %}

To calculate the gradient colors, I found this fantastic [color manipulation library](https://github.com/Qix-/color), that makes working with colors a snap:

{% highlight javascript %}
this.baseColor = new Color(color);
this.darkColor = (new Color(color)).darken(0.3);
this.lightColor = (new Color(color)).lighten(0.3);
{% endhighlight %}

Check out the [full script](https://github.com/loganfranken/Canvas-Balloons/blob/master/script/canvas-balloon.js)!