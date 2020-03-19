var VERSION = "v3";

var cacheFirstFiles = [
  "https://res.cloudinary.com/soyabn9/image/upload/c_scale,h_200,w_200/v1582994813/Pizza-Shop/four-cheese-pizza.png",
  "https://res.cloudinary.com/soyabn9/image/upload/c_scale,h_200,w_200/v1583072133/Pizza-Shop/pepperoni-pizza.png",
  "https://res.cloudinary.com/soyabn9/image/upload/c_scale,h_200,w_200/v1583020242/Pizza-Shop/fish-catch-pizza.png",
  "https://res.cloudinary.com/soyabn9/image/upload/c_scale,h_200,w_200/v1583088073/Pizza-Shop/vegetarian-pizza.png",
  "https://res.cloudinary.com/soyabn9/image/upload/c_scale,h_200,w_200/v1583088557/Pizza-Shop/caesar-salad.png",
  "https://res.cloudinary.com/soyabn9/image/upload/c_scale,h_200,w_200/v1583088904/Pizza-Shop/rustic-chips.png",
  "https://res.cloudinary.com/soyabn9/image/upload/c_scale,h_200,w_200/v1583089155/Pizza-Shop/wild-garlic-bread.png",
  "https://res.cloudinary.com/soyabn9/image/upload/c_scale/v1582996711/Pizza-Shop/pizza-delivery-icon.png",
  "https://res.cloudinary.com/soyabn9/image/upload/c_scale,h_512,w_512/v1582996711/Pizza-Shop/pizza-delivery-icon.png"
];

var networkFirstFiles = [
  "/",
  "/index.html",
  "/scripts/install.js",
  "/scripts/app.js",
  "/styles/inline.css"
];

var cacheFiles = cacheFirstFiles.concat(networkFirstFiles);

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(VERSION).then(cache => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") {
    return;
  }
  if (networkFirstFiles.indexOf(event.request.url) !== -1) {
    event.respondWith(networkElseCache(event));
    return;
  } else if (cacheFirstFiles.indexOf(event.request.url) !== -1) {
    event.respondWith(cacheElseNetwork(event));
    return;
  } else {
    event.respondWith(fetch(event.request));
  }
});

function cacheElseNetwork(event) {
  return caches.match(event.request).then(response => {
    function fetchAndCache() {
      return fetch(event.request).then(response => {
        caches
          .open(VERSION)
          .then(cache => cache.put(event.request, response.clone()));
        return response;
      });
    }

    if (!response) {
      return fetchAndCache();
    }

    fetchAndCache();
    return response;
  });
}

function networkElseCache(event) {
  return caches.match(event.request).then(match => {
    if (!match) {
      return fetch(event.request);
    }
    return fetch(event.request).then(response => {
      caches
        .open(VERSION)
        .then(cache => cache.put(event.request, response.clone()));
      return response;
    });
  });
}
