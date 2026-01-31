/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-4da76df9'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "apple-touch-icon-180x180.png",
    "revision": "9d9ded1d95901de07ddd1e7d3363621c"
  }, {
    "url": "assets/index-C-L4xXJC.css",
    "revision": null
  }, {
    "url": "assets/index-DC98DU3u.js",
    "revision": null
  }, {
    "url": "favicon.ico",
    "revision": "dc944ffdb734f0358cdb339d52ac230e"
  }, {
    "url": "index.html",
    "revision": "35d719499cbbadff4932afceee19d879"
  }, {
    "url": "logo.png",
    "revision": "426acec02ed995f6b5a42cafa532e59f"
  }, {
    "url": "maskable-icon-512x512.png",
    "revision": "5a9a9f7a8272fae2b8a0c86f995a8a0f"
  }, {
    "url": "pwa-192x192.png",
    "revision": "e9e9086fc577c80867b7d495cc252355"
  }, {
    "url": "pwa-512x512.png",
    "revision": "a0143a722a9849f7dd3e023c205c1632"
  }, {
    "url": "pwa-64x64.png",
    "revision": "29c7c6ab10c1faf9ec04a37407225a4b"
  }, {
    "url": "registerSW.js",
    "revision": "9d0b8cd5c8ffb7985f3de671afd96c9d"
  }, {
    "url": "vite.svg",
    "revision": "8e3a10e157f75ada21ab742c022d5430"
  }, {
    "url": "pwa-192x192.png",
    "revision": "e9e9086fc577c80867b7d495cc252355"
  }, {
    "url": "pwa-512x512.png",
    "revision": "a0143a722a9849f7dd3e023c205c1632"
  }, {
    "url": "manifest.webmanifest",
    "revision": "8b4bd604a1a513bc8c3902e51a26e1d9"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
