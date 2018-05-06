---
profile: true
permalink: projects/
keywords: projects, publications, programs, apps, applications
---

# Projects

## [On Point](https://www.onpoint.me/)

On Point is a geolocation-based Q&amp;A where users ask and answer nearby questions in real-time. This full-stack application used React, Redux, Node, Express, WebSockets, and PostgreSQL.

The mission behind On Point was to provide users faster valuable responses to their questions about the environment around them. I found that users often have questions about their surroundings but struggle to find reliable answers fast enough. On Point was created to connect users with questions to users answers around them.

I decided to pursue WebSockets using Socket.io and Redux to synchronize and maintain dynamic state. I was also able to consistently track a user's dynamic location at all times leveraging PostGIS so that I can provide the right users with the right information that were in a specific location.

One major technical challenge I faced was cluttered map points at scale. I decided to pursue clustering algorithms to dynamically cluster and render map points at different zoom levels efficiently. I was able to achieve this clustering in O(n) time complexity.

## [Lil' Link](http://lill.ink)

A url-shortening application similar to Bit.ly and Goo.gl. Create, store, and analyze shortened links. View trending links by following how many clicks each link receives. Easily sort and filter links by different criteria in the dashboard.

Built with React, Redux, Node, Express and PostgreSQL, Lil' Link was deployed to AWS in a short 3 days! Due to budget issues I transferred the application to Heroku.

## [Jarvis](https://github.com/keithalpichi/jarvis)

A chat app with a friendly smart assistant. Tag 'Jarvis' with a question and he will answer. No need to leave the chat to search the web for answers.

Jarvis is a full-stack web application built with Javascript (ES6), React, Node, Express, MongoDB, and Socket.io. The mission behind Jarvis was to provide users quick answers to their questions within a real-time environment without having to leave the chat room. I realized the typical chat room does not have a feature to use the internet within the chat room. Jarvis was created to combine the real-time web surfing in a chat room.</p>

## [Roadchip](https://github.com/audaciousamphibians/audaciousamphibians)

Discover new places to visit and eat on a road trip. I found drivers struggled to effectively find places to stop along their path to their destination without first having to research and organize their stops before they actually start driving. I wanted to eliminate the need for a user to do this and research, organize, and plan their road trip and stops in one application.
