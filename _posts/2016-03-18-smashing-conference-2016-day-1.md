---
layout: post
title:  "Smashingconf 2016: day 1"
desc: "Write up of raw notes taken during of the first day of Smashingconf Oxford 2016."
date:   2016-03-18 15:35
---

* <ul></ul>
{:toc}

([Find out what happened on day 2]({%post_url 2016-03-18-smashing-conference-2016-day-2%}).)

## Building great design teams
(Aarron Walter @aarron)

Until recently design lead at MailChimp, now freelance.

Often lose details when handing over between research, design and development, as handover can be clunky. Having integrated research / design / development teams increases empathy which helps with handover, but also makes handover less waterfall.

Difference between art and design: design is about service. Need to research the context for the service delivery of your design. It's hard to see the future of your product, but if you can talk to users and find where they're working around your product to get what they need done, that can give you an idea of what your product is missing.

Successful product companies perform onstant quality improvements to existing products, as well as developing new things.

On site research will give you more context, e.g. age of tech, level of distraction, quality of lighting etc etc, all have a potential effect on how youe user interacts with your product. If you can video your users and play back to colleagues, more people in your company can appreciate your users' contexts.

Before MailChimp was cross-device, he made a video (resourced in-house), of a future user who integrates multi device access into her use of MailChimp. More effective at communicating the story of a user of a future version of their product than expecting everyone to read and digest a 30 page report on future product direction.

Agile, used blindly, can lead to painful forcing of process as waterfall did. Reasrch, design and development naturally work at different cadences, development is generally very suitable for scrum, but design works on a longer iteration cycle, and research longer still. Also, research should generally have a head start over design, and design likewise over development.

Deadlines provide powerful focus.

Small, integrated interdisciplinary teams are very powerful.

In teams, people are the hardest part. So, hiring:

The process is often broken, often hiring is done based on ticking off a list, not matching the person to fit the team. He believes in getting the right person and training them up (a bit) / coaching, if necessary, rather than hiring a checklist-satisfying candidate who doesn't fit well into the team.

People are more often fired for soft skill problems than core competency problems. [His assertion.] His hiring process:

 - initial phone screen as a sanity check
 - followup call to get to know the candidate a bit: aspirations and interests, etc
 - 1 day imersion into the team, see how they fit in, how the team takes to them [is the person paid? is the time flexible? how do they accommodate people who are currently working, into that framework?]
 
 People will be best motivated if they share your goals, so hire people who believe what you believe [but don't start a cult?]. *BUT* if you want diversity of thought, you need to bring in people with diverse experience. Needed be a contradiction, but be mindful.
 
 Hire people who are smarter than you.
 
 Hire humility: humility aids effective collaboration.
 
 Staff 1:1: (you can often tell when a deadline's about to be missed from what's said, and how, here, he finds conflict is the usual reason). You can take that time with staff to acknowledge where they're great, but also make sure they know where their weaknesses are (but maybe put it better than that). Important for people to know their own weaknesses, because humility: then they know when to hand over to someone's who's better at that particular thing.
 
 Acknoweldge when you're wrong. As a desgin leader: "My job is not to know more about everything, my job is to be more curious about everything."
 
## Building a pattern language for the web
 Alla Kholmalova (@caraftui)
 
 Recommended book Thinking in Systems
 
 System: interconnected elements with a purpose, more than just a collection of elements.
 
 Purpose of a design system? Provide some coherent patterns to facilitate and encourage certain types of behaviour.
 
 Types of behaviour: semantic, structural, visual, behavioural.
 
### Semantic
{:.no_toc}
 See Language of Modular Design on A List Apart.
 
Name things based on the function of that thing in the global system, not its function on an individual page.

Useful to print out UI to distill global functions & name things accordingly (sounds like our naming exercise).

### Structural
{:.no_toc}
e.g. atomic design.   

They were strict, in hindsight realise they should have adapted more.

A big grey area for them was distinguishing between molecules and organisms. Followed Brad Frost's advice [check to recapitulate]. Lead to long debates.

After 18 months held a workshop where split into several groups with printouts of all the components and asked to group. There was _no consensus_ still as to which were molecules and which were organisms.

They _did_ find common ground identifying some compeonents as 'standalones', and some as 'helpers'. Standalones being well defined, independent parts of a page, helpers don't work out of context, but provide help to other components. Identifying this way, they mapped helpers to molecules and standalones to organisms.

### Visual
{:.no_toc}
What about style properties that are applied to atoms? In this model do they become sub-atomic particles? Clearly this abstraction is in danger of getting out of control.

Visual patterns cut across the semantics. [This is what I was trying to describe a while ago for our pattern library.]

#### Relationships 1
{:.no_toc}
Relationships between modules can make picking typographic size & spacing difficult, as the context of a module's use can affect what works, and  that context is not part of the module, it's operating above of/outside it.

[not sure of my notes at this next bit]
_Visual_ modules are of 3 types: global function, typographic style, or spacing. Treat core brand prpoerties separately, don't mix them with modules. [Good use case for Sass aviables here.]

Define not just elements, but the relationship between them.

A design pattern must be connected to human behaviour: if it looks like a pattern, but it lacks that connection, then it's just a stylistic rule (something that might be trendy, but adds nothing to aid the desired behaviour for the component - see National Library of France, Paris(?)).

Watch for red flags (she only one example), e.g. modules that have the same behaviour but that look different.

Evolving a design system is gradual, piecemeal, and can be messy, not the result of a grand plan (assume this refers to deriving patterns from existing setup rather than a new build).

### Investigate
{:.no_toc}
- Tom Osbourne: Visual loudness guide
- Design tokens: Salesforce
- Brad Frost's advice to distinguishing between molecules and organisms
- stylistic rules


## SVG in motion
(Sara Soueidan @sarasoueidan)

Which embedding mechanism to use? Depends on the answers to the questions:

- is it animated?
- is it interactive?
- does animation use css or js?
- what's the browser support for the animation?
- what's the required fallback(, and what's the browser support for that)?

