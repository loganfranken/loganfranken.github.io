---
title: "Thanks G.SKILL!"
date: "2015-04-07"
categories: 
  - "personal"
tags: 
  - "hardware"
  - "memory"
  - "ram"
---

![RAM use output from Windows Resource Monitor](images/ram_use.png)

I finally decided to upgrade the measly 4GB of RAM on my desktop.

I ran the [Crucial Advisor Tool](http://www.crucial.com/), bought [a set of 4GB sticks from G.SKILL](http://www.newegg.com/Product/Product.aspx?Item=N82E16820231428) that match the specifications of my [set of 2GB sticks](http://www.newegg.com/Product/Product.aspx?Item=N82E16820231277), got the sticks in the mail, _and_:

Just let them sit around for awhile.

About a month later, I finally got around to installing the RAM, booted up my machine, confirmed the new memory was recognized in BIOS, and then excitedly booted to Windows.

The Windows 7 logo started to appear, froze in place, and then the computer crashed to a black screen of death.

So that's when the Googling and frustrated experimentation started:

- Updated my BIOS to the latest version
- Tried one stick at a time
- Tried staggering the RAM differently in the four slots

And then I got desperate: resetting the CMOS via the jumper, removing and reinserting the motherboard battery, sobbing and letting my tears fall into a designated bin to protect the equipment.

## Rock Bottom

Finally realizing these sticks were not going to work, I decided I would try and return the RAM through Newegg. But I was past the 30 days for RMA and they wouldn't accept my request.

I was somehow too incompetent to install a simple pair of RAM sticks and, on top of that, had been so lazy in installing them in the first place that I missed the designated return period.

The sticks had defeated me.

Maybe I could sell them on craigslist?

## To The Rescue

With no options left, I returned to the Newegg reviews for the sticks and leafed through them, hoping there was some clue hidden in there.

While looking through the reviews, I noticed that G.SKILL kept responding to people who reported issues with their RAM, asking them to follow up with them for support or assistance in returning the product.

So I gave it a shot and e-mailed G.SKILL support. Out of fear they would give me the runaround ("Did you put in the RAM backwards? Did you ever try putting the RAM in your mouth?"), I showered them with details, giving them a play-by-play of every step I had taken, every supposed solution I had tried.

And then I addressed the elephant in the room and fessed up: I was well past the 30 day return period advertised on your website.

Far from a runaround, they sent back a response with just two questions:

One: what CPU do you have?

And two: does your motherboard support **single-sided** 4GB memory modules?

_Single-sided?_

## The Culprit

I have a motherboard that's a few years old. Of course, this makes it an ancient artifact.

I pulled up the documentation for my motherboard and found this handy table buried in the pages:

![RAM motherboard support table](images/ram.png)

Oh _yes_: 4GB modules are definitely supported but _only_ in a "DS" (double-sided) configuration.

## Back Up To Speed

I sent this back to G.SKILL support and they responded with the [exact set of double-sided sticks](http://www.newegg.com/Product/Product.aspx?Item=N82E16820231424&cm_re=gskill_424-_-20-231-424-_-Product) that I needed for my motherboard.

I filled out their RMA form, put the bad sticks back in their package and sent them off. Within a couple weeks, I was back up and running with a full 12GB of memory.

**Thanks G.SKILL!**

Lesson learned: no matter how easy you think the simple act of installing RAM will be, _double-check_ your motherboard documentation (just in case).
