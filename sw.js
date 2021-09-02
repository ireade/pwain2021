(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.1.1"]&&_()}catch(e){}},882:()=>{try{self["workbox:navigation-preload:6.1.1"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.1.1"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.1.1"]&&_()}catch(e){}}},t={};function s(n){if(t[n])return t[n].exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}(()=>{s(913),s(882);class e extends Error{constructor(e,t){super(((e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s})(e,t)),this.name=e,this.details=t}}s(80);const t=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,s,n="GET"){this.handler=t(s),this.match=e,this.method=n}setCatchHandler(e){this.catchHandler=t(e)}}class r extends n{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class a{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:a}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=a&&a.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return;let c;try{c=i.handle({url:s,request:e,event:t,params:r})}catch(e){c=Promise.reject(e)}const h=a&&a.catchHandler;return c instanceof Promise&&(this._catchHandler||h)&&(c=c.catch((async n=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:r})}catch(e){n=e}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw n}))),c}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const r=this._routes.get(s.method)||[];for(const a of r){let r;const i=a.match({url:e,sameOrigin:t,request:s,event:n});if(i)return r=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(r=void 0),{route:a,params:r}}return{}}setDefaultHandler(e,s="GET"){this._defaultHandlerMap.set(s,t(e))}setCatchHandler(e){this._catchHandler=t(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(t){if(!this._routes.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this._routes.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this._routes.get(t.method).splice(s,1)}}let i;function o(t,s,o){let c;if("string"==typeof t){const e=new URL(t,location.href);c=new n((({url:t})=>t.href===e.href),s,o)}else if(t instanceof RegExp)c=new r(t,s,o);else if("function"==typeof t)c=new n(t,s,o);else{if(!(t instanceof n))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=t}return(i||(i=new a,i.addFetchListener(),i.addCacheListener()),i).registerRoute(c),c}const c={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},h=e=>{return e||(t=c.runtime,[c.prefix,t,c.suffix].filter((e=>e&&e.length>0)).join("-"));var t};function l(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class u{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const d=new Set;function f(e){return new Promise((t=>setTimeout(t,e)))}function p(e){return"string"==typeof e?new Request(e):e}s(873);class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new u,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}fetch(t){return this.waitUntil((async()=>{const{event:s}=this;let n=p(t);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const r=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(t){throw new e("plugin-error-request-will-fetch",{thrownError:t})}const a=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:a,response:e});return e}catch(e){throw r&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:r.clone(),request:a.clone()}),e}})())}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}cacheMatch(e){return this.waitUntil((async()=>{const t=p(e);let s;const{cacheName:n,matchOptions:r}=this._strategy,a=await this.getCacheKey(t,"read"),i={...r,cacheName:n};s=await caches.match(a,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:n,matchOptions:r,cachedResponse:s,request:a,event:this.event})||void 0;return s})())}async cachePut(t,s){const n=p(t);await f(0);const r=await this.getCacheKey(n,"write");if(!s)throw new e("cache-put-with-no-response",{url:(a=r.url,new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var a;const i=await this._ensureResponseSafeToCache(s);if(!i)return!1;const{cacheName:o,matchOptions:c}=this._strategy,h=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),w=u?await async function(e,t,s,n){const r=l(t.url,s);if(t.url===r)return e.match(t,n);const a={...n,ignoreSearch:!0},i=await e.keys(t,a);for(const t of i)if(r===l(t.url,s))return e.match(t,n)}(h,r.clone(),["__WB_REVISION__"],c):null;try{await h.put(r,u?i.clone():i)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of d)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:w,newResponse:i.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=p(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const r={...n,state:s};return t[e](r)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve()}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class g{constructor(e={}){this.cacheName=h(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,r=new w(this,{event:t,request:s,params:n}),a=this._getResponse(r,s,t);return[a,this._awaitComplete(a,r,s,t)]}async _getResponse(t,s,n){let r;await t.runCallbacks("handlerWillStart",{event:n,request:s});try{if(r=await this._handle(s,t),!r||"error"===r.type)throw new e("no-response",{url:s.url})}catch(e){for(const a of t.iterateCallbacks("handlerDidError"))if(r=await a({error:e,event:n,request:s}),r)break;if(!r)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))r=await e({event:n,request:s,response:r});return r}async _awaitComplete(e,t,s,n){let r,a;try{r=await e}catch(a){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await t.doneWaiting()}catch(e){a=e}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:a}),t.destroy(),a)throw a}}const m={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class y extends g{constructor(e){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(m)}async _handle(t,s){const n=s.fetchAndCachePut(t).catch((()=>{}));let r,a=await s.cacheMatch(t);if(a);else try{a=await n}catch(e){r=e}if(!a)throw new e("no-response",{url:t.url,error:r});return a}}const _="offline-html",v="/offline.html";self.addEventListener("install",(async e=>{self.skipWaiting(),e.waitUntil(caches.open(_).then((e=>e.add(v))))})),self.addEventListener("activate",(e=>{})),Boolean(self.registration&&self.registration.navigationPreload)&&self.addEventListener("activate",(e=>{e.waitUntil(self.registration.navigationPreload.enable().then((()=>{})))}));const k=new class extends g{constructor(e={}){super(e),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(t,s){let n,r;try{const e=[s.fetch(t)];if(this._networkTimeoutSeconds){const t=f(1e3*this._networkTimeoutSeconds);e.push(t)}if(r=await Promise.race(e),!r)throw new Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`)}catch(e){n=e}if(!r)throw new e("no-response",{url:t.url,error:n});return r}};o(new class extends n{constructor(e,{allowlist:t=[/./],denylist:s=[]}={}){super((e=>this._match(e)),e),this._allowlist=t,this._denylist=s}_match({url:e,request:t}){if(t&&"navigate"!==t.mode)return!1;const s=e.pathname+e.search;for(const e of this._denylist)if(e.test(s))return!1;return!!this._allowlist.some((e=>e.test(s)))}}((async e=>{try{return await k.handle(e)}catch(e){return caches.match(v,{cacheName:_})}}))),o((({request:e})=>"script"===e.destination||"style"===e.destination),new y({cacheName:"static-resources"})),o((({url:e})=>"https://fonts.googleapis.com"===e.origin||"https://fonts.gstatic.com"===e.origin),new y({cacheName:"google-fonts"})),self.addEventListener("fetch",(e=>{e.respondWith(fetch(e.request))})),self.addEventListener("push",(e=>{e.waitUntil(self.registration.showNotification("Hello from PWA in 2021!",{body:"How are you doing?",icon:"/images/icon-256.png"}))})),self.addEventListener("sync",(e=>{"do-background-sync"==e.tag&&e.waitUntil(self.registration.showNotification("Background Sync",{body:"The background sync task has been activated",icon:"/images/icon-256.png"}))})),self.addEventListener("periodicsync",(e=>{"do-periodic-sync"==e.tag&&e.waitUntil(self.registration.showNotification("Periodic Background Sync",{body:"The periodic background sync task has been activated",icon:"/images/icon-256.png"}))}))})()})();