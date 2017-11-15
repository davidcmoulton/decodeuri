---
layout: post
title: "Building a pattern library for scholarly publishing"
---


## TL;DR
 - [sentence on pattern library awesomeness]

This post describes an approach to building a pattern library for a brand new version of an existing site.... [write the abstract last!]

This post focuses on how we built the pattern library in a way that makes the design system and the pattern library codebase maintainable for the foreseeable future.

## Introduction
I recently had the privilege of being involved in the ground up rebuild of an [online science journal](https://elifesciences.org). Not just the front end, the whole stack was being rebuilt from scratch using a microservices approach. The journal is building a reputation for innovation in science publishing, and it was a great opportunity to get involved in a green field project to build best web practice into this arena. In this post I'll be focusing on how we built the front end.


## Deciding on an approach

### Design systems and Atomic Design
During the design phase I had many constructive conversations with the designer, including prototyping some ideas to help decide on an overall approach to various design aspects. He decided we needed a design system in order to retain both flexibility and design coherence for not only what we were building now, but what we might want to build in the future.

Building a design system requires a modular, hierarchical approach, and this approach is well supported by using a pattern library. Brad Frost's [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) concept was a natural fit with the designer's way of thinking about the new design, and so it was that we chose the atomic design as the mental model for our new site design approach.

Atomic Design considers reusable, composable design patterns in a heirarchy described in terms of `atoms`, `molecules`, and `organisms`. An `atom` is the smallest unit of the design system, for example a button or a link. A more complex `molecule` pattern may be composed by assembling a collection of `atom`-level patterns, for example a teaser within a listing. An `organism` is more complex again, and may comprise a number of included `atoms` and `molecules`. We discovered that it's not really worth trying to impose a strict hierarchy to distinguish `molecules` from `organisms`. It's okay for `molecules` to contain other `molecules` as well as `atoms`, and for `organisms` to contain `organisms` as well as lower-order patterns. With only 3 hierarchy levels to play with, we found we got most benefit from such a pragmatic interpretation of the atomic design hierarchy.

Having decided on atomic design, we chose [PatternLab](http://patternlab.io/) as the natural tool to deliver it. PatternLab uses [mustache templating](http://mustache.github.io/) and provides a web interface to display the patterns next to the markup that defines them, along with any optional annotations you may wish to supply. Since we started the project, other pattern library candidates have appeared that may have served just as well, for example [Fractal](https://fractal.build/), but they just weren't available back then; PatternLab was the the best available tool at the time, and it has served us well.

### Principles
Before starting work, we agreed a set of principles that would guide our approach to decision making along the way.
 
#### Don't lock out the readers

##### Progressively enhancemed
A reader could be anywhere in the world on any platform. It's vital that the content (mainly results of scientific research), and core functionality be available to everyone, regardless of platform, so we couldn't mandate a high technological baseline in order to read the journal. For this reason, and to be a good web citizen generally, we would use a [progessive enhancement](https://alistapart.com/article/understandingprogressiveenhancement) approach to ensure that JavaScript is not required to use the site: you get an enhanced experience if it's available, but content and core functionality does not require it.

##### Responsive
It should be a given these days, but it's worth mentioning anyway that the website should be [responsive](https://www.smashingmagazine.com/2011/01/guidelines-for-responsive-web-design/) so it will display appropriately, whatever the size of the users' screens.

##### Performance
No one likes waiting for a web page to load, and if it takes too long, users will bail. If a user is on a narrow bandwidth or a high latency connection then any performance problems are exacerbated. Data costs vary across the world, and we don't want it to cost more in data charges than necessary to read our content. Performance was considered throughout the build, using ideas of a performance budget, techniques such as responsive images, not using a library unless we needed it, and allowing for the HTTP/2 serving of smaller resources.

##### Accessible
It's not just best practice, but a legal requirement to make sure that the site is accessible to read and use. We would test each pattern's accessibility as part of building it.

#### Maintain the value of the pattern library
One of the aims of a pattern library is to be the canonical source of truth for the design and front end implementation of all the design patterns across a site. This is great at launch, but it's common for the value of a pattern library to drop dramatically over time if it's not easy to update, or is difficult to do so in a way that retains the philosophy of the design system.

Even if they're reasonably easy to update, they often become susceptible to 'pattern rot' over time. Pattern rot is what can easily happen when it requires a developer to make the change to the pattern library, and apply it to the website codebase as two separate actions. Perhaps there's an urgent change to be made, and the developer feels that although the pattern library _should_ be updated first and then ported to the site, it's most important to get the change onto the site, and so the site is updated, and perhaps the developer doesn't quite get round to updating the pattern library later afterall. It's easily done: everyone's busy... The problem is that once the site and the pattern library have diverged, the value of having a pattern library is substantially reduced: it is no longer the canonical source of truth, so you can no  longer have complete confidence that what you see in the pattern library is what you get on the site, and so a lot of the work that went into building it becomes lost.    

So to retain the value of the pattern library, it must:

 1. be built in such a way as to reflect the intent of the design system  
 1. be easy to maintain
 1. be easy to integrate
 
 Integration is the hardest problem to solve, and has been the holy grail for pattern libraries for years. We managed to crack this nut; how we did that will be the topic of a subsequent post.
 
 This post focuses on how we built the pattern library in a way that makes the design system and the pattern library codebase maintainable for the foreseeable future.     

#### Aims
Before we started writing code, we documented our lower-level aims, based on the principles we'd already decided upon. These were:

##### Priority of concerns (in decreasing priority order):

1. Access
1. Maintainability
1. Performance
1. Taking advantage of browser capabilities
1. Visual appeal

##### Assumptions

Maintainability doesn't negatively impact performance.

##### Techniques

- Progressive enhancement.
- `min-width` media queries
- Small-screen first responsive images.
- Only add libraries as needed.


### Identifying and naming the patterns
Before we could build any patterns, we needed to identify and name them: until we knew what we were builwithout a common vocabulary, things would fall apart very quickly. So to embark on building a brand new look for an online only journal, we took a large slice of irony pie and started by printing off wireframes of all the patterns.

Having cut out each pattern, we grouped similar ones together on the floor which enabled us to determine which were essentially duplicates, to identify those we could treat as variants of the same underlying pattern, and to confirm which were actually distinct patterns.

Once distinct patterns were identified, we opened up the room to anyone who wanted to help out as we agreed a name for each pattern. Having fresh minds at this point helped us get better names for the patterns.

We thought the whole process would take a couple of hours, but it took most of a day to complete. The benefits were well worth the time: it was a great way to expose many hidden assumptions, identify gaps in thinking, and discover inconsistencies that had crept in during the design process. If we hadn’t done the exercise, all those problems would still exist, but they’d only manifest later when they’d be more expensive in time and effort to fix.

## Deciding on a process
With two front end developers liaising closely with the product team (the designer and the product owner), and facilitated by our tireless scrum master, we decided on 2 week scrum sprints, managing the scrum board in Trello.

### Tickets
The principle of progressive enhancement affected the tickets we created: each pattern had a **first pass** ticket for building its markup and css. We used a checklist to manage the work for each ticket:

- semantic html is built
- CSS is applied correctly
- core content and functionality is available without JavaSctipt or CSS
- accessibility testing performed
- browser testing performed

If a pattern had some behaviour, then a **second pass** ticket was created for building its JavaScript. Each second pass ticket had the checklist:

- JavaScript tests written
- JavaScript behaviour written
- JavaScript tests pass

For patterns that had variants, the one ticket described building all the variants. They would all have to be considered at the same time in order to build them in a way that works for all of the variants anyway, so it didn't make sense to split them up.

Individual tickets had additional, pattern-specific checklist items as necessary.

### Board
 The [Trello](https://trello.com/) board was initially created with the columns:

- backlog (All tickets start here)
- sprint items (Committed to in the current sprint)
- in progress (In active development)
- in testing (In browser/accessibility testing)
- in review (Being reviewed)
- done (Finished)


#### Refinement
We discovered in the first retrospective that the product team were not feeling sufficiently involved in the review process for a pattern, resulting in patterns sometimes being classed as done when they weren't. This was quickly addressed in two ways:

1. the addition of two more columns to separate out the product review from the technical review. The board collumns were then:

    - backlog (To be done)
    - sprint items (Committed to in the current sprint)
    - in progress (In active development)
    - **for feeback (Ready for product review)**
    - **feedback provided (Reviewed by product)**
    - in testing (In browser/accessibility testing)
    - in review (In **technical** review)
    - done (Finished)
    
2. the addition of an approval checklist, with each product team member having a dedicated box to check to indicate sign off.

    With the revised board, once the pattern is built and ready for product approval it's moved from 'in progress' to 'for feedback'. The product team then either specify any changes to be made, or check their name off the checklist if happy with the pattern as it is. They then move it to 'feedback provided'. Tickets may go round the 'for feedback' -> 'feedback provided' -> 'for feedback'... loop a number of times until the pattern's right. Once a ticket arrives in 'feedback provided' with all product team approval boxes checked, the pattern's ready for testing.

### Code management

Pull requests on GitHub from feature branches into the [master branch](https://github.com/elifesciences/pattern-library).


## Build

In total so far (we launched in June 2017, but a website's never 'done') we've built just under 100 patterns.

Each pattern comprises:

- Exactly one `.scss` file
- Exactly one `.mustache` file
- One or more `.json` files, one per pattern variant
- Zero or one `.js` files, built in the second pass
- Exactly one `.yaml` file to define the data structure. This is helpful when integrating the patterns into the site, and will be expanded on in a separate post.

### Basic build pipeline
Although PatternLab can compile scss, we elected to only use the mustache rendering part of PatternLab, as we wanted to keep control of all production code generation. We started off with a minimal build pipeline, originally in Grunt, but quickly switching to Gulp, knowing that we could add to it when we needed to. Initially it was only for linting and compiling scss, and moving asset files where they needed to be for the PatterLab server to display them correctly. 

### SCSS

#### Style
We agreed a few simple rules with the aim of keeping the CSS maintainable in the longer term:

- one scss file per pattern
- Use Harry Robert's flavour of BEM (Block, Element, Modifier) for CSS class naming. This works well with a pattern-based approach, as the root of each pattern can define a BEM block. Coupled with the decision to have one scss file per pattern, this namespacing kept the separation of the styles for individial patterns nice and clean.
- keep selector specificity as low as possible by using soley classes unless impossible, and with a maximum selector nesting of 3 (not including pseudo elements). As selectors only need to start from the root of a pattern (or deeper), this seemed a pragmatic maximum. We agreed that we'd increase it if we really, _really_ needed to, but up to now we haven't had to.
- don't use `&` as partial completion for a class name, as it makes searching/refactoring across a code base more error-prone.
- [avoid `@extends`](https://www.sitepoint.com/avoid-sass-extend/), use mixins instead for greater flexibility.
- only mixins that are completely pattern-specific may live in a pattern's scss file, other mixins must live in higher-level files (see Architecture).
- list property names alphabetically

We implemented style linting with stylelint.

#### Architecture

- We used [Nicholas Gallagher's `normalise` stylesheet](http://nicolasgallagher.com/about-normalize-css/) as an scss partial, with some overrides we felt we needed defined in a separate  `normalise-overrides` partial.
- Meaningful values for the design system: colours, font-sizes, quantities for spacing and element sizing, media query breakpoints, and transition parameters etc. are defined in the `variables` partial.
- The typography component of the design system is defined in the `typographic-hierarchy` partial: this contains numerous mixins responsible for enforcing a consistent typographic style across the site. [TODO: More about this?]
- the `grid` partial contains all scss and mixins required for both the horizontal and vertical grid systems
- the `mixins` partial contains all other mixins

These are imported along with the pattern-specific scss file to create the main build css file like this:

```
build.scss
├── base.scss
│   ├── _definitions
│   │   ├── _variables
│   │   ├── _mixins
│   │   └── _typographic-hierarchy
│   ├── reset
│   │   ├── _normalize
│   │   ├── _normalize-overrides
│   └── _grid
├── pattern-1.scss
├── pattern-2.scss
├── pattern-3.scss
├── ...
└── pattern-n.scss
```

Each individual `[pattern].scss` file also imports the `definitions` partial so it has access to all the necessary shared knowledge of the design system as distilled into the variables and various mixins.

With an eye on delivery over HTTP/2, we ensured that we could produce individual pattern-level css files as well as one main style file for traditional HTTP/1.1 delivery.


### Markup
Compilation of the mustache templates with their json data files is handled by PatternLab, producing a user-friendly, to-some-extent-configurable [web view of the patterns](https://ui-patterns.elifesciences.org/).

A basic pattern with no variants has exactly one mustache template and one corresponding `json` data file.

#### Pattern variants
For a more complex pattern that has variants, an example of each variant can be produced by supplying a separate `json` file for each. For example the teaser pattern has  13 variants (an extreme case, most variant patterns have fewer than a handful). It only has one `mustache` file, but 13 associated `json` files:

```
.
├── teaser.mustache
├── teaser~05-main.json
├── teaser~10-main-small-image.json
├── teaser~15-main-big-image.json
├── teaser~20-secondary.json
├── teaser~25-secondary-small-image.json
├── teaser~30-secondary-big-image.json
├── teaser~35-related-item.json
├── teaser~40-basic.json
├── teaser~45-main-event.json
├── teaser~50-secondary-event.json
├── teaser~55-grid-style--labs.json
├── teaser~60-grid-style--podcast.json
└── teaser~65-main--with-list.json
```

PatternLab uses the `~` in a filename to identify a variant. The numerals in the filenames control the ordering of the [presentation of the variants](https://ui-patterns.elifesciences.org/?p=viewall-molecules-teasers).

Sometimes when coming to build a pattern with variants, we discovered that one or more variants required a significant change to the markup of the main pattern, which suggested a new pattern rather than just a variant. In this case we'd create the ticket(s) for it, and put them into the backlog, moving the appropriate spec from the old to the new ticket.

## Extended build pipeline
When we came to build the patterns' behaviours, we added JavaScript linting, transpiling and test running to the Gulp pipeline. When we started this project at the beginning of 2016, ES2015 was the stable transpilation target, so that's what ours is set to. Over 18 months, the JavaScript/Browser landscape has changed considerably, and we'll be reviewing this farily soon.

We're using Babel to transpile, a mixture of jshint and jscs for linting (there'a a pending upgrade to eslint).

### Pattern behaviour with JavaScript
Each pattern's JavaScript behaviour (if any), has that behaviour defined in a discrete component with the same name as the pattern. This JavaScript component is referenced from the root element of the pattern's mustache template by the attribute `data-behaviour="ComponentName"`.

For example, the content header pattern has its associated behaviour defined in the `ContentHeader` class, which is found in the `ContentHeader.js` file. The `content-header.mustache` template starts with:

```<div... data-behaviour="ContentHeader">...```

This causes this HTML element to be passed as an argument to the class constructor in `ContentHeader.js` when the page's JavaScript loads and runs:

```
// Load all components
const components = {}:
Components.ContentHeader = require('./components/ContentHeader');
// ... load more components ...

function initialiseComponent($component) {
  const handler = $component.getAttribute('data-behaviour');
    if (!!Components[handler] && typeof Components[handler] === 'function') {
      new Components[handler]($component, window, window.document);
  }
  
  $component.dataset.behaviourInitialised = true;
}

const components = document.querySelectorAll('[data-behaviour]');
if (components) {
  [].forEach.call(components, (el) => initialiseComponent(el));  
}
```

This applies the pattern's JavaScript behaviour to each instance of the pattern on the page.

Notice we're additionally passing in the window and document objects to the component's constructor. This dependency injection enables easier testing.

#### Future improvements
It'd be great to improve the loader so that only the components on a particular page are loaded, and then initialisation can occur after these loads have completed.

Because we have a 1:1 relationship between JavaScript component and pattern, we should be able to support HTTP/2 delivery of individual JavaScript assets, only providing what is required to the client (once we've upgraded our CDN).

### JavaScript testing
We test in the browser using the tripod of the [mocha](https://mochajs.org/) test framework, the [chai](http://chaijs.com/) assertion library, and with [sinon](http://sinonjs.org/) for providing spies, mocks and stubs. At the moment we're using phantomjs as the local test environment, but now that's not under active maintenance we're looking to switch to using puppeteer with headless Chrome.

For each pattern under test there are two files: the spec file and the fixture file. The spec file is the file that contains the tests. The fixture file is an HTML file that contains the HTML of the pattern under test. This is obtained by finding the pattern's compiled HTML file as generated by PatternLab, and manually copying out the relavent code.  We've found that keeping the test fixtures up to date can be difficult because it takes a developer to remember to do this every time the pattern's source or source-generating JavaScript is updated.

The tests are run under Gulp using `gulp-mocha-phantomjs` 

### Testing

Accessibility: Kahn Academy's [tota11y](https://khan.github.io/tota11y/) for accessibility testing in the browser.

Browser/device testing: [Browserstack](https://www.browserstack.com/)

JavaScript: [mocha](https://mochajs.org/)/[chai](http://chaijs.com/)/[sinon](http://sinonjs.org/) (see [https://blog.codeship.com/mocha-js-chai-sinon-frontend-javascript-code-testing-tutorial/](https://blog.codeship.com/mocha-js-chai-sinon-frontend-javascript-code-testing-tutorial/) for example of helpful post to get you up and running).

Functional: [Webdriver.io](http://webdriver.io/) with the JavaScript testing tools above.


## Notes - not part of the post #


## CI
## End of part 1

# Part 2: Pattern integration
## TL;DR
## statement of traditional problem 
## recapitulate microservices from part 1
## describe architecture of our approach to a solution to the traditional problem
## Introduce 'view models'
## Pattern library third pass: data model definition & reworking 


## Orphans:
- instrumentation (new relic)
- H/2

    
    

## The meta
This describes 18 months' work. As such there's a lot to record. Not all of it will be relavent to the post(s?), but don't want to miss anything important, so:

 - First pass: all the details: what and why
 - Second pass: work out who it's for, tell the story to them


(- IIIF with responsive images markup works well (P))


## stuff we still want to do
- make it easy to upgrade PL inside the pattern library
- build an adapter for our patterns in a different language
- functional test layer
- tree shake for js/css with H/2

# To metion:

- IIIF
- responsive images with IIIF
- HTTP/2 asset serving once CDN change
- yaml files & data validation
- JS pipeline
- When we started this project at the beginning of 2016, ES2015 was the stable transpilation target, so that's what ours is set to. Over 18 months, the JavaScript/Browser landscape has changes considerably, and we'll be reviewing this soon.