`<object>` embedding mechanism her favourite, it allows for good fallback mechanisms: for example the tabular data from which an SVG infographic is derived:

```
<object ...>
  <!-- fallback -->
</object>
```

To get at the SVG DOM from an SVG loaded by `<object>`, use `document.getElementById('mySvgObjectEmbedder').contentDocument`.

Don't optimise after setting up animations: they will almost certainly break.

Should you animate with css or do you need js?

 - transformations: js
 - path morphing: js
 - line drawing: js
 - colour and simple animations/transitions: css
 
 Only some presentation attributes are also represented as css properties and so can be addresssed in CSS, and therefore potentially animatable.
 
 Default transform origin for HTML DOM element is 50% 50% into the elemen (centre).
 
 Default transform origin for SVG element is the origin of the SVG viewport (top left corner of the whole SVG element as displayed).
 
 When setting `transform-origin` on an SVG element:
  
  - using `%` is relative to the bounding box of the element, including its stroke.
  - using `px` is relative to the SVG canvas
 
SVG animations do not run on the GPU, and so performance sucks.

SVG has 2 coordinate systems, the viewport and the view box. See:
  - https://sarasoueidan.com/blog/svg-coordinate-systems/
  - https://sarasoueidan.com/demos/interactive-svg-coordinate-system/index.html
  
  
## HTTP/2
(Partick Hamann @patrickhamann)

Works at FT.

Slides at https://speakerdeck.com/patrickhamann/http2-what-where-why-and-when-smashing-conference-march-2016

2016:
Median # requests per page: 80
95th-percentile # requests per page: 200-300

1995:
1-5 requests per page

Average UK 3G connection takes about 600-1000ms fir DNS/TCP/TLS negotiation.

Head of line blocking means you can't parallel request on the same connection becsuse there's no way of telling when one request ends and another starts. Browsers got around this by opening up a brand new connection in parallel for the addtional requests. Latest pre-HTTP/2 spec allows for up to 10 concurrent connections (was 6, before then it was 4).

When even 6 connections aren't enough, there's always domain sharding.

So as developers we concatonate our css  & js files to reduce the number of requests.

But we might only need 1 line from a huge JavaScript file. It's a similar case with image spriting.

We inline critical CSS, but even this technique to improve performance render performance has performance hits as well as benefits (e.g. not cacheable - anything else?)

HTTP/2 invented, based heavily on Google's SPDY (2006), to speed up delivery over high latency connections.

