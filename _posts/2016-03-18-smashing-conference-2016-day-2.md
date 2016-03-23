---
layout: post
title:  "Smashingconf 2016: day 2"
desc: "Write up of raw notes taken during of the second day of Smashingconf Oxford 2016."
date:   2016-03-18 15:40
---

* <ul></ul>
{:toc}

([Find out what happened on day 1]({%post_url 2016-03-18-smashing-conference-2016-day-1%}).)

## Design systems in difficult places
(Mark Boulton @markboulton)

By "Difficult", he means distributed (across multiple locations), devloved (local decision making) and degrading (customers are exposed to a degredation of the design).

Grew up in Manchester. Factory records fly stickers all over the city. Got used to seeing them in the environment, absorbed into the zeitgeist. (Was taught by Peter Saville!).

Benefits of marginal gains: Sky cycling team manager looked at _everything_ in the lives of his cyclists to attempt many microoptimisations in the hope that accruing enough of them to add up to siginificant improvements in overall performance.

Corollary is the dangers of marginal degredation: this is where a design system can help.

Often came across 'Problem escalation': design a website turned into change how your team contributes content turned into your whole business process needs an overhaul. As an agency, had no authority to lead on that, all they had were persuation. Not a comfortable position if the sucess of your project depends on being able to persuade.

Seeing how people work around the awkwardness in a CMS to do their jobs can be great research to feed into the requirements for what replaces it.

### Al Jazeera website redesign
{:.no_toc}
Editorial values very important to them. Where CNN sanitise's footage from a war zone, they dont.

Readers consumed content very differently from how the journalists thought that they did: readers read more than one source; they scan by topic; they evaluated the contents based on the level of trust that they had in the brand, but the journalists were undermining that trust in the way they were presenting their stories.

### CERN
{:.no_toc}

Flat hierarchy, independent-minded constituents. They had no mandate, again were operating on persuation.

Design system must adapt to serve the communicating of high wonder to the general public, and low wonder for scientists.

### Monotype
{:.no_toc}

Stu Robson built 'monotype core', an npm-built setup that creates a local version of the site with all the correct brand assets, GA code, & other required boilerplate.

Central policing of brand never works, be where the person is and make it easier for them to do what they want - prevents gradual degredation.

Everyone wants to be creative. A design system gives people the canvas to do just that, while delineating the constraints, the edges of what they can effect.

Every system devolves into chaos, every garden needs tending.

Draw straight lines between design and KPIs:

research -> design -> outcomes -> KPI

He's come to realise that meetings _are_ the work. "Am I okay with that? I am at the moment, but maybe ask me again in a year."

Establish a mandate if you can, otherwise you need to do lots of convincing and need a lot of good will.

How do you know when you're successful? 

  - there's a shared vocabulary in use, e.g. "wonder" at CERN.
  - the system becomes self policing, that means people care.
  - design health. This can be a leading indicator, the canary in the gold mine.
  
  
## Taking layout to the next level
(Christopher Wright @cwrightdesign)

Works at Campaign Monitor in Sydney [knows John Allsopp]
He's done Flexbox Adventures & Using flexbox today (look these up). Advocates learing in the open, writing about things as you learn, not after you've learnt, so you can document the small things that make it work, but that you mauy forget afterwards: better to help others learn.

*EXPERIMENT!* Fail early, learn faster.

### Simplicity
{:.no_toc}

Rise of complexity, try to manage it with things like SASS or Bootstrap.

