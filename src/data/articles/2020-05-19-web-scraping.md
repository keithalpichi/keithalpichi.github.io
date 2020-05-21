---
title: "Web Scraping With NodeJS"
date: "2020-05-20 08:00"
path: /blog/web-scraping-with-nodejs
excerpt: Visiting websites and parsing HTML content programmatically with NodeJS and jsdom
tags: ["nodejs"]
---

## What is Web Scraping

There is one application every software engineer should build. That application is a web scraper. A web scraper is a service that programmatically requests and parses HTML content served from a remote server. Once you have the HTML content of a website you can parse it for specific data.

In this article I'm going to show you how to build a web scraper to collect product inventory of an e-commerce site. It will give you a good grasp of the hypertext part of HTTP and how browsers use HTML to construct and parse the web pages you view and manipulate everyday.

## Tools

There are few libraries we'll use to help us make web scraping a little easier.

### Server-Side Language

Since we're requesting and parsing HTML programmatically we'll need a server-side language. We'll use NodeJS for this.

### Requesting HTML

We need to request the HTML from the website. Although we could do this natively by using the http or https modules in NodeJS's standard library we're going to use [axios](https://github.com/axios/axios) to help us out.

### Parsing HTML

We'll also make the parsing work easier on ourselves by using [jsdom](https://github.com/jsdom/jsdom). jsdom is a "JavaScript implementation of various web standards, for use with Node.js". This library allows us to perform common browser API commands to parse the HTML. We could proceed without it but then parsing the HTML would be much more difficult.

## Workflow

We'll first need an understanding of the HTML content of the webpage we'd like to request. Since our goal is to collect product inventory we should know the URL of the product we're interested in and some HTML and CSS elements that determine the inventory status of the product. E-commerce sites share common HTML user interfaces:

- input fields that accept a quantity may mean that an item is in-stock
- missing or disabled quantity input fields may mean that the item is out-of-stock
- heading or paragraph tags may display the text "In Stock" or "Out of Stock"
- buttons that are not disabled and contain "Add to Cart" most likely means that an item is in-stock
- disabled "Add to Cart" buttons may mean that the item is out-of-stock

We can use this information to scrape the HTML and determine whether an item is in stock or not. Let's assume we're interested in scraping the fictional website `https://example.com/product/1`. After some investigation in a web browser we've found that a product is in-stock when a `p` tag with the class `in-stock` exists in the HTML. We'll now use axios to request the HTML.

```
const resp = await axios.default.get('https://example.com/product/1')
```

Axios returns a response object. The `data` property of this object will contain the HTML. Let's now use jsdom to parse it.

```
const dom = new jsdom.JSDOM(resp.data)
```

Filtering the HTML for the element with jsdom is quite easy.

```
const element = dom.window.document.querySelector('p.in-stock')
if (element) {
  console.log("The product is in-stock. Go buy it now!")
}
```

That's web scraping for you. Pretty easy, right?

## Improving Our Solution

This was a very simple example of web scraping. However, to make it more interesting we could have:

- used [cron](https://en.wikipedia.org/wiki/Cron) or [launchd](https://www.launchd.info/) to run the scraping task on a time-based schedule
- scraped for multiple products across multiples sites simultaneously
- scraped across multiple sites to find the one that had the cheapest product in-stock

## Limitations

Web scraping has it's limitations. It is very common for websites to prevent clients from abusing the website content and services by:
- hiding product information behind a log-in. A user has to authenticate itself to access product information. With web scraping you'd have to leverage cookies to ensure you're proving your identity to the website.
- blocking IP addresses that make many simultaneous requests. To work around this you'd have to use a proxy to shuffle the IP addresses your web scraper uses.

## Conclusion

In this article we used NodeJS, jsdom, and axios to scrape the web. We looked at how we could improve our implementation. We considered the limitations with web scraping.