The heart of an HTTP/2 connection is a stream. A stream comprises binary data frames that declare how long they are, and carry a stream identifier. The frame's stream identifier means that frames for different streams may be interleaved and reassembled correctly in the browser.

There's a prioritisation system to organise which resources are requested when. Each stream has a weight which the client can send to the server, so the server can decide the order to send things back in. Weights can be changed when the browser comes across something that changes the priorities.

HPACK: header compression. Begins to build state between the client and the server. 

Server push can pre-empt client request by sending resource before the client asks for it. For example the server receives a request for an HTML page. If the server knows that the client will request the css next, *before any of the html is sent*, the server sends the CSS file to the client. Note that this must happen before the HTML itself is sent, in order to avoid possible race conditions where parsing the HTML might also trigger a request for the CSS file.

Reasonable browser support: http://caniuse.com/#search=http2

Sounds like the requirement for TLS is actually a hack. SPDY devs found packets were being dropped at switches and routers that didn't understand the new protocol [anti-malware got confused?], so sent data over TLS which the middleware was fine with. Spec doesn't mandate TLS, but every implementation has it as a hard requirement.

If looking for a server for use with HTTP/2, ask about:

  - support for stream priorities
  - support for server push
  - strategies for resource hinting
  - whether they provide any intelligent optimsisation
  
Easingn in the implementation:

  - CDN first
  - then take a reverse proxy approach
  - finally HTTP/2 AllTheThings
  
Don't overdo it with server push: only push critical assets like core js, critical css and maybe fonts.

`Link` HTTP header is like `<link>`. Means could use `<link rel="preload">` _but_ Yoav Weiss who implemented preload in Blink advises against it as it uses completely different semantics from push.

[Track intelligent push].

Look at connection view in dev tools. It's pretty bare of meaningful metrics. Remember headers are now binary so harder to inspect. Jim Shaver has a post on setting up Wireshark to inspect HTTP/2 requests (is it this one: https://www.google.co.uk/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwj9nIyrhsbLAhXCXhQKHVvOCFkQFggfMAA&url=https%3A%2F%2Fjimshaver.net%2F2015%2F02%2F11%2Fdecrypting-tls-browser-traffic-with-wireshark-the-easy-way%2F&usg=AFQjCNF6sEfPJyqf1-Ba0iC6SHIenWYm5w).

Rebecca Murphy has a tool to inspect HTTP/2 logs.

Generally though, HTTP/2 tooling is in a pretty poor state at the moment.

### When to switch?
{:.no_toc}

1. Go TLS first. It's a prerequisite anyway, and this way you'll iron out the TLS wrinkles before you hit the HTTP/2 wrinkles.
1. Then check the client support for it in your user base
1. Change your workflow to be HTTP/2 first
1. _Perf basics are still very important!_

FT's experience:

- 5s improved download speed on mobile and tablet.
- start render event brought forward by 500ms.
- not much change on desktop
- this is expected as HTTP/2 design goal is to improve performance on high latency networks, which you'd expect mobile and tablet to have much more use of.

Think about grouping files based on frequency of change.

