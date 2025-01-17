let CACHE_NAME = 'AASC-Cache';
let urlsToCache = [
    '/',
    './style/style.css',
    './app.js'
];


self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('app.js').then(function (cache) {
            return cache.addAll([
                '/',
                '/Frontend/index.html',
                '/Frontend/style/style.css',
                '/Frontend/app.js',
            ]);
        })
    );
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // IMPORTANT: Clone the request. A request is a stream and
                // can only be consumed once. Since we are consuming this
                // once by cache and once by the browser for fetch, we need
                // to clone the response.
                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function (response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});
// self.addEventListener('fetch', function (event) {
//     console.log(event.request.url);

//     event.respondWith(
//         caches.match(event.request).then(function (response) {
//             return response || fetch(event.request);
//         })
//     );
// });
self.addEventListener('offline', indicate());

function indicate() {
    console.log('triggered');
    if (navigator.onLine) {
        console.log('you are online bro');
    } else alert('you are now offline');
}