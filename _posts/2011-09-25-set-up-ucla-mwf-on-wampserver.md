---
layout: blog
title: "Set Up UCLA Mobile Web Framework on WampServer"
categories: Tutorial
redirect_from: /blog/220/device-classification-in-the-ucla-mobile-web-framework
---

**UPDATE**: If you read this post before, you might be wondering where all of the stuff about [WURFL](http://wurfl.sourceforge.net/) went. Well, since [version 1.2](https://github.com/ucla/mwf/blob/master/RELEASE), the UCLA Mobile Web Framework no longer depends on WURFL. This actually makes the installation process much smoother. Device capabilities are now determined by [storing information from Modernizr in a cookie]({% post_url 2011-10-02-device-classification-in-the-ucla-mobile-web-framework %}).

I wanted to set up my own local copy of the UCLA Mobile Web Framework (UCLA MWF) on WampServer. It was a pretty straightforward process, but I wanted to detail it anyway because I think it gives good insight on the internals of the framework.

## 1\. Download and install WampServer

If you've never used [WampServer](http://www.wampserver.com/en/) before, you're going to love it. It's Apache, MySQL, and PHP all rolled up into a single installation for Windows.

## 2\. Get a copy of the UCLA Mobile Web Framework

You'll probably want to pull down your own copy of the framework from the [GitHub repository](https://github.com/ucla/mwf). If you need help with git, [GitHub](https://github.com/) has some wonderful tutorials. [Git Immersion](http://gitimmersion.com/) is also a fantastic resource.

Alternatively, you can just directly [download the latest version of the UCLA MWF](https://github.com/ucla/mwf/downloads).

Either way, you'll want to put your copy (or your local repository) of the UCLA MWF in `C:\wamp\www\mwf`.

## 3\. Create the required directories

The UCLA MWF requires a few directories (detailed in the [System Administration wiki article](https://github.com/ucla/mwf/wiki/Getting-Started%3A-System-Administration)). These directories will be located directly under the base directory (`C:\wamp\www\mwf\`).

- `var\mobile`
- `var\mobile\cache`
- `var\mobile\cache\img`
- `var\mobile\cache\simplepie`

`cache\img` is where the compressed images that get fed through the [image compressor](https://github.com/ucla/mwf/wiki/API%3A-Script%3A-Image-Compressor) will be stored. Similarly, `cache\simplepie` is the cache used by the [feed API](https://github.com/ucla/mwf/wiki/API%3A-PHP%3A-Feed) (the UCLA MWF's feed API uses [SimplePie](http://simplepie.org/)).

## 4\. Set up the domain name

With a default installation of WampServer, we can access the framework in a browser via `http://localhost/mwf/root`. Let's set up a more direct URL to the root.

First, add the following entry to the end of your hosts file:

```markup
127.0.0.1	uclamwf.local
```

This will redirect all requests to the URL "uclamwf.local" back to your local machine (127.0.0.1 is the IP address corresponding to localhost). Keep in mind you could use any name you want here: "mwf.local", "uclamwf.com", whatever you like.

Now that we have the requests coming back to the local machine, we need WampServer to pick up the requests and direct them to the correct place. Find the Apache configuration file `httpd.conf` in `C:\wamp\bin\apache\Apache2.2.17\conf` (your Apache version may differ), and make the following edits:

Find the following line:

```markup
Listen 80
```

And change it to:

```markup
Listen *:80
```

Next, add the following to the end of the file:

```markup
NameVirtualHost *:80
<VirtualHost 127.0.0.1>
	DocumentRoot "c:/wamp/www"
	ServerName localhost
</VirtualHost>

<VirtualHost 127.0.0.1>
	DocumentRoot "c:/wamp/www/mwf/root/"
	ServerName uclamwf.local
</VirtualHost>
```

Start up WampServer, navigate to `http://uclamwf.local/`, and you should get an error (this is a good thing!).

## 5\. Configure the framework

To round off this installation, we just need to edit a few configuration details. Open `global.php` in `C:\wamp\www\mwf\config`, find where `site_url` and `site_assets_url` are defined, and update them with the following values:

```php
Config::set('global', 'site_url', 'http://uclamwf.local/');
Config::set('global', 'site_assets_url', 'http://uclamwf.local/assets/');
```

And we're finished! Now you can navigate to `http://uclamwf.local` in your browser. Furthermore, now you can start referencing the local copy of your library within your projects:

```markup
<link rel="stylesheet" href="http://uclamwf.local/assets/css.php" type="text/css">
<link rel="stylesheet" href="http://uclamwf.local/assets/js.php" type="text/css">
```

## 6\. Additional configuration options

We've configured everything required by the framework, but there are a few optional pieces left to set up. If we want to make full use of image compression, we'll need to change the cache path in `image.php` (in the `config` directory):

```php
Config::set('image', 'cache_dir', 'C:/wamp/www/mwf/var/mobile/cache/img/');
```

Similarly, we'll need to update the path for the feed API as well (`feed.php` in `auxiliary/feed.php`):

```php
Config::set('auxiliary/feed', 'cache_path', 'C:/wamp/www/mwf/var/mobile/cache/simplepie');
```

We're all set! Now you can start playing around with your own working local copy of the framework.
