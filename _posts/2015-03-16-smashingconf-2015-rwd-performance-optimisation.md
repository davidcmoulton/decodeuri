---
layout: post
title:  "Smashingconf 2015: RWD performance optimisation"
date:   2015-03-16
---

I was lucky enough to get to Smashingconf Oxford once again this year. In this post I cover the pre-conference workshop run by Guy Podjarny ([@guypod](http://twitter.com/guypod)), titled "Make a slow responsive website fast". Guy is CTO for Akamai, a CDN company, and so unsurprisginly Akamai was mentioned a bit in the workshop, but never in an exclusive or selling manner, and always accompanied by mentioning free/open alternatives. It definitely wasn't a sales pitch, and didn't feel like one, which I appreciated.

(A note on sources: this post is mainly from my notes and memories of the day. There are some statements that I don't have sources for as I didn't manage to record them as well as the statements themselves; I couldn't type fast enough!)


## Mobile web and performance

Cute fact: there a 6-7 times more smartphones being activated every 45 minutes than there are babies being born.

Plain fact: Akamai have seen mobile traffic on their network up from 9% in June 2012, to 36% 18 months later.

We all know how desktop sites fail on mobile: through bad interactions, pages being too big, and pages being too complex.

This performance impacts business results. Walmart measured download time vs conversion rate on its site, and as you might expect, the slower thee page load, the fewer conversions occurred.

EBay performed a similar study that showed a 5% slowdown of the site cost 1% revenue; a 35% slowdown of the site cost them 5% revenue. They found a faster page caused a lower bounce rate and more pages viewed per session.

## History lesson: dedicated mobile sites ("mdot" sites)

In the days before responsive web design (RWD), businesses attempted to address the failure of desktop sites on mobile by creating dedicated mobile sites (often on an "m." or "mobile." subdomain, hence they're known as "mdot" sites). These had the advantage at the time of being able to be built by a new team who didn't need integrating into the main site team to ply their new-fangled mobile website trade, and were able to ship the mdot site without upsetting the main corporate dev site workflow. Of course after a while this duplication/separation was seen for the burden that it is: it usually requires duplication of content, of development and design.

mdot sites are generally fast though.

mdot sites tend to comprise smaller pages with fewer HTTP requests, so you get performance for free. But with an mdot site you typically have redirects, the latency within which can wipe out the gain of the smaller payload.

These edge redirects (where you get sent to an mdot site, with the appropriate URL, if you're on a device classified by the edge server as "mobile"), have problems of diluted SEO effect, device identification, and portabliity: sending someone a link to an mdot page can give them a horrid experience when they look at it on their large monitor.

An alternative to edge redirects, which addresses the URL portabliity (and probably also the SEO) problems, is adaptive delivery. Here a single URL is used to serve either the desktop or the mdot site, again depending on whether the requesting device is described as "mobile". So although an improvement, it still has the problem of device identification.

Bearing in mind the sheer number of "mobile" devices out there today (Akamai have identified 8000 different devices on their network), and add to that the fact that with such a plethora of screen sizes and resolutions the "mobile" spectrum is more of a continuum than a binary situation these days, then the suitability of an mdot site in today's web landscape is generally low.

<!-- [Aside: Google's design guidelines recommend using a phone as a guide when designing for TV. Although the screen sizes are extremely different, you look at the TV screen from much further away.]

According to the HTTP archive, mdot sites are in a minority, at only 26%, which balance are either desktop sites or responsive sites. -->

## Present lesson: Responsive Web Design (RWD)

Google recommend RWD for SEO. If nothing else, this is driving adoption. In October 2014, of the top 100000 websites, 18% used responsive design, up from 10% only 11 months previously.

Almost no difference in number HTTP requests between RWD site at desktop width, and the same site at narrow width with a mobile user agent.

Average compute time is almost double for an RWD site compared to an mdot site (~6s and ~3s respectively).

HTTP archive trends show that although the number of images is staying roughly the same, the average size of an image has increased significantly (a JPEG file's size on an RWD site is often 150% larger than on a traditional desktop-only site). RWD isn't causing more objects, it's causing objects to be bigger. And for objects, read images.

There are great reasons [why we need responsive images](http://timkadlec.com/2013/06/why-we-need-responsive-images/) which I won't go over again here. Oh okay, just one then (and this one's less commonly mentioned that some others): when the image scaling is handled on the client, the this generally happens on the GPU. The whole image is pushed from the CPU onto the GPU through what's a pretty narrow pipe, before the image can be scaled. This is costly.

The [Responsive Images Community Group](http://respimages.org) has championed the issue of responsive images, and thanks to their efforts we have the following available either as native implementations, or polyfilled:

- ```srcset``` attribute
- ```sizes``` attribute
- ```<picture>``` element

As the first to have agreement among (some) browser vendors to implement, srcset has pretty good native support now. Sizes and picture came later and so currently need polyfilling. So far, my goto polyfill for responsive images has been  [picturefill](https://github.com/scottjehl/picturefill), maintained by Scott Jehl. In the workshop, Guy mentioned another called [respimage](https://github.com/aFarkas/respimage) maintained by Alexander Farkas, which looks interesting, but I've not used (yet).

Eric Portis has a couple of great posts on how to use these new responsive image tools: [Responsive images in practice](http://alistapart.com/article/responsive-images-in-practice) and the older [srcset and sizes](http://ericportis.com/posts/2014/srcset-sizes/).


## Exercises

The exercises were set up on individual Magento servers, so we could individually break things without inconveniencing anyone else. One page in particular was used as the target of most of the optimisations, this is referred to below as the 'test page'.

(Note: if I talk about relative merits of an approach requiring JavaScript or not, I'm referring to the native implementation. Obviously if the behaviour is polyfilled, that will be JavaScript dependent until support is such that the polyfill can be removed.)

## WebPageTest

We were introduced to [WebPageTest](http://www.webpagetest.org/), a tool for running speed tests from multiple geographical locations, using real browsers at real connection speeds. It's a free service, and you can use it manually online, [request a key](http://calendar.perfplanet.com/2014/free-webpagetest-api-keys/) to give you 200 automatable page loads, or install it yourself on a server for full integration into your CI stack.

When making optimisations to a site, it's important you have a baseline to check the effect of what you're changing. We set off a couple of WebPageTest runs to baseline the page on both desktop and mobile before making any changes.

After each optimisation, we ran WebPageTest to see what its effect.

Obviously for site features it's not okay if something core only works for 90% of users. With optimisations though, it is okay if they only work for 90% of users.

## Exercise 1: download and shrink

### Use case

Huge images are being sent to the client for the client to shrink to fit as necessary.

### Optimisation

Only send image of appropriate size to client.

- Modified the server-side code to provide unique urls for the individual images of different (appropriate) sizes.
- Added ```srcset``` and ```sizes``` attributes to the image elements:

```
<img src="[default/fallback image path]"
  srcset="[small image path] 300w, [medium image path] 345w
          [large image path] 500w"
  sizes="(max-width: 640px) 300px, (max-width: 800px) 345px,
         (max-width: 1200px) 500px"
  alt="[something appropriate]"
  ... />
```

Although we only specified width in this case, srcset is often used to specify resolution. Images included in a srcset attribute value are considered equivalent. Because of this, srcset only provides hints to the browser for resolution switching, the browser is not obliged to respect it.

## Exercise 2: download and hide

### Use case

Images are being sent to the client regardless of the client environment, and are just not shown if e.g. the viewport is too narrow.

### Optimisation

#### Option 1: use JavaScript

Like this:
```
<script>
 function loadReal(img) {
  if (!img) return;
  if (img.offsetParent != null) {
   img.onload = null;
   img.src = img.getAttribute("data-src");
  }
 }
</script>
...
<img src="1x1.jpg" onload="loadReal(this);" data-src="[url to desired image]" alt="[alt of desired image]" />
```

JavaScript is required to show these images though.



#### Option 2: use ```<picture>```:

```
						<picture>
							<source media="(min-width: 800px)" src="[url to desired image]" />
							<img src="1x1.jpg" />
						</picture>
```

Unlike images specified in ```srcset```, the child ```<source>``` elements of ```<picture>``` are not considered equivalent. This means that whatever media query you specify there the browser is required to respect. This can make things slower though, so only use ```<picture>``` if you need the [art direction usecase](http://usecases.responsiveimages.org/).

Note that afaik the ```<picture>``` element doesn't allow for a 'no-image' option, hence the 1x1 still specified within ```<picture>```'s ```<img>```

Of the two aproaches above, favour ```<picture>``` as it's a (albiet poiyfilled) native implementation. Always favour standards-based native implementation over custom rolled.

## Exercise 3: overdownloading css
Byte for byte CSS has a massive impact on web page performance, because it can be blocking.

### Use case
Main CSS files contain significantly over 10% of CSS within media queries that will never apply to the current page.

### Optimisation
Refactor the media-query-specific CSS into file(s) specific for the media query/queries. Then conditionally load them.

#### Option 1: use ```<link media...```:

```
<link rel="stylesheet" type="text/css"  href="base.css" media="all" />
<link rel="stylesheet" type="text/css"  href="mobile.css" media="(max-width:799px)"/>
<link rel="stylesheet" type="text/css"  href="desktop.css" media="(min-width:800px)"/>
```

#### Option 2: use JavaScript:


```
  <link rel="stylesheet" type="text/css"  href="base.css" media="all" />
  <link rel="stylesheet" type="text/css"  data-src="mobile.css" data-mq="(max-width:799px)"/>
  <link rel="stylesheet" type="text/css"  data-src="desktop.css" data-mq="(min-width:800px)"/>
  <script>
    var scripts = document.getElementsByTagName("link");
    for(var i=0;i < scripts.length; i++)
    {
      // Test if the Media Query matches
      var mq = scripts[i].getAttribute("data-mq");
      if (window.matchMedia(mq).matches)
      {
        // If so, append the new (async) element.
        var s = document.createElement("link");
        s.rel = 'stylesheet'
        s.type = 'text/css';
        s.href = scripts[i].getAttribute("data-src");
        document.body.appendChild(s);
      }
    }
  </script>
```


Using ```<link>```, the file that is under a non-matching media query is still loaded, but its load is deferred so it doesn't block. This was unexpected, but is apparently standard browser behaviour. I guess so that if the device switches orientation, the CSS for it is already in memory and wouldn't have to be fetched, which could have really horrible effects.

The JavaScript approach gives you complete control over the load, and beacause we didn't ask for it, it didn't defer-load the non-matching media query CSS.

As for the previous exercise, prefer the ```<link>``` element approach over the JavaScript approach: it's a native implementation, and so is a better choice.

This conditional loading introduces extra requests, which is the tradeoff. Whether it's worth doing for your particular CSS is a value judgement you have to make in your own circumstances.

### Exercise 4: RESS (Responsive + Server Side)

[RESS](http://www.smashingmagazine.com/2013/10/08/responsive-website-design-with-ress/) is an approach that pushes onto the server the conditional assembly of a design response, where it makes sense to. *RESS does not replace responsive design on the client*.

Possible approaches are:

- regex the user agent string
- device characteristics
- client hints (not ready yet)
- cookies

#### Using cookies

Can have a JavaScript function that sets a cookie recording the viewport width. The server tests for this and only sends down content for wide screen if it'll fit.

For example, in JavaScript:

```
function writeCookie() {
	var today = new Date();
	var the_date = new Date("December 31, 2023");
	var the_cookie_date = the_date.toGMTString();
	var the_cookie = "users_width="+ window.innerWidth;
	var the_cookie = the_cookie + ";expires=" + the_cookie_date + "; path=/";
	document.cookie=the_cookie
}
writeCookie();
```

then on the server, e.g. in PHP:

```
if (isset($_COOKIE["users_width"])){
  if($_COOKIE["users_width"] > 650) {
    echo The_Content_Only_For_Wide_Viewports;
  }
}
```

- dependency on js for wide view content
- will only take effect on page load, not window resize nor device orientation switch (unless use ajax to set cookie again with new width, and dynamically inject the content as needed?).
- doesn't work for initial page load as cookie needs to be set first.
- can break caching
- how much do you gain with this technique? It may not be worth it.

Consider not including the content at all if it wouldn't show up in landscape nor portrait

#### Using edge side includes (ESIs)

ESIs are like server side includes, but are in the cache. They were originally developed in 2001 to set cache expiry on fragemnts of a page, rather than the page itself.

- available in Varnish, Apache Traffic Server, Akamai...
- open standard, but some implementations have written extensions
- enables you to cache a single page, but have it with whatever variations you want.
- If relying on ESIs, application won't work without them, unless you configure application with e.g. a flag to indicate when ESIs not in use, that causes server to run code to generate content etc that would otherwise be taken into account by the ESIs.

[Example in Varnish](https://github.com/tomav/Varnish-ESI-Example)

### Exercise Image transcoding

Image management vital for any website. Can have many, many image variants for each actual image.

There are (relatively) new image formats like WebP, JPEG2000 etc that have better compression than JPEG and PNG, but there is no solid cross browser support for any of these at the moment.

If you can separate image transcoding from the application, then you can have image selection on a per browser basis. You can be agile about what image gets served to what browser/device, as the situation evolves and new formats come along, or support for current formats improve.

Essentially you have image generation and image routing as two independent functions. Image routing is not new, [ImageMagik](http://www.imagemagick.org/) is good for this. Also consider giving Tinysource(?) and image converter(?)

You could adjust the image quality to the network conditions, but assessing the network is hard. Akamai use round trip time to describe the network as Excellent, Average or Poor.

Serving the right image is difficult, need to consider:

- browser version
- network
- screen resolution/dimensions

Pick a tool wisely. Take into account:

- ease of workflow
- first view of performance
- scaleability
- code complexity

If choosing whether to send down a JPEG or a WebP file to the client, you could use a different URL for each format, and write the URLs in the HTML accordingly. The problem with this approach is that if a link is shared and attempted to be opened in a non-supporting client, the view will fail. Also Google will see these as two different URLs and your SEO will be diluted.

Instead, the recommended approach is to have a single URL that supplied different images using RESS. This may not be easy.


There's a good read by [Ilya Grigorik](https://twitter.com/igrigorik) on [Deploying WebP via accept content negotiation](https://www.igvita.com/2013/05/01/deploying-webp-via-accept-content-negotiation/)

(I know the code sample formatting is horrible. I'll try to get some time to improve it.)

## Misc notes

- WebPageTest enables Single Point of Faliure tests, e.g. what happens if connect.facebook.net is unavailable. (Solution: async them if you can)
- browser loading indicator stops when onload fires.
- how akamai edge servers see your client: http://edc.edgesuite.net/

### Things to follow up

- HTTP archive: trends
- WebPageTest (Motorola G has most agents on WebPageTest)
- paul kinlans css bookmarklet
- https://paul.kinlan.me/detecting-critical-above-the-fold-css/
- spof-o-matic chrome extension: see what happens to your page when scripts are made unavailable
- bit.ly/rf-free
