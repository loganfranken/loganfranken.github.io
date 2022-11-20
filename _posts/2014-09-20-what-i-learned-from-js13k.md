---
title: "What I Learned From JS13K"
date: "2014-09-20"
categories: 
  - "development"
tags: 
  - "game"
  - "javascript"
---

**[JS13K](http://js13kgames.com/)** is a competition wherein developers are challenged to create a game using primarily JavaScript (as well as HTML and CSS) with a total file size of less than 13 kilobytes. The theme of the contest was the elements (earth, water, wind, and fire).

For the contest, I created **[Elum](http://js13kgames.com/entries/elum)**, an action puzzle game where the player is required to place random elemental blocks to complete increasingly complex objectives.

Elum is rough. The pacing is too slow. The graphics are overly simplistic. The gameplay is obtuse. You have to actually refresh the webpage to restart the game. One of the block types later in the game is just solid black because I didn't have time to finish it. By all measures, Elum is a mess.

But I am happy with the result.

Whether or not Elum is actually a fun game, it's a _full, real_ game. I sat down with an idea for a game and now it actually exists: JS13K was an invaluable learning experience. Specifically, I learned one big lesson:

## Games Are Real Software Projects

From time to time, someone contacts me and tells me they have an idea for a new website. Or a new app. They have the hot idea but they just need someone to do the code part of it. What these ideas usually lack are any specifics: what exactly is the app supposed to do? Does a website like that already exist?

But when sitting down to create a game, I committed the same exact sin. I had a vague idea for a game about blocks with elemental properties that would interact with each other. But I didn't specify any of these interactions. I didn't think about what would propel the player through the game. I didn't sit down and specify any real game mechanics at all.

I just thought that if I had an exciting enough idea for a game, the rest would naturally follow.

When I sit down to build a feature in a web application, I run through a requirements process (either formally or informally): what is the point of this feature? Where will the user find this feature within the application? What state does the user or application need to be in to enable and access the feature? And so on.

It doesn't make sense for me to start working on an ill-defined feature; more often than not, if I work on a feature with poorly defined requirements, I will end up rewriting a major portion of it after discovering that the feature I implemented doesn't actually fit the customer's needs or doesn't play nicely with the other parts of application.

But, for some reason, the prospect of creating a game caused me to put on blinders: I spent most of my development time on Elum adjusting and tweaking gameplay elements that could have easily been shaken out in an early requirements process.

In the beginning, Elum was supposed to be like Tetris, where random element blocks would fall at increasing speed. However, early gameplay testing revealed that this was pointless: yes, the blocks could fall on top of each other and interact, but what was the player's objective in doing this?

To solidify this objective, I switched Elum to a more straightforward puzzle game like [The Incredible Machine](http://en.wikipedia.org/wiki/The_Incredible_Machine_(series)), where the player placed blocks in specific configurations to trigger interactions and progress through levels. But then I realized there was no way to actually win a level. So I introduced the concept of viruses that needed to be removed to move forward through levels.

However, I had trouble coming up with enough compelling puzzles given the limited interactions between blocks. So I brought back the Tetris-style action focus by having the viruses drop at random intervals, but allowing the player to place element blocks.

Further testing showed that having all of the blocks available at once was overwhelming and confusing, though, so I introduced the concept of levels or "missions" to help progressively teach gameplay concepts.

And this was only the major gameplay system: there were a hundred other things that needed a lot of tweaking throughout the development process, from the water block's overpowered "spread" mechanic that allowed it to easily fill the entire screen to an experimental feature where earth blocks could be used to build gravity-defying structures.

It should have been obvious to me as a software developer, but JS13K taught me that video games are real software projects that require the same thought and planning as any other software project. Sure, there's something undeniably silly about explicitly stating the behavior of a fire block or how a spaceship's gun upgrade should behave against a certain alien race or how wind should affect the trajectory of a hopping alligator.

But these are the requirements and features in the world of a video game. They are no different than defining more (what I would think of as) "traditional" requirements in the world of a web application, like how security roles impact navigation or the validation constraints on an upload file feature.

Defining requirements is always important to a software project, even if that software project is about killing zombies.

All in all, **JS13K** was a wonderful learning experience. I feel more ready than ever to create my first (actually _fun_) game.
