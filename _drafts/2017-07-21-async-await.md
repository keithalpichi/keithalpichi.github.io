---
layout: post
title: "Async and Await: All The Benefits of Asynchronous Code With the Flow of Synchronous Code"
description: "Async await"
date: 2017-07-21 12:00:00
keywords: javascript, node, async, await, generator, function
permalink: what-is-javascripts-async-await
---

#### Prerequisites
- Understanding of [callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function), [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), and differences between synchronous (blocking) and asynchronous (non-blocking) programming

## We Have Callbacks and Promises, Why Use Async?

Just like promises gave us more intuitive functionality over callbacks (ie, eliminating [callback hell](http://callbackhell.com/)), async functions do the same for promises. If you felt promises were a cool replacement to callbacks, wait 'til you hear how cool async functions are.

Async functions allow us to accomplish:
- concise and clean code- we gain the benefits of asynchronous code with the look and flow of synchronous code
- to use familiar programming constructs like `try`, `catch`, and `finally` for error handling

Throughout this article I'll explain these benefits of async functions.

 - https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns#the-deferred-anti-pattern
 - https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

## How We Got Here: From Callbacks to Promises to Async
 - review callbacks, and Promises
 - introduce generators- function that returns multiple values
  - iteration protocol (pull values out of function- `yield`)
  - oberver protocol (push values into function)
   - `gen.next(5)`
   - `gen.throw('error')`
   - `gen.return(10)`

## Async and Await

## Conclusion

If you have any comments or questions please leave a comment or tweet me! Mahalo!
