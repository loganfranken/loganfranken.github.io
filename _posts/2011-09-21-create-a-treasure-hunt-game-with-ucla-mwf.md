---
layout: blog
title: Create a Treasure Hunt Game With the UCLA Mobile Web Framework
categories: Tutorials
redirect_from: /blog/143/create-a-treasure-hunt-game-with-ucla-mwf/
---

The [UCLA Mobile Web Framework (UCLA MWF)](https://github.com/ucla-oarc-mobile/mwf) is a cross-platform mobile web framework from UCLA. It allows developers to quickly create mobile websites with some basic markup and a few CSS classes. To test it out, I created a small demo, called Treasure Hunt. It's a simple mobile game where you can bury treasure in a certain spot (using geolocation) and someone else can dig it up. [Fork it on GitHub](https://github.com/loganfranken/Treasure-Hunt)!

The UCLA MWF is wonderfully easy to set up. You start by adding a few simple bits of markup in the `head`:

```markup
<meta name="viewport" content="height=device-height,width=device-width;
	initial-scale=1.0; maximum-scale=1.0; user-scalable=no;" />
<meta name="format-detection" content="telephone=no" />
```

As explained in the [Markup Mobile Entities Wiki entry](https://github.com/ucla/mwf/wiki/API%3A-General%3A-Markup-Mobile-Entities), the first `meta` tag helps ensure a consistent experience across the various mobile devices. "width=device-width" and "initial-scale=1.0" sets the default width of the viewport to fit to the device's width (rather than having the device assume the page is designed for desktops and zooming out). "maximum-scale=1.0" and "user-scalable=no" prevent the User from zooming in and out, which will be unnecessary as the UCLA MWF page will fit like a glove in the device's viewport.

The second `meta` tag isn't crucial, but it will prevent newer devices from automatically (and possibly erroneously) converting numbers to links unless we explicitly specify a phone number using the "tel:" syntax.

Next we include the CSS and JavaScript required by the framework:

```markup
<link rel="stylesheet" href="https://m.ucla.edu/assets/css.php" type="text/css">
<script type="text/javascript" src="https://m.ucla.edu/assets/js.php
	?no_ga&no_icon&standard_libs=geolocation"></script>
```

This is where UCLA MWF really shines: as you can see, we aren't directly referencing a CSS or JS file, we are referencing a PHP file. This PHP handler checks with the [WURFL repository](https://wurfl.sourceforge.net/) to determine the capabilities of the User's current device and returns different CSS and JS depending on the device (as of [version 1.2](https://github.com/ucla/mwf/blob/master/RELEASE), this is no longer true). As a result, while a newer smartphone will receive the full experience (touch transitions, gradients, etc.), an older, simpler device will receive a slightly degraded experience more appropriate for their phone. However, here's the kicker: both phones receive the same content and the developer only provides one set of markup.

Note that the UCLA MWF is intended to be hosted on your own server (in other words, don't pull resources from UCLA's servers for any real development). To that end, Google Analytics is enabled by default (so you can quickly report visitor statistics to a centralized Google Analytics configuration). For this demo, we're going to disable it with the "no\_ga" in the query string for the JS handler. Similarly, we add "no\_icon" to remove the default UCLA MWF favicon. Of course, the whole crux of this demo is the geolocation, so we add "standard\_libs=geolocation" to include the geolocation library.

The UCLA MWF also contains a nifty minifier, although you need to provide the encoded absolute path to the stylesheet/script to the handler:

```markup
<link rel="stylesheet" href="https://m.ucla.edu/assets/min/css.php?
	standard=http%3A%2F%2Ftreasure.loganfranken.com%2Fstyle%2Fmain.css"
	type="text/css" />
```

Now we can add in our markup:

```markup
<div class="content-full content-padded">
	<h1 class="content-first light">Nearby Treasure</h1> 
	<div class="content-last center">
		<p class="status center">Treasure Hunt!</p>
	</div>
</div>

<a href="index.php?action=dig" class="button-full button-padded">Dig</a>
<a href="index.php?action=search" class="button-full button-padded">Search</a>
<a href="index.php?action=bury" class="button-full button-padded">Bury</a>
```

As you can see, we just put together a little bit of markup and we get the following:

![UCLA MWF Treasure Hunt Standard](/blog/images/uclamwf_screenshot1.png "UCLA MWF Treasure Hunt Standard")

Which, on basic devices, degrades to:

![UCLA MWF Treasure Hunt Basic](/blog/images/uclamwf_screenshot2.png "UCLA MWF Treasure Hunt Basic")

Finally, to get at the geolocation data, the UCLA MWF provides a straightforward `getPosition` function that either uses [Google Gears](https://code.google.com/apis/gears/api_geolocation.html) or the standard HTML5 geolocation library, depending on the device's capabilities:

```javascript
// Retrieve location
mwf.touch.geolocation.getPosition(
	function(pos) {
		
		// Send dig request
		self.model.requestDig(
			pos['latitude'],
			pos['longitude'],
			function(result) { ... }
		);

	},
	function(err) {
		
		// Retrieving location failed
		self.view.showStatus('Digging failed. Geolocation isn\'t enabled',
			true);
		return;
			
	}
);
```

You can, of course, dig into the [full source code on GitHub](https://github.com/loganfranken/Treasure-Hunt)!

The UCLA MWF is off to a great start, and I'm excited to [watch it evolve](https://github.com/ucla/mwf/wiki/Roadmap). They have a growing base of support and adoption from other universities and their commitment to a "least common denominator" mobile platform should be reassuring to institutions looking for a more accessible mobile framework.
