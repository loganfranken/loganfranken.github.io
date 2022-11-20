---
layout: blog
title: "Extending the UCLA Mobile Web Framework Geolocation API"
date: "2011-10-09"
categories: Tutorial
redirect_from: /blog/239/extending-the-ucla-mobile-web-framework-geolocation-api/
---

If you tried out my [UCLA Mobile Web Framework (MWF) treasure hunt demo]({% post_url 2011-09-21-create-a-treasure-hunt-game-with-ucla-mwf %}), you may have noticed that the geolocation was a little spotty. Depending on your phone, service provider, geolocation settings, or any number of other variables, you might be (virtually) digging up treasure in a completely different location than someone (physically) standing right next to you.

I was chatting with one of my buddies at work, and he explained that the geolocation's intermittent inaccuracy was because the demo was using `getCurrentPosition`, rather than polling with `watchPosition`. `watchPosition` is a handy little function in the Geolocation API that continuously checks the User's current position and fires off a function when their position changes. A User's position could change when he or she moves, but could also change as their mobile device uses different techniques to more accurately determine their location.

So, to extend my demo, I added a `getExactPosition` function to the UCLA MWF geolocation API:

```javascript
mwf.touch.geolocation.getExactPosition = function(minAccuracy, timeout, onSuccess, onError) {
	
	var geo;
	
	switch(this.getType())
	{
		case 1:
			geo = navigator.geolocation;
			break;
		case 2:
			geo = google.gears.factory.create('beta.geolocation');
			break;
		default:
			onError && onError('No geolocation support available.');
			return;
	}

	var watchID = geo.watchPosition(
		function(position) {
		
			if(position.coords.accuracy <= minAccuracy) {
				navigator.geolocation.clearWatch(watchID);
				onSuccess && onSuccess({
					'latitude': position.coords.latitude,
					'longitude': position.coords.longitude,
					'accuracy': position.coords.accuracy
				});
			}
	
		},
		function() {
			onError && onError('Geolocation failure.');
		},
		{
			enableHighAccuracy: true,
			timeout: timeout
		}
	);

	return true;
};
```

You'll notice that this closely mimics [UCLA MWF's getPosition function](https://github.com/ucla/mwf/blob/master/root/assets/js/standard/geolocation.src.js). Like the original, this new function calls callback functions upon a successful retrieval of geolocation data (`onSuccess`) and also upon failure (`onError`). Also like the original, this function uses [Google Gears](http://gears.google.com/) if the HTML5 Geolocation API is not supported.

Now, let's bite into the meat of this new function: rather than directly calling `getCurrentPosition`, this new function begins continuously polling the User's position with `watchPosition`. After each successful polling attempt, an anonymous function is called that checks whether or not the current reading of the User's geolocation API has an accuracy value less than or equal to the specified `minAccuracy` (which is measured in meters). Upon retrieving geolocation data with appropriate accuracy, `clearWatch` is called to stop the constant polling. Finally, if this process takes longer than the provided `timeout` parameter, the error callback function is called.

This, of course, has the negative side effect of slowing down the application as a mobile device may take a considerable amount of time to determine the User's location within a tight accuracy range. In a real application, if exact geolocation data was not necessary, we would probably want to begin by using the initial geolocation data and then progressively enhance the application as more accurate geolocation data become available. At the very least, it would be helpful to provide the User with some feedback as to the current progress of determining their position.
