---
title: "Generating sophisticated PDFs with NodeJS and Puppeteer"
date: "2020-04-15 08:00"
path: /blog/creating-pdfs-with-puppeteer-chrome
excerpt: Using a headless Chrome API to generate beautiful PDFs on the server
tags: ["nodejs", "html", "css"]
---

## From HTML to PDF

Creating simple PDFs programmatically is pretty easy. There are plenty of solutions out there that are simple to use. You give it some HTML and some CSS and "BAM!" you got a PDF. However, once you start incorporating multiple pages, high-quality vector graphics, custom fonts, and clever styling, creating PDFs becomes a nightmare.

I've been tasked multiple times to lead the development of a PDF generation service. The development lifecycle would essentially look something like this:

- A designer creates a PDF design for a report a customer would download. The report contained multiple pages, tables with an arbitrary number of rows, complex graphs, custom fonts, and more.
- I take the design and generate the PDF dynamically.

I've used a few open-source libraries to assist me in reaching this goal but I always ran into major issues. In this article I'll discuss some of those issues, the libraries I've used, the solution I use today, and other solutions I would consider in the future.

## The Terrors of Creating PDFs

I'm a software engineer. That means I mainly work with browsers and servers. When I was first tasked with creating a PDF generation service I knew it would be a challenge because I've never programmatically generated print media such as PDFs. My only experience with creating PDFs was just like everyone elses: using Adobe, Microsoft, Apple, and other software to create PDFs using a GUI. So I was in for a real challenge.

### HTML to PDF Libraries

I've used `wkhtmltopdf` in the past in production systems. I've investigated various libraries, both for the browser and on the server. I never had issues with any of these libraries but more so the approach for how things were done to achieve the rendered PDF. For example:

- converting SVG graphics to raster images was highly suggested in the sofware community. However, it decreased the quality and altered size of the image.
- generating a PDF in the browser using the native print functionality renders PDFs that don't accurately match the desired HTML and CSS.
- generating a PDF in the browser is ineffective. You are limited by the system resources on the users computer. If you need to generate a 1000 page PDF on a low RAM computer the process could take a while.
- using HTML to generate a PDF on the server is challenging itself. You still need a browser to represent HTML and DOM APIs.

## Future Possible Solutions
- PrinceXML- licensing
- DocRaptor- licensing