---
title: "Should I use Python 2 or Python 3?"
description: "Use Python 3 if you're just starting out"
tags: python
date: 2016-06-28 23:00:00
---

Short story: use Python 3. Especially if you're just starting out, haven't built anything with Python 2, or you're work doesn't require Python 2.

## Why Python 3

- Python 2 is no longer supported and since Python 3 is the latest version of Python you'll want to use what's being updated. As of June 29, 2016 the latest version is 3.5.2.
- Even if you use Python 2 you will, sooner or later, have to change to Python 3, 4, 5, etc.
- And last, only pursue Python 2 if you have an important reason not to use Python 3.

## When You Wouldn't Want to Use Python 3

When you're job requires you to. Some companies continue to use Python 2 for many reasons. For one it is just more work to make their projects work with Python 3, especially if it's a big one.

However, even if you start learning Python 3 today you can learn Python 2 very quickly. It is after all the same language with small differences between the two versions.

## What are the Differences Between Python 2 and Python 3

I won't go into much detail but here are some of the most prominent:

- the print function
{% highlight python %}
> # In Python 2
> print "hello" 
> # In Python 3 print is a function
> print("hello") 
{% endhighlight %}

- integer division
{% highlight python %}
> # In Python 2
> 4 / 2 
> 2.0 
> # In Python 3
> 4 / 2
> 2 
{% endhighlight %}

- the dictionary view object
{% highlight python %}
> # In Python 3 dictionaries return view objects
> dictionary = {"Card": "Ace", "Card_Value": 11}
> dictionary.values()
> dict_values(["Ace", 11]) # the view object
> # Where as in Python 2 it returns a list
> dictionary = {"Card": "Ace", "Card_Value": 11}
> dictionary.values()
> ["Ace", 11] # the list
{% endhighlight %}

- the strings are Unicode by default

If you want the full and complete updates to each version of Python checkout the [What's New](https://docs.python.org/3/whatsnew/index.html) portion of the documentation. 

Also, if you'd like to know if a Python package supports version 3 checkout [Python 3 Wall of Superpowers](https://python3wos.appspot.com). They've done all the work by listing all the packages that support it.

## Install Python 3

Head over to [python.org]() to download Python 3.
