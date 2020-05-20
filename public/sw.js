const STATUS_BASIC = `basic`;
const STATUS_SUCCESS = 200;
const CACHE_PREFIX = `bigtrip-cache`;
const CACHE_VER = `v1`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

const DATA = [
  `/`,
  `/index.html`,
  `/bundle.js`,
  `/css/style.css`,
  `/img/icons/bus.png`,
  `/img/icons/check-in.png`,
  `/img/icons/drive.png`,
  `/img/icons/flight.png`,
  `/img/icons/restaurant.png`,
  `/img/icons/ship.png`,
  `/img/icons/sightseeing.png`,
  `/img/icons/taxi.png`,
  `/img/icons/train.png`,
  `/img/icons/transport.png`,
  `/img/header-bg.png`,
  `/img/header-bg@2x.png`,
  `/img/logo.png`
];

const getData = (cache) => cache.addAll(DATA);

const onInstall = (evt) => {
  evt.waitUntil(caches.open(CACHE_NAME).then(getData));
};

const getKey = (key) => {
  if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
    return caches.delete(key);
  }

  return null;
};

const getFilterKey = (key) => key !== null;

const getAllKeys = (keys) => {
  Promise.all(keys.map(getKey).filter(getFilterKey));
};

const onActivate = (evt) => {
  evt.waitUntil(caches.keys().then((keys) => getAllKeys(keys)));
};

const getRequest = (response, request) => {
  if (!response || response.status !== STATUS_SUCCESS || response.type !== STATUS_BASIC) {
    return response;
  }

  const clonedResponse = response.clone();

  caches.open(CACHE_NAME)
    .then((cache) => cache.put(request, clonedResponse));

  return response;
};

const getCacheResponse = (cacheResponse, request) => {
  if (cacheResponse) {
    return cacheResponse;
  }

  return fetch(request).then(getRequest);
};

const onFetch = (evt) => {
  const {request} = evt;

  evt.respondWith(caches.match(request).then((cacheResponse) => getCacheResponse(cacheResponse, request)));
};

self.addEventListener(`install`, onInstall);
self.addEventListener(`activate`, onActivate);
self.addEventListener(`fetch`, onFetch);
