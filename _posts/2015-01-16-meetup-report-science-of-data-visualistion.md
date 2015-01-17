---
layout: post
title:  "Meetup writeup: The Science of (Bio) Data Visualisation"
date:   2015-01-16 19:45:08
---

Yesterday evening I went along to the [Science of (Bio) Data Visualisation](http://www.meetup.com/Cambridge-Visualization-of-Biological-Information-Meetup/events/219018174/) meetup in Cambridge. There were 2 talks: one by Catagay Turkay, who is researching data visualisation, and one from a design company, [Science-Practice](http://science-practice.com/), who specialise in the science sector. The two talks complemented each other well.

## Designing interactive visualisations to solve analytical problems

Catagay Turkay is researching applied data science in the giCentre of City University, London. He's interested in perceptually optimised visualisations, and in using computational tools in interactive visual analysis. Biological visualisations specifically interest him because they tend to be based on large, heterogeneous datasets, often at multiple scales, and because they often describe dynamic processes, they include temporal complexity, which makes them more challenging.

### Visualisation can help:

- ease of cognition
- relate multiple aspects
- compare multiple computational outputs
- investigate uncertainties

They enable and foster **hypothesis generation**

Catagay sees visualisation as operating on three levels: as a presentation medium; with interaction, and with integrated computation.

### Visualisations as presentation medium

He showed an example of striking imagery with an illustration of an *E. coli* cell, highly coloured, with organelles clearly visible. It's both correct, and aesthetic.

Nature Methods publishes a regular Points of view column on how to make better visualisations. You can see [this list of them](http://blogs.nature.com/methagora/2013/07/data-visualization-points-of-view.html), but the actual articles are paywalled.

### Visualisations with interaction

Example of [Mizbee](http://www.cs.utah.edu/~miriah/mizbee/Overview.html), a free Synteny browser (also, see the article's record on [PubMed](http://www.ncbi.nlm.nih.gov/pubmed/19834152), although the actual IEEE paper is behind a paywall).

Strengths of this include:

- the ability to compare the overlap between 2 genes
- can link multiple aspects
- interactively vary the focus
- display multiple scales concurrently (multiple scales seem to be a situation reasonably specific to biology).

### Visualisations with integrated computation

Rather than provide an interface to interact with static aspects  of the dataset (albeit in creative ways), here computation on the data is employed during the data visualisation process itself. For example by making a cluster algorithm part of the actual visualisation process.

The strength of this approach is the combination of human perceptual abilities with a computer's processing power. AKA **Visual Analytics**.

Example given was [Stratomex](http://caleydo.github.io/projects/stratomex/) by Caleydo. It's described as an "Integrative visualization of stratified heterogeneous data for disease subtype analysis". It's been used for cancer subtype analysis, and he showed multiple stratifications with many patients, and some sample overlaps: which means you can compare the results of different algorithms.

What's powerful here is that you can link gene expression data with chemical pathway data and clinical data. Visualisations are good here, because:

- with multiple, linked datasets you can improve your interpretation
- multiple computational results  can help you deal with uncertainty

This allows for a fast iterative process that means you can prototype many ideas quickly. You won't get all the answers from this high level treatment, but it can help you narrow down ideas of interest that is worth putting under more rigorous analysis.

### Outlook

Interaction and exploratory analysis is key.

We need seamless support from integrated computations (e.g. t-tests).

### Q&A

- *What work is going on to investigate new methods of interaction, to complement all this work on new methods of visualisation?*

  There is a lot of work going on in the HCI field to do with this, not crossed over into the visualisation world yet.

- *What libraries are people using for their visualisations?*

  + [d3](http://d3js.org/) (JavaScript)
  + [vega](http://trifacta.github.io/vega/) (JavaScript)
  + [GGobi plugin for R](http://www.statmethods.net/advgraphs/interactive.html) (R)
  + Catagay does a lot of his work using Python

### Closing remarks

Good design principles are essential
for maximising the perceptual capabilities of the analyst. This is integral to good visualisations.

Scientists should collaborate with designers/visualisation experts to produce better visualisation outputs.

## Sequence bundles

This talk was given by the design agency Science-Practice that specialise in science-related projects in many disciplines. The science bundles came out of the effort to work out a new way of visualising protein chains in MSA antibiotic resistance genes in MSA. Something to do with an entry for the [Longitude Prize 2014 antibiotics challenge](https://longitudeprize.org/challenge/antibiotics). Their pitch was "Designing visualisations to enable discovery of data features that would otherwise remain hidden."

### Design process

They talked through their design process: it was their process that helped them discover hidden information in the sequence datasets.

First step was to learn about bioinformatics. Science-Practice are only a handful of people, but they have a scientist on staff in order to help the transfer of scientific knowledge into the design team. Necessary as they have projects in different scientific areas.

They played with various ideas of representing a protein sequence, but decided to focus on the of the sequence characteristic of it representing a chain of contiguous amino acids.

Having decided on a chain representation, their chosen way of comparing 1809 protein sequences was by graphing as a ribbon connecting the amino acids on the y-axis, and the sequence position on the x-axis. Partial transparency was very important here, in order to see patterns of overlap.

They then played about with many design elements, e.g. colour, spacing of the y-axis, filtering out different info... they changed the layout a few times, he showed one where they tried a string visualisation.

Their playing revealed some surprises that as far as they knew were not known to the data authors, for example a highly conserved residue at position 13. They also found some things that were not as obvious as expected, and there was some considerable variations from the consensus sequence. This was only discoverable because they decided to visualise each individual sequence in full, amino acid by connected amino acid. If they'd performed any kind of transformation on the sequence data before visualising it, these nuances would very likely have been missed.

Interesting that these discoveries came to light during the design process.

On the back of this they've developed a desktop tool, and a lighter weight web tool, to enable you to use the sequence bundle approach to visualise not only protein sequences, but also DNA and RNA sequences. The aim is to help scientists uncover information hidden within sequences without having to go through the design process. They had a group of 70 users in a study that they interviewed and got feedback from during the development of the tool [not much info on the user research process, unfortunately].

You can [read more about sequence bundles on their website](http://science-practice.com/projects/sequence-bundles/).


## Closing
This was a great meetup. Thanks to the two speakers, and to William Spooner for organising. It was good to reconnect with old friends, and make some new ones. I hope I'll be able to go to make to to the next meetup.

(P.S. This writeup is based on my hastily sciribbled notes. I think it's pretty accurate, but if you were speaking that night, and I've horribly misrepresented what you said, please get in touch so I can make things right.)
