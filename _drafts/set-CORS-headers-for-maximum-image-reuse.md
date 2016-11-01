---
layout: post
title: "Set CORS headers for maximum image reuse"
desc: "Make it easier for people to reuse your images in their &lt;canvas&gt;."
---

**Can you fit this to Corrs song titles?**

## Forever the Same
I was at the perenially brilliant MozFest last weekend, and one of the [sessions](https://app.mozillafestival.org/#_session-426) involved working on the [miniReproducibility Project](https://github.com/j-joe-akin/fig-can), conceived by Joe Akin and Girija Goyal. Briefly, their aim is to provide an open science tool to enable scientists to compare reports of different attempts at the same experiment in order to determine how reproducible it is. (For more details, read the [interview with Girija](https://www.force11.org/blog/addressing-reproducibility-open-science-interview-girija-goyal).)

Part of the vision for the initial quick and dirty prototype is to have a stage in a web page that you can drag images from other websites onto, and the images are copied onto the stage, and can be resized and repositioned as desired. One way this could be achievable is using the drag and drop API to copy the image into a `<canvas>` element:
      
    canvas.getContext('2d').drawImage(image-from-drag-and-drop, 0, 0);

converting it to a data URI,
 
    var data = canvas.toDataURL('mime-type-of-image');
    
and then use that data URI as the source for an image element.

## Tainted Love 

But there's a problem. To prevent people messing around with other people's images too much, the html5 spec uses the concept of a tainted canvas to restrict operations to retrieve the image data out from the canvas again, if the original image was loaded from a foreign origin. To prevent this, the origin serving the images must serve them with a Cross Origin Resource Sharing header that allows their use on a domains other than their origin.

** Examples of what CORS headers to set**
 
 
    
    
   

