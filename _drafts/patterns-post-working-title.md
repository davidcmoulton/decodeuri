---
layout: post
title: "Patterns post working title"
date: 2017-09-15
---

# Part 1: Pattern library build

## TL;DR
 - [sentence on pattern library awesomeness]

This post describes an approach to building a pattern library for a brand new version of an existing site.... [write the abstract last!]

## Introduction
I recently had the privilege of being involved in the ground up rebuild of an online science journal. Not just the front end, the whole stack was being rebuilt from scratch using a microservices approach. The journal is building a reputation for innovation in science publishing, and it was a great opportunity to get involved in a green field project to build best web practice into this arena. In this post I'll be focusing on how we built the front end.


## Deciding on an approach

### Design systems and Atomic Design
During the design phase I had many constructive conversations with the designer, including prototyping some ideas to help decide on an overall approach to various design aspects. He decided we needed a design system in order to retain both flexibility and design coherence for not only what we were building now, but what we might want to build in the future.

Building a design system requires a modular, hierarchical approach, and this approach is well supported by using a pattern library. Brad Frost's Atomic Design concept was a natural fit with the designer's way of thinking about the new design, and so it was that we chose atomic design as the mental model for our new site design approach.

Atomic Design considers reusable, composable design patterns in a heirarchy described in terms of `atoms`, `molecules`, and `organisms`. An `atom` is the smallest unit of the design system, for example buttons and links, A more complex `molecule` pattern may be composed by assembling a collection of `atom`-level patterns, for example a teaser within a listing. An `organism` is more complex again, and may comprise a number of included `atoms` and `molecules`. (We discovered that it's not really worth trying to impose a strict hierarchy to distinguish `molecules` from `organisms`. It's okay for `molecule`s to contain other `molecule`s as well as `atom`s. With only 3 hierarchy levels to play with, we found we got most benefit from a pragmatic interpretation of the atomic design hierarchy.)

Having decided on atomic design, we chose PatternLab as the natural tool to deliver it. PatternLab uses mustache templating and provides a web interface to display the patterns next to the markup that defines them, along with any optional annotations you may wish to supply. Since we started the project, other pattern library candidates have appeared that may have served just as well, e.g. Fractal, but they just weren't available back then; PatternLab was the the best available tool at the time, and it has served us well.

### Principles
Before starting work, we agreed a set of principles that would guide our approach to decision making along the way.
 
#### Don't lock out the readers

##### Progressive enhancement
A reader could be anywhere in the world on any platform. It's vital that the content (mainly results of scientific research), and core functionality be available to everyone, regardless of platform. It was vital that we don't mandate a high technological baseline in order to read the journal. For this reason, and to be a good web citizen generally, we ensured that JavaScript is not required to use the site: you get an enhanced experience if it's available, but content and core functionality does not require it.

##### Responsive
It should be a given these days, but it's worth mentioning anyway that the website should be responsive so it will display appropriately, whatever the size of the users' screens.

##### Performance
No one likes waiting for a web page to load, and if it takes too long, users will bail. If a user is on a narrow bandwidth or a high latency connection then any performance problems are exacerbated. Data costs vary across the world, and we don't want it to cost more than necessary to read our content. Performance was considered throughout the build, using ideas of a performance budget, techniques such as responsive images, not using a library unless we needed it, and allowing for HTTP/2 serving of smaller resources (more details later [ - LINK!]).

##### Accessible
It's not just best practice, but a legal requirement to make sure that the site is accessible to read and use. We tested each pattern's accessibility as we went along.

#### Maintain the value of the pattern library
The pattern library defines the design patterns to use across the site. This is great at launch, but it's common for the value of a pattern library to drop dramatically over time if it's not easy to update, or is difficult to do so in a way that retains the philosophy of the design system.

Even if they're reasonably easy to update, they often become susceptible to 'pattern rot' over time. Pattern rot is what can easily happen when it requires a developer to make the change to the pattern library, and apply it to the website codebase as two separate actions. Perhaps there's an urgent change to be made, and the developer feels that although the pattern library _should_ be updated first and then ported to the site, it's most important to get the change onto the site, and so the site is updated, and perhaps the developer doesn't quite get round to updating the pattern library later afterall. It's easily done: everyone's busy... The problem is that once the site and the pattern library have diverged, the value of having a pattern library is substantially reduced: you can no  longer have complete confidence that what you see in the pattern library is what you get on the site, and so a lot of the work that went into building it becomes lost.    

So to retain the value of the pattern library, it must:

 1. be built in such a way as to reflect the intent of the design system  
 1. be easy to maintain
 1. be easy to integrate
 
 Integration is the hardest problem to solve, and has been the holy grail for pattern libraries for years. We managed to crack this nut, and a description of our approach to solving that problem will be the subject of a forthcoming second post in this series.
 
 This post focuses on building the pattern library in a way that makes both the design system and the pattern library codebase maintainable for the foreseeable future.     

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
- Small-screen first responsive images.
- Only add libraries as needed.


### Identifying and naming the patterns
Before we could build any patterns, we needed to identify and name them: without a common vocabulary we'd be on a hiding to nothing. So to embark on building a brand new look for an online only journal, we took a large slice of irony pie and started by printing off wireframes of all the patterns.

Having cut out each pattern, we grouped similar ones together on the floor which enabled us to determine which were essentially duplicates, to identify those we could treat as variants of the same underlying pattern, and to confirm which were actually distinct patterns.

Once discreet patterns were identified, we opened up the room to anyone who wanted to help out as we agreed a name for each pattern. Having fresh minds at this point helped us get better names for the patterns.

We thought the whole process would take a couple of hours, but it took most of a day to complete. The benefits were well worth the time: it was a great way to expose many hidden assumptions, identify gaps in thinking, and discover inconsistencies that had crept in during the design process. If we hadn’t done the exercise, all those problems would still exist, but they’d only manifest later when they’d be more expensive in time and effort to fix.

## Deciding on a process
With two front end developers liaising closely with the designer and product owner (collectively, the product team), we decided on 2 week scrum sprints, managing the scrum board in Trello.

### Tickets
The principle of progressive enhancement affected the tickets we created: each pattern had a **first pass** ticket for building its markup and css. We used a checklist to manage the work for each ticket:

- semantic html is built
- CSS is applied correctly
- core content and functionality is available without JavaSctipt or CSS
- accessibility test performed
- browser testing performed

If a pattern had some behaviour, then a **second pass** ticket was created for building its JavaScript. Each second pass ticket had the checklist:

- JavaScript tests written
- JavaScript behaviour written
- JavaScript tests pass

For patterns that had variants, the one ticket described building all the variants. They will all have to be considered at the same time in order to build them in a way that works for all of the variants anyway, so it didn't make sense to split them up.

Individual tickets may have had additional, pattern-specific checklist items as necessary.

### Board
 The Trello board was initially created with the columns:

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
    

2. the addition of a respective checklist item indicating sign off by each member of the product team.

    Once the pattern is built and ready for product approval it's moved from 'in progress' to 'for feedback'. The product team then either specify any changes to be made, or check their name off the checklist if happy with the pattern as it is. They then move it to 'feedback provided'. Tickets may go round the 'for feedback' -> 'feedback provided' -> 'for feedback'... loop a number of times until the pattern's right. Once a ticket arrives in 'feedback provided' with all product team approval boxes checked, the pattern's ready for testing.

### Code management

Pull requests on GitHub from feature branches into master branch.


## Build

### Build pipeline
Although PatternLab can compile scss, we elected to only use PatternLab for its styleguide generation capabilities, as we want to keep control of all production code generation. We started off with a minimal build pipeline, originally in Grunt, but quickly switching to Gulp, knowing that we could add to it when we needed to. Initially it was only for linting and compiling scss, and moving asset files where they needed to be for the PatterLab server to display them correctly. Later, when we came to build the patterns' behaviours, we added JavaScript linting and transpiling, test running etc.

### SCSS
We agreed a few simple rules with the aim of keeping the CSS maintainable in the longer term:

- Use Harry Robert's flavour of BEM (Block, Element, Modifier) for CSS class naming. This works well with a pattern-based approach, as the root of each pattern can define a BEM block. Coupled with our decision to have one scss file per pattern, this namespacing kept the separation of the styles for individial patterns nice and clean.
- keep selector specificity as low as possible, with a maximum selector nesting of 3 (not including pseudo elements). As selectors only need to start from the root of a pattern (or deeper), this seemed a pragmatic maximum. We agreed that we'd increase it if we really, _really_ needed to, but up to now we haven't had to.
- don't use `&` as partial completion for a class name, as it makes searching/refactoring across a code base more error-prone.
- avoid `@extends` due to side effects, and unpredicable edge cases, use `@mixin`s instead.
- one scss file per pattern

#### Architecture
The patterns we're building are defined by the design system devised by the designer. 

With an eye on the potential performance increases available with HTTP/2, we ensured that we could generate an individual css file for each pattern scss file.

### Patterns
Now we have a bunch of patterns to build, principles and aims to, err, aim for... we have a process to follow, and a build pipeline to use. Time to build some patterns.

Each pattern comprises:

- Exactly 1 `.mustache` file
- Exactly 1 `.scss` file
- 1 or more `.json` files, one per pattern variant
- 0 or 1 `.js` file (built in the second pass)

#### json files and pattern variants
PatternLab has the concept of pattern variants which chimes well with our identification of pattern variants in the pattern identification and naming exercise. A pattern with variants has one mustache file, with an example of each variant described by an individual json data file for that variant. [TODO: Example].



### Testing

Accessibility: Kahn Academy's tota11y for accessibility testing in the browser.

Browser/device testing: Browserstack

JavaScript: mocha/chai/sinon





## First pass: markup & style
## Second pass: behaviour
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

    
    

#Notes - not for direct publication

## The meta
This describes 18 months' work. As such there's a lot to record. Not all of it will be relavent to the post(s?), but don't want to miss anything important, so:

 - First pass: all the details: what and why
 - Second pass: work out who it's for, tell the story to them

## What we needed to do 

### Overall sweep
From the front end point of view, I knew that the end result must promote
    - flexibility (F)
    - maintainablity (M)
    - performance (P)

(- IIIF with responsive images markup works well (P))
(- service workers (P))

(- BEM for CSS naming works well (FM))

## what we did

### First pass: markup & css


#### scss

##### architecture
- divided into patterns scss and non-pattern scss files
- one file in total for the grid system
- one file per pattern
- a number of partial files defining:
    - variables:
        defines various sizes, widths, colours and durations
    - mixins:
        keep all the pattern-specific mixins all in one file for easier maintenance
    - typographic hierarchy:
        typographic part of the design system. Contains a mixin for each of the typographical styles named in the design system. Can then use these mixins in the respective pattern css, improving the maintainability of the desigin implementation

##### syntax and style
- BEM class naming
- keep specificity as low as possible
- avoid `extends`
- use `&` but not as partial completion for class name (which makes searching code hard)


### Second pass: JavaScript
- To maintain the possibility of a modular approach to the JavaScript to match that 


### Testing
- We used the `tota11y` Chrome plugin for rapid accessibility checking
- We used Browserstack for browser testing.
- js:
    - mocha/chai/sinon
    - no functional tests yet

## stuff we still want to do
- make it easy to upgrade PL inside the pattern library
- build an adapter for our patterns in a different language
- functional test layer
- tree shake for js/css with H/2
    

