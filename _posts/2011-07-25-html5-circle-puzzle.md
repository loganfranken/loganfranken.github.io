---
layout:	blog
title: HTML5 Circle Puzzle
topic: Doodles
redirect_from: /blog/22/html5-circle-puzzle
---
I was messing around with the HTML5 canvas element this morning, and I came up with something kind of fun. It’s basically a puzzle built with a series of rotating concentric circles that you can drag. Here’s a screenshot:

![Circle Puzzle Thumbnail](/images/circlepuzzle.jpg)

[Check it out](https://loganfranken.github.io/Circle-Puzzle/). Keep in mind that I didn’t add any logic to confirm that you’ve won, however, so don’t knock yourself out. Feel free to download the script and fiddle with it. It’s pretty simple to switch out the image and add more circles:

{% highlight javascript %}
var puzzleImage = new Image();
puzzleImage.onload = function() {
	var canvas = document.getElementById('puzzle-canvas');
	var puzzleCanvas = new PUZZLE.PuzzleCanvas(canvas);
	var puzzle = new PUZZLE.PuzzleController(puzzleCanvas, puzzleImage, 5);
};
puzzleImage.src = 'image.jpg';
{% endhighlight %}

I didn’t realize that it would be so wonderfully easy and straightforward to work with the canvas element. Check out this ridiculously simple code for displaying the circle with the image displayed inside:

{% highlight javascript %}
// Start composition
context.save();
	
context.globalCompositeOperation = 'source-over';
	
// Move canvas to center of Circle to simplify rotation
context.translate(puzzleCircle.x, puzzleCircle.y);
context.rotate(puzzleCircle.rotation);
	
// Draw the circle
context.beginPath();
context.arc(0, 0, puzzleCircle.radius, 0, Math.PI * 2, false);
context.clip();
	
// Draw the image
context.drawImage(puzzleCircle.image,
	-(puzzleCircle.image.width/2),
	-(puzzleCircle.image.height/2));
	
// End composition
context.restore();
{% endhighlight %}

First, we save the state of the canvas so that we can restore the state after we’re finished drawing, allowing us to start with a clean slate before rendering each circle.

Second, we set the [globalCompositeOperation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation) to “source-over” so that the newest circle will appear on top of the previously displayed circles.

Next, we shift the canvas using the [translate method](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#translating) to get the origin (0, 0) point of the canvas in the middle of the circle. This makes rotating the circle a cinch because the rotate method rotates the canvas elements around the origin point. If the canvas origin and the circle’s middle are the same point, then the [rotate method](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#rotating) ends up rotating the circle itself.

We call [clip](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing#clipping_paths) to mark the circle shape as a mask for the image. Finally, we just throw in the image with [drawImage](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#drawing_images) and we’re finished!