---
layout: post
title: "How to setup SASS or LESS with Webpack 2"
description: "A straight-forward explanation to configuring preprocessors with Webpack 2 to get you styling your applications quickly"
date: 2017-07-13 12:00:00
keywords: webpack, sass, less, preprocessor, css, react, angular
permalink: how-to-setup-sass-less-with-webpack-2
---

#### Prerequisites
- Basic understanding of SASS or LESS and Webpack

## LESS time, more SASS

That's what you want in your development workflow. Spend less time configuring and setting up and more time showing off your bad-ass styled applications. Here's a straight-forward explanation to configuring a preprocessor like SASS or LESS with Webpack.

> I haven't tested it yet but the new version of Webpack (3) should still work with this setup

## Install your dependencies

You'll of course need Webpack and NPM or Yarn (I'll be using Yarn in this tutorial), so

{% highlight javascript %}
yarn add webpack
{% endhighlight %}

Install these:
{% highlight javascript %}
yarn add style-loader css-loader extract-text-webpack-plugin
{% endhighlight %}

If you're using SASS install:
{% highlight javascript %}
yarn add sass-loader node-sass
// node-sass is a peer dependency of SASS
{% endhighlight %}

If you're using LESS install:
{% highlight javascript %}
yarn add less-loader
{% endhighlight %}

A quick overview of these packages:
- '*-loader' packages are responsible for compiling, injecting css scripts to the DOM, and resolving imports
- 'extract-text-webpack-plugin' extracts multiple SASS or LESS files and builds them into a single file

## Configure Webpack

Create a 'webpack.config.js' in the root of your project directory if you don't already have one. Add the following lines:

{% highlight javascript %}
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    './path/to/entry/sass/or/less' // Footnote 1
  ],
  output: {
    path: path.resolve(__dirname, 'path/to/build') // Footnote 2
  },
  module: {
    rules: [
      {
        test: /\.sass$/, // Footnote 3
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'] // Footnote 4
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin({ filename: 'index.css' })] // Footnote 5
}
{% endhighlight %}

### Configuration footnotes

 1. Specify the path to the main entry point of the SASS or LESS file. This is where Webpack will look to start.
 1. Adjust the 'path' key to the directory you want Webpack to put the final css
 1. Adjust the 'test' key according to the preprocessor you're using, 'sass', 'scss', or 'less'
 1. Adjust the loader within the 'use' key to the preprocessor you're using, 'sass-loader' or 'less-loader'. Note that 'css-loader' must be defined first in the array because Webpack evaluates loaders from *right* to *left*
 1. Adjust the 'filename' key to to the filename you want

## That's it!

Make sure to reference the compiled css file in your 'index.html' file and you're good to go. With just a few lines of configuration you're Webpack is ready to compile your SASS or LESS. Now take the time you've saved to get a jump on styling your application!

If you have any questions feel free to comment below or send me a tweet.

#### References
- [webpack](https://webpack.js.org/configuration/)
- [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)
- [sass-loader](https://github.com/webpack-contrib/sass-loader)
- [less-loader](https://github.com/webpack-contrib/less-loader)
- [style-loader](https://github.com/webpack-contrib/style-loader)
- [css-loader](https://github.com/webpack-contrib/css-loader)
