<<<<<<< HEAD
if(!self.define){let e,i={};const c=(c,a)=>(c=new URL(c+".js",a).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,s)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let r={};const t=e=>c(e,n),d={module:{uri:n},exports:r,require:t};i[n]=Promise.all(a.map((e=>d[e]||t(e)))).then((e=>(s(...e),r)))}}define(["./workbox-1bb06f5e"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Auth/signin/google.png",revision:"5f6f1dbf3638b0d2f715fe049a86b966"},{url:"/Auth/signin/kakaotalk.svg",revision:"6e31e7c90a24474748d35a067adefe62"},{url:"/_next/static/chunks/117-df30df0bf348f832.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/187-40f426dd3f8fc8df.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/20-c70bc7b062077e2a.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/223.97fbc89dbe48cc1e.js",revision:"97fbc89dbe48cc1e"},{url:"/_next/static/chunks/317-265462b3a8dcd436.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/45-3734eb4eb6416b1e.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/614-163f7518cb89585e.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/632-cb3130af99e814c7.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/64-b83abc29abf93db7.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/663-5fcc1cc7a8708fa4.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/675-be81b3ff4b40d769.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/737-1a5333e5ca605e2b.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/747-9c44369218f09a0b.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/858-ffaf1420cf06fdd8.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/870-2e7c6f59bcf63ad6.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/878-efa22a1e1c93e174.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/956-75276e8aa33c31ed.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/972-e338fa2137a7ac34.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/(auth)/signin/page-76cbb5470b05e33b.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/(auth)/signup/page-33c023f3b5b93ca6.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/_not-found/page-18b9a28b4e769380.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/child/%5Bid%5D/childinfo/page-0c2c6a32bc2460d8.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/child/%5Bid%5D/page-4552cd9be3387b47.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/child/%5Bid%5D/record/page-32a0c275afda7ef6.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/child/page-89ea2aafa71be78e.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/child/register/page-da5491927a21b147.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/error-dd4299ab27aaa03f.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/hospital/loading-496bdecfb91ce2d5.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/hospital/page-b844131a1057cc93.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/layout-308584300042ba35.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/mypage/like/page-f715a3a3535356bb.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/mypage/page-8b5f322986c4da43.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/page-196d4980172dd237.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/policy/page-5c1bb1021002656c.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/termsofuse/page-e66e7f19401dee4b.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/app/vaccineinfo/page-971d4f92875a6a8d.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/fd9d1056-be8dae251340537b.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/main-5a08ede0972f3b71.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/main-app-4e7e86723a73c269.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-28aac05ba1d51cec.js",revision:"ruekR46ZCkNpXxXRwOZH5"},{url:"/_next/static/css/0ceda84746c31653.css",revision:"0ceda84746c31653"},{url:"/_next/static/media/Search-icon.0a71c21b.svg",revision:"a793b9ee0c5747759c923855c3671c9f"},{url:"/_next/static/media/add-circle.a5a8591a.svg",revision:"446b779e1af1cf31a94c87418b834e85"},{url:"/_next/static/media/ambulance-icon.9e579eb6.svg",revision:"09f68af0bcd3b8feb2ece6e8651f306d"},{url:"/_next/static/media/ambulance.811aa0a1.svg",revision:"9dc67e8099945568afa327cb41827a42"},{url:"/_next/static/media/ambule-small.13b9e6cf.svg",revision:"00a1d2c8001bf2ab81a4a8e842d38444"},{url:"/_next/static/media/backicon.c6b7a55c.svg",revision:"5689ba382984450252eee31ac9071ca0"},{url:"/_next/static/media/cake-icon.b1967fe8.svg",revision:"c18df403a1e4e0906bebf6c3ba2c081b"},{url:"/_next/static/media/calendar-icon.0af712eb.svg",revision:"b9ac41682ca60950b8e4564a9e424bda"},{url:"/_next/static/media/call.5f4a6602.svg",revision:"4b9ffc9ff88c364f3420431bd2852f13"},{url:"/_next/static/media/camera-icon.cbc4f4ca.svg",revision:"597fa9f0b1784766dd3a043eccded952"},{url:"/_next/static/media/category.f4b8513f.svg",revision:"57f8050ae527ee25c72c01c0342b7446"},{url:"/_next/static/media/checklist-icon.fc2b0309.svg",revision:"a711c26b50c1f86455d1459e5b4159d0"},{url:"/_next/static/media/child-icon-gray.fb606d1a.svg",revision:"932bec4256328d070cf8dbe9d0ee37d5"},{url:"/_next/static/media/child-icon-white.16c7725a.svg",revision:"d5bc51ccd27d01a5f1291950a09c0057"},{url:"/_next/static/media/child-link-icon.3af44ec5.svg",revision:"985d61448036e003475537562af2fd96"},{url:"/_next/static/media/children.f9defdf6.svg",revision:"dfef042d323cb16ee05823295aa86fb8"},{url:"/_next/static/media/close-btn.6e0696a0.svg",revision:"c29799d27cefebc07ed2e035ed4de492"},{url:"/_next/static/media/delete-icon.e17d8105.svg",revision:"f6a85f8e467c75c42fb4815dc74c61c1"},{url:"/_next/static/media/empathize.4bada4b1.svg",revision:"5938d433620f9b6e858751b5427081d9"},{url:"/_next/static/media/error-takkomi.ba0e26aa.svg",revision:"5f97e09e40aaa99d3e79833c6d03cbbb"},{url:"/_next/static/media/essential-icon.fc358afe.svg",revision:"95f61f718bcb2885511b842e06b6cafc"},{url:"/_next/static/media/ff840cfebfb63b0c-s.p.woff2",revision:"302ec55f5b4320354ec6b35a53dead87"},{url:"/_next/static/media/google.14734578.png",revision:"5f6f1dbf3638b0d2f715fe049a86b966"},{url:"/_next/static/media/home.97d1fae7.svg",revision:"3b15d5dbfbed576e95c952228fe4cab3"},{url:"/_next/static/media/hospital.8223d42f.svg",revision:"e693fd2bbc9996a97024a26ebfe53b15"},{url:"/_next/static/media/info-circle.11900dd5.svg",revision:"e877b5a94ee098d3ce87a05d65575c2a"},{url:"/_next/static/media/injector-icon.967cc660.svg",revision:"0a90de86ae3ae4feef049e3a78986e7f"},{url:"/_next/static/media/injector.f292bd5e.svg",revision:"16c75a3d30873870162ed7dfd890a304"},{url:"/_next/static/media/kakaotalk.eaee7adf.svg",revision:"6e31e7c90a24474748d35a067adefe62"},{url:"/_next/static/media/loading-spinner.ec046ce5.svg",revision:"41d9513fb05504e315d538beed23413b"},{url:"/_next/static/media/logo.6d4495d1.svg",revision:"21ea3b5310b174fbb0b313378897ca58"},{url:"/_next/static/media/logoIcon.a9e33e8e.svg",revision:"fb061ec769b41b03ab9859093f8b08fc"},{url:"/_next/static/media/map-icon.b73a1eb5.svg",revision:"069e61ef4757520a7ec7792e6acebdc2"},{url:"/_next/static/media/mood-kid.e439246f.svg",revision:"31ddbfa4c29303ca2d578e3ba2fe96ec"},{url:"/_next/static/media/newborn-baby.1c899eb2.svg",revision:"3709ef860035f5a1d1a9af4264d57afc"},{url:"/_next/static/media/no-child-icon.ccd47bfc.svg",revision:"fea10eb467439f05db244a6b53adb013"},{url:"/_next/static/media/phone.55193885.svg",revision:"327e33210480db27da33ea6d8bd49f68"},{url:"/_next/static/media/pill.9b5971a6.svg",revision:"e9f226da54d183d49a3f2dd18d8761bf"},{url:"/_next/static/media/preIcon.c6b7a55c.svg",revision:"5689ba382984450252eee31ac9071ca0"},{url:"/_next/static/media/process.30bb44fb.svg",revision:"0fecfa9266eb6e05aca31b311e27ba79"},{url:"/_next/static/media/register-child-info-blurred-icon.1250acac.svg",revision:"d105ad893cbf67f3ec1e1ffef4f6659a"},{url:"/_next/static/media/register-child-info-icon.a0d29c6a.svg",revision:"158ea452504c715ae7d253e8674346c7"},{url:"/_next/static/media/right-arrow-icon.40c19fc5.svg",revision:"88e012cffa4edf0101cc9b61a65e390c"},{url:"/_next/static/media/search-icon.c67819aa.svg",revision:"15e1ac8794e0824882aa37d0a401c51b"},{url:"/_next/static/media/search-takkomi.f5156371.svg",revision:"4daa79cc091e72031cd131cbf70e3577"},{url:"/_next/static/media/search.e7d3c433.svg",revision:"ef4d21f3417268d008a19b801252ee23"},{url:"/_next/static/media/selective-icon.548cb189.svg",revision:"6abce215462791c6d3f5eca7c3ba5795"},{url:"/_next/static/media/takkomi.c92052ef.svg",revision:"159a8a58dc901e9566489df5c14389b4"},{url:"/_next/static/media/target.b236ff8c.svg",revision:"2d45ca06f5d47ea97976904c628e2642"},{url:"/_next/static/media/vaccination1-1.5850a2d1.svg",revision:"d10fb53f8772209d553a7accd5d05f6c"},{url:"/_next/static/media/vaccination1-2.382bcdff.svg",revision:"1b2be2986cdb7afb37c55f0713a9e6df"},{url:"/_next/static/media/vaccine-filter-off-icon.7c1af61d.svg",revision:"a6d85c76ddad97dbfd8a5c042ad603c8"},{url:"/_next/static/media/vaccine-filter-on-icon.5fbb5fd8.svg",revision:"e87984e113c6a1a485919eff9e1b2816"},{url:"/_next/static/media/vaccine.fc2c35fe.svg",revision:"31711cc6e5ca6e1801a37081495e6b6d"},{url:"/_next/static/media/yeong-a.1bb5389a.svg",revision:"d179aae243a4c3c40b95dc295327d641"},{url:"/_next/static/media/yua.a6b92395.svg",revision:"56e3a933f3310299eee41e3064b2e4dd"},{url:"/_next/static/ruekR46ZCkNpXxXRwOZH5/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/ruekR46ZCkNpXxXRwOZH5/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/ageGroup/category.svg",revision:"57f8050ae527ee25c72c01c0342b7446"},{url:"/ageGroup/children.svg",revision:"dfef042d323cb16ee05823295aa86fb8"},{url:"/ageGroup/newborn-baby.svg",revision:"3709ef860035f5a1d1a9af4264d57afc"},{url:"/ageGroup/yeong-a.svg",revision:"d179aae243a4c3c40b95dc295327d641"},{url:"/ageGroup/yua.svg",revision:"56e3a933f3310299eee41e3064b2e4dd"},{url:"/backicon.svg",revision:"5689ba382984450252eee31ac9071ca0"},{url:"/child/cake-icon.svg",revision:"c18df403a1e4e0906bebf6c3ba2c081b"},{url:"/child/camera-icon.svg",revision:"597fa9f0b1784766dd3a043eccded952"},{url:"/child/checklist-icon.svg",revision:"a711c26b50c1f86455d1459e5b4159d0"},{url:"/child/child-icon-gray.svg",revision:"932bec4256328d070cf8dbe9d0ee37d5"},{url:"/child/child-icon-white.svg",revision:"d5bc51ccd27d01a5f1291950a09c0057"},{url:"/child/delete-icon.svg",revision:"f6a85f8e467c75c42fb4815dc74c61c1"},{url:"/child/essential-icon.svg",revision:"95f61f718bcb2885511b842e06b6cafc"},{url:"/child/injector-icon.svg",revision:"0a90de86ae3ae4feef049e3a78986e7f"},{url:"/child/no-child-icon.svg",revision:"fea10eb467439f05db244a6b53adb013"},{url:"/child/register-checklist-icon.svg",revision:"158ea452504c715ae7d253e8674346c7"},{url:"/child/register-child-info-blurred-icon.svg",revision:"d105ad893cbf67f3ec1e1ffef4f6659a"},{url:"/child/register-child-info-icon.svg",revision:"158ea452504c715ae7d253e8674346c7"},{url:"/child/register-injector-icon.svg",revision:"e1b15f51e0233808d1193d1983f6b7b5"},{url:"/child/right-arrow-icon.svg",revision:"88e012cffa4edf0101cc9b61a65e390c"},{url:"/child/selective-icon.svg",revision:"6abce215462791c6d3f5eca7c3ba5795"},{url:"/common/empathize.svg",revision:"5938d433620f9b6e858751b5427081d9"},{url:"/common/error-takkomi.svg",revision:"5f97e09e40aaa99d3e79833c6d03cbbb"},{url:"/common/free-tag.svg",revision:"6d655c436bd596aa138efb04cda53eaf"},{url:"/common/home.svg",revision:"3b15d5dbfbed576e95c952228fe4cab3"},{url:"/common/loading-spinner.svg",revision:"41d9513fb05504e315d538beed23413b"},{url:"/common/mood-kid.svg",revision:"31ddbfa4c29303ca2d578e3ba2fe96ec"},{url:"/common/search-takkomi.svg",revision:"4daa79cc091e72031cd131cbf70e3577"},{url:"/common/search.svg",revision:"ef4d21f3417268d008a19b801252ee23"},{url:"/common/vaccine.svg",revision:"31711cc6e5ca6e1801a37081495e6b6d"},{url:"/favicon.svg",revision:"ee2adb1d071e9b8dc72d9c1477aab5dc"},{url:"/homepage/Search-icon.svg",revision:"a793b9ee0c5747759c923855c3671c9f"},{url:"/homepage/add-circle.svg",revision:"446b779e1af1cf31a94c87418b834e85"},{url:"/homepage/ambulance-icon.svg",revision:"09f68af0bcd3b8feb2ece6e8651f306d"},{url:"/homepage/ambule-small.svg",revision:"00a1d2c8001bf2ab81a4a8e842d38444"},{url:"/homepage/calendar-icon.svg",revision:"b9ac41682ca60950b8e4564a9e424bda"},{url:"/homepage/child-link-icon.svg",revision:"985d61448036e003475537562af2fd96"},{url:"/homepage/hospital.svg",revision:"e693fd2bbc9996a97024a26ebfe53b15"},{url:"/homepage/info-link-person.svg",revision:"a53d27b571f26c8fcf46939a3a449452"},{url:"/homepage/injector.svg",revision:"16c75a3d30873870162ed7dfd890a304"},{url:"/homepage/map-icon.svg",revision:"069e61ef4757520a7ec7792e6acebdc2"},{url:"/homepage/pill.svg",revision:"e9f226da54d183d49a3f2dd18d8761bf"},{url:"/homepage/takkomi.svg",revision:"159a8a58dc901e9566489df5c14389b4"},{url:"/homepage/vaccineInfo-bg.svg",revision:"ea125b45748a184c548fcfef09ca168c"},{url:"/hospital/ambulance.svg",revision:"9dc67e8099945568afa327cb41827a42"},{url:"/hospital/call.svg",revision:"4b9ffc9ff88c364f3420431bd2852f13"},{url:"/hospital/info-circle.svg",revision:"e877b5a94ee098d3ce87a05d65575c2a"},{url:"/hospital/phone.svg",revision:"327e33210480db27da33ea6d8bd49f68"},{url:"/hospital/search-icon.svg",revision:"15e1ac8794e0824882aa37d0a401c51b"},{url:"/hospital/vaccine-filter-off-icon.svg",revision:"a6d85c76ddad97dbfd8a5c042ad603c8"},{url:"/hospital/vaccine-filter-on-icon.svg",revision:"e87984e113c6a1a485919eff9e1b2816"},{url:"/icon/close-btn.svg",revision:"c29799d27cefebc07ed2e035ed4de492"},{url:"/icon/icon-192x192.png",revision:"f72890f7bfdecc3724f9f22641df7509"},{url:"/icon/icon-512x512.png",revision:"068e2211d3300b90d22f5c3ebc435a66"},{url:"/icon/preIcon.svg",revision:"5689ba382984450252eee31ac9071ca0"},{url:"/logo.svg",revision:"21ea3b5310b174fbb0b313378897ca58"},{url:"/logoIcon.svg",revision:"fb061ec769b41b03ab9859093f8b08fc"},{url:"/manifest.json",revision:"17114c132e6556ed57dc25fe4025517f"},{url:"/plusIcon.svg",revision:"b434ce4cb23851fecacf97381950fade"},{url:"/privacy-policy.md.md",revision:"a0d14cf86dffcd955145f5d798d5d597"},{url:"/vaccineInfo/process.svg",revision:"0fecfa9266eb6e05aca31b311e27ba79"},{url:"/vaccineInfo/target.svg",revision:"2d45ca06f5d47ea97976904c628e2642"},{url:"/vaccinerecord/blank-checkbox-icon.svg",revision:"70b7f0b69203b9c312d3c52a0a7c68f2"},{url:"/vaccinerecord/not-required-checkbox-icon.svg",revision:"cfb96902aec0dd5df0bb95bd792c4a2c"},{url:"/vaccinerecord/required-checkbox-icon.svg",revision:"e8fcdf2f19c0badb5445411c275c2395"},{url:"/vaccinerecord/vaccination1-1.svg",revision:"d10fb53f8772209d553a7accd5d05f6c"},{url:"/vaccinerecord/vaccination1-2.svg",revision:"1b2be2986cdb7afb37c55f0713a9e6df"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:c,state:a})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
=======
if(!self.define){let e,i={};const a=(a,c)=>(a=new URL(a+".js",c).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,s)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let t={};const d=e=>a(e,n),r={module:{uri:n},exports:t,require:d};i[n]=Promise.all(c.map((e=>r[e]||d(e)))).then((e=>(s(...e),t)))}}define(["./workbox-1bb06f5e"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Auth/signin/google.png",revision:"5f6f1dbf3638b0d2f715fe049a86b966"},{url:"/Auth/signin/kakaotalk.svg",revision:"de073126591088c2510a02b34ac2ce92"},{url:"/_next/static/2d4q54N2M4dULjBptFh3p/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/2d4q54N2M4dULjBptFh3p/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/117-df30df0bf348f832.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/187-40f426dd3f8fc8df.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/20-c70bc7b062077e2a.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/223.97fbc89dbe48cc1e.js",revision:"97fbc89dbe48cc1e"},{url:"/_next/static/chunks/317-265462b3a8dcd436.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/45-581276f93a558cca.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/614-163f7518cb89585e.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/632-cb3130af99e814c7.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/64-b83abc29abf93db7.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/663-5fcc1cc7a8708fa4.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/675-be81b3ff4b40d769.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/747-9c44369218f09a0b.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/858-ffaf1420cf06fdd8.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/870-2e7c6f59bcf63ad6.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/878-efa22a1e1c93e174.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/886-1474c03c38642420.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/956-80caa267c663a739.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/972-e338fa2137a7ac34.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/(auth)/signin/page-9580e0edb8bf93ec.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/(auth)/signup/page-274007ba601ce900.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/_not-found/page-18b9a28b4e769380.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/child/%5Bid%5D/childinfo/page-b2f0b070719f6daa.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/child/%5Bid%5D/page-1534ddeca061b954.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/child/%5Bid%5D/record/page-6203d5f819821d3f.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/child/page-385e464e5b3cbbbb.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/child/register/page-5c01f66c427677a8.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/error-6200c7ed07abd9db.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/hospital/loading-050820915a29654b.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/hospital/page-3e8d675cde039785.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/layout-53c19db30eec3e05.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/mypage/like/page-2a26900d8d4c3d39.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/mypage/page-c270ad5d5800786d.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/page-2c731b50dc88cdf9.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/policy/page-18d84c91e9a50cb1.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/termsofuse/page-e5c164c2e2968f1a.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/app/vaccineinfo/page-6c7d81c3b9b423cc.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/fd9d1056-be8dae251340537b.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/main-5a08ede0972f3b71.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/main-app-e97928159457e2c8.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-65fa7312549cee66.js",revision:"2d4q54N2M4dULjBptFh3p"},{url:"/_next/static/css/0ceda84746c31653.css",revision:"0ceda84746c31653"},{url:"/_next/static/media/Search-icon.f0928564.svg",revision:"fcdef226e14bce796fdb7d54367a8aaf"},{url:"/_next/static/media/add-circle.7c13d9c5.svg",revision:"55b670644e8abb6ef5814ae92036f523"},{url:"/_next/static/media/ambulance-icon.edd74c91.svg",revision:"12daeaf4f1e0f8e2ffede73dd965d65c"},{url:"/_next/static/media/ambulance.9483de9f.svg",revision:"c9673bf9ddd89eac1a8daca83159370c"},{url:"/_next/static/media/ambule-small.ea9fedb7.svg",revision:"99fa1086600108046180d2b5072a2ae7"},{url:"/_next/static/media/backicon.090918bb.svg",revision:"19771e616b59ae771d0fab19ae6b973b"},{url:"/_next/static/media/cake-icon.7cfa886f.svg",revision:"49d59d92bc8bd7f4be83f57dd2cd413b"},{url:"/_next/static/media/calendar-icon.fe61e748.svg",revision:"7be852884686eaf663c3a964ff9a6d5d"},{url:"/_next/static/media/call.703db307.svg",revision:"c7aba812e65e857ff1c71635c04cddf1"},{url:"/_next/static/media/camera-icon.05c6fa7c.svg",revision:"46a9bb8ffe618af1f5ce95c8641b2253"},{url:"/_next/static/media/category.66805f86.svg",revision:"9e6f9215b92c1c177e9bfcef32a43aa8"},{url:"/_next/static/media/checklist-icon.5c50e3dc.svg",revision:"2b3b42f711216b7022e467f26915f8f7"},{url:"/_next/static/media/child-icon-gray.922de14b.svg",revision:"0cdd422cfb3e4e2c7d26f228faaef74a"},{url:"/_next/static/media/child-icon-white.e8ecf5f8.svg",revision:"1e50e0a85645f59022c5733361b0c112"},{url:"/_next/static/media/child-link-icon.116609ff.svg",revision:"36efa0d5c5437719167f458e2fd5c66b"},{url:"/_next/static/media/children.b6c28db4.svg",revision:"c6fc90036e872e97824828a623a81a1f"},{url:"/_next/static/media/close-btn.5970550b.svg",revision:"94aa081d500fd410382d4a773378dab0"},{url:"/_next/static/media/delete-icon.99d1072f.svg",revision:"3597251494cc2b2ad1e3dcbc4b207341"},{url:"/_next/static/media/empathize.d7e45d6d.svg",revision:"da0e3040e2bb52ee56385c85498aa598"},{url:"/_next/static/media/error-takkomi.76420a30.svg",revision:"640244945afe1a87014bad2e54f7edf1"},{url:"/_next/static/media/essential-icon.b6070662.svg",revision:"702dffd7f9a291c41307f3582d2e09db"},{url:"/_next/static/media/ff840cfebfb63b0c-s.p.woff2",revision:"302ec55f5b4320354ec6b35a53dead87"},{url:"/_next/static/media/google.14734578.png",revision:"5f6f1dbf3638b0d2f715fe049a86b966"},{url:"/_next/static/media/home.66b05d1c.svg",revision:"22604a963a26b768e36f1dc4900a1a1e"},{url:"/_next/static/media/hospital.bcb0ac08.svg",revision:"e76063cb326b5c5e7f1b910c472c7bfc"},{url:"/_next/static/media/info-circle.b408d39a.svg",revision:"4b9392d4f3c766530330b2c5cce6ebc2"},{url:"/_next/static/media/injector-icon.ef7499b4.svg",revision:"3eb2604497268f0315b3b6b510e86c71"},{url:"/_next/static/media/injector.bff28239.svg",revision:"808b138ec13ea529b5493269c1c7aa2c"},{url:"/_next/static/media/kakaotalk.9af192c9.svg",revision:"de073126591088c2510a02b34ac2ce92"},{url:"/_next/static/media/loading-spinner.8eae687c.svg",revision:"57d3b9055d483430ba2710a3451ba6e7"},{url:"/_next/static/media/logo.1b5e832b.svg",revision:"2eba5c9e964fc64ff135a2de8e2e0108"},{url:"/_next/static/media/logoIcon.e52fad27.svg",revision:"32cda9bf9da9f65096bc1e0e219fe743"},{url:"/_next/static/media/map-icon.71eff4f9.svg",revision:"534b47b0f23a799eee32fceac8fce2a5"},{url:"/_next/static/media/mood-kid.01e507a6.svg",revision:"3dca9c0a860f575d98e4d6a696a4ca22"},{url:"/_next/static/media/newborn-baby.2d14962b.svg",revision:"7617a7e9539656a686ccbc54ab029cf1"},{url:"/_next/static/media/no-child-icon.a64e601f.svg",revision:"f1c233a9602898876a36d8b16ae93bf4"},{url:"/_next/static/media/phone.7eeaf55b.svg",revision:"abdbfb2db5943a428b3b8a3f41ce001c"},{url:"/_next/static/media/pill.9402efb4.svg",revision:"316772d0f854d47555c9268e25d002ff"},{url:"/_next/static/media/preIcon.090918bb.svg",revision:"19771e616b59ae771d0fab19ae6b973b"},{url:"/_next/static/media/process.990db14d.svg",revision:"f25c4b600e9a816f52484d33a9f024ee"},{url:"/_next/static/media/register-child-info-blurred-icon.d2b4921c.svg",revision:"97f4955952944473879069cdc159fcc3"},{url:"/_next/static/media/register-child-info-icon.0679d8c7.svg",revision:"a93e61556bd3e0cc9a19a16b48ac0d20"},{url:"/_next/static/media/right-arrow-icon.e518ddcf.svg",revision:"61d587e2b445d9f854d951bd27dabe20"},{url:"/_next/static/media/search-icon.fbc8eec6.svg",revision:"4bd5d78f21b77a419e5eb2baa036d816"},{url:"/_next/static/media/search-takkomi.25338b83.svg",revision:"9920ed2e8d70b682efe14b8b6b95860e"},{url:"/_next/static/media/search.4e4ffc7b.svg",revision:"492e441af95a6fa602207e9ec6295d9d"},{url:"/_next/static/media/selective-icon.b693e6b9.svg",revision:"11bac1b38ab1e37316fe364ea31c5ab0"},{url:"/_next/static/media/takkomi.2c4690e6.svg",revision:"61f49c1ea2c718172e4d628306f4045b"},{url:"/_next/static/media/target.f2a5eb1e.svg",revision:"beb8bb30ef873313b28c4ebed4337d49"},{url:"/_next/static/media/vaccination1-1.47d91fc9.svg",revision:"755d8f03eb9a8dca24894108af2b07aa"},{url:"/_next/static/media/vaccination1-2.4681ab08.svg",revision:"610f8f7aa024b81b4c25d1fe12a4664b"},{url:"/_next/static/media/vaccine-filter-off-icon.543eda78.svg",revision:"6b4bd1e8dcc49b760bbc04c9989e22e2"},{url:"/_next/static/media/vaccine-filter-on-icon.320e9c1a.svg",revision:"30171fc4b5e0c62d4c5e8d21d15c1248"},{url:"/_next/static/media/vaccine.fa6f4947.svg",revision:"f6f53e2c3b5ce9998eaed7211295b61d"},{url:"/_next/static/media/yeong-a.da256170.svg",revision:"4a66eead56c4ff744e80968fe6c39edd"},{url:"/_next/static/media/yua.dcfdef7c.svg",revision:"6f600f43ad4471731e1cf06aaa2afa2a"},{url:"/ageGroup/category.svg",revision:"9e6f9215b92c1c177e9bfcef32a43aa8"},{url:"/ageGroup/children.svg",revision:"c6fc90036e872e97824828a623a81a1f"},{url:"/ageGroup/newborn-baby.svg",revision:"7617a7e9539656a686ccbc54ab029cf1"},{url:"/ageGroup/yeong-a.svg",revision:"4a66eead56c4ff744e80968fe6c39edd"},{url:"/ageGroup/yua.svg",revision:"6f600f43ad4471731e1cf06aaa2afa2a"},{url:"/backicon.svg",revision:"19771e616b59ae771d0fab19ae6b973b"},{url:"/child/cake-icon.svg",revision:"49d59d92bc8bd7f4be83f57dd2cd413b"},{url:"/child/camera-icon.svg",revision:"46a9bb8ffe618af1f5ce95c8641b2253"},{url:"/child/checklist-icon.svg",revision:"2b3b42f711216b7022e467f26915f8f7"},{url:"/child/child-icon-gray.svg",revision:"0cdd422cfb3e4e2c7d26f228faaef74a"},{url:"/child/child-icon-white.svg",revision:"1e50e0a85645f59022c5733361b0c112"},{url:"/child/delete-icon.svg",revision:"3597251494cc2b2ad1e3dcbc4b207341"},{url:"/child/essential-icon.svg",revision:"702dffd7f9a291c41307f3582d2e09db"},{url:"/child/injector-icon.svg",revision:"3eb2604497268f0315b3b6b510e86c71"},{url:"/child/no-child-icon.svg",revision:"f1c233a9602898876a36d8b16ae93bf4"},{url:"/child/register-checklist-icon.svg",revision:"a93e61556bd3e0cc9a19a16b48ac0d20"},{url:"/child/register-child-info-blurred-icon.svg",revision:"97f4955952944473879069cdc159fcc3"},{url:"/child/register-child-info-icon.svg",revision:"a93e61556bd3e0cc9a19a16b48ac0d20"},{url:"/child/register-injector-icon.svg",revision:"2791c8b758e952779c7a51436d51d17d"},{url:"/child/right-arrow-icon.svg",revision:"61d587e2b445d9f854d951bd27dabe20"},{url:"/child/selective-icon.svg",revision:"11bac1b38ab1e37316fe364ea31c5ab0"},{url:"/common/empathize.svg",revision:"da0e3040e2bb52ee56385c85498aa598"},{url:"/common/error-takkomi.svg",revision:"640244945afe1a87014bad2e54f7edf1"},{url:"/common/free-tag.svg",revision:"a1fa0ab533e788da70c55bdb6888f616"},{url:"/common/home.svg",revision:"22604a963a26b768e36f1dc4900a1a1e"},{url:"/common/loading-spinner.svg",revision:"57d3b9055d483430ba2710a3451ba6e7"},{url:"/common/mood-kid.svg",revision:"3dca9c0a860f575d98e4d6a696a4ca22"},{url:"/common/search-takkomi.svg",revision:"9920ed2e8d70b682efe14b8b6b95860e"},{url:"/common/search.svg",revision:"492e441af95a6fa602207e9ec6295d9d"},{url:"/common/vaccine.svg",revision:"f6f53e2c3b5ce9998eaed7211295b61d"},{url:"/favicon.svg",revision:"d4236f1e65bed7f72b8107e2422a5e36"},{url:"/homepage/Search-icon.svg",revision:"fcdef226e14bce796fdb7d54367a8aaf"},{url:"/homepage/add-circle.svg",revision:"55b670644e8abb6ef5814ae92036f523"},{url:"/homepage/ambulance-icon.svg",revision:"12daeaf4f1e0f8e2ffede73dd965d65c"},{url:"/homepage/ambule-small.svg",revision:"99fa1086600108046180d2b5072a2ae7"},{url:"/homepage/calendar-icon.svg",revision:"7be852884686eaf663c3a964ff9a6d5d"},{url:"/homepage/child-link-icon.svg",revision:"36efa0d5c5437719167f458e2fd5c66b"},{url:"/homepage/hospital.svg",revision:"e76063cb326b5c5e7f1b910c472c7bfc"},{url:"/homepage/info-link-person.svg",revision:"22a0653b8529f0216776eecd7cd91791"},{url:"/homepage/injector.svg",revision:"808b138ec13ea529b5493269c1c7aa2c"},{url:"/homepage/map-icon.svg",revision:"534b47b0f23a799eee32fceac8fce2a5"},{url:"/homepage/pill.svg",revision:"316772d0f854d47555c9268e25d002ff"},{url:"/homepage/takkomi.svg",revision:"61f49c1ea2c718172e4d628306f4045b"},{url:"/homepage/vaccineInfo-bg.svg",revision:"af50c47296b924090a47aa62a8b69f9f"},{url:"/hospital/ambulance.svg",revision:"c9673bf9ddd89eac1a8daca83159370c"},{url:"/hospital/call.svg",revision:"c7aba812e65e857ff1c71635c04cddf1"},{url:"/hospital/info-circle.svg",revision:"4b9392d4f3c766530330b2c5cce6ebc2"},{url:"/hospital/phone.svg",revision:"abdbfb2db5943a428b3b8a3f41ce001c"},{url:"/hospital/search-icon.svg",revision:"4bd5d78f21b77a419e5eb2baa036d816"},{url:"/hospital/vaccine-filter-off-icon.svg",revision:"6b4bd1e8dcc49b760bbc04c9989e22e2"},{url:"/hospital/vaccine-filter-on-icon.svg",revision:"30171fc4b5e0c62d4c5e8d21d15c1248"},{url:"/icon/close-btn.svg",revision:"94aa081d500fd410382d4a773378dab0"},{url:"/icon/icon-192x192.png",revision:"f72890f7bfdecc3724f9f22641df7509"},{url:"/icon/icon-512x512.png",revision:"068e2211d3300b90d22f5c3ebc435a66"},{url:"/icon/preIcon.svg",revision:"19771e616b59ae771d0fab19ae6b973b"},{url:"/logo.svg",revision:"2eba5c9e964fc64ff135a2de8e2e0108"},{url:"/logoIcon.svg",revision:"32cda9bf9da9f65096bc1e0e219fe743"},{url:"/manifest.json",revision:"99aa6071cc13f244b046f790cb991d7b"},{url:"/plusIcon.svg",revision:"1f53bcc83bdcd08e543fd5f7dcb74619"},{url:"/privacy-policy.md.md",revision:"096cd3cd53a719d953d08f693a120ed2"},{url:"/vaccineInfo/process.svg",revision:"f25c4b600e9a816f52484d33a9f024ee"},{url:"/vaccineInfo/target.svg",revision:"beb8bb30ef873313b28c4ebed4337d49"},{url:"/vaccinerecord/blank-checkbox-icon.svg",revision:"bc35641c83366769baa047583bd299c2"},{url:"/vaccinerecord/not-required-checkbox-icon.svg",revision:"1550449cf2922f60581e35df8e41225a"},{url:"/vaccinerecord/required-checkbox-icon.svg",revision:"ca858fe7390881e025edf0e7fae7da2f"},{url:"/vaccinerecord/vaccination1-1.svg",revision:"755d8f03eb9a8dca24894108af2b07aa"},{url:"/vaccinerecord/vaccination1-2.svg",revision:"610f8f7aa024b81b4c25d1fe12a4664b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:a,state:c})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
>>>>>>> dev
