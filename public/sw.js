if (!self.define) {
  let e,
    i = {};
  const a = (a, c) => (
    (a = new URL(a + ".js", c).href),
    i[a] ||
      new Promise((i) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = i), document.head.appendChild(e);
        } else (e = a), importScripts(a), i();
      }).then(() => {
        let e = i[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, s) => {
    const n = e || ("document" in self ? document.currentScript.src : "") || location.href;
    if (i[n]) return;
    let r = {};
    const t = (e) => a(e, n),
      d = { module: { uri: n }, exports: r, require: t };
    i[n] = Promise.all(c.map((e) => d[e] || t(e))).then((e) => (s(...e), r));
  };
}
define(["./workbox-1bb06f5e"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/Auth/signin/google.png", revision: "5f6f1dbf3638b0d2f715fe049a86b966" },
        { url: "/Auth/signin/kakaotalk.svg", revision: "6e31e7c90a24474748d35a067adefe62" },
        { url: "/_next/static/EUMRAiE3WnOX9_aOYh2zL/_buildManifest.js", revision: "c155cce658e53418dec34664328b51ac" },
        { url: "/_next/static/EUMRAiE3WnOX9_aOYh2zL/_ssgManifest.js", revision: "b6652df95db52feb4daf4eca35380933" },
        { url: "/_next/static/chunks/117-df30df0bf348f832.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/173-641ea1ddb8a25049.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/187-40f426dd3f8fc8df.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/20-c70bc7b062077e2a.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/223.97fbc89dbe48cc1e.js", revision: "97fbc89dbe48cc1e" },
        { url: "/_next/static/chunks/317-265462b3a8dcd436.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/470-84171411580e152b.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/614-c067a940349d10c0.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/632-cb3130af99e814c7.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/64-b83abc29abf93db7.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/663-5fcc1cc7a8708fa4.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/675-be81b3ff4b40d769.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/737-1a5333e5ca605e2b.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/747-9c44369218f09a0b.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/858-ffaf1420cf06fdd8.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/870-2e7c6f59bcf63ad6.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/878-efa22a1e1c93e174.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/972-be0548a234afdc27.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/app/(auth)/signin/page-21e850a999899a1c.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/app/(auth)/signup/page-f311ea3ea45d0013.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/app/_not-found/page-18b9a28b4e769380.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        {
          url: "/_next/static/chunks/app/child/%5Bid%5D/childinfo/page-6baf896f83093ef7.js",
          revision: "EUMRAiE3WnOX9_aOYh2zL"
        },
        { url: "/_next/static/chunks/app/child/%5Bid%5D/page-c61e14c83f0870ab.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        {
          url: "/_next/static/chunks/app/child/%5Bid%5D/record/page-8adef6b0e3a26695.js",
          revision: "EUMRAiE3WnOX9_aOYh2zL"
        },
        { url: "/_next/static/chunks/app/child/page-e7c0ce12efd97e68.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/app/child/register/page-71dd94af3074aa23.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/app/error-dd4299ab27aaa03f.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/app/hospital/loading-496bdecfb91ce2d5.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/app/hospital/page-60e34c3a5649bfb1.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/app/layout-2dd34ba735f308f0.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/app/mypage/like/page-8f4f30916a40d22a.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/app/mypage/page-0f941448266475bc.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/app/page-196d4980172dd237.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/app/policy/page-5c1bb1021002656c.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/app/termsofuse/page-e66e7f19401dee4b.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/app/vaccineinfo/page-345fb89e637c0083.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/fd9d1056-be8dae251340537b.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/framework-f66176bb897dc684.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/main-5a08ede0972f3b71.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/main-app-4e7e86723a73c269.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/pages/_app-72b849fbd24ac258.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/pages/_error-7ba65e1336b92748.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/chunks/polyfills-42372ed130431b0a.js", revision: "846118c33b2c0e922d7b3a7676f81f6f" },
        { url: "/_next/static/chunks/webpack-28aac05ba1d51cec.js", revision: "EUMRAiE3WnOX9_aOYh2zL" },
        { url: "/_next/static/css/2af5b66f01b7ee14.css", revision: "2af5b66f01b7ee14" },
        { url: "/_next/static/media/Search-icon.0a71c21b.svg", revision: "a793b9ee0c5747759c923855c3671c9f" },
        { url: "/_next/static/media/add-circle.a5a8591a.svg", revision: "446b779e1af1cf31a94c87418b834e85" },
        { url: "/_next/static/media/ambulance-icon.9e579eb6.svg", revision: "09f68af0bcd3b8feb2ece6e8651f306d" },
        { url: "/_next/static/media/ambulance.811aa0a1.svg", revision: "9dc67e8099945568afa327cb41827a42" },
        { url: "/_next/static/media/ambule-small.13b9e6cf.svg", revision: "00a1d2c8001bf2ab81a4a8e842d38444" },
        { url: "/_next/static/media/backicon.c6b7a55c.svg", revision: "5689ba382984450252eee31ac9071ca0" },
        { url: "/_next/static/media/cake-icon.b1967fe8.svg", revision: "c18df403a1e4e0906bebf6c3ba2c081b" },
        { url: "/_next/static/media/calendar-icon.0af712eb.svg", revision: "b9ac41682ca60950b8e4564a9e424bda" },
        { url: "/_next/static/media/call.5f4a6602.svg", revision: "4b9ffc9ff88c364f3420431bd2852f13" },
        { url: "/_next/static/media/camera-icon.cbc4f4ca.svg", revision: "597fa9f0b1784766dd3a043eccded952" },
        { url: "/_next/static/media/category.f4b8513f.svg", revision: "57f8050ae527ee25c72c01c0342b7446" },
        { url: "/_next/static/media/checklist-icon.fc2b0309.svg", revision: "a711c26b50c1f86455d1459e5b4159d0" },
        { url: "/_next/static/media/child-icon-gray.fb606d1a.svg", revision: "932bec4256328d070cf8dbe9d0ee37d5" },
        { url: "/_next/static/media/child-icon-white.16c7725a.svg", revision: "d5bc51ccd27d01a5f1291950a09c0057" },
        { url: "/_next/static/media/child-link-icon.3af44ec5.svg", revision: "985d61448036e003475537562af2fd96" },
        { url: "/_next/static/media/children.f9defdf6.svg", revision: "dfef042d323cb16ee05823295aa86fb8" },
        { url: "/_next/static/media/close-btn.6e0696a0.svg", revision: "c29799d27cefebc07ed2e035ed4de492" },
        { url: "/_next/static/media/delete-icon.e17d8105.svg", revision: "f6a85f8e467c75c42fb4815dc74c61c1" },
        { url: "/_next/static/media/empathize.4bada4b1.svg", revision: "5938d433620f9b6e858751b5427081d9" },
        { url: "/_next/static/media/error-takkomi.ba0e26aa.svg", revision: "5f97e09e40aaa99d3e79833c6d03cbbb" },
        { url: "/_next/static/media/essential-icon.fc358afe.svg", revision: "95f61f718bcb2885511b842e06b6cafc" },
        { url: "/_next/static/media/ff840cfebfb63b0c-s.p.woff2", revision: "302ec55f5b4320354ec6b35a53dead87" },
        { url: "/_next/static/media/google.14734578.png", revision: "5f6f1dbf3638b0d2f715fe049a86b966" },
        { url: "/_next/static/media/home.97d1fae7.svg", revision: "3b15d5dbfbed576e95c952228fe4cab3" },
        { url: "/_next/static/media/hospital.8223d42f.svg", revision: "e693fd2bbc9996a97024a26ebfe53b15" },
        { url: "/_next/static/media/info-circle.11900dd5.svg", revision: "e877b5a94ee098d3ce87a05d65575c2a" },
        { url: "/_next/static/media/injector-icon.967cc660.svg", revision: "0a90de86ae3ae4feef049e3a78986e7f" },
        { url: "/_next/static/media/injector.f292bd5e.svg", revision: "16c75a3d30873870162ed7dfd890a304" },
        { url: "/_next/static/media/kakaotalk.eaee7adf.svg", revision: "6e31e7c90a24474748d35a067adefe62" },
        { url: "/_next/static/media/loading-spinner.ec046ce5.svg", revision: "41d9513fb05504e315d538beed23413b" },
        { url: "/_next/static/media/logo.6d4495d1.svg", revision: "21ea3b5310b174fbb0b313378897ca58" },
        { url: "/_next/static/media/logoIcon.a9e33e8e.svg", revision: "fb061ec769b41b03ab9859093f8b08fc" },
        { url: "/_next/static/media/map-icon.b73a1eb5.svg", revision: "069e61ef4757520a7ec7792e6acebdc2" },
        { url: "/_next/static/media/mood-kid.e439246f.svg", revision: "31ddbfa4c29303ca2d578e3ba2fe96ec" },
        { url: "/_next/static/media/newborn-baby.1c899eb2.svg", revision: "3709ef860035f5a1d1a9af4264d57afc" },
        { url: "/_next/static/media/no-child-icon.ccd47bfc.svg", revision: "fea10eb467439f05db244a6b53adb013" },
        { url: "/_next/static/media/phone.55193885.svg", revision: "327e33210480db27da33ea6d8bd49f68" },
        { url: "/_next/static/media/pill.9b5971a6.svg", revision: "e9f226da54d183d49a3f2dd18d8761bf" },
        { url: "/_next/static/media/preIcon.c6b7a55c.svg", revision: "5689ba382984450252eee31ac9071ca0" },
        { url: "/_next/static/media/process.30bb44fb.svg", revision: "0fecfa9266eb6e05aca31b311e27ba79" },
        {
          url: "/_next/static/media/register-child-info-blurred-icon.1250acac.svg",
          revision: "d105ad893cbf67f3ec1e1ffef4f6659a"
        },
        {
          url: "/_next/static/media/register-child-info-icon.a0d29c6a.svg",
          revision: "158ea452504c715ae7d253e8674346c7"
        },
        { url: "/_next/static/media/right-arrow-icon.40c19fc5.svg", revision: "88e012cffa4edf0101cc9b61a65e390c" },
        { url: "/_next/static/media/search-icon.c67819aa.svg", revision: "15e1ac8794e0824882aa37d0a401c51b" },
        { url: "/_next/static/media/search-takkomi.f5156371.svg", revision: "4daa79cc091e72031cd131cbf70e3577" },
        { url: "/_next/static/media/search.e7d3c433.svg", revision: "ef4d21f3417268d008a19b801252ee23" },
        { url: "/_next/static/media/selective-icon.548cb189.svg", revision: "6abce215462791c6d3f5eca7c3ba5795" },
        { url: "/_next/static/media/takkomi.c92052ef.svg", revision: "159a8a58dc901e9566489df5c14389b4" },
        { url: "/_next/static/media/target.b236ff8c.svg", revision: "2d45ca06f5d47ea97976904c628e2642" },
        { url: "/_next/static/media/vaccination1-1.5850a2d1.svg", revision: "d10fb53f8772209d553a7accd5d05f6c" },
        { url: "/_next/static/media/vaccination1-2.382bcdff.svg", revision: "1b2be2986cdb7afb37c55f0713a9e6df" },
        {
          url: "/_next/static/media/vaccine-filter-off-icon.7c1af61d.svg",
          revision: "a6d85c76ddad97dbfd8a5c042ad603c8"
        },
        {
          url: "/_next/static/media/vaccine-filter-on-icon.5fbb5fd8.svg",
          revision: "e87984e113c6a1a485919eff9e1b2816"
        },
        { url: "/_next/static/media/vaccine.fc2c35fe.svg", revision: "31711cc6e5ca6e1801a37081495e6b6d" },
        { url: "/_next/static/media/yeong-a.1bb5389a.svg", revision: "d179aae243a4c3c40b95dc295327d641" },
        { url: "/_next/static/media/yua.a6b92395.svg", revision: "56e3a933f3310299eee41e3064b2e4dd" },
        { url: "/ageGroup/category.svg", revision: "57f8050ae527ee25c72c01c0342b7446" },
        { url: "/ageGroup/children.svg", revision: "dfef042d323cb16ee05823295aa86fb8" },
        { url: "/ageGroup/newborn-baby.svg", revision: "3709ef860035f5a1d1a9af4264d57afc" },
        { url: "/ageGroup/yeong-a.svg", revision: "d179aae243a4c3c40b95dc295327d641" },
        { url: "/ageGroup/yua.svg", revision: "56e3a933f3310299eee41e3064b2e4dd" },
        { url: "/backicon.svg", revision: "5689ba382984450252eee31ac9071ca0" },
        { url: "/child/cake-icon.svg", revision: "c18df403a1e4e0906bebf6c3ba2c081b" },
        { url: "/child/camera-icon.svg", revision: "597fa9f0b1784766dd3a043eccded952" },
        { url: "/child/checklist-icon.svg", revision: "a711c26b50c1f86455d1459e5b4159d0" },
        { url: "/child/child-icon-gray.svg", revision: "932bec4256328d070cf8dbe9d0ee37d5" },
        { url: "/child/child-icon-white.svg", revision: "d5bc51ccd27d01a5f1291950a09c0057" },
        { url: "/child/delete-icon.svg", revision: "f6a85f8e467c75c42fb4815dc74c61c1" },
        { url: "/child/essential-icon.svg", revision: "95f61f718bcb2885511b842e06b6cafc" },
        { url: "/child/injector-icon.svg", revision: "0a90de86ae3ae4feef049e3a78986e7f" },
        { url: "/child/no-child-icon.svg", revision: "fea10eb467439f05db244a6b53adb013" },
        { url: "/child/register-checklist-icon.svg", revision: "158ea452504c715ae7d253e8674346c7" },
        { url: "/child/register-child-info-blurred-icon.svg", revision: "d105ad893cbf67f3ec1e1ffef4f6659a" },
        { url: "/child/register-child-info-icon.svg", revision: "158ea452504c715ae7d253e8674346c7" },
        { url: "/child/register-injector-icon.svg", revision: "e1b15f51e0233808d1193d1983f6b7b5" },
        { url: "/child/right-arrow-icon.svg", revision: "88e012cffa4edf0101cc9b61a65e390c" },
        { url: "/child/selective-icon.svg", revision: "6abce215462791c6d3f5eca7c3ba5795" },
        { url: "/common/empathize.svg", revision: "5938d433620f9b6e858751b5427081d9" },
        { url: "/common/error-takkomi.svg", revision: "5f97e09e40aaa99d3e79833c6d03cbbb" },
        { url: "/common/free-tag.svg", revision: "6d655c436bd596aa138efb04cda53eaf" },
        { url: "/common/home.svg", revision: "3b15d5dbfbed576e95c952228fe4cab3" },
        { url: "/common/loading-spinner.svg", revision: "41d9513fb05504e315d538beed23413b" },
        { url: "/common/mood-kid.svg", revision: "31ddbfa4c29303ca2d578e3ba2fe96ec" },
        { url: "/common/search-takkomi.svg", revision: "4daa79cc091e72031cd131cbf70e3577" },
        { url: "/common/search.svg", revision: "ef4d21f3417268d008a19b801252ee23" },
        { url: "/common/vaccine.svg", revision: "31711cc6e5ca6e1801a37081495e6b6d" },
        { url: "/favicon.svg", revision: "ee2adb1d071e9b8dc72d9c1477aab5dc" },
        { url: "/homepage/Search-icon.svg", revision: "a793b9ee0c5747759c923855c3671c9f" },
        { url: "/homepage/add-circle.svg", revision: "446b779e1af1cf31a94c87418b834e85" },
        { url: "/homepage/ambulance-icon.svg", revision: "09f68af0bcd3b8feb2ece6e8651f306d" },
        { url: "/homepage/ambule-small.svg", revision: "00a1d2c8001bf2ab81a4a8e842d38444" },
        { url: "/homepage/calendar-icon.svg", revision: "b9ac41682ca60950b8e4564a9e424bda" },
        { url: "/homepage/child-link-icon.svg", revision: "985d61448036e003475537562af2fd96" },
        { url: "/homepage/hospital.svg", revision: "e693fd2bbc9996a97024a26ebfe53b15" },
        { url: "/homepage/info-link-person.svg", revision: "a53d27b571f26c8fcf46939a3a449452" },
        { url: "/homepage/injector.svg", revision: "16c75a3d30873870162ed7dfd890a304" },
        { url: "/homepage/map-icon.svg", revision: "069e61ef4757520a7ec7792e6acebdc2" },
        { url: "/homepage/pill.svg", revision: "e9f226da54d183d49a3f2dd18d8761bf" },
        { url: "/homepage/takkomi.svg", revision: "159a8a58dc901e9566489df5c14389b4" },
        { url: "/homepage/vaccineInfo-bg.svg", revision: "ea125b45748a184c548fcfef09ca168c" },
        { url: "/hospital/ambulance.svg", revision: "9dc67e8099945568afa327cb41827a42" },
        { url: "/hospital/call.svg", revision: "4b9ffc9ff88c364f3420431bd2852f13" },
        { url: "/hospital/info-circle.svg", revision: "e877b5a94ee098d3ce87a05d65575c2a" },
        { url: "/hospital/phone.svg", revision: "327e33210480db27da33ea6d8bd49f68" },
        { url: "/hospital/search-icon.svg", revision: "15e1ac8794e0824882aa37d0a401c51b" },
        { url: "/hospital/vaccine-filter-off-icon.svg", revision: "a6d85c76ddad97dbfd8a5c042ad603c8" },
        { url: "/hospital/vaccine-filter-on-icon.svg", revision: "e87984e113c6a1a485919eff9e1b2816" },
        { url: "/icon/close-btn.svg", revision: "c29799d27cefebc07ed2e035ed4de492" },
        { url: "/icon/icon-192x192.png", revision: "f72890f7bfdecc3724f9f22641df7509" },
        { url: "/icon/icon-512x512.png", revision: "068e2211d3300b90d22f5c3ebc435a66" },
        { url: "/icon/preIcon.svg", revision: "5689ba382984450252eee31ac9071ca0" },
        { url: "/logo.svg", revision: "21ea3b5310b174fbb0b313378897ca58" },
        { url: "/logoIcon.svg", revision: "fb061ec769b41b03ab9859093f8b08fc" },
        { url: "/manifest.json", revision: "17114c132e6556ed57dc25fe4025517f" },
        { url: "/plusIcon.svg", revision: "b434ce4cb23851fecacf97381950fade" },
        { url: "/privacy-policy.md.md", revision: "a0d14cf86dffcd955145f5d798d5d597" },
        { url: "/vaccineInfo/process.svg", revision: "0fecfa9266eb6e05aca31b311e27ba79" },
        { url: "/vaccineInfo/target.svg", revision: "2d45ca06f5d47ea97976904c628e2642" },
        { url: "/vaccinerecord/blank-checkbox-icon.svg", revision: "70b7f0b69203b9c312d3c52a0a7c68f2" },
        { url: "/vaccinerecord/not-required-checkbox-icon.svg", revision: "cfb96902aec0dd5df0bb95bd792c4a2c" },
        { url: "/vaccinerecord/required-checkbox-icon.svg", revision: "e8fcdf2f19c0badb5445411c275c2395" },
        { url: "/vaccinerecord/vaccination1-1.svg", revision: "d10fb53f8772209d553a7accd5d05f6c" },
        { url: "/vaccinerecord/vaccination1-2.svg", revision: "1b2be2986cdb7afb37c55f0713a9e6df" }
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: i, event: a, state: c }) =>
              i && "opaqueredirect" === i.type
                ? new Response(i.body, { status: 200, statusText: "OK", headers: i.headers })
                : i
          }
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const i = e.pathname;
        return !i.startsWith("/api/auth/") && !!i.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })]
      }),
      "GET"
    );
});
