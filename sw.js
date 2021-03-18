(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.1.1"]&&_()}catch(e){}},882:()=>{try{self["workbox:navigation-preload:6.1.1"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.1.1"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.1.1"]&&_()}catch(e){}}},t={};function s(r){if(t[r])return t[r].exports;var n=t[r]={exports:{}};return e[r](n,n.exports,s),n.exports}(()=>{s(913),s(882);class e extends Error{constructor(e,t){super(((e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s})(e,t)),this.name=e,this.details=t}}s(80);const t=e=>e&&"object"==typeof e?e:{handle:e};class r{constructor(e,s,r="GET"){this.handler=t(s),this.match=e,this.method=r}setCatchHandler(e){this.catchHandler=t(e)}}class n extends r{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class a{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const r=s.origin===location.origin,{params:n,route:a}=this.findMatchingRoute({event:t,request:e,sameOrigin:r,url:s});let i=a&&a.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return;let c;try{c=i.handle({url:s,request:e,event:t,params:n})}catch(e){c=Promise.reject(e)}const h=a&&a.catchHandler;return c instanceof Promise&&(this._catchHandler||h)&&(c=c.catch((async r=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:n})}catch(e){r=e}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw r}))),c}findMatchingRoute({url:e,sameOrigin:t,request:s,event:r}){const n=this._routes.get(s.method)||[];for(const a of n){let n;const i=a.match({url:e,sameOrigin:t,request:s,event:r});if(i)return n=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:a,params:n}}return{}}setDefaultHandler(e,s="GET"){this._defaultHandlerMap.set(s,t(e))}setCatchHandler(e){this._catchHandler=t(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(t){if(!this._routes.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this._routes.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this._routes.get(t.method).splice(s,1)}}let i;function o(t,s,o){let c;if("string"==typeof t){const e=new URL(t,location.href);c=new r((({url:t})=>t.href===e.href),s,o)}else if(t instanceof RegExp)c=new n(t,s,o);else if("function"==typeof t)c=new r(t,s,o);else{if(!(t instanceof r))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=t}return(i||(i=new a,i.addFetchListener(),i.addCacheListener()),i).registerRoute(c),c}const c={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},h=e=>{return e||(t=c.runtime,[c.prefix,t,c.suffix].filter((e=>e&&e.length>0)).join("-"));var t};function l(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class u{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const f=new Set;function d(e){return new Promise((t=>setTimeout(t,e)))}function p(e){return"string"==typeof e?new Request(e):e}s(873);class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new u,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}fetch(t){return this.waitUntil((async()=>{const{event:s}=this;let r=p(t);if("navigate"===r.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?r.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))r=await e({request:r.clone(),event:s})}catch(t){throw new e("plugin-error-request-will-fetch",{thrownError:t})}const a=r.clone();try{let e;e=await fetch(r,"navigate"===r.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:a,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:a.clone()}),e}})())}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}cacheMatch(e){return this.waitUntil((async()=>{const t=p(e);let s;const{cacheName:r,matchOptions:n}=this._strategy,a=await this.getCacheKey(t,"read"),i={...n,cacheName:r};s=await caches.match(a,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:r,matchOptions:n,cachedResponse:s,request:a,event:this.event})||void 0;return s})())}async cachePut(t,s){const r=p(t);await d(0);const n=await this.getCacheKey(r,"write");if(!s)throw new e("cache-put-with-no-response",{url:(a=n.url,new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var a;const i=await this._ensureResponseSafeToCache(s);if(!i)return!1;const{cacheName:o,matchOptions:c}=this._strategy,h=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),w=u?await async function(e,t,s,r){const n=l(t.url,s);if(t.url===n)return e.match(t,r);const a={...r,ignoreSearch:!0},i=await e.keys(t,a);for(const t of i)if(n===l(t.url,s))return e.match(t,r)}(h,n.clone(),["__WB_REVISION__"],c):null;try{await h.put(n,u?i.clone():i)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of f)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:w,newResponse:i.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=p(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),r=r=>{const n={...r,state:s};return t[e](n)};yield r}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve()}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class g{constructor(e={}){this.cacheName=h(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,r="params"in e?e.params:void 0,n=new w(this,{event:t,request:s,params:r}),a=this._getResponse(n,s,t);return[a,this._awaitComplete(a,n,s,t)]}async _getResponse(t,s,r){let n;await t.runCallbacks("handlerWillStart",{event:r,request:s});try{if(n=await this._handle(s,t),!n||"error"===n.type)throw new e("no-response",{url:s.url})}catch(e){for(const a of t.iterateCallbacks("handlerDidError"))if(n=await a({error:e,event:r,request:s}),n)break;if(!n)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))n=await e({event:r,request:s,response:n});return n}async _awaitComplete(e,t,s,r){let n,a;try{n=await e}catch(a){}try{await t.runCallbacks("handlerDidRespond",{event:r,request:s,response:n}),await t.doneWaiting()}catch(e){a=e}if(await t.runCallbacks("handlerDidComplete",{event:r,request:s,response:n,error:a}),t.destroy(),a)throw a}}const m={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class y extends g{constructor(e){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(m)}async _handle(t,s){const r=s.fetchAndCachePut(t).catch((()=>{}));let n,a=await s.cacheMatch(t);if(a);else try{a=await r}catch(e){n=e}if(!a)throw new e("no-response",{url:t.url,error:n});return a}}const _="offline-html",v="/offline.html";self.addEventListener("install",(async e=>{self.skipWaiting(),e.waitUntil(caches.open(_).then((e=>e.add(v))))})),Boolean(self.registration&&self.registration.navigationPreload)&&self.addEventListener("activate",(e=>{e.waitUntil(self.registration.navigationPreload.enable().then((()=>{})))}));const q=new class extends g{constructor(e={}){super(e),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(t,s){let r,n;try{const e=[s.fetch(t)];if(this._networkTimeoutSeconds){const t=d(1e3*this._networkTimeoutSeconds);e.push(t)}if(n=await Promise.race(e),!n)throw new Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`)}catch(e){r=e}if(!n)throw new e("no-response",{url:t.url,error:r});return n}};o(new class extends r{constructor(e,{allowlist:t=[/./],denylist:s=[]}={}){super((e=>this._match(e)),e),this._allowlist=t,this._denylist=s}_match({url:e,request:t}){if(t&&"navigate"!==t.mode)return!1;const s=e.pathname+e.search;for(const e of this._denylist)if(e.test(s))return!1;return!!this._allowlist.some((e=>e.test(s)))}}((async e=>{try{return await q.handle(e)}catch(e){return caches.match(v,{cacheName:_})}}))),o((({request:e})=>"script"===e.destination||"style"===e.destination),new y({cacheName:"static-resources"})),o((({url:e})=>"https://fonts.googleapis.com"===e.origin||"https://fonts.gstatic.com"===e.origin),new y({cacheName:"google-fonts"})),self.addEventListener("activate",(e=>{})),self.addEventListener("fetch",(e=>{e.respondWith(fetch(e.request))})),self.addEventListener("push",(e=>{e.waitUntil(self.registration.showNotification("Hello from PWA in 2021!",{body:"How are you doing?",icon:"/images/icon-256.png"}))}))})()})();