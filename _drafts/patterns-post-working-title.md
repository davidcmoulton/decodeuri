---
layout: post
title: "Patterns post working title"
date: 2017-09-15
---

# The meta
This describes 18 months' work. As such there's a lot to record. Not all of it will be relavent to the post(s?), but don't want to miss anything important, so:

 - First pass: all the details: what and why
 - Second pass: work out who it's for, tell the story to them

## What we needed to do 
### Overall sweep
- ground up rebuild of eLife. Not just the website, but all of the services involved from consuming article XML, to rendering it in a browser. Took a microservices approach. Wider discussion of this outside the scope of this article.

From the front end point of view, I knew that the end result must promote
    - flexibility (F)
    - maintainablity (M)
    - performance (P)

(- IIIF with responsive images markup works well (P))
(- service workers (P))

- worked with designer on the concept of building a design system rather than just designed pages (F)
- modular approach required hierarchical pattern-based system (FM)
(- BEM for CSS naming works well (FM))

- we're gonna' need a pattern library
    - atomic design & patternlab
    
- having a mutual understanding with the designer of the atomic design philosophy we were going to use made communicating around the patterns and design system a lot easier. We were also co-located which meant it was quick to confirm an approach, or quickly prototype something to help answer a question.

### using patterns directly in site

- How to avoid pattern rot?
    - we knew it was the only way to maintain the integrity, and so the value of the pattern library in the long term
    - LonelyPlanet approach: tightly coupled to their integration, not for us
    - no one else had really cracked that problem (this was before Fractl)
    
## what we did

### agree principles and set up workflow

- Before writing any pattern code, we agreed what the front end principles for the patterns and the site would be [insert principles here].

- Core was progressive enhancement: core content and functionality of the site must be available without requiring JavaScript.

- We knew we had to establish a workflow for building & testing mustache pattern templates and associated css in the first instance;

- js behaviour we would add to each pattern as required as a separate task once the html & css for it had been finalised

- as we knew we would need a build pipeline anyway, decided to control as much with that pipeline as possible, so used it to handle SASS compilation, instead of handing that off to Patten Lab.

- built a suitable Gulp build pipeline to lint and compile the css, and optimise images, which we could extend as necessary as we went along.

### Project style
- We wanted a lightweight, flexible structure that wouldn't get in the way or slow us down. Decided on a Scrum project style with 2 week sprints. (This turned out to have been a good decision. In the early days we had some problems with signoff: we were a bit quick to call things 'done' before the product team had had a chance to check it, but we picked that up early in a retrospective, and fixed the process to keep everyone happy.)

- Scrum boards were managed in Trello

- Each ticket was to have a basic checklist that must be completed before the pattern was 'done'. Some tickets would need to have more detailed checklists, but the common, basic checklist was:
    - semantic html is built
    - css is applied correctly
    - core content & functionality available without js
    - accessibility tests pass
    - passes device/browser testing

### name all the things!
- prior to starting the pattern build, the designer & fe devs printed out all the patterns (nach) and laid them out on the floor. They were grouped, dupes removed, variants identifed and each pattern given an agreed name. We thought it would take a couple of hours, but it took most of a day to complete. The benefits were well worth the time: it was a great way to expose many hidden assumptions, identify gaps in thinking, and discover inconsisencies that had crept in during the design process. If we hadn't done the exercise, all those problems would still exist, but they'd only manifest later when they'd be more expensive in time and effort to fix.

### Getting started
- Now everything we're building had a name, we created a ticket for the build of each pattern; any variants of a pattern were included with the build of the main pattern

- at the same time we identified which of the patterns would require js behaviour, and created ticket for building the behaviour for each pattern that needed it.

### First pass: markup & css
    
#### Pattern definition

Each pattern:
- has one mustache file
- has at least one json data file; it may have more, describing different variants of the pattern, and the more common combinations of data that a pattern may use.
- one scss file
- one yaml file defining its allowable data [forward reference]

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
    - unit
    - functional is missing

## stuff we still want to do
- make it easy to upgrade PL inside the pattern library
- build an adapter for our patterns in a different language