Pattern approach good, helps avoid progressive degredation (see Marks Bolton's talk), but things aren't that simple

CSS gave us abstracted layouts, where a component is controlled by its ancestors, i.e. the grid.

Content-based breakpoints are good, but you can end up with very, very many media queries. Most frameworks addressed this by focusing on devices, e.g. Bootstrap or Foundation. Booooo. The problem is forcing the component to respond to screen size.

Component should respond to the amount of available pixels in its immediate container, not the overall viewport: this is component flow. For example `flex-row-wrap` [should this be `flex-wrap`?], `flex-grow`, `flex-shrink`. Can combine this with CSS columns for powerful effect. 

Using `flex-basis: auto` can get around many flexbox bugs (but check that its appropriate for your use case!).

Can use flexbox-based pagination for carousel effect.

Flexbox reversing can be used for timelines.

Use `order` for presentational content only. Don't confuse the user!

New: `display: contents` replaces the element's box with a pseudobox, and with the boxes of its childern. This means you can use it on a flex item that is itself a container for child items, and those child items become part of teh set of flex items in the grandparent flexbox container. (Experimental: https://developer.mozilla.org/en-US/docs/Web/CSS/display)

To stop IE using flexbox, and force even those versions that support it (buggily), to ignore it, include the within a feature query:

```
@supports (display: flexbox) {
  display: flexbox;
}
```

CSS grid: have a play.

Can use new unit that comes with CSS grid module, `fr`, to implement a peekaboo pattern.

## Designing the future of content
(Hannah Donovon @Han)
Worked at LastFM, This is my Jam, currently at Drip

She designs for desires, not needs.

Conent is not meaningful when to the user when it lacks context, connection or perspective. Future money will be in the thing around the content.

Whether I know what I want, or whether I want something that I can't define, I still need context, cononection and perspective. Knowing what I want is hard enough, so offering someone else a suggestion of  what they might want is a lot harder.

Humans connect with us in ways that commputers can't, e.g. taste.
Computers connect with us in ways that human's can't, e.g. providing global reach.

### Context
{:.no_toc}

Makes content meaningful.

"Content is dumb until some smart designer grabs it and puts it somewhere with some context." Paraphrasing Mark Bolton.

You can use time and place to set context.

At this is my jam, they scraped users' YouTube avatar images (typically small and low res), cleaned them up, and applied some filters to make them look a bit funky, and applied them to a users' (list/jam/profile/something), and so gave it some context.

### Connection
{:.no_toc}

"The quality of connections is the key to quality per se" - Ray / Charles Eames.

Familiarity can provide a connection, as can time and place.

The best music recommendations come from friends.

### Perspective
{:.no_toc}

Gives content feeling.

Gives the ablility to give a damn. Computers can't give a damn.

The story can provide perspective, as can ethos.

"Designers solve problems, but so do many other occupations. What designers actually do is create culture" - paraphrasing Jack Schultz.

Unfortunatley at the moment it can feel like everything looks the same. See [Design machines](https://louderthanten.com/articles/story/design-machines), and the parody [HEY LOOK, IT'S EVERY BOOTSTRAP WEBSITE EVER](http://adventurega.me/bootstrap/). As designers we can do better!


## Devtools, an animated journey
(Umar Hansa @umaar)

Member of the Google Developer Expert Programme.

Produces [weekly newsletter of devtool tips in animated gif form](umaar.com/dev-tips).

Has written posts on SCSS source maps.

### Resources
{:.no_toc}

- Google's [Devtools reference](https://developer.chrome.com/devtools), doesn't include everything experimental as moving so fast.
- If you want to track devtools bugs or contribute, checkout the [contributing page](https://developer.chrome.com/devtools/docs/contributing).
- [discover-devtools.codeschool.com](http://discover-devtools.codeschool.com/)

His examples need experimental devtools features activated in Chrome Canary `chrome://flags`, and the appropriate experiment enabled within devtools preferences.

If you want to make every new tab / window open with a devtools window ready-attached, start Chrome from the command line with the flag `auto-open-devtools-for-tabs`.

### Elements panel
{:.no_toc}

- toggle class
- layout editor (still work in progress). To activate it, within devtools preferences, press `<shift>` 6 times to expose the WIP features, then check "Layout editor", and restart).
- Hitting `<esc>` to bring up the console gives not just console tab, but also a promises tab and animation inspector. It has some Web animations API integration (I missed what), and keyframe editing.

### Network panel
{:.no_toc}

- Request blocking, can e.g. block css load to see how your site behaves if the css load borks.
- connection throttling
- filmstrip of page load
- may search network requests with the `domain:` or `mixed-content` prefixes. V useful, especially if you're migrating to TLS and want to catch any http-loaded assets.

### Sources pane
{:.no_toc}

- Click on DOM element then go to Event Listeners pane to see what listeners are registered to this element.
- can live edit js. (This is an achievement!)
- can blackbox scripts so they're not listed nor exposed when debugging (they still run as usual).
- supports js source maps
- can use devtools for persistent authoring using [workspaces](https://developer.chrome.com/devtools/docs/workspaces)
- can inspect service workers and see what's in their cached storage

### Timeline
{:.no_toc}

- cpu throttling!

### Accessibility
{:.no_toc}

Accessibility tools for Chrome are currently provided by a plugin, but  natve a11y tooling is on its way. 

## Overthinking design and embracing minutiae
(Jon Setzen @jonsetzen)

Works at MediaTemple.

- US ecomomy is 84% service economy
- organisations generally spend 20x more on marketing than they do on 'experience'
- customers who've had a good experience buy 140% more than those that haven't
- defines good service as useable / efficient / desireable
- We tend to only think about service when it's bad
- where in your user experience do you start to think about your users' experience (think airline).
- [talked about Uber Eats]
- MediaTemple Wordpress provisioning can take a while, have developed a game you can play while you're waiting.
- A bad experience degrades trust (see Mark Bolton's point on gradual degredation).
- unhappy users are expensive
- Book: [This is Service Design Thinking](http://thisisservicedesignthinking.com/)

## Living Design Systems
(Jina Bolton @jina)

Works at Salesforce UX. As much as they can they open source: [github.com/salesforce-ux](https://github.com/salesforce-ux)

- They build tools that other business will use to build things.
- They design for configuration. 
- A fractured process leads to a fractured user experience
- A great design system is useable by the entire team
- design system is a product, not a project
- drive design decisions with prioritised design principles

Their design goals are:

1. clarity
1. efficiency
1. consistency
1. beauty

Their first step: a UI Inventory - take *a lot* of notes! Document as much as you can: states, responsiveness, a11y, and also record open questions so you can come back to them later.

Make a list of people involved and their responsibilities.

[Sounds like a more design-focused version of our kickoff: project canvas + tech kickoff.]

BIG QUESTION: How to maintain consistency over a large organisation?
- Store your assets in a repo. Once they're updated, automatically update into styleguide and website
- They use the concept of design tokens for e.g. font-size, colour etc. Abstraction of CSS properties into a token system that can deliver that configuration to not only the website and the pattern library, but the Android app team, the iOS app team, etc. All the different technical systems get the result of the design token in the appropriate format for them: e.g. hex for web, 8-character hex rgba value for Android, etc etc. Think SASS vriables, but cross-technology. Nothing is now hardcoded, the design tokens are framework agnostic and enable one central change to cascade to each of the technology stacks that need it.
- they open sourced the tool they use to generate the configuration from the design tokens: [theo](https://github.com/salesforce-ux/theo). 

- Clarity beats brevity: they use BEM naming.
- Additionally they namespace their blocknames to ensure to avoid potential clashes with a Salesforce client's code, e.g. `slds-button`, rather than just `button`.
- They also wrap their components in a div with a namespace class to provide namespace isolation to any css that they write to make sure they don't accidentally stomp on client's stying, for example they'll use the CSS rule `.slds .slds-form` to address:

```HTML
<div class="slds">
  <form class="slds-form"...>
    ...
  </form>
</div>
```


A styleguide should show all states of a component, otherwise those states will get overlooked.

Typography system: they created text utility classes decoupled from components (also see Alla's talk). 

Only show the code in the styleguide that the people need to see, and don't build it until you need it!

Using this system leads to better communication and better prototypes - no more proliferation of onconsistent styles.

They have design ofice hours, and CSS office hours where anyone can drop in to consult with them on design or CSS.

Recommends Nathan Curtis, he's has written & spoken a lot about design systems:

- Difference between a styleguide and a design system: "A style guide is an artifact of design process. A design system is a living, funded product with a roadmap & backlog, serving an ecosystem." - Nathan Curtis (https://twitter.com/nathanacurtis/status/656829204235972608)

- [on medium](https://medium.com/eightshapes-llc/a-design-system-isn-t-a-project-it-s-a-product-serving-products-74dcfffef935#.txjgrr4hv)

- [podcast with Jared Spool](https://www.uie.com/brainsparks/2015/09/09/nathan-curtis-building-scalable-design-systems-and-style-guides/)

- [styleguides.io podcast](styleguides.io/podcast/nathan-curtis/)

- compare [Team Models for Scaling a Design System](https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0) with [The Salesforce Team Model for Scaling a Design System](https://medium.com/salesforce-ux/the-salesforce-team-model-for-scaling-a-design-system-d89c2a2d404b#.hcv0k3dje).

- [blog.capwatkins.com/the-sliding-scale-of-giving-a-fuck](http://blog.capwatkins.com/the-sliding-scale-of-giving-a-fuck)


## Modern workflow and tooling
(Wes Bos @wesbos)

[reactforbeginners.com](http://reactforbeginners.com)
[sublimetextbook.com](http://sublimetextbook.com)
[commandlinepoweruser.com](http://commandlinepoweruser.com)
[flexbox.io](http://flexbox.io)

There's a fine line between tooling for its own sake and gettign stuff done.

### Build tools
{:.no_toc}

- 47% use Gulp. 20% said they used no build tools.
- can use for many things, e.g.: critical CSS, removing unused CSS (purify), minifying images, uglifying code... you name it...
- npm scripts are great for the simple things, but can get nasty when the complexity increases only a little.

Webpack: "Gulp meets Browserify". Powerful but have to learn API.

### Dependency management (Modules! :-))
{:.no_toc}

To get code authored as modules working in the browser, you can use browserify, webpack or jspm. When authoring, try to use ES6 module syntax if you can, because that's what it will be eventually anyway.

There are 2 main registries for modules: bower and npm (jspm sits on top of npm). npm has nested dependencies, whereas Bower has a flat hierarchy. Prefer npm over Bower if you can.

Ecosystems is coming soon to npm to enable non-hierarchical grouping.

Babel transpiles to ES5 for the browser.

CSSNext is like Babel for CSS Level 4 modules (and is part of the PostCSS ecosystem).

[browsersync](https://www.browsersync.io/) comes with built in certificate so can check things that need TLS on localhost. Can also proxy existing apps/servers.

sourcemaps are treasuremaps for bugs.

## Improving screen legibibilty
(Tobias Frere-Jones @frerejones)

- Sub-pixel rendering is handled differently by different browsers.
- Helvetica subpixel rendering is generally poor, parallel lines blend into each othe.
- Upper and lower case look similar
- lower case "o" and lower case "c" look very similar
- typefaces drawn specifically for the web are better, and generally have generaous spacing between letters, and wide appetures.

Hinting - distorts the outline to create a more pleasing shape, e.g helps with separating the dot of tyhe 'i' from its stem.

CBS in 1967 noticed terrible rendering of fonts on the TV screen e.g. on map labels: there was a lot of blur and bloom. They fixed some of the problem, but in the process, moved away from the previous News Gothic, more towards Helvetica so they didn't solve all of the problems. (Helvetica was really poopular at the time: this choice sounds like a stylistic rule - see Alla's talk.

Metal type faces are slightly different at different sizes because they can be (being physical blocks of metal). Because of this, 6pt running copy in century-old newspapers still reads fine. 

"Screen text can be treated as an optical size" - he tried this with his new face: Mallory, that came out last year: it's got "Standard" and "Microplus" versions, the latter being for the web and tiny print.

Fonts can and should be equally relavent everywhere, not just on screen, not just on printed material.

A prerequisite for good design is clear intention.

---

([Find out what happened on day 1]({%post_url 2016-03-18-smashing-conference-2016-day-1%}).)
