---
title: "My Second Hackathon"
date: "2015-04-05"
categories: 
  - "development"
tags: 
  - "hackathon"
---

![Opening night presentations](images/CAlbK_XUMAApGfY.jpg)

A couple weekends ago, I attended my second hackathon, **[Hack The Commute](http://hackthecommute.seattle.gov/)**, a hackathon focused on transit-related issues in Seattle.

Given some of the challenges our team faced in [my first hackathon](h/blog/745/my-first-hackathon/), I was a little nervous walking into this hackathon. In fact, I almost cancelled.

But I'm so happy that I didn't.

## The Environment

![Outside the Moz offices](images/CAp_w-1UMAAc0w0.jpg)

The hackathon was held at the beautiful [Moz offices in Seattle](http://moz.com/about/seattle).

I've visited these offices a couple times during the evening thanks to the [SeattleJS Meetup](http://www.meetup.com/seattlejs/), but the space really opens up in the light of the day: through the glass windows spanning the walls, I could see the slow turn of the Great Wheel, the waters of Elliot Bay noiselessly shifting, the surrounding streets flooding with people and then emptying in the night.

And the food was surprisingly fresh: in place of the standard issue pizzas, there were vegetable spring rolls, kale and quinoa salad, chicken tikka masala, and more. Coffee, of course.

Oh, and a keg for Sunday night during the closing presentations.

## The Structure

![Hack the Commute team working](images/CApLjf3UsAAqQw4.jpg)

The organizers of Hack the Commute took an interesting approach to idea and team formation for this event: rather than placing the emphasis on forming teams and letting teams generate the ideas, **the emphasis was placed on the ideas themselves**.

Idea generation started weeks before the event on the [Hack the Commute subreddit](http://www.reddit.com/r/hackthecommute), where the organizers primed the conversation with a list of ideas and then encouraged others to suggest their own ideas.

On the opening night of the hackathon, a variety of experts from various fields (parking, biking, [ORCA](https://www.orcacard.com/), data visualization, etc.) attended and groups of people coalesced around those experts in three short stints like some kind of civic technology speed dating.

This allowed people to get validation from experts on their ideas before heading too far down the road of implementation. Along with that, focusing on ideas avoided the awkward dance of getting a group of people in a freshly-formed team who came to the event with varied and potentially competing interests to agree upon a single idea.

During the event, many of these same experts stuck around to continue offering advice and guidance. We harangued one of the [Esri](http://www.esri.com/) specialists, Akshay Harse, with questions about ArcGIS queries for nearly two hours. And, despite me putting him through the ArcGIS equivalent of a D'Onofrian Law and Order interrogation, he was kind and enthusiastic the entire time.

Hackathons tend to emphasize the ingenuity and self-reliance of the teams competing, so I underestimated the value of having a legion of helpful, engaged experts on deck. But it made a huge difference.

## The Projects

![Hack the Commute team working](images/CAvS8Y3UMAAFEmL.jpg)

There were a [number of exciting projects](http://hackthecommute.seattle.gov/2015/03/25/hack-the-commute-recap/), many of whom had immediate usability, including [Ferry Fairy](https://github.com/FerryTime/HackTheCommute), an application that helps you determine if you can find a spot on a ferry, and [Carpool Casual](https://github.com/PaulYoum/Carpool-Casual), a carpooling app that was actually used to arrange carpools the second day of the event.

Our project, [MeterQuest](https://github.com/cromero/parkapp), was a crowdsourcing parking app that used open parking data to help users identify available parking spots. A user can click on a spot to identify an open parking spot (for which they are awarded points) and the app will ensure that it's a valid parking spot using open parking data. A subsequent user can then claim this spot or identify that the spot is already full.

## Lessons Learned

My personal goal in this hackathon was to make good on the [lessons learned](https://www.loganfranken.com/blog/745/my-first-hackathon/) in the last hackathon. And, for the most part, we did:

We **made one thing**: our app was so targeted that we ended up having extra time to add additional features (different colored markers for different types of parking spots, display the price of paid parking spots, and more).

We also **made it sloppy**: sure, the majority of the code was smushed into a single AngularJS directive, but it _worked_. Very little time was wasted trying to structure the code: we hit the ground running and kept running.

Beyond the lessons I learned from the first hackathon, we also **delegated well**: I worked on the open data integration, another team member worked on wiring up the AngularJS application, another member worked on the back-end service layer, another worked on the front-end UI design, and so on.

The biggest area where we fell short was in **making something you can show**: a good chunk of the teams placed a lot of emphasis on their branding and giving their apps a cohesive look and feel, whereas we focused more heavily on implementation, designing the UI and branding as we went along. While having a working product is important, we lost sight of the degree to which a product's visual presence communicates the utility of its implementation.

Also: we probably should have name-dropped our mascot (["Parky"](https://github.com/cromero/parkapp/commit/dd32edc09851a0c119d1e8bb2f503ec1c32a9031)).

## What's Next?

All in all, it was a wonderful experience: I had a great time, the environment was beautiful and encouraging, and I was proud of my team members and what we created.

A couple days after Hack the Commute, I heard about another hackathon coming up in just a couple weeks: [Hack for Sustainable Cities](http://www.meetup.com/Code-for-Seattle/events/221372032/).

I'm going to sit this one out, but that doesn't mean the hacking has stopped:

I've got plans to continue work on our [little app](https://github.com/cromero/parkapp) and have also teamed up with another Hack the Commute participant to work on an [app for identifying routes using Pronto bike rentals](https://github.com/muldrewd/crowdsourcing-pronto-routes).

And, of course, I'm sure I'll be at another hackathon in the short future.
