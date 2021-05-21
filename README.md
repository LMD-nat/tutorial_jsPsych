# JsPsych and Cognition.run Tutorial #

This repository contains some tutorial materials using JsPsych to make simple experiments for cognition and behavior in psychology.

## Introduction ##

Concordia has published some great work describing the potentials and pitfalls for moving cognition and behavioral research online when in-person lab research is not possible ([Franzen, 2021](https://www.researchgate.net/publication/348962122_Best_practice_suggestions_for_successful_online_studies)).

While this is a great thing for researchers and graduate students, there doesn't seem to be much information for undergraduate researchers on how to get started. As a result, I've noticed that lots of graduate students are expected to teach themselves to code, without prior experience. Grad students are already busy with millions of other things, while undergraduate students are itching for guidance on how to get started and learn the basics.

Programming is also pretty darn confusing for people in general, and even experienced scientists make mistakes. The point of this exercise isn't to create master programmers who previously had no experience, but instead to show people how to play with code, and how to troubleshoot when they inevitably make mistakes.

## Platforms ##

Josh de Leeuw and his team have workshops available for [moving research online](https://www.movingresearchonline.info/) in the context of the Covid-19 pandemic, but I've found their tutorials to be quite technical, and they require some knowledge of how to link your study to a database. Not every person knows how to do that, if they even have a database to link it to! So what's the point of running a study if you can't actually *collect* your data?

For the record, Concordia has a licence to use [Pavlovia](https://pavlovia.org/#about) to run online studies. Pavlovia is absolutely awesome, and you can pilot studies on it for free. I could definitely give additional information to people interested on running experiments on Pavlovia, because it's not quite as simple to use as Cognition. You'd need a few extra plugins, some html code, and some css code, for example. 

### [Cogniton.run](https://www.cognition.run/) ###

A free service designed specifically for hosting jsPsych experiments, with an easy-to-use interface. Absolutely perfect for beginners. You only need some JavaScript code.


### [jsPsych](https://www.jspsych.org/) ###

An awesome JavaScript library for running behavioral experiments in a web browser. The library provides a flexible framework for building a wide range of laboratory-like experiments that can be run online.

### Do participants need to download software to learn? ###

Nope, you just need a browser to learn for this specific tutorial. If you want to learn more afterwards, I can point you in the right direction.


## What are we building? ##

We're going to build four small experiments, and then one big experiment with all four tasks together. 

1. A questionnaire :question:
2. A bilingualism task :speech_balloon:
3. A theory of mind task :thought_balloon:
4. A decision-making task :1234:

Then all together, they'll make for a neat experiment on cognition. We can even look later to see if the questionnaire data we collect is at all correlated to how well people perform on the tasks. 


