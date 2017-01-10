---
title: "The Guideline To Being A Self-Taught Programmer"
date: 2016-06-30 10:00:00
description: "Step-by-step guide from choosing a language to deploying applications in the cloud."
tags: python, flask, html, css, git
---

<h2>The Most Important Article on This Website</h2>

<p>I made this guideline based on my personal experience of teaching myself software programming and web development. Checkout my <a href="/timeline">timeline</a> if you haven't already. It covers the path I took since the beginning of my journey and what I learned from it.</p>

<p>This guideline was made to help you learn programming effectively and efficiently. From learning the basics of computer science to getting your applications deployed. Throughout this article I have linked to resources I recommend. Read and follow this guideline from top to bottom.</p>

<p>If you're going to take anything away from this website, take away this article. <b>I advise you take notes. Seriously, write each section down and make yourself a gameplan</b>.
</p>

## The Guideline

<h3>Your Goals</h3>

<p>
<ol>
  <li>First it's important you understand what your goals are. Answer the following questions:
    <ol>
      <li>What aspects of technology interest me? Science? Math? Web development? Mobile? Robotics? Data? Games? eCommerce? </li>
      <li>What do I want to specialize in? What do I want to be known for? Frontend? Backend? Both? What language? User experience/design (UI/UX)?</li>
      <li>What problems have I faced that can be solved with software?</li>
      <li>What am I looking for in a language or software? Shallow learning curve? Support? Community? Speed and scalability? Accessibility to open-source libraries and packages that I can use?</li>
    </ol>
  </li>
</ol>
</p>

<h3>Your Language and Approach</h3>

<p>
Pick your language and how you'd like to learn it.
<ol>
  <li>I recommend Python. Not only because I use it but Python can answer all the questions in the previous section. If you want more options do a simple online search such as "programming language for [question-here]". You'll find a plethora of results. If you want a hands-on interactive introduction checkout <a href="https://www.codecademy.com/learn" target="_blank">Codecademy</a>.</li>
  <li>How do you like to learn? Take a look at the <a href="/resource" target="_blank">resource page</a> for resources I recommend.
    <ol>
      <li>With physical/online books?</li>
      <li>Taking a course? Try <a href="https://www.udacity.com/" target="_blank">Udacity's Nanodegree programs</a>, <a href="https://www.udemy.com/" target="_blank">Udemy.org</a> or <a href="https://www.coursera.org/" target="_blank">Coursera.org</a>.</li>
      <li>Does going back to school to a community college or university sound ideal? How about a developer bootcamp?</li>
    </ol>
  </li>
</ol>
</p>

### Prepare With The Right Tools

- Install your language of choice. If you chose Python follow these <a href="http://www.diveintopython3.net/installing-python.html" target="_blank">instructions to set up Python 3</a>. If you chose another language check out the language's documentation.
- There are many programs on the web and on your machine pre-installed that you can use to create and edit code. If you're just starting out I recommend [Sublime Text](http://www.sublimetext.com) or [Atom](http://www.atom.io).
- You'll need to interact with the command line. On a Mac OSX the command line program is called Terminal. Search your applications and place this application in your dock. You'll be using it often. The [Command Line Crash Course](http://cli.learncodethehardway.org/book/) will get you on the right foot for using the command line. You'll learn all the basic filesystem commands and operations.
- You'll want to learn <a href="/resources#git" target="_blank">Git and use a git repository hosting service (such as Github or Bitbucket)</a> to track the changes to your code, back it up and revert to old code if you make a mistake. You'll also use Github or Bitbucket to collaborate with your team. When you have issues with your code you can give the link to your code's repository so others can see it.
- Create a <a href="https://stackoverflow.com" target="_blank">Stackoverflow</a> account. Stack Overflow is an online community for programmers to learn, share their knowledge and help others solve problems. Anytime you search online for a programming issue you'll most likely find results from Stack Overflow. Sometimes you won't find an answer. That's when you post your question to Stack Overflow.
- Create a <a href="https://trello.com" target="_blank">Trello</a> account. This one is optional but I use it to create and track my notes about almost everything-- from my to-do lists to key notes about a programming language. Or use Git and Github. Or use the Terminal and create and edit files.

<h3>Learn the Fundamentals of the Language and OOP</h3>

<p>Start learning the language and keep the fundamentals below in mind. When you're confident you know everything start building your own programs or the examples in the next section. If you find that you don't understand something go back to your resource and clarify or search online.
</p>

<p> Understand and practice with the following components:
<ol>
  <li>Data types and the operations that can be performed on them</li>
  <li>Expressions, statements and syntax</li>
  <li>Iterations</li>
  <li>Functions</li>
  <li>Classes</li>
  <li>OOP- encapsulation, composition, inheritance, delegation and polymorphism</li>
  <li>Design patterns</li>
  <li>Error/exception handling</li>
</ol>
</p>

<p>There are plenty of websites to <a href="/resources#practice">practice your language and improve your programming skills by solving problems</a>. These websites are excellent ways to learn the fundamentals listed above.</p>

<h3>Start Building Small Programs</h3>

<p>Use what you have learned so far to start developing small programs. Here are some sample projects to get you started with, each getting more advanced than the previous:
<ul>
  <li>Dice rolling simulator- a user `rolls` one or two dies. The program should print the result of the roll. Challenge yourself to build a game with the logic.</li>
  <li>Number guessing game- a user guesses a random number between 1-100. The user keeps guessing until they guess correctly.</li>
  <li>Blackjack game- implement a full blackjack game.</li>
  <li>Hangman- implement the classical hangman game.</li>
  <li>Calculator- a user enters numbers and operates on those numbers. The result should be printed to the screen.</li>
  <li>Address book- a user follows on screen prompts about a person's name, address and phone number. The program saves it to a .json or .txt file</li>
  <li>Create your own program.</li>
</ul>
</p>

<h3>Start Building Larger Programs</h3>

At this point you should feel confident with the language and OOP. If you want to build something bigger you're going to need to learn a few other things.

<ul>
  <li>If you need to store data you'll need to learn <a href="/resources#db" target="_blank">SQL databases</a> and if you're using Python, <a href="/resources#db" target="_blank">SQLAlchemy</a>.</li>
  <li>If you need to build a user interface you'll need to learn a frontend language.</li>
  <li>If you want to do mobile:
    <ul>
    <li>for iOS you'll want to learn Swift or Objective-C</li>
    <li>for Android you'll want to learn Java (Java can be used on the frontend and backend)</li>
    </ul>
  </li>
  <li>If you want to do web:
    <ul>
      <li>you'll want to learn the basics-- <a href="/resources#frontend" target="_blank">CSS, HTML and Javascript</a>.</li>
    </ul>
  </li>

<h3>Deployment</h3>

You've built an application you want to deploy to the world, now what? Deployment is a whole other level, but there are <a href="/resources#deployment" target="_blank">deployment resources that I've used that make it a little easier to learn and use</a>.

<h3>Summary</h3>

<p>
It's important you first understand the fundamentals of computer science, object-oriented programming, and the language itself before you start building applications. When I first started I tried doing it the other way around and that didn't work well.</p>

<p>Next practice your skills by using the recommended websites and building small programs on your own computer. Once you fill comfortable with the fundamentals it's time to take the next step on learning new languages and implementations. When you have tested your application and you're ready to publish it to the world it's time to deploy it.</p>

<p>That's it for now. I'll be adding to this guideline often so I encourage you to check back often. <b>If you have any advice, comments or find any issues in this guideline please let me know below</b>. Thank you!</p>

{% include footer.html %}
