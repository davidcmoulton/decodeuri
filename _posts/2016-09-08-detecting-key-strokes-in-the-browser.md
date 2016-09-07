---
layout: post
title: "Detecting keystrokes in the browser"
desc: "Investigating which browsers report what values in which properties."
date: 2016-09-08 00:30:00
---

# KeyboardEvent key reporting

 All verification performed using this test form:

 <iframe src="/supporting/keys.html" width="100%" height="430px" style="outline: 1px solid rgba(42, 122, 226, 0.25); border-width: 0;"></iframe>

 and referring to this [ACSII reference](http://www.ascii-code.com/).

(The [test form is also available separately](/supporting/keys.html).)

## Desktop and iOS

The modern desktop environment on Mac and PC (Linux not tested), along with iOS seems to behave fairly consistently.

KeyboardEvents from printable characters and the return key (at least), supply one or both of keyCode and charCode (depending on the browser, see below), for each of keyup, keydown and keypress events.

Lower case alphabetic characters have their lowercase ASCII value reported for a keypress event, but keyup and keydown events report the ASCII value of the corresponding uppercase character.

Typing uppercase characters does not exhibit surprising behaviour, but you need to remember to take into account the modifer keys (shift or capslock).

When an uppercase character is typed by holding down the shift key:

1. when the shift key is initially depressed, the keydown event reports that as the value for 'Data line escape' (16)
1. all three events register the ASCII value for the upper case character when that is keyed.
1. When the shift key is released, 'Data line escape' (16) is reported for the keyup event.

When an uppercase character is typed using capslock:

1. when capslock is turned on, the keydown event reports that as the value for 'Device control 4' (20)
1. all three events register the ASCII value for the upper case character when that is keyed. This continues as long as capslock is on
1. when capslock is turned off, 'Device control 4' (20) is reported for the keyup event.

When shift/caps lock key is keyed on a phone's soft keyboard, it generates neither a code 16 nor a code 20 for the shift/caps lock key.

Events from arrow keys provide keyCode values for keyup and keydown, but not for keypress. Not tested on mobile (generally no arrow keys on the soft keyboards, I've not tested using external hardware).

When listening to events on input fields, those from the tab key provide a keyCode value only for keydown, not for the keyup nor keypress events. (This may be because the tab key moves focus away from the element where the keydown event was triggered, meaning that the keyup and keypress events will be never be fired for that specific keying of the tab key, but I'm not sure).

## Android
This is where things get funky. I've not carried out an exhaustive test because there are hundreds of types of Android devices. However, playing on my venerable OnePlusOne, and also running the test page on a number of Android setups on Browserstack showed consistent behaviour, as far as it goes. It's this, and it's a doozy:

- no matter what character you key in, keypress says nothing, and both keyup and keydown report a keyCode value for 'Latin small letter a with ring above' (229).

So every character you type is being reported as &aring;.

Which is just very slightly wrong.

## What to do?

- when responding to keyup or keydown events, check keyCode for the ASCII value of the uppercase version of the character keyed.
- when responding to the keypress event, check charCode for the ASCII value of the actual character keyed (some browsers will also report in keyCode, but not all, so charCode's your best bet).

I'm assuming Android's flakiness is not so critical when detecting tab and arrow keys as they are less likely to be used on a touch screen's soft keyboard (but there may be people using external keyboards):
- if you're looking for the tab key, you need to listen for it on the keydown event to be most sure of getting it. Note that you should not generally try to do things with the tab key as you may break keyboard navigation.
 - if you're looking for an arrow key, you may choose to listen for it on either the keyup or keydown events.

Other things that seem to apply most places but Android:

 - if you're looking for an alphabetic character but don't care in what case, listen for it using the keyup or keydown events.
 - if you're looking for an alphabetic character, and the case in which it was typed matters, listen for it using the keypress event.

You'll need a fallback strategy for Android. In some situations it might be enough to detect that there's been a keyup or keydown event and use that to trigger an inspection of something on the page that might have been changed by it (the value of a form field with focus, for example).


## OSX El Capitan

### Chrome

#### keyup
says **keyCode** not charCode

Reports value of upper case version of the character where appropriate.

#### keydown
says **keyCode** not charCode

Reports value of upper case version of the character where appropriate.

#### keypress
both **keyCode** and **charCode**

Reports value of the character that was actually generated (upper- or lowercase).

### Firefox

#### keyup
says **keyCode** not charCode

Reports value of upper case version of the character where appropriate.

#### keydown
says **keyCode** not charCode

Reports value of upper case version of the character where appropriate.

#### keypress
not keyCode but **charCode**

Reports value of the character that was actually generated (upper- or lowercase).

### Safari

Appears to be the same as Chrome.

## IE

Edge and IE 9 and up exhibit behaviour similiar to Chrome. (IE 8 hasn't been tested because the test page uses addEventListener that isn't supported by IE8.)



