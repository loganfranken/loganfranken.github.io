---
layout: blog
title: "My First Hackathon"
categories: Essays
redirect_from: /blog/745/my-first-hackathon
---

This past weekend, I participated in my _first_ hackathon: ["Hack Housing"](http://www.data.gov/local/hackhousing) hosted by Zillow, a hackathon focused on using public housing data provided by the [U.S. Department of Housing and Urban Development (HUD)](http://zillowhack.hud.opendata.arcgis.com/) and other government agencies to help low-income renters and senior citizens find housing.

The event was a lot of fun: Zillow took us up to the 30th floor of a high-rise building in downtown Seattle where we could stare out at the rain-pocked water and the giant, illuminated Ferris wheel below. We ate free pizza and drank free beer.

Participants came up with some really wonderful projects, from [ZillowWheeler](https://github.com/kvsurii/ZillowWheeler), an application that provides specific information about the accessibility of various properties to those in wheelchairs, to HopCity, an application that determines the best neighborhood for you to move based on the location from which you're currently moving.

With all of these fantastic results, I was a little disappointed with [our finished product](https://github.com/HackHousing-OutOfTheBox/hack-housing-out-of-the-box).

No matter the end result, though, I learned a lot of valuable lessons I'll keep in mind for my next hackathon:

## Make One Thing

At its core, our application is based around one pretty simple idea:

> Guide property owners through the process of providing Section 8 housing using data specific to their location

In other words, a property owner could plug in the address of the property they are trying to sell and get the fair market rent values for the area, the contact information of their public housing authority, and so on. This helps increase the supply of Section 8 housing by easing the process of providing housing, thereby providing more options for those with Section 8 vouchers.

I still really love this idea: it's not very sexy, I know, but it's practical and useful.

But we also had a few other ideas along with this one:

- Account creation system to retain your progress
- Payment management system to handle payments between the government and property owners
- Map that aggregates data from a number of sources (rent trends, vacant lots, etc.) to identify areas suited to providing Section 8 housing
- Integration with a (currently nonexistent) Housing Authority tracking system to track the progress of an application
- Integration with volunteer organizations to easily provide assistance for currently inhabitable properties
- Integration with third-party property providers (like Zillow) to redirect users listing their property to our application
- API to track the progress of users within our system and integrate it within third-party applications
- API based on aggregate data harvested from our various users to enhance Section 8 housing information in third-party applications

By the end of the hackathon, we ended up with a Twitter Bootstrap prototype that had mock placeholders for all of these pieces. But the final application was stretched in so many directions that our core objective wasn't really clear.

Many of these ideas are actually wonderful _enhancements_ to the core idea, but that's exactly what they are: enhancements. We should have narrowed our focus to getting that **single, main idea across** and either tacked on these adornments if we had more time or left them as suggested additions in our presentation.

## Make Something You Can Show

While working on our project, we kept a persistent focus on the people we would be serving. Rather than focusing on putting together something flashy, we wanted to focus on creating something useful and accessible. But, in doing so, I think we went too far in the other direction and lost sight of where we were: at a hackathon.

When it came time to demo our project, it felt more like an implementation overview to upper management. It wasn't really a pitch. **There wasn't really anything to see.**

Even more damning, because there wasn't much to see, it was hard to communicate to our audience what the application actually _did_. It was a collection of very useful ideas tied together and they were all fighting with each other for the audience's attention.

In a similar vein, due to all of the disparate ideas floating around in our application, we had **trouble with branding**: our team name was "Out of the Box," so that ended up being the name of our product. Or "Affordable Housing Service" if you look at our GitHub README. Or maybe "Provide Affordable Housing" if you look at our product's splash page.

In a telling moment, one of the audience members asked at the end of our presentation: "What was the name of the application?"

## Make Something Sloppy

I knew I had to move quick. I knew that.

But, still, I couldn't help myself:

We needed to pull in Public Authority Housing contact information? Okay, so I'll create an [abstracted data access layer](https://github.com/HackHousing-OutOfTheBox/hack-housing-out-of-the-box/blob/master/HackHousingOutOfTheBox.Services/PublicHousingAuthorityInfoService.cs). That way I can easily pull the data whe-

No, Logan. _No._

Pull in that data quick and dirty with client-side JavaScript. Throw it on the page. Fix it if and when you get the sweet luxury of extra time.

Early on Saturday morning, I worked with the knowledge that I had 13 hours left in the day. That's a _ton_ of time. I mean, a _full work day_ is only 8 hours, right?

Looking back, I should have tricked myself into thinking **there was no time left** for the entire hackathon. This is for two reasons: first, of course, to help me stay on track.

Second, the most exciting part of the event was working with the rest of my team to make last-minute edits to our mock-up. I wish I would have kept up that frenetic energy the entire time.

## Keep Making

At the end of the weekend, the problem wasn't that we had bad ideas. Or that we weren't a good team. The problem was that we lost focus: we lost track of our dwindling hours, we lost sight of the immediate, accessible impact we needed to make in our frantic 3-minute pitch. **We forgot we were at a hackathon.**

I know, I know: I'm making it sound like it was a bad experience. But it wasn't. Our team made it. We made it to the end and we presented to a hundred other people, and I'm proud of that.

And, the best part: I'm more ready than ever for my next hackathon.
