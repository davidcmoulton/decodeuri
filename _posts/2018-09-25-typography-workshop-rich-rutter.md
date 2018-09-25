---
layout: post
title: "Web typography workshop with Rich Rutter"
desc: "Notes from the workshop run at Generate conference, London, on 19th September 2018"
date: "2018-9-25"
---

Rich Rutter is a veteran web typography expert. Back in 2004 he proposed [the 62.5% font sizing trick](http://clagnut.com/blog/348/) which quickly became an established technique to make it easier to reason about using ems when sizing fonts on the web. In 2018 he's literally written [the book on web typography](http://www.book.webtypography.net/). When I saw this guy was running a workshop at Generate London this year, I had to go! What follows is a lightly edited note-dump to help me remember what I learned.

Frequent references to [Bringhurst](https://typographica.org/typography-books/the-elements-of-typographic-style-4th-edition/), probably worth a re-read.

Firefox has the best font support, so for best understanding, try things out in [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/).

## Readability
Relies on the measure, line-height and font-size. If one changes, the other(s) may need to be adjusted to maintain readability.

Bringhurst says convention considers a readable measure to be between 45-75 characters. Assuming 1em is about the width of two characters, 75 characters comes in at about 38em.

Reminder: CSS line height is not leading: space imposed by `line-height` is distributed equally above and below the text.

For shorter line lengths, line height can be increased slightly, but it's best to just pick one value that works well enough across the possible widths.

You may need to adjust `line-height` when using different fonts, test by eye.

Adjust the font size if required, different overall glyph heights and different x-heights will determine what's required. 

The "aspect value" is the ratio of x-height to font size. If two different typefaces are being displayed at such sizes that they have the same aspect value, they are likely to look the same size, even when they're not. Tool for calculating aspect value: [http://clagnut.com/sandbox/font-size-adjust-ex.html](http://clagnut.com/sandbox/font-size-adjust-ex.html).

Will be able to use [`font-size-adjust`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust) for this in the future, but not enough browser support yet.

## Reading distance

Different reading contexts often involve different reading distances. For example reading the news on your phone packed in like cattle on a standing-room-only commuter train, you're likely not to be the same distance from the screen as when you're reading that fancy online design magazine on yer massive 4k desktop monitor. 

Arcminutes are units used to express perceived size: it's a measure of angle which takes distance into account. As reading distance increases, the physical font size needs to be increased in order to maintain the same perceived size.


[Sizecalc](https://sizecalc.com) can help, it's "a tool for calculating and visualizing the relationships between viewing distance, physical size, and perceived size".  

Using sizecalc, we can determine that someone reading a book set in 10pt type, holding it a comfortable 40cm from their eyes, perceives the size to be 30 arcminutes. This is about the same as someone reading on phone (apparently). Can't always rely on devices reporting physical size though. For example the iPad and the iPad mini both report the same size via media queries, even though they are very different physical sizes. [Difference between device pixels and CSS pixels?]

Five arcminutes is about the smallest perceived size of text that we could read.  

Can also use sizecalc to determine that the moon at its perigee (221,559 miles), would have to have writing 322 miles high in order to be read from the surface of the earth (even ignoring any atmospherics etc.) Typography in space FTW! :-D  

## Type size

Set text in rems.

Don't neglect to set text at display sizes where appropriate, even on smaller screens.

Set type using a scale to ensure a consistent visual hierarchy.

Examples of scales:

- ios scale: `32, 24, 19, 16, 13`
- classic: `36, 24, 18, 16, 14`
- 16/9: `90, 51, 28, 16, 9`

[modularscale.com](modularscale.com) is great for exploring possible scales you might use.

Can use the same scale for different screen widths, but miss out some points in the scale on larger screens in order to get the exageration in scale that can work well when a lot of screen space to play with.

Or you can use different scales for different widths. Rich likes to do this so he can focus on the different purposes of the scales which the different widths impose. 

Watch out for line height on headings: the large line height often applied to larger headings can often make one heading look like two headings when it wraps. To get around this, set a small line height for the heading, and organise the vertical space above and/or below it with `margin`s. 

You can size display text as you would an image, so you can use e.g. `vw` or `vmin` units to size the `<h1>`. Note that elements styled solely with viewport units aren't zoomable, so use calc, e.g. `font-size: calc(13px + 10vw)`.


Height-based media queries can be really useful: for example don't necessarily set massive headings unless the height as well as the width is available

## Vertical rhythm
Rich sets vertical rhythm using margins, using `em` units so it can scale appropriately.

## Microtypography
- use correct punctuation symbols
- em dash/en dash
- hair/thin/normal space
- kerning (on by default these days, w000t!)
- treat numbers as 'letters' in running text to prevent them standing out and distracting the reader 

## Numbers
Numerals are either 'lining', that are similar in treatment to uppercase letters, or 'old style' that reflect the style of lowercase letters. Both of these numerical styles may be set as either tabular (fixed width) or proportional (don't line up).

Recommended to use lining numerals in headings, and when all caps, otherwise use old style.

Use tabular lining numerals in tables.

If the font supports it, can use [`font-variant-numeric`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) CSS property to specify which numeric property/properties to use. The fallback for this is `font-feature-settings`, but this resets everything and really is a spedgehammer/nut situation, and not sure it's worth it. Might be better to just use `font-variant-numeric` as a progressive enhancement.

## Tables
- they should be readable
- they should support a sense of the data within so you "can understand it by its shape".

Recommendations:
- left align text
- right align numbers
- align the column headings to the data they're heading up
- if left/right alignment is not appropriate, align to a decimal point, or another appropriate character [except... this can only be reliably done using `text-align: "character" center`, but this is in CSS text module level 4, and as such has no browser support as yet].

Allow horizontal scrolling, with e.g.
```
.tablewrap {
    max-width: 100%
    overflow-x: auto;
}
```  


You could wrap parts of cell heading labels within span which is hidden for very narrow screens (only). e.g.
```
/* css */
.u-hide-when-tiny {
  display: none;
}

@media screen and (min-width: 480px/*or whatever*/) {
  .u-hide-when-tiny {
  display: inline
  }
}

/* html */
<div>
  D<span class="u-hide-when-tiny">ou</span>bl<span class="u-hide-when-tiny">e</span>
</div>
```

but you have to be able to predict and control the heading labels in order to use this technique.

## Font choice
- is it suitable for the text?
- does it contain the glyphs you're likely to need? 
- does it offer the effects and features that you're likely to need?
- does it have enough weights and styles?
- Is the spirit and character of the typeface consistent with its intended usage?

## OpenType
One way to turn OpenType features on for a font is by specifying which [`font-feature-settings`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings) are desired. For example `font-feature-settings: "swsh" 1;` turns on swashes, if they are available in the font. Note that you should only set OpenType features using `font-feature-settings` if there's not a supported longhand property associated with the feature you want to use. For example don't use it to set small caps, to do this you should use `font-variant-caps: all-small-caps;` instead (see [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings)).

To discover what OpenType features are available in a font, use `https://wakamaifondue.com/`. Incredibly useful resource. 

Side note: some font files have embedded Python code to handle the more complex logic required to determine some glyph substitutions.

`glyphhanger` node module reports what unicode ranges are used on a website, and can provide some subsetting functionality.

Interesting post on [creating a subset font](https://michaeljherold.com/2015/05/04/creating-a-subset-font/) with Python.

## Variable fonts

Quite new. When I played with them six months ago, they weren't ready, but now they seem like they're nearly there.

Subsetting a variable font can cause problems, so don't for now.

A variable font is a font file which makes many more versions of the same glyph available, for an entire typeface. For example a traditional typeface may offer a selection of weights over several individual font files. A variable font is capable of offering all weights between 1 and 999 in one font file. Weight is just one axis, or dimension, of variation. There are five registered axes:

1. weight
1. width
1. italics
1. slant
1. optical-size

controlled using the CSS properties `font-weight`, `font-stretch`, `font-style` and `optical-sizing`.

There have been calls for more registered axes, but the the registered axes are backed by the OpenType spec and so it depends what happens in that.

You can have non-registered axes in your variable font file.  

You can have other axes that affect a subset of the 5 registered axes.

Each axis can be addressed by providing its 4-letter OpenType feature code to `font-variation-settings`. The convention is to address non-standard axes in uppercase. 

In `@font-face` blocks, `font-style`, `font-stretch` and `font-weight` all default to `normal`, so you might need to set these explicitly. They take the following respective ranges:

- oblique -90 to 90
- 50% to 200%
- 1 to 999

They will also take the `auto` keyword, but that's not implemented yet.

Variable font spec says you can declare them within `@font-face` using  `format(woff2 supports variations)`, but that's not implemented yet. The workaround is to include feature queries checking support for an appropriate value of `font-variation-settings`, and only load the variable font when support is available.    

Can use (responsibly) in responsive design: for example could use `font-stretch` to introduce slight variations across breakpoints.

File compression is good. Can see soon we might be loading one variable font to provide all weights and styles rather than a handult of different font files. Overall performance will be interesting to track.  

For more see [Rich's post on using variable fonts](http://clagnut.com/blog/2390).

Font foundries aren't sure yet how to price variable fonts, which is one reason their availability isn't as widespread yet as we might have hoped.

Variable font resources:
- [v-fonts](https://v-fonts.com/) "A simple resource for finding and trying variable fonts"
- [AxisPraxis](https://www.axis-praxis.org/) "for playing with OpenType Variable Fonts"

General resources:
- [https://wakamaifondue.com/](https://wakamaifondue.com/) Explore which OpenType features are available in a font file 
- [https://fontsinuse.com](https://fontsinuse.com)
- [https://www.whatfontis.com/](https://www.whatfontis.com/)
- [https://typ.io/](https://typ.io/)
- [https://www.typewolf.com/](https://www.typewolf.com/)
- [http://www.typeroom.eu/](http://www.typeroom.eu/)
- [https://www.parachutefonts.com/](https://www.parachutefonts.com/)
- [https://abookapart.com/products/flexible-typesetting](https://abookapart.com/products/flexible-typesetting)
- [https://abookapart.com/products/webfont-handbook](https://abookapart.com/products/webfont-handbook)
- [https://www.alibris.co.uk/Shaping-Text-Jan-Middendorp/book/25412024](https://www.alibris.co.uk/Shaping-Text-Jan-Middendorp/book/25412024)
    
