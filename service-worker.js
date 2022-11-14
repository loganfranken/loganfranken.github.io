// Source: https://github.com/chriscoyier/Simple-Offline-Site/blob/master/js/service-worker.js

const version = '1.0.0';
const cacheName = version + '-cache';
const offlineUrl = '/offline';

// Installation
self.addEventListener('install', function(event) {

 event.waitUntil(
   caches.open(cacheName).then(function(cache) {
     return cache.addAll([
       offlineUrl,
       '/style/main.css',
       '/script/main.js'
     ]);
   })
 );

});

// Fetching Logic
// Currently, we don't actually cache any content offline. We just send the
// user to an "Offline" page
self.addEventListener('fetch', function(event) {

  if(event.request.method !== 'GET')
  {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(cached) {

      return fetch(event.request).then(function(response) {

        // If the user is online, return the normal response
        return response;

      })
      .catch(function() {

        // If the user is offline and requesting an HTML page, send them to
        // the offline page
        if (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))
        {
            return caches.match(offlineUrl);
        }

      });

    })
  );

});

// Cache clearing logic
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {

          return Promise.all(
            keys
              .filter(function (key) {
                return !key.startsWith(version);
              })
              .map(function (key) {
                return caches.delete(key);
              })
          );

        })
      );
});
