if(!self.define){let e,i={};const c=(c,a)=>(c=new URL(c+".js",a).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,s)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let r={};const t=e=>c(e,n),d={module:{uri:n},exports:r,require:t};i[n]=Promise.all(a.map((e=>d[e]||t(e)))).then((e=>(s(...e),r)))}}define(["./workbox-1bb06f5e"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Auth/signin/google.png",revision:"5f6f1dbf3638b0d2f715fe049a86b966"},{url:"/Auth/signin/kakaotalk.svg",revision:"de073126591088c2510a02b34ac2ce92"},{url:"/_next/static/VcUCKRSpAiOgh10g-Q77C/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/VcUCKRSpAiOgh10g-Q77C/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/117-20d6e5d9b8dc2279.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/127-5e5cdf526f9d3107.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/173-ac2520a57d4f14e4.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/20-ca58ab1edfbf9931.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/223.97fbc89dbe48cc1e.js",revision:"97fbc89dbe48cc1e"},{url:"/_next/static/chunks/305-dbadfe181aed31ef.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/317-265462b3a8dcd436.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/519-f1c835d282542539.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/586-c8fa3f767dc328bc.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/614-564c61bc31e48bc5.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/631-fb62b8e827c3ed03.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/632-cb3130af99e814c7.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/719-cdb6ea5c84f3c794.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/83-09be36c0ab1e5a67.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/878-af99a55445113e32.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/95-c423224874ca74ba.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/972-be0548a234afdc27.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/(auth)/signin/page-73e2b617f877fdfd.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/(auth)/signup/page-8b4c8c43ef6f5dbc.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/_not-found/page-18b9a28b4e769380.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/child/%5Bid%5D/childinfo/page-87fc15bf872c6277.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/child/%5Bid%5D/page-2dae8e455ace7a37.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/child/%5Bid%5D/record/page-b44665e19d118967.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/child/page-e2ccb0ea8d3228b9.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/child/register/page-034b4f62ffa51d18.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/hospital/loading-8300163b810c7f2f.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/hospital/page-111a1332487b08c2.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/layout-a7f594bbf3593bb0.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/mypage/like/page-8420bc2cc1a8e506.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/mypage/page-002568fa3e136073.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/page-89f0bfdbf7448098.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/policy/page-37fd1d2e46e07b4e.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/termsofuse/page-211f00fa163315ab.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/app/vaccineinfo/page-1bdd0fba7aa00517.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/fd9d1056-be8dae251340537b.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/main-5a08ede0972f3b71.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/main-app-705c0bddf54eec69.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-65fa7312549cee66.js",revision:"VcUCKRSpAiOgh10g-Q77C"},{url:"/_next/static/css/873f713056082130.css",revision:"873f713056082130"},{url:"/_next/static/media/Search-icon.f0928564.svg",revision:"fcdef226e14bce796fdb7d54367a8aaf"},{url:"/_next/static/media/add-circle.7c13d9c5.svg",revision:"55b670644e8abb6ef5814ae92036f523"},{url:"/_next/static/media/ambulance-icon.edd74c91.svg",revision:"12daeaf4f1e0f8e2ffede73dd965d65c"},{url:"/_next/static/media/ambulance.9483de9f.svg",revision:"c9673bf9ddd89eac1a8daca83159370c"},{url:"/_next/static/media/ambule-small.ea9fedb7.svg",revision:"99fa1086600108046180d2b5072a2ae7"},{url:"/_next/static/media/cake-icon.7cfa886f.svg",revision:"49d59d92bc8bd7f4be83f57dd2cd413b"},{url:"/_next/static/media/calendar-icon.fe61e748.svg",revision:"7be852884686eaf663c3a964ff9a6d5d"},{url:"/_next/static/media/call.703db307.svg",revision:"c7aba812e65e857ff1c71635c04cddf1"},{url:"/_next/static/media/camera-icon.05c6fa7c.svg",revision:"46a9bb8ffe618af1f5ce95c8641b2253"},{url:"/_next/static/media/category.66805f86.svg",revision:"9e6f9215b92c1c177e9bfcef32a43aa8"},{url:"/_next/static/media/checklist-icon.5c50e3dc.svg",revision:"2b3b42f711216b7022e467f26915f8f7"},{url:"/_next/static/media/child-icon-gray.922de14b.svg",revision:"0cdd422cfb3e4e2c7d26f228faaef74a"},{url:"/_next/static/media/child-icon-white.e8ecf5f8.svg",revision:"1e50e0a85645f59022c5733361b0c112"},{url:"/_next/static/media/child-link-icon.116609ff.svg",revision:"36efa0d5c5437719167f458e2fd5c66b"},{url:"/_next/static/media/children.b6c28db4.svg",revision:"c6fc90036e872e97824828a623a81a1f"},{url:"/_next/static/media/close-btn.5970550b.svg",revision:"94aa081d500fd410382d4a773378dab0"},{url:"/_next/static/media/delete-icon.99d1072f.svg",revision:"3597251494cc2b2ad1e3dcbc4b207341"},{url:"/_next/static/media/empathize.d7e45d6d.svg",revision:"da0e3040e2bb52ee56385c85498aa598"},{url:"/_next/static/media/essential-icon.b6070662.svg",revision:"702dffd7f9a291c41307f3582d2e09db"},{url:"/_next/static/media/ff840cfebfb63b0c-s.p.woff2",revision:"302ec55f5b4320354ec6b35a53dead87"},{url:"/_next/static/media/google.14734578.png",revision:"5f6f1dbf3638b0d2f715fe049a86b966"},{url:"/_next/static/media/home.66b05d1c.svg",revision:"22604a963a26b768e36f1dc4900a1a1e"},{url:"/_next/static/media/hospital.bcb0ac08.svg",revision:"e76063cb326b5c5e7f1b910c472c7bfc"},{url:"/_next/static/media/info-circle.b408d39a.svg",revision:"4b9392d4f3c766530330b2c5cce6ebc2"},{url:"/_next/static/media/injector-icon.ef7499b4.svg",revision:"3eb2604497268f0315b3b6b510e86c71"},{url:"/_next/static/media/injector.bff28239.svg",revision:"808b138ec13ea529b5493269c1c7aa2c"},{url:"/_next/static/media/kakaotalk.9af192c9.svg",revision:"de073126591088c2510a02b34ac2ce92"},{url:"/_next/static/media/loading-spinner.8eae687c.svg",revision:"57d3b9055d483430ba2710a3451ba6e7"},{url:"/_next/static/media/logo.1b5e832b.svg",revision:"2eba5c9e964fc64ff135a2de8e2e0108"},{url:"/_next/static/media/logoIcon.e52fad27.svg",revision:"32cda9bf9da9f65096bc1e0e219fe743"},{url:"/_next/static/media/map-icon.71eff4f9.svg",revision:"534b47b0f23a799eee32fceac8fce2a5"},{url:"/_next/static/media/mood-kid.01e507a6.svg",revision:"3dca9c0a860f575d98e4d6a696a4ca22"},{url:"/_next/static/media/newborn-baby.2d14962b.svg",revision:"7617a7e9539656a686ccbc54ab029cf1"},{url:"/_next/static/media/no-child-icon.a64e601f.svg",revision:"f1c233a9602898876a36d8b16ae93bf4"},{url:"/_next/static/media/phone.7eeaf55b.svg",revision:"abdbfb2db5943a428b3b8a3f41ce001c"},{url:"/_next/static/media/pill.9402efb4.svg",revision:"316772d0f854d47555c9268e25d002ff"},{url:"/_next/static/media/preIcon.090918bb.svg",revision:"19771e616b59ae771d0fab19ae6b973b"},{url:"/_next/static/media/process.990db14d.svg",revision:"f25c4b600e9a816f52484d33a9f024ee"},{url:"/_next/static/media/register-child-info-blurred-icon.d2b4921c.svg",revision:"97f4955952944473879069cdc159fcc3"},{url:"/_next/static/media/register-child-info-icon.0679d8c7.svg",revision:"a93e61556bd3e0cc9a19a16b48ac0d20"},{url:"/_next/static/media/right-arrow-icon.e518ddcf.svg",revision:"61d587e2b445d9f854d951bd27dabe20"},{url:"/_next/static/media/search-icon.fbc8eec6.svg",revision:"4bd5d78f21b77a419e5eb2baa036d816"},{url:"/_next/static/media/search-takkomi.25338b83.svg",revision:"9920ed2e8d70b682efe14b8b6b95860e"},{url:"/_next/static/media/search.4e4ffc7b.svg",revision:"492e441af95a6fa602207e9ec6295d9d"},{url:"/_next/static/media/selective-icon.b693e6b9.svg",revision:"11bac1b38ab1e37316fe364ea31c5ab0"},{url:"/_next/static/media/takkomi.2c4690e6.svg",revision:"61f49c1ea2c718172e4d628306f4045b"},{url:"/_next/static/media/target.f2a5eb1e.svg",revision:"beb8bb30ef873313b28c4ebed4337d49"},{url:"/_next/static/media/vaccination1-1.47d91fc9.svg",revision:"755d8f03eb9a8dca24894108af2b07aa"},{url:"/_next/static/media/vaccination1-2.4681ab08.svg",revision:"610f8f7aa024b81b4c25d1fe12a4664b"},{url:"/_next/static/media/vaccine-filter-off-icon.543eda78.svg",revision:"6b4bd1e8dcc49b760bbc04c9989e22e2"},{url:"/_next/static/media/vaccine-filter-on-icon.320e9c1a.svg",revision:"30171fc4b5e0c62d4c5e8d21d15c1248"},{url:"/_next/static/media/vaccine.fa6f4947.svg",revision:"f6f53e2c3b5ce9998eaed7211295b61d"},{url:"/_next/static/media/yeong-a.da256170.svg",revision:"4a66eead56c4ff744e80968fe6c39edd"},{url:"/_next/static/media/yua.dcfdef7c.svg",revision:"6f600f43ad4471731e1cf06aaa2afa2a"},{url:"/ageGroup/category.svg",revision:"9e6f9215b92c1c177e9bfcef32a43aa8"},{url:"/ageGroup/children.svg",revision:"c6fc90036e872e97824828a623a81a1f"},{url:"/ageGroup/newborn-baby.svg",revision:"7617a7e9539656a686ccbc54ab029cf1"},{url:"/ageGroup/yeong-a.svg",revision:"4a66eead56c4ff744e80968fe6c39edd"},{url:"/ageGroup/yua.svg",revision:"6f600f43ad4471731e1cf06aaa2afa2a"},{url:"/child/cake-icon.svg",revision:"49d59d92bc8bd7f4be83f57dd2cd413b"},{url:"/child/camera-icon.svg",revision:"46a9bb8ffe618af1f5ce95c8641b2253"},{url:"/child/checklist-icon.svg",revision:"2b3b42f711216b7022e467f26915f8f7"},{url:"/child/child-icon-gray.svg",revision:"0cdd422cfb3e4e2c7d26f228faaef74a"},{url:"/child/child-icon-white.svg",revision:"1e50e0a85645f59022c5733361b0c112"},{url:"/child/delete-icon.svg",revision:"3597251494cc2b2ad1e3dcbc4b207341"},{url:"/child/essential-icon.svg",revision:"702dffd7f9a291c41307f3582d2e09db"},{url:"/child/injector-icon.svg",revision:"3eb2604497268f0315b3b6b510e86c71"},{url:"/child/no-child-icon.svg",revision:"f1c233a9602898876a36d8b16ae93bf4"},{url:"/child/register-checklist-icon.svg",revision:"a93e61556bd3e0cc9a19a16b48ac0d20"},{url:"/child/register-child-info-blurred-icon.svg",revision:"97f4955952944473879069cdc159fcc3"},{url:"/child/register-child-info-icon.svg",revision:"a93e61556bd3e0cc9a19a16b48ac0d20"},{url:"/child/register-injector-icon.svg",revision:"2791c8b758e952779c7a51436d51d17d"},{url:"/child/right-arrow-icon.svg",revision:"61d587e2b445d9f854d951bd27dabe20"},{url:"/child/selective-icon.svg",revision:"11bac1b38ab1e37316fe364ea31c5ab0"},{url:"/common/empathize.svg",revision:"da0e3040e2bb52ee56385c85498aa598"},{url:"/common/error-takkomi.svg",revision:"640244945afe1a87014bad2e54f7edf1"},{url:"/common/free-tag.svg",revision:"a1fa0ab533e788da70c55bdb6888f616"},{url:"/common/home.svg",revision:"22604a963a26b768e36f1dc4900a1a1e"},{url:"/common/loading-spinner.svg",revision:"57d3b9055d483430ba2710a3451ba6e7"},{url:"/common/mood-kid.svg",revision:"3dca9c0a860f575d98e4d6a696a4ca22"},{url:"/common/search-takkomi.svg",revision:"9920ed2e8d70b682efe14b8b6b95860e"},{url:"/common/search.svg",revision:"492e441af95a6fa602207e9ec6295d9d"},{url:"/common/vaccine.svg",revision:"f6f53e2c3b5ce9998eaed7211295b61d"},{url:"/favicon.svg",revision:"d4236f1e65bed7f72b8107e2422a5e36"},{url:"/homepage/Search-icon.svg",revision:"fcdef226e14bce796fdb7d54367a8aaf"},{url:"/homepage/add-circle.svg",revision:"55b670644e8abb6ef5814ae92036f523"},{url:"/homepage/ambulance-icon.svg",revision:"12daeaf4f1e0f8e2ffede73dd965d65c"},{url:"/homepage/ambule-small.svg",revision:"99fa1086600108046180d2b5072a2ae7"},{url:"/homepage/calendar-icon.svg",revision:"7be852884686eaf663c3a964ff9a6d5d"},{url:"/homepage/child-link-icon.svg",revision:"36efa0d5c5437719167f458e2fd5c66b"},{url:"/homepage/hospital.svg",revision:"e76063cb326b5c5e7f1b910c472c7bfc"},{url:"/homepage/info-link-person.svg",revision:"22a0653b8529f0216776eecd7cd91791"},{url:"/homepage/injector.svg",revision:"808b138ec13ea529b5493269c1c7aa2c"},{url:"/homepage/map-icon.svg",revision:"534b47b0f23a799eee32fceac8fce2a5"},{url:"/homepage/pill.svg",revision:"316772d0f854d47555c9268e25d002ff"},{url:"/homepage/takkomi.svg",revision:"61f49c1ea2c718172e4d628306f4045b"},{url:"/homepage/vaccineInfo-bg.svg",revision:"af50c47296b924090a47aa62a8b69f9f"},{url:"/hospital/ambulance.svg",revision:"c9673bf9ddd89eac1a8daca83159370c"},{url:"/hospital/call.svg",revision:"c7aba812e65e857ff1c71635c04cddf1"},{url:"/hospital/info-circle.svg",revision:"4b9392d4f3c766530330b2c5cce6ebc2"},{url:"/hospital/phone.svg",revision:"abdbfb2db5943a428b3b8a3f41ce001c"},{url:"/hospital/search-icon.svg",revision:"4bd5d78f21b77a419e5eb2baa036d816"},{url:"/hospital/vaccine-filter-off-icon.svg",revision:"6b4bd1e8dcc49b760bbc04c9989e22e2"},{url:"/hospital/vaccine-filter-on-icon.svg",revision:"30171fc4b5e0c62d4c5e8d21d15c1248"},{url:"/icon/close-btn.svg",revision:"94aa081d500fd410382d4a773378dab0"},{url:"/icon/icon-192x192.png",revision:"f72890f7bfdecc3724f9f22641df7509"},{url:"/icon/icon-512x512.png",revision:"068e2211d3300b90d22f5c3ebc435a66"},{url:"/icon/preIcon.svg",revision:"19771e616b59ae771d0fab19ae6b973b"},{url:"/logo.svg",revision:"2eba5c9e964fc64ff135a2de8e2e0108"},{url:"/logoIcon.svg",revision:"32cda9bf9da9f65096bc1e0e219fe743"},{url:"/manifest.json",revision:"99aa6071cc13f244b046f790cb991d7b"},{url:"/plusIcon.svg",revision:"1f53bcc83bdcd08e543fd5f7dcb74619"},{url:"/privacy-policy.md.md",revision:"096cd3cd53a719d953d08f693a120ed2"},{url:"/vaccineInfo/process.svg",revision:"f25c4b600e9a816f52484d33a9f024ee"},{url:"/vaccineInfo/target.svg",revision:"beb8bb30ef873313b28c4ebed4337d49"},{url:"/vaccinerecord/blank-checkbox-icon.svg",revision:"bc35641c83366769baa047583bd299c2"},{url:"/vaccinerecord/not-required-checkbox-icon.svg",revision:"1550449cf2922f60581e35df8e41225a"},{url:"/vaccinerecord/required-checkbox-icon.svg",revision:"ca858fe7390881e025edf0e7fae7da2f"},{url:"/vaccinerecord/vaccination1-1.svg",revision:"755d8f03eb9a8dca24894108af2b07aa"},{url:"/vaccinerecord/vaccination1-2.svg",revision:"610f8f7aa024b81b4c25d1fe12a4664b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:c,state:a})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