Also, because GZIP gets better when sending more data, sending many small files may end up sending a lot more data than sending down a single GZIP'd file - see [Kahn Academy's experience](http://engineering.khanacademy.org/posts/js-packaging-http2.htm).


## Understanding people
(Chris Shiflett @shiflett)

Perception > reality e.g. to make something appear visually centered, it may have to actually be moved off centre by a few pixels.

[Lucky iron fish](http://www.luckyironfish.com/) only worked when it was made into a fish. The original hunks of iron were not adopted as people didn't want to put it in their cooking pot.

### Change blindness
{:.no_toc}

Showed a photo, showed a white screen for a few seconds, then showed the same photo again with one small detail changed. Very hard to notice the difference. It's like this for users when they make a mistake filling in a form, the page posts to the server (white screen), then the form comes back looking very similar but with an error message added. The closer the error-state form looked like the original, the harder it is for users to spot the error state message and realise there's a problem. Here, inconsistencey can be a good thing.

Users aren't stupid, they're human.

Tokyo subway uses ambient signifiers: each train line/station comination has a unique set of chimes so you don't need to see out of the window to know which stop you're at (once you've learned the chimes). For regular commuters, the anticipation established with this means that they pick up very quickly if something's gone awry, for example they fell asleep, have just woken up and notice the chimes are wrong - they've gone past their stop!

Think songs in a playlist: if you hear a playlist song somewhere else, you're expecting the next song on your playlist to come on next, and when it doesn't it can jar.

Decoys: a pricing option that the designer doesn't expect to be chosen, but that is likely to affect the option that you do choose. Gaps between the price points can affect which options people choose, too.

Beware dark patterns: these are deliberately designed to trick people.

Mony Hall problem: 3 doors, 2 goats, one car. Pick a door, don't open it. I show you a different door with a goat. Do you stick with your original choice or switch to the other door? Always switch for the best chance of getting the car.

Disruption. Ugh, no. Don't try to abruptly change your users' behaviour. Better to understand and shape it instead.

## Dirty front end tricks
(Vitaly Friedman @smashingmag)

- To nest links(!), place the inner one inside an `<object>` element. Won't work in IE8 as it doesn't support `<object>` but there are workarounds(?)
- [Highlihghting the row and column of a cell in a table](https://css-tricks.com/simple-css-row-column-highlighting/)
- To get uniform padding on an inline element that's wrapping due to the length of its content (so the padding is not just at the beginning of the first line and the end of the last, but applies as a gutter on either side of the inline element's content), use horizontal (only) box shadow, or [box-decoration-break](http://caniuse.com/#search=box-decoration-break).

- Fab four technique for responsive layout in email without floats or media queries: 
[https://medium.freecodecamp.com/the-fab-four-technique-to-create-responsive-emails-without-media-queries-baf11fdfa848](https://medium.freecodecamp.com/the-fab-four-technique-to-create-responsive-emails-without-media-queries-baf11fdfa848)
[http://responsiveemailpatterns.com/](http://responsiveemailpatterns.com/). This uses `calc()`, `width`, `min-width` and `max-width` and is a work of twisted genius.

- To wrap very long words (URLs, sequences), use a combination of `word-wrap` and overflow wrap.

- Jake Archibald on loading CSS

- `table-layout: fixed` fixes table column widths based on the width of their first row. This is fine as long as the first row contains the longest content...

- `object-fit` is to content images what `background-size` is to background images.

- [Carlsberg](http://www.carlsberg.co.uk/) age selector a good example of a redesigned selector.

- [Redesigning the country selector](http://baymard.com/labs/country-selector)

- Interesting [respsonsive grid](http://work.co/grid/)

- Grid systems and zoomable UI: [jonikorpi.com](http://jonikorpi.com/)

- For e.g. a zoomable ticket picker, could do it as canvas, divide it into tiles then redraw only the tiles you need.

## Look, no media queries!
(Vasilis van Gemert @vasilis)

- [Slides](https://vasilis.nl/presentaties/smashing/oxford/#/)
- [mixed-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)

- css columns for horizontal running text

- if put an id on `<html>` you can use a fragment id in the URI along with the `:target` CSS selector to change the layout of the page. You can add another one onto `<head>`, and also onto `<body>`, and then you've got up to 3 layouts you can switch between via the URI.

Don't use `vh`/`vw` units to style text, as that can get very crazy, but you can do this:

``` font-size: calc(2em + 2vh + 2vw);```

Even better though, is this:

``` font-size: calc(4vw + 4vh + 4vmin);```

as this will give you perfectly scaled text inside any container and won't break out.

Can use viewport-relative units in flex-basis. , e.g. `vmax`: can give you a differeing # coulumns, depending on the viewport width: the effects of a media query, without a media query.

## Join the dots  
(Haydon Pickering @haydonworks)
Slides: http://slides.com/heydon/joining-up-the-dots#/

- forcefeed.js(?)
Hegel's dialectical synthesis: `git merge...`

@t said: "If it's not curlable, then it's not the web"

"How modules communicate is more importand than their properties" Alan Kay [also see Alla's talk].

HYPERLINKS FTW.

Readability tools:

- hemmingwayapp.com
- Alex (looks for gendered language)
- Rousseau (picks up weasel words)
- readability-checker

gov.uk aims for sentences no longer than 25 words.

Haydon's Logical Developer Falacies

Communication is key! (see Aarron's talk).



## Addendum
Rachel Nabor's links:
webanimationweekly.com
hacks.mozilla.org

---
([Find out what happened on day 2]({%post_url 2016-03-18-smashing-conference-2016-day-2%}).)

