---
layout: post
title: "SmashingConf London 2018"
desc: "An extremely raw, totally unproofed write up of my notes from SmashingConf London 2018. Total butchery of the English language. You have been warned."
date: "2018-2-13"
---

# Preface
Immediately below are a few key points distilled from my raw notes. Following these is a writeup of my raw notes: they're an extremely raw, totally unproofed write up of my notes from SmashingConf London 2018. There will be typos, incomplete sentences, fragmentary notes, repetitions, and possibly contradictions. Some of it might be even incomprehensible out of context, (but at least this way you don't have to try to read my handwriting). I'll tidy these up over the next few weeks, but most the important thing is to make them available soonest, so here you are.

We can do better.

And we will!

Soon...   

# Some key points
- use Brotli compression
- use HTTP/2
- You can have impactful images with fewer bytes transferred by degrading the image quality but combining it with a background colour or gradient via `mix-blend-mode` or `filter()`
- make sure you can remove A/B testing quickly if it causes performance problems
- flatten the dependency tree with client hints
- consider using `font-display` with `preload` client hint as a progressive enhancement to improve font loading UX (for this and alternatives see [https://www.zachleat.com/web/comprehensive-webfonts/](https://www.zachleat.com/web/comprehensive-webfonts/))
- a little care how you construct and manipulate js arrays can take advantage of V8 optimisations
- only load the js you need, and delay non-essential scripts
- may improve jank by using `will-change`
- use `requestAnimationFrame`
- Chrome User Experience Report provides real user metrics at scale (for Chrome)
- Case studies of business cases for demonstrating the impact of web performance optimisation on business metrics are at [WPOStats](https://wpostats.com)
- CSS grid is awesome

# Vitaly: New Front-End Adventures in Responsive Design

Smashing: annual drop of 50% revenue; 66% users using ad blockers.

copy docs - method to build a site with a text-first approach.

Maslow for sites (bottom to top): speed > access > scale > style

JAM Stack: JavaScript, API & markup

Otto.de: German retailer uses vertical slicing of responsibilities: e.g. the breadcrumb team.

AirBnB: 'air/shots': search engine for style guide that works for both designers and developers. Now extended to use machine learning to recognise their UI patterns

## Sketch-related
Sketch to React tool: build mock-ups in React & then import into 

html-sketch-app    
nodeToSketchLayers
SymbolMaster

Supernova Studio


- define component root sizes in rem, but internal component sizes in em. Usual caution applies. [How might this blow up?]
- plot font size against viewport width, and code the curve: for font-size see Mike Reithmueller. Could apply same principle to e.g. line-height

## Grid
vw doesn't take into account the width of the scrollbar.

`-start` and `-end` are magic suffixes to grid line names...

<!-- Beginnings of play: https://codepen.io/davidcmoulton/pen/qxaBmp -->

Can use for baseline grid - see https://codepen.io/rwdworkshop/pen/qVzyej

Watch out for Edge < 16 implementation: can use `@supports (grid-gap: 0)` to screen out Edge as it doesn't support `grid-gap`

Grid bugs and their amelioration: https://github.com/rachelandrew/gridbugs 

[cssgridgarden.com](https://cssgridgarden.com) 

## Text
- zlib preset quality settings: slow compression, smaller size; faster compression, larger size
- could use zopfli: improved gzip: good but slow, backwards compatible
- brotli: better compression but slower (decompression speed on client is okay), and not backwards compatible: could use brotli with a gzip fallback. Requires HTTPS.
    - speed could be an issue?
    - check slides for details

## Images
- large image with drop shadow: embed jpeg of big image into svg container, that also has embedded withing it a png that contains the dropshadow. 
- contrast swap technique (but bad for saving image)
- could have large, highly compressed image displayed at a small size: file size could be a lot smaller than an smaller image of higher quality (bad for memory)
- could blur unimportant bits of an image to reduce file size
- try modifying default scan level for progressive jpegs in order to 'ship fast and show soon'
    - mights try mozjpeg or adapt jpeg, or tinyJpeg, or Guetzli
- letsenhance.io upscales images with machine learning

## Webfonts
- can use bulletproof@font-face syntax
- can drop eot & opentype if don't care about IE9 & old Androids

Fonts only downloaded when they're references in css (after construction of DOM and CSSOM)
Flash of invisible text with 3 s timeout in FF & Chrome before displaying fallback, but Safari has no timeout!
Native browser API (web font loader)

["Comprehensive guide to font loading strategy"](https://www.zachleat.com/web/comprehensive-webfonts/)

Critical FOFT

Can store font in ServiceWorker cache.

[`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) (`optional` could be a good bet).            

Web fonts often drop out of the HTTP cache because they have a low priority: Facebook 2015 study: 40% of the time, users don't have the assets in the cache you'd expect. That's pretty unreliable, so use ServiceWorker cache instead.

Can use `unicode-range` in `@font-face`: good for internationalisation: only requests font if the page contains characters from that range. [Could this be automated?]
  
Variable fonts (see `font-variation-settings`: can only be targeted with media query and JavaScript (?as opposed to what?). Designers can add custom variable axes, in addition to the preregistered ones): not so much use for latin character sets, but in languages with large character sets, e.g. Japanese, it's prohibitive to load the bold font weight as well as the regular one, so using variable fonts can help here. Poor browser support, but support is coming. Not many fonts support it yet, but type designers are on it now. `font-variation-settings` is low level (a la Houdini), and so can override other font settings, e.g. `font-weight`.
Variable fonts are incompatible with parametric fonts.
[axis-praxis.org](https://axis-praxis.org)    

## 3rd parties
- generate request maps for what 
- [requestmap.webperf.tools](https://requestmap.webperf.tools)
- WebpageTest black hole endpoint
- could return an empty response from ServiceWorker if script doesn't return in a set amount of time 
- sandbox property
- SafeFrame?
- IntersectionObserver: one of the family of `Observer` APIs. Could investigate `ResizeObserver` for element query prollyfill?
- `contain` css property

## CSS custom properties
`@supports (--custom: property)`

- everything using a variable expression is recalculated when the value is changed
- can be scoped: if you put it on the `:root` then it's global

- the old Intrinsic ratio for videos (2009) can be updated to use css custom properties
  

## Performance
- cheap Android phones running Chrome pass all mustard cutting checks but have limited memory & CPU capability.
- could try for Device memory API, and fall back to mustard cutting if that doesn't work
- Google suggesting Moto G4 as an average reference phone.
- script parsing time vary so much between devices it's insane.
- 90% sites sending 1MB js which takes about 4s to even just parse on a Moto G4
- (sites only use 40% of the js they're sent)
- takes 5s to get interactive on 3G network with 400ms round trip time with just 170k for everything on critical load path

- scout approach to deploying on H/1.1, avoids having to re-download html when assets change
- H/2 can have many small files
- comparing H/1.1 with H/2: with no packet loss H/2 is (much?) faster, but what about packet loss with H/2? It can bork downloads (~20% US traffic affected by traffic loss).
- server push: good for first load, but server will always push them even when they're in the browser cache (solved by cache-digest: coming, but it's not ready yet).  
- still important to package with H/2 in order from dictionary reuse in the compression: e.g. 5-10 bundles
- browsers not optimised for this yet, so there can be browser runtime costs of sending many files over H/2.
- with H/2, can load individual files instead of inlining critical css
- resource hints: `rel="prefetch"`, `rel="preconnect"`, `rel="dns-prefetch"`, `rel="preload"`. `preload` enables you to set the right resource priority for preloading assets. for fonts you need to specify `crossorigin`. DO NOT USE the deprecated `prerender`
- can fetch js with `preload` and then only execute it when you need it.

## ServiceWorkers
- they try to get html files from network first, then cache
- for 'files' (assets, I assume), try cache first, then network
- in both cases, show offline fallback page if both respective attempts fail.
- Google's 'workbox' (? https://developers.google.com/web/tools/workbox/ ?)
- pragmatist guide to service worker https://github.com/lyzadanger/pragmatist-service-worker   


## Links
Slides at [www.smashed.by/lnd18](https://www.smashed.by/lnd18)
- responsivebreakpoints.com
- letsenhance.io
- https://www.zachleat.com/web/comprehensive-webfonts/
- https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
- axis-praxis.org
- requestmap.webperf.tools
- ratiobuddy.com - intrinsic ratios for videos (old technique)
- Vitaly's performance checklist
- https://github.com/lyzadanger/pragmatist-service-worker
- https://developers.google.com/web/tools/workbox/ ???

[data-data.net](https://data-data.net)
[airbnb.design](https://airbnb.design)

### Explore

- css modules
- Mike Reithmueller font-size
- Firefox grid inspector
- `vmin` etc
- `ch` unit: width of `0` character in current typeface - of particular use with monospace fonts
- [cssgridgarden.com](https://cssgridgarden.com) 
- brotli & fallbacks
- `font-display: optional;`
<!-- - WE CAN USE INTERSECTIONOBSERVER WITH HYPOTHESIS! Also for lazy-loading our figures: this could -->
- Google's idea for Moto G4 as a reference phone
- browser calories extensions 
  
<!-- 
## Thoughts
- we need to get the pattern-library scaleable: export Nick's design system knowledge into the pattern library.
-->

# Phil Hawsksworth: Making Platforms and Processes Promote Performance


Deployment:
 - version control deployments
 - Avoid human interventions
 - Make them atomic
 - could create a URL for every version ready for circulation stakeholders' approval
 - decide when and what to version (= a deployment)
 - script them
 - automate them
 - make it real: actual production deployments, not just to a pseudo-identical staging environment
 - make it first: work out how you're going to deploy early in the project process

## Look more into
 - Book: Designing for performance: Laura Hogan  
 - jamstack.org
 
 
# Rachel Andrew: into the weeds of CSS layout
 Mainly grids: not too many notes here as will be attending her workshop.
 
Grid level 2 Working Draft shipped 6th Feb: includes subgrids!

Sizing is often misunderstood in grid, a la flexbox: "how big is that box?"

Sizes can be fixed (px, % etc), intrinsic (auto, fit-content, min-content, max-content) or flexible (fr)

For grid track sizing:
  - auto: generally fits without overflow, intrinsically has effect of `justify-content: stretch`
  - min-content: uses all soft wraps without breaking out of its container
  - max-content: no soft wrapping, may overflow
  - fit-content(x): acts as max-content until it hits with x  
  - fr uses available space
  
minmax() can set both min and max width for a grid track.
1fr track size is actually shorthand for minmax(auto, 1fr). This may not give equal track sizes if the width of the content under auto rules would be larger than 1fr.
If you want to force equal track sizes, risking overflow, use minmax(0, 1fr)  
  
Perf studies indicate that whatever you do with grid, it performs pretty much the same.

[UC Browser has ~30% market share in India.]

[Shapes is ready]

"I'm not here to build shiny things for rich people. I never have been."

Grid gaps and tracks should be animatable (only implemented in FF atm)

Suggest don't use progressive enhancement approach for building a grid:
  - build good document structure
  - build grid that you want
  - work out how to give non-implementing clients a good user experience
Using this approach means you're not constrained by the limits of only what was possible before grid


# Una Kravets and Martin Splitt: Beyond the basics of image optimisation
@una; @g33konaught

WebP may be lossy or non-lossy (configuration).


Questions for us:
- Are our WebPs lossy?

Various optimisers:
- mozjpeg
- Optipng
- img loader for webpack

Lifecycle of an image load:
1. download image
1. read header (setup)
1. decode image
1. VRAM upload
1. Composite
1. Display

jpg compresses in 8x8 pixel blocks.
Large areas of block colour compress better when using _lossless_ compression

PNG header: first 4 bytes identifies a png file to the browser

compositing is running shaders with all layers as input (Martin coding shaders in GLS language)

## Techniques:
- "blur up": load tiny, scaled up image first to give an impression of the image while the main image loads.
- manipulate the colour histogram e.g. make the image greyscale. Put it over a background colour or a gradient background (either of its own element, or of a (pseudo, maybe) element positioned behind it) then apply css filters/mix blend modes etc to the image element so it interacts with the background colour in funky ways to give coloured effects.
- When SVG is used as a background image, you can't affect it directly, but you can affect it with CSS filters.
- "contrast swap": reduce image contrast using linear transform function in an image editor to reduce the image file size, serve image, in CSS apply contrast `filter` to make up for the contrast removal. Downside is downloading the image gives you the low contrast image version
- never use gifs: send video instead

Blend modes are either on or off, but filters are animatable. Blend modes' hue, saturation, luminosity and colour use the Munsell colour system.

Look into client hints to try to work out what quality image to send.


# Andy Davies: "A/B testing, ads and other third party tags"

slideshare.net/andydavies

3rd party: something you have on your page whose infrastructure and code is controlled by someone else.

150 3rd parties in 2011; 5000+ in 2017.

Chrome and Safari decode images on the main thread, so blocking js will block image display.

Retailer removed Bazaar Voice from their site, gained a 4s speed reduction in Android, resulting in 26% increased revenue from that platform

Safari double keys its cache for privacy reasons, which means loading a 3rd party library from a URL on site A means that its cache entry can't be reused on site B.

Optimizely blocks the critical render path for 2s. So:
- only have the experiments that you actually want to run
- strip out jQuery if it's already on the page
- use separate tags for staging and production

long task API is coming, but it's not here yet: https://www.w3.org/TR/longtasks/

Make sure tests are testing the same things in the wild, e.g. if A/B testing images, make sure the images have a comparable file size.

Do A/B testing on the CDN, not on the client. Fastly recognise this.

Make sure you can always turn off A/B testing quickly in an emergency. Recounted one client who was A/B testing login buttons. A/B testing caused a massive slow down, but they couldn't turn it off without removing the login button from their site entirely.
Some 3rd parties (ad providers tealeaf & Oracle were the examples), add a `beforeUnload` handler: they want to finalise data or whatever before the next page load (they use this event because there's no guarantee that the `unload` event will ever fire). This can introduce a 1-2s delay when leaving a page with these ads on.

Double check DevTools waterfall in WebPageTest, as it can be hard to see what's going on. Example of game.co.uk: during page load, the browser had initiated 61 image requests before requesting the actual page [wtf?]. Couldn't tell in DevTools, but waterfall chart in webpagetest made it clear.

Average number of network requests sent by one ad is 56! One video ad can  use 3s CPU render time.

He's tried CSP and sub resource integrity to try to control rogue ads, but not had much success.

RUM: Real user metrics rather than lab metrics (New Relic vs WebPageTest).

Tag managers:
- too easy to add new tags
- but it is easy to remove them, too (technically, if not politically)

Removing tags often political. Best scenarios when all parts of the business are aligned. Have an audit trail for what gets added, devs have permission to remove tags if they're causing a performance problem.
Tag managers can help in controlling load order

For each 3rd party you add, establish the value, and understand the cost.

# Zach Leatherman: Web font performance

slate.com accidentally announced that Mitt Romney was running for president when the actual story was that he'd decided
_not_ to run for president: this happened because an oblique webfont for the word "not" hadn't loaded (FOIT).

Browsers often hide content when loading web fonts (FOIT).

Alternative is FOUT: the text appearing in its fallback font until the webfont loads. Much less serious than the old FOUC that we used to get while
waiting for CSS to download & be processed.

Over the years, browsers have flipflopped between FOUT and FOIT (now with a 3s timeout at least).

Play with the behaviour at https://www.zachleat.com/foitfout/

FOIT repaints more than FOUT (although you can force a grouped repaint, but it's not clear from `/foitfout` what the tradeoffs are here with this) 

Don't use bullet proof font face syntax any more

Only need to use woff and woff2 formats these days

Each webfont has its own independent loading cycle, which means independent FOITs.

Whether and how FOIT / FOUT can be managed using `font-display` as a progressive enhancement (only Chrome & FF atm): https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display Note this only changes how things display while loading, it doesn't affect the load itself. 

Browsers use font-synthesis (fake bold/italic), when the real font version is not available. Useful for when fonts are loading, but don't use this 
technique once font loading cycle has finished.

[faux-pas bookmarklet](https://filamentgroup.github.io/faux-pas/dist/demo.html) can identify occurrences of font-synthesis on a page

The browser initiates a web font load when:
- CSS has been parsed and `@font-face` found
- a node has been found in the document:
    - that has an exact match on `font-family`
    - has content
    - if using the `@font-face`'s `unicode-range`, content on the node matches
    
Because it takes inspection of the CSS to determine font(s) to download, the CSSOM can be completed, and render has got far enough along that the "paint text" step
has happened before the webfont is available. This is why and when the FOUT/FOIT occurs.

Can use `preload` with web fonts to reduce the elapsed time to font available; extra powerful when coupled with `display-font`.

[CSS Font Loading module](https://drafts.csswg.org/css-font-loading/) (Editor's Draft atm) may help in the future, Bram Stein tried to polyfill but it needs access to browser internals that just aren't available, so he's instead concentrated on [Font Face Observer](https://github.com/bramstein/fontfaceobserver). It has no FOIT, forces one grouped repaint, and works with third party font hosts.

[postcss-foft-classes](https://github.com/zachleat/postcss-foft-classes) uses css classes to control font loading. Potentially powerful, but you need to be careful 
because once the appropriate css class is applied, the font is loaded whether there is any node using it or not.

## Checklist:

### No invisible text:
  - use FOUT and font-synthesis
  - `font-display`
  - CSS font loading API

### Reflow as little as possible, as soon as possible
  - group repaints so fewer  overall (CSS font loading API; variable fonts)
  - make font files smaller (`woff2`, subsets)
  - trigger downloads sooner (`preload`)
   
[A comprehensive guide to font loading strategies](https://www.zachleat.com/web/comprehensive-webfonts/)


# Patrick Meenhan: How fast is it?

Runs WebPageTest from his basement!

There are more metrics than we know what to do with, so when selecting one, make sure it's something that can be used to
improve the user experience.

`onload` is easily gamed: think Twitter's old client-side rendering.

## Metric recommendations
Synthetic:
    - First (contentful) paint
    - Speed index
    - First interactive

Real user measurement:
    - First (contentful) paint
    - First interactive

User timing

Pick some representative 'profiles':
- "My site isn't that slow"
- Chrome User Experience Report (CrUX) effective connection type
- GA and RUM connection info
- Slow users underrepresented: they do less on your site because your site is slow for them
- Median & 99th percentile

Socket connection time is a good proxy for user connection latency

## CrUX

[https://developers.google.com/web/tools/chrome-user-experience-report/](https://developers.google.com/web/tools/chrome-user-experience-report/)
- Real user performance data from Chrome users
- Aggregated per origin
- Histogram of several metrics:
    - First paint
    - First contentful paint
    - DOM Content Loaded
    - Onload
- Split by:
    - Country
    - Effective connection type (2g, 3g, 4g...): describes how good the user's connection _actually_ is, not what it nominally is    
    - Device type (phone, tablet, desktop)
    
     

[does HTTP/2 use the look ahead pre-parser? Not sure.]

3rd parties break the HTTP/2 prioritisation strategy.

TTFB: if this is long, nothing else matters.

Server response time should measure if the server flushes early, so then can measure total time to deliver both header and full content

`onload` and `fullyloaded` events aren't very useful.

Look into [Paint Timing API](https://css-tricks.com/paint-timing-api/).

When lazy loading images using IntersectionObserver, delay until first paint, but then load the images in order, don't wait
until the container comes into view: phone networks will otherwise load the images too slowly & the user will notice it's missing.

[could be clever, loading the next one as its container gets close to the viewport, but is far enough away to allow time for the load to complete on a mobile network?...]

Interactive metrics: first interactive vs consistently interactive. Showing lots before first interactive can be frustrating: you're 
showing the user lots of lovely toys they can't play with yet. Kind of a victim of own success in getting the time to first meaningful paint down so successfully

iPhones have maintained lightening fast rendering: e.g. all JS & CSS [for what site?] downloaded at 3s desktop, 5s iPhone, low end 20s Android.

user timing [`performance.mark()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark)

Measure real user performance; evaluate that to develop improvements against it, testing using synthetic metrics (e.g. WebPageTest); deploy it and measure how (if)
it's improved real user metrics (RUM).
  
[WebPageTest: 'custom metrics' takes arbitrary js that runs once the page has loaded; 'inject script' runs the injected script while the page is loading]

[WPO Stats](https://wpostats.com/) "Case studies and experiments demonstrating the impact of web performance optimization (WPO) on user experience and business metrics."
Can submit to them as well as use their data.

When emulating a less performant client (e.g. phone), make sure you throttle the CPU as well as the connection & using the viewport emulation.

Re memory: you can test on a low-end 512Mb device to make sure things don't blow up, but apart from that, let memory be the browser's problem: don't need to emulate memory.

Speed Index (WebPageTest) vs Perceptual Speed Index (Lighthouse): perceptual speed index penalises when content moves around during loading (think ads, but also cookie popups).

HTTP/2: don't domain shard any more, serve everything from a single origin.


# Umaar Hansa: DevTools

- Performance panel: capture screenshots
- local overrides: Override tab -> 'enable local overrides' -> add local override folder -> network tab (not panel): right click on resource: 'Save for overrides'.
Notice a small purple dot now appears in the tab next to the filename indicating this file now overrides the file from the server. #everythingisawesome!

## Render performance
console popup tab (not main tab), '...' -> performance monitor
console popup tab (not main tab), '...' -> Rendering provides FPS metre, paint flashing, layer borders and scrolling performance issue indicators
console -> enable verbose logging will show best practice violations.
audits -> performance audit -> all_the_things!

[https://developers.google.com/web/tools/lighthouse/](https://developers.google.com/web/tools/lighthouse/) has lots of best practice info.

## Paint indicators
`performance.getEntriesByType('paint)` gives access to `first-paint` and `first-contentful-paint` in Chrome (FF returns empty array).

console popup tab (not main tab), '...' -> Coverage provides real time reports of unused CSS.

Can programmatically access dev tools, so can script API via Puppeteer for automated tests

Best way to know what's happening in DevTools: read the codebase! 
      
# Ilya Grigorik: Mystery speaker

Book: High performance browser networking

How to measure UX on the web?

As per a previous talk: there are many metrics out there, but which ones can you use to meaningfully measure the UX?

Local lab/synthetic metrics can be got from WebPageTest/Lighthouse.
Small scale Real User Metrics can be gained from RUM tool used by the site.

Large scale lab/synthetic metrics can be gained from HTTPArchive.

Large scale RUM: Chrome User Experience Report (CrUX): provides UX metrics for how real world chrome users* experience the web

*users who are syncing their browser history without a passphrase.

Processing the data:
1. anonymize
1. filter out non-public URLs
1. filter out low traffic URLs (so users can't be identified by visits to these)
1. geocode by country and then by IP address

Two ways of accessing the data:
- Big Query: can query per domain
- PageSpeed Insights: can query per URL (whether it's your URL or not)

[Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)

[Ilya's netinfo-monitor](https://github.com/igrigorik/netinfo-monitor) reports network quality, as reported by the Network Information API.

[Paint Timing API](https://www.w3.org/TR/paint-timing/)

Can use CrUX for competitor analysis, vertical benchmarking, monitor macro UX trends.

Can use to calibrate lab tests with real world UX: used in PageSpeed.

[Look into Airdroid]

Chrome user selected data saver routes things via Google proxy to save on bandwidth. Uses HTTP header `Save-Data`.

WebPageTest             vs           CrUX
Emulated moto 4G                    Hundreds of different device types
3G throttling                       Full mix of Ethernet, WiFi, 4G, 3G, 2G...
Clean cache                         (HTTP, memory, network) cache
Index page only                     All pages
Deep traces & '00's of metrics      Small set of diagnostic metrics


Calibrate your lab against the RUM data for your site.

CrUX:
- page load time: 3.4s
- 1st contentful paint: 1.4s

Looks better than lab metrics (HTTPArchive).

# Mathias Bynens: JavaScript Engine internals

## Element kinds in V8

The internal type of the things held within an array.

The more specific the elements kinds type, the more efficient the array operations.

As the variation in the types of items held in an array becomes more heterogeneous, the elements kinds type of the array changes. It always changes in the direction specific -> generic, never in the other direction.

For example: if an array has only small integer values, the array has a very specific elements kinds; once floating point numbers are added, the elements kinds becomes more generic, and if you add in some strings, the elements kinds becomes very generic. If the strings and floating point numbers are removed from the array, and only small integers remain, the elements kinds type remains very generic, because these values can never get more specific.      

A sparse array is always more generic than its equivalent packed array. This is because when trying to identify the type of an undefined element in a sparse array, JavaScript has to look all the way up the prototype chain before it can be sure it's `undefined`, and prototype chain lookup is expensive.

The same lookup happens when addressing an array element that's out of bounds, whether in a packed or a sparse array, so don't do that!

Try to avoid transitioning elements kinds. This has an effect on the array methods (except `find` and `findIndex`, that are more expensive anyway [why?]).

Use `for of`: this works with `NodeList`s as well as arrays, huzzah!

Try to avoid having arrays containing `-0`, `NaN` and `Infinity` [also `-Infinity`?], because they cause elements kinds to transition downwards (more generic).

Use `(...args)` rest syntax for getting args into a proper array rather than the old `arguments` array-like structure.

`d8` is a REPL for `v8`. See https://www.dropbox.com/s/h24711w7q5z5vfn/2018-02-08%2010.53.01.jpg?dl=0 for slide of how to run it (Note `%`-prefixed items are not valid js names and so are deliberately used for V8 internals so they don't accidentally get exposed.)

Array constructor preallocated space, which might be more efficient when dealing with e.g. 9000+ elements, but the array it creates is sparse, so bear in mind what happens when trying to read from an unpopulated index. Alternatively, create the array using a primitive, and `push` to it. Good for allocating 16 elements at a time, but may be slower than using  the array constructor for large arrays.

Basically you're either optimising array creation, or future array operations: you pays your money, you takes your choice.

Arrays use Copy On Wrote (COW): if you have 10 copies of the same array, it's only stored once, and all 10 references point to the same thing initially. Only when one of the 10 is modified is the array then copied and changed accordingly and the reference to the modified array is updated to point to the new (modified) copy. It's a memory optimisation thing.

Coming in ES2018: big ints, regex improvements.    

# Katie Hempenious: Improving page performance in modern web apps

Hardware and networks constrain performance: "you can't escape physics".

Hardware constrains computationally expensive tasks, e.g. a radial gradient compared to solid colour.

JavaScript code volume has a large impact on performance: parse/compile/execute, so remove unnecessary JavaScript.

Strategies:
  - remove unnecessary js
  - delay loading non-critical js
  - use another tool/context
  
## Remove unnecessary js
Only use transpiled code where necessary (80% of browsers support ES2015).

Use minifiers and optimisers. This can have tradeoffs: better compression may require more CPU/upfront work/possible side effects. Can reserve more aggressive optimisations for static resources that can be cached. Find the sweet spot between compression size and time.

Tree-shaking (webpack, rollup etc.), made possible because ES2015 modules are static rather than dynamic. This is why exports are always top level.

Webpack: typically used for frameworks: "static module bundler for modern JavaScript applications". Features tree shaking; code splitting; hot module replacement and import of static assets.
                                                                                                                  
Rollup: typically used for libraries (e.g. used by React, Vue, Ember, D3, etc...). Features tree shaking only i.e. generates a smaller bundle, but lacks many of Webpack's features.

Tree shaking removes only unused exports, only supports 2015 modules; it may include more code than necessary (it defaults to safe i.e. includes the code if it's not sure). Remove unused code yourself, because it's hard to do automatically via static analysis because JavaScript is loosely typed.

## Delay js load

Defer non-essential scripts: prefer `defer` over `async`: `defer` executes when the parser finishes parsing the document [ordering vs `async`?].

Use code-splitting and lazy-loading: it reduces js that needs to be parsed at startup, and reduces load of irrelevant code.

Code splitting:
- 1 application, 1 script: good compression, poor caching, poor granularity
- 1 module, 1 script: poor compression, good caching, good granularity
- Goldilocks: bundles. The trick is to identify the level of granularity that works for you

## Use another tool or context

Netflix reduced the Time To Interactive on their login page by 50% when they replaced React with vanilla js. The remainder of the app loads in the background while the user logs in.

Moving things from the client to the server gives you less variation of metrics, and the server's completely under your control. 

## Bandwidth vs latency

Increasing bandwidth has diminishing returns, bandwidth is sufficient in many markets. Average bandwidths by country (with corresponding bandwidth-only theoretical minimum load time of average sized 3.5Mbps web page, ignoring all latency):
- UK: 26Mbps (0.13s)
- Japan: 22Mbps (0.16s)
- USA: 12Mbps (0.21s)
- Brazil, Russia: 9Mbps (0.39s)
- Indonesia: 5Mbps (0.70s)
- India, Pakistan, Nigeria: 4Mbps (0.88s)


But latency is strongly correlated with performance:
- 5G (spec): <= 4ms
- 4G: <100ms
- 3G: 100-500ms
- 2G: 300-1000ms

Sending more data is usually less expensive than setting up another connection [didn't mention HTTP/2]. Fewer requests is better when latency is high, smaller file size is better when bandwidth is constrained.

With HTTP/1.1 it takes 1-3 server round trips to download a tiny resource. TCP slow start limits the amount of data that can be sent at the beginning of a connection.  

Use caching: ideally determining freshness should not require a network request: use content-addressed URIs (e.g. logo[hash].jpg, not logo.jpg), in conjunction with max-age: [very large number]. Facebook quoted as saying this technique saved them 60% of requests.


When BBC switched to ServiceWorkers they saw a 40% speed increase for high latency networks, and a 0-2% decrease in speed on high latency networks. It's speculated that the performance drop on a low latency network was to do with the TLS handshake as HTTP/2 forces TLS.  
    
## Resource prioritisation

Browsers prioritise loading of assets depending on whether they're likely to be useful, and whether they're render blocking:

- Very high: Main resource (HTML); CSS (applicable media type)
- High: JavaScript (synchronous)
- Medium: JavaScript (synchronous); Images (in-viewport)
- Low: JavaScript (async; deferred); Images (out-of-viewport)
- Very low: CSS (non-applicable media type)

dns-prefetch

preconnect

preload for _current_ navigation (has priority of the resource type being fetched) (very recent browser versions)

prefetch for _next_ navigation (has the lowest possible priority) (not Safari)

Consider a progressive enhancement (support not universal)

(prerender and rel="subresource" are deprecated).

Ideal candidates for HTTP/2 push: critical resources that are used immediately, and that previously would have been inlined. It's the quickest way to get resources to the browser, but weigh against that the lack of caching, pushing on subsequent page loads, and that it's new tech (so may experience some wrinkles when using in anger). [Yoav talks more about this.]  

Use brotli for compression. Compared to gzip, you get a better compression ratio, so larger files will see a proportionally better improvement; faster decompression; range of compression speeds (but note that when selecting high compression it can be slower than gzip, use different levels of compression, and so speed of compression, depending on whether the item compressed is a static asset or dynamically generated at page request time).

LinkedIn observed 20-30% reduction in file size vs gzip; Dropbox saw 20%.

Implementing: enable it on server/CDN; no client config required: clients include `br` in "Accept-Encoding" header if they can handle it; needs TLS; no issue if client doesn't support it; supported in all major browsers.

# Yoav Weiss: Resource loading: past, present and future

time != bytes/bandwidth because of latency. Connection to server is inherently latency-bound.

Six areas that affect performance:
1. handshake
1. TCP slow start
1. resource discovery
1. head of line problem
1. contention
1. bloat 

TCP slow start: initial response is 10 packets which is equivalent to 14kb, response rate scales up exponentially from there when no packet loss. Try to get as much critical render stuff in the first 14k. [Does TCP slow start still apply with HTTP/2? Presumably, but can't get resource on it].

Browser ideal would be a flat dependency tree, but humans write deep, creating a deep dependency tree.

HTTP/1.1 tries to avoid contention issues by delaying requests for low priority resources.

## HTTP/2
HTTP/2 helps sending the request, but can't help with the server response: now download is bandwidth-bound, not latency bound.

HTTP/2 server's job is to send resources in correct prioritisation order, and is not very responsive to priority changes.

HTTP/2 packet loss effectively reintroduces HTTP/1.1's head of line problem, as the stream will stall until the missing TCP packet is resent.

## Critical rendering path: resource loading
The network imposes latency-, bandwidth-, and 3g/4g architecture constraints. Once things have begun to load it goes like this:

1. dl html, discover css asap with look ahead pre-parser.
1. HTML -> DOM; CSS -> CSSOM; dl JavaScript
1. combine DOM/CSSOM/results of JavaScript execution into the render tree
1. layout
1. paint
1. composite

Priority: HTML > CSS > JavaScript > Fonts > Images

Cross resource compression (crossing the advantages of more bytes for greater compression with that of independent resources).

"Web packaging" treats each file in a bundle separately, but they can be cached together. 

HTTP/2 compression dictionaries look promising, but there are security concerns.

QUIC stack replaces TCP/TLS layer with the new QUIC protocol implemented in user space [https://www.chromium.org/quic](https://www.chromium.org/quic)

QUIC handles packet loss differently: rather than stalling all streams, it only stalls the stream that's lost the packet.

QUIC is released in 6-week cycles and has not stabilised, the IETF are involved, but it's not ready for prime time yet (hopefully end of 2018).

Early flushing isn't always a good thing: for example, what happens if a database call fails, and you need to send a separate page, but you've already flushed the header of the page you were expecting to load before the db call failed? Its' tricky.

HTTP/2 push: server doesn't know what's currently in the browser cache. Can lead to a lot of unnecessary pushing. Could be solved by new proposals e.g. [cache-digests](https://calendar.perfplanet.com/2016/cache-digests-http2-server-push/).

Can flatten the dependency tree with `preload`: the resource priority depends on the value of the `as` attribute. But `as` is coarse, for example can't specify `async` or `defer`. Currently working on priority hints. 

`preconnect` hints for non-navigation requests to set up the connection early.

`connection coalescing`:
TCP fast open + TLS 1.3
QUIC & IETF QUIC
Alt-Svc over DNS
[?]

To reduce the effect of TCP slow start and contention, reduce the number of connections, and unshard your domains.

"secondary certificates": load only what you need.

Brotli.

Coming: compression API for browsers: compress data before sending it to the server. Respectful of the user, useful for RUM data & much more.

Summary:
- HTTP/2
- push, preload, preconnect
- unshard domains, coalesce
- load only what you need
- Brotli
- Future!

Future: device memory client hint + JavaScript API to try to identify low spec devices in order to send less code & smaller images.

He's writing a book on resource loading.

# Emily Hayman: Hitting 60 fps every time

@eehayman Works at Algolia (search company)

"Performant page load is just the prologue."

60 fps means one frame every 16.7ms.

Beware of more frames: more frames means more processing which could lead to dropped frames and jank.
    
Page render steps:

1. calculate layout: happens on the CPU; calculates the page geometry; highly interdependent; recalculating layout is expensive
1. paint: happens on the CPU; calculation of visual styles; repaints only occur once per frame; repaints are expensive
1. composite: happens on the GPU; separates out compositor layers; allows for non-destructive changes i.e. no recalculation of layout nor repainting required.

Ideally, only change properties that trigger recompositing: transformations and opacity and that's it!

Can manually promote elements to their own compositing layer using the CSS property `will-change`. Do this for things that are paint-expensive, fixed position and overflow scroll. 

`will-change` values:
- `auto`: behave as normal, don't do anything special
- `scroll-position`: element expected to animate or change its scroll position in the near future.
- `contents`: elements contents expected to animate or change in the near future.
- `[css-property name]`: indicates the property with the provided name is expected to change in the near future
- `[directions]`:

[https://developer.mozilla.org/en-US/docs/Web/CSS/will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)

[MDN says not to Use `will-change` to fix performance problems, not to prematurely optimise.]

Too much of this gets resource intensive, so only use it when you need to.

CSS animations: browser knows the end point of an animation so it can be optimised. CSS animations happen off the main thread so tend to generally be performant.

Also see [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

JavaScript animations are more finely tuned, and are capable of being made more responsive to the user; it runs on the main thread so risks dropping frames. If need to use JavaScript animation, use `RequestAnimationFrame`.

To help prevent scroll jank, use passive event listeners where appropriate: [https://developers.google.com/web/updates/2016/06/passive-event-listeners](https://developers.google.com/web/updates/2016/06/passive-event-listeners)     
  
IntersectionObserver.

Avoid layout thrashing: read from the DOM and then write to the DOM, don't try to do both at once.

CSS containment: indicates an element subtree is independent from the rest of the document, it tells the browser it's safe to optimise the element.

test in DevTools: more tools -> rendering -> performance -> timeline.

# Allison McKnight: "Building performance for the long term"

Was on Etsy's performance team with Lara Hogan.

WebPageTest

WPOStats

Bring performance RUM into daily understanding.

Consider factoring in performance data tracking into A/B testing. Etsy build 'Sonic' to report on how deployments change performance, using RUM with A/B testing.

Internal Chrome extension for developers to run WebPageTest. Nice!

Always evolve your metrics gathering and analysis: start with the most meaningful and take it from there. Iterate on how you integrate performance into workflows. Maintain expertise in performance. Celebrate performance!

Use histograms and percentiles rather than averages.

# Jake Archibald: "In the loop"

`requestAnimationFrame` (rAF) happens before calculating style and performing layout and paint in Chrome & FF. Edge & Safari make rAF happen after layout and paint, but this is a bug.

Compositor thread runs composition.

`MutationObserver` (& other `Observer`s) creates microtasks. Microtasks run when JavaScript finishes executing something. Promises also result in microtasks, so the promise callback will be at the bottom of the js callstack. Once the microtask queue begins to empty, it empties before any other JavaScript runs. Microtasks only run when the JavaScript stack is empty.

Same domain iframes are on the same event loop as the main window.

Cross domain iframes can't be on the same event loop.

When opening a page with target="_blank" on the same domain, the new window has access to the parent window via `window.opener`. Use `rel="noopener"` on all external links.

# CSS layouts: Rachel Andrew
Original examples which I've then gone on to fork are at https://cssgrid.me/smashinglondon2018


## multicol
multi-column layout reasonable fallback for grid in some cases.

but multicol fragmentation: e.g. cards can break between image and following text

`break-before`, `break-inside` can be used to mitigate. E.g. can force no breaks after a heading. 

fragmentation a particular problem with printing layouts involving multi-col, grid & flexbox: use something else in a print stylesheet!

e.g. use case: long sets of checkboxes

use vertical media queries and use multicol within, in order to stop scrolling being required in a multicol environment 

gap property in grid and multicol is the same (coming to flexbox later, too)   

A lot of users of multicol are publishers: ebooks. CSS WG for multi-col is ~50% publishers using CSS to print books 

## Flexbox
Flexbox or grid? If you're putting widths on your flex items, you should probably be using grid.

flexbox's not wrapping by default is in sympathy with its single-dimensional nature.

alignment started in flexbox level 1 (current level); later all alignment stuff (and gaps) put into box-alignment spec - look here for now on for flexbox alignment (updates to box-alignment won't be ported back into flexbox);
grid uses box-alignment and gaps from box-alignment spec.

align items sets as a group each flex item's align-self property.

`auto` never means default. Often 'interesting', and often not the initial value (that you might think). Make sure you know what it does.

MDN docs often updated by spec authors and browser engineers.

justify-content, not justify-items because you can't justify one item, you have to justify a group ie the content of the flex container
    space-evenly (new? support?), gives an even measure on the 2 outsides, whereas space-around gives a half measure on the outsides.
    
    
Grid probably fewer bugs in supporting browsers than flexbox, because grid happened all at once.

[No one uses things between browser flags, Chrome origin trials: can opt your site into trialing new tech. Experiment to get devs using stuff _safely_, early & so to provide feedback.

Browser vendors don't want to look bad, so they're all keen to solve interoperability problems.]

`align-content` acts on the group of flex items as a whole (a la `justify-content`) when you have wrapping items and there is space in the flex container. This is not the same as `align-items`, which works on individual items within the container.

Bear in mind not just `order`, but also `direction` imposes a _visual-only_ change in order wrt the DOM. Don't do this with things that have logical order. Probably okay with other stuff. This also changes the order in which items are painted, which may or may not be desirable.

flex-basis: auto - if width on an item, it'll use that as the flex-basis: careful, this can catch you out!
          : content - the width of the content of the item(?) [less browser support]
          : 0 will mean all pixels will be distributed per grow/shrink factors
          
can play with flex-basis to build components that don't need media queries.          
          
flex-grow/shrink: factor affecting distribution of available space.

A high flex-shrink value will make it get smaller, faster, than those with a larger number, but the browser won't let the element disappear altogether, even if mathematically it should.

Shorthand:  `flex-flow: [direction] [wrapping]`  

`flex: initial` - default - can shrink but they don't grow == `flex: 0 1 auto`

`flex: auto` == `flex 1 1 auto`

`flex: none` == `flex 0 0 auto`

`flex: 1` == `flex 1 1 0`

`flex: 2` == `flex 2 1 0`

Remember auto margins can be used to split items within a justified content block. An auto margin (everywhere, not just flexbox), use all available space it has access to, so putting it on one side forces it to the other side.

Once things grow they will take up all available space so wont be able to use e.g. justify content, so if you want space between items, either apply a margin to the items, or constrain the widths (but if you're constraining widths, should you be using grid instead?... (see above)). 

flexbugs  
               
## Grid layout
https://www.w3.org/TR/css-grid-1/
https://www.w3.org/TR/css-grid-2/

Spec from IE team (IE10 & 11, can be used as a fallback. It's very solid. ). Been around for ages but didn't get very far for ages (b/c perf?).

Bloomberg paid for the implementation for Blink and Webkit(?), implemented by a third party. Then FF did it, and Edge have moved from old MS grid to current W3C grid.

Stable in current browsers (more so than flexbox).

No subgrids yet.


```  
display: grid;
grid-template-columns: 150px 150px 300px;
```

auto fills the tracks with content

`grid-gap` is shorthand for grid-row-gap & grid-column-gap. Will be transitioning to names row-gap and column-gap for better reuse. But mapping to new names from old will occur so won't break.


explicit grid: you define the grid template
implicit grid: content just slots it, you don't specify all rows/columns for each piece of content
rows/columns autosize

grid-auto-rows/columns sets the size of the row/column. auto works the same as flex-basis.

% & length units work the same in grid/fb

fr unit shares out the available space, not all the space (so not %).

with grid, you apply things to the grid container, whereas with flexbox, the individual items broadly determine the spacing

grid-template-columns etc define a 'track listing'. Can use e.g. `repeat(3, 1fr);`

minmax()-assigned row/column sizing prevents overflow if more contents than expected.

grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    auto-fill leaves spaces for missing tracks at the end
    auto-fit takes up all available space
   
Unless you position things, grid will put content in the next available place on the grid

No way to add rules, or colour cells in the grid spec per se. You need to do this via HTML. It may come via pseudoelements, but not yet.

FF devtools good for layout (Chrome DevTools for performance).

`grid-auto-flow: dense;` backfills and may move things out of order. Do not use if the grid contains things with a logical order (but if just, say, a wall of images, then that's okay). Looks a bit like masonry, but it's not (masonry is awful for performance).

placement:  grids are 1-indexed. can specify order with negative numbers for explicit but not implicit grid. default is 1

`grid-column: 1 / 3` is short for:

```
grid-column-start: 1
grid-column-end: 3

```
Placement targets the lines, not the tracks themselves, remember, e.g. a 3 track grid has 4 lines (see dev tools).

Can name lines on the grid with strings in square brackets.

lines can be named anything

lines can have multiple names

you can use any of a line's names to address it.

<!-- WOAH! https://codepen.io/davidcmoulton/pen/paevry?editors=1100 --> 

If you want to line up grid components to line up with older %-based-laid-out components you can use %, probably the only good reason to though.

Grid template areas: create a template and place things into it. Need to define a name for things on the grid with `grid-area`
populated via `grid-template-areas` 
<!-- https://codepen.io/davidcmoulton/pen/YeZyqp?editors=1100 -->
overall shape of area needs to be rectangular.
Each of the areas will yield line names e.g. 'sidebar' area will yield lines named 'sidebar-start' and 'sidebar-end'.
A line may have several names, derived from the area names.

grid areas are assigned without quotes, but references from grid-area-template within quotes. grid-template-area has one string per 'row'

You could overdo it tho'.

Looks like this could be v useful in small ways, but need to take a lot of care reordering things so that they're not inaccessible.

Remember 1fr distributes available space, so doesn't guarantee equal sizes. If you need equal sizes, use `minmax(0, 1fr)`

"I've seen some people who don't understand how float based grid systems work because they've learned their css from Bootstrap" :-O

<!-- 12 col grid system in css: https://codepen.io/davidcmoulton/pen/aqJdop?editors=1100 --> 

Some browsers have clamped the max grid size to 1000 tracks, but there doesn't seem to be a performance reason to do this,
so they remove that restriction. The spec leaves this as an implementation detail.

Use grid for small, component use cases: doesn't need to just be at page-level.   

<!-- `dl` laid out using grid https://codepen.io/davidcmoulton/pen/oEZbed?editors=1100 -->

Sizing, e.g. `minmax()`
CSS intrinsic (the size its content makes it) & extrinsic (developer-specified size) sizing specification spec. For intrinsic track sizing, browser uses these to calculate sizes, they are also available to developers to use directly:
    - `min-content`: track gets as small as it can, with softwrap & no oveflow (largest thing in the track sets the minimum size)
    - `max-content`: may cause overflow
    - `fit-content([width])`: acts like max content until it gets to [width] Very useful
    - `auto`: by default it stretches (so if you don't want it to stretch, need to set `justify-items` to `start`, for example.)
    
Should get these sizing keywords into `flex-basis` at some point.

box alignment: start/end rather than flex-start/-end for both justify-content, align-content
  everything stretches with stretch, except if things have an intrinsic aspect ratio like images, videos and form elements(!).
  FF grid inspector is really useful for grokking what's going on here. Try it out and play.
  align-self and justify-self (like flexbox).
  
vertical % on gaps and on padding/margin of flexbox and grid: spec allows for ambiguity: different browsers implement it in different ways; spec will be changed, but for now don't use % on vertical spacing and gaps, will probably give you 0 in FF.

Browser support
Not supported by:
- UC browser (based on old version of Chrome)
- other non-western mobile browsers
i.e. some current browsers, it's not just old browsers

IE10-11 has -ms-prefixed old IE style grid. No new vendor prefixes.

Spec includes what happens to old css when turned into flex items/grid items which helps us tweak code for fallbacks, but without having to build 2 separate layouts.

[Can use autoprefixer on CodePen.]

float/clear applied to an element that also becomes a grid item is ignored (like in flexbox).

could use `display: inline-block` as a fallback. Can use `vertical-align`. Both are ignored when it's a grid item.

spec says things are "blockified" before becoming grid items (i.e. no longer inline).

fallback `display: table-cell` Can use `vertical-align`. Both are ignored when it's a grid item. When it becomes a grid item, also throws away the anonymous boxes associated with `table-cell`.

fallback to multicol: multicol stuff is ignored when element becomes a grid item.

So for fallbacks, this mainly leaves widths and whitespace: can use feature queries.

can have multiple clauses in a feature query:
```
@supports ( (display: flex) and (display: grid) ) {
  ...
}
```

Beware checking for lack of support, otherwise may not get the result you expect as feature queries not supported in any IE.

Can reset width in a feature query for a grid item (or anything else), with `width: auto`

Can set `<table>` as a grid and make it more responsive. Will probably need subgrids to be really effective, but that could be great for us! (Level 2 is mainly subgrids.)

Coming in later levels of the grid spec: aspect ratio stuff: now there are 2 dimensions, these things start to matter.

`display: contents` removes everything to do with box generation for its element, replacing it with those of its children. Still exists, just some properties are removed.
Useful when semantically important but graphically null elements are used: e.g. a `<ul>` or `<fieldset>`. This gets over some of the problems with flexbox and grid only acting on immediate children: you can effectively remove elements wrt style to make a grandchild part of a grid or flex layout.

A block formatting context (BFC) contains floats, and can be thought of as a mini-layout. Can generate it with `overflow: auto` or `hidden` in order to force creation of a BFC.
But should you? Probably not. Instead, new: `display: flow-root`: all this does is create a new block formatting context.

CSS Exclusions. Removed from CSS shapes. Implemented in IE and Edge: `-ms-wrap-flow: both`. It allows text to span across an image:
```
word1 word2 ---- word3 word4
word5 word6 | I |word7 word8
```

<!-- TODO:
work on https://codepen.io/davidcmoulton/pen/eVvZOe?editors=1100 to get to https://s3-us-west-2.amazonaws.com/s.cdpn.io/12005/grid-task.png
-->
