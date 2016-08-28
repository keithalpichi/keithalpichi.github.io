---
title: "What to Expect When Teaching Yourself to Code"
description: "Do yourself a favor and set yourself on the right path"
date: 2016-07-11 12:00:00
tags: python
---

There are plenty of things that I have learned when I first started to program. Below are the most common challenges to expect when you start learning. Knowing what to expect is critical as it will help you prepare and overcome  them. You'll write better code, make less mistakes and save yourself from pulling all your hair out.

## You'll want to read or copy code but instead type it

> By all means stay away from `<CMD-C>`!

Programming is a typed-language not a spoken one. Unlike other things you learn you're going to have to physically type code to learn it. You must teach your mind to code through your finger tips. Practice enough and typing code becomes a habit. The code will flow seamlessly from the strokes of your fingers to the screen.

For example, reading the code below seems simple to remember. However read it once and try implementing the same idea yourself without using what I used here.
{% highlight python %}
> my_favorite_tools = ["python", "elixir", "vim"]
> for every_tool in my_favorite_tools:
      print(every_tool)
> python
> elixir
> vim
{% endhighlight %}

When you come across code type them into your computer, work through examples, and challenge yourself to build programs.

## Learning to code will challenge you

Once of the first things I learned about programming was that it has challenged me on so many levels. I am pretty sure it will challenge you as well. So expect to be tested on the following:

#### Your patience

Silly huh? Laugh now but it's true. When you first start, expect to make plenty of mistakes and to not understand concepts. They're inevitable. When you do, don't skip them. Instead take the time to understand where your mistake came from. Take a few steps back so that you understand the concept.

When you make a mistake or something isn't working right ask yourself, why do you think this is? What should be the solution? Where is my error occurring? It's important that you understand your code. Be patient because you can't rush something you don't understand.

#### Your logical reasoning

So basically, can you use your brain? There are many ways to solve the same problem. Some ways are more efficient than others. You'll need to think logically and procedurally. Otherwise you'll be placing <a href="https://en.wikipedia.org/wiki/Software_bug" target="_blank">bugs</a> within your code.

> *Logical reasoning*- the process of using a rational, systematic series of steps based on sound mathematical procedures and given statements to arrive at a conclusion

{% highlight python %}
> x = 1
> y = 2
> z = x + y
> z #the output of z is 3
{% endhighlight %}

> *Procedure*- a set of instructions that performs a specific task; a subroutine or function

You will face big problems that seem too big to handle. Break large components down into smaller ones. For example, to build a dresser you start with the structure, the sides, each drawer and the legs. You can take this even further and think about the screws and nuts in each piece. 

When you build a dresser you don't build from top down. There are logical steps that should be taken. When you code go from step one to step two and so on. Ask yourself what makes the most sense.

{% highlight python %}
> build_base_of_dresser() #build the base so that you can add the sides
> build_sides_of_dresser() #build the sides so that you can add the drawer
> build_one_drawer() #build the drawer so that you can place it into the dresser
> #and so on...
{% endhighlight %}

If I try the example above without considering logic or ignore any type of procedure it doesn't work.
{% highlight python %}
> build_one_drawer() 
> attach_knob_to_the_drawer() 
> build_sides_of_dresser() 
> turn_on_the_stove()
{% endhighlight %}
It's not logical to build the drawer first. It's probably inefficient to attach the knob to the drawer so early in the build. Also, where in this code do I build the base and why am I turning the stove on?

If you can think logically your code will be efficient, easy-to-read and less error-prone. Doing so will save you future headaches.

Pushing the boundaries of how you think is powerful. Thinking logically will stretch your mind. Think of your code as a bunch of puzzle pieces and how they all fit together.


## You'll think your code is good as it is

Sometimes there is a better way of implementing your code. You must always be thinking how you can improve your code and your skills. 

If you're given 'X' amount of information think about what you can do with it. Can you implement a solution in a different way? What can you build with this information? Why is it done in a specific way? Ask a lot questions and think outside the box at all times. 

{% highlight python %}
> card_suites = ["Ace", "Diamonds", "Ace", "Hearts"]
> #------------- Solution One ---------------------
> solution_one_count = 0
> for card in card_suites:
      if card == "Ace":
          solution_one_count = solution_one_count + 1
> #------------- Solution Two ---------------------
> solution_two_count = len(list(x for x in card_suites if x == "Ace"))
> #------------- Solutions Compared ---------------------
> solution_one_count #is 2
> solution_two_count #is 2 as well
{% endhighlight %}
Solution_one_count takes four lines to count the number of Aces in card_suite. Solution_two_count takes one line to do the same thing. The first solution is probably how you'll first learn to count items. Yet without knowing that generators exist (solution_two_count) you'll never be able to take advantages of them. 

See how other people are implementing the same code you have. What are they doing differently? If something looks new to you look it up?

## You'll want to rush but don't

I've found myself to skip over topics I didn't understand or ignore concepts I thought weren't important. Trust me when I say this, everything you learn is important and applicable even if it doesn't seem so at the moment. If you're taking a course or reading a textbook there is a reason why you're learning that material. It's not there to waste your time.

If you don't understand something go back, take your time and *really* try to grasp it. Make sure you're actually typing the code and not just reading it. 

## You'll immediately want to reach out for help when you can't solve a problem

Resist this urge to cry for help. Instead, try to understand the problem. Do you understand everything that is going on in your code? Most of the time this is the solution to your problem. Can you find where the problem came from, not where it's at? Can you solve it a different way? Try it a different way from what you're used to doing. Only when you're at a dead end should you reach out for help.

## You'll likely ask for help the wrong way 

A lot of people tend to ask for the solution without trying to understand where the problem came from. This is important. If you don't learn how to solve a specific problem you've had in the past you'll continue to be confused. Just getting the answer won't help you. It may solve this one specific problem but not when you're a confronted with another similar one.

It's important ask questions the right way. When you're asking for help present what you're trying to accomplish, what you've tried and why you think you haven't solved it. 

## You'll probably catch *Analysis Paralysis*

> *Analysis Paralysis*- the state of over-analyzing (or over-thinking) a situation so that a decision or action is never taken, in effect paralyzing the outcome. A decision can be treated as over-complicated, with too many detailed options, so that a choice is never made, rather than try something and change if a major problem arises. A person might be seeking the optimal or "perfect" solution upfront, and fear making any decision which could lead to erroneous results, while on the way to a better solution

You'll have a lot of questions about what's the best way, language or tool to implement something. You don't want to make mistakes so you ask for help. That's understandable. However, most of the time searching for the perfect solution turns out to be more like a search for infinite solutions.

Instead choose the option that seems *most appealling to you and implement that now*. In the programming world you can implement almost everything with any option. For example, you can do web development in either PHP, Javascript, Python or Ruby.

Instead of wasting time finding the perfect solution, pick a language or tool that works *for you that you enjoy* and stick with it. Do one thing at a time and do it well. You can keep your eyes open of other options but you don't need to drop everything so fast if you decide to switch it up.

## Prepare For The Future

Hopefully I have provided some insight into the future on what you can expect when you learn to program. Take what you read here and apply it immediately. You can say that this post is a message from your future!
