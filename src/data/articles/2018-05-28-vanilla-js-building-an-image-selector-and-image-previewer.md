---
title: "Vanilla JS: Building an Image Selector and Image Previewer"
date: 2018-05-28T01:00:00-07:00
path: /blog/vanilla-js-building-an-image-selector-and-image-previewer
excerpt: A tutorial on how to select and display an image with native HTML, CSS, and Javascript API’s.
tags: ["javascript", "html", "css"]
---

> TLDR: the final demo and code can be found [here](https://jsfiddle.net/keithalpichi/bxhedode/)

## Goal
The goals we will achieve today are the following:
- to select an image to preview
- to preview the selected image

Implementing the first point is trivial. However, the second will require the use of a `FileReader` and Javascript events to handle the image selection event.

## Step 1: Image Selector
First we'll provide an HTML input with the type as file.
```
<input type="file" />
```
This will render a button with the title "Choose File". Simply clicking on the button will open a window so you can select a file. Since we only want to allow image files we can provide the accept attribute. It now will look like this:
```
<input type="file" accept="image/*" />
```
This attribute takes a comma-separated list of allowed file extensions or MIME types. Here we are accepting any image type.

At the moment, selecting a file won't show any changes. Let's build the image previewer next to display the selected image.

## Step 2: Image Previewer
We will need an `img` element to display the selected image. Before an image is selected we will show a default image.
```
<img src="http://placehold.it/75X75"/>
<input type="file" accept="image/*" />
```
What we want to do now is listen for the change event that occurs when an image is selected. We'll then have access to the selected file. Before we do we need to update the HTML elements with IDs so we can select them with Javascript.
```
<img id="img" src="http://placehold.it/75X75"/>
<input type="file" id="file" accept="image/*" />
```
Now we'll start to build the Javascript. We first need a `FileReader`. This will allow us to read the contents of the selected file.
```
const reader = new FileReader();
const fileInput = document.getElementById("file");
fileInput.addEventListener('change', e => {
  const f = e.target.files[0];
  reader.readAsDataURL(f);
})
```
In this example, we instantiate a new `FileReader`. When a file is selected the change event will be emitted. We then call the `FileReader`'s `readAsDataURL` function with the file. This function will start to read the file as a data URL.

We'll also need to implement the onload event handler that gets called when the load event is emitted. This event occurs when the file is finished being read.
```
const reader = new FileReader();
const fileInput = document.getElementById("file");
const img = document.getElementById("img");
reader.onload = e => {
  img.src = e.target.result;
}
fileInput.addEventListener('change', e => {
  const f = e.target.files[0];
  reader.readAsDataURL(f);
})
```
The result of the file reader will be a base64 encoded string that we can provide to the image element's src attribute. That's it!

## Styling
It works well but it looks like it was built in the early 2000s. Let's make some styling changes such as getting rid of the default "Choose File" button and allowing the image itself be the source of the click event that opens the image selection window.

By simply wrapping the img with a label element we can make the image act as the "button" that opens the image selection window.
```
<label for="file"><img id="img" src="http://placehold.it/75X75"/></label>
<input type="file" id="file" />
```
The important concept is the `for` attribute. By matching this value with the file input's ID, it let's HTML know that this label is related to that input and that the label will now open the image selection window. Since we're wrapping the image with the label it makes it look like clicking on the image opens the image selection window.

If you try clicking on the image now the image selection window will open. Sweet, huh? However, the "Choose File" button is still present. With a simple change to CSS we can hide it.
```
#file {
  display: none;
}
```
Now, only the image is present. Cool! It's important to know that we don't want to get rid of the file input, we just want to hide it.

## Conclusion
Building HTML forms is common in web development. Someday, hopefully, you'll get requests to build a UI for users to select, preview, and upload images. I hope this tutorial has made it clear that building an image selector and image previewer is not only simple but can be done in vanilla Javascript using the browsers native API.

You can find the final working demo and code [here](https://jsfiddle.net/keithalpichi/bxhedode/)

### What About File Uploads?
Okay, selecting an image and seeing it render in the browser is nice but it's not very practical. Usually you want to perform some other steps afterwards; such as upload it somewhere, save it to S3, or send it to our server to do some image manipulation or machine learning. How to upload a file to a server will be for a future article. So stay tuned.