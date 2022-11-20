---
layout: blog
title: "The Stories Our Systems Tell"
categories: Essays
redirect_from: /blog/1460/the-stories-our-systems-tell/
---

_This is a post based on a talk I gave at [HighEdWeb 2016](https://2016reg.highedweb.org/psessions/detail/b11b1f29-cec2-4e85-aa11-d66419d7dd41). View the [slides](https://speakerdeck.com/loganfranken/inside-the-black-box-open-source-and-higher-education-systems)._

I work in the [Office of Financial Aid and Scholarships](http://www.finaid.ucsb.edu/) at the [University of California, Santa Barbara](http://www.ucsb.edu/) as a developer.

Over the past few years, I started to notice something:

**When I worked on side projects at home, I was awash in a sea of open-source tools, libraries, frameworks, utilities, and more.**

One time I wanted to quickly stand up a command line interface for a utility I was creating; [meow](https://www.npmjs.com/package/meow) made that easy. Another time I wanted to generate Excel spreadsheets in a Node.js application I was writing; piece of cake with [node-xslx](https://www.npmjs.com/package/node-xlsx). A gulp task for checking out files from TFS? Sure, that's [gulp-tfs-checkout](https://www.npmjs.com/package/gulp-tfs-checkout).

**But at work, in the world of higher education financial aid, it was a different story:**

Open-source libraries for parsing and manipulating the [Institutional Student Information Record (ISIR)](https://ifap.ed.gov/ifap/byAwardYear.jsp?type=isirguide)? Nothing.

How about the [Common Record](https://ifap.ed.gov/codtechref/attachments/1112CODTechRefVol2Sec3CommonRecordLayout.pdf)? Nope.

And this sparse landscape extended beyond financial aid too:

Anything for the [Test of English as a Foreign Language (TOEFL) score report](https://www.ets.org/s/toefl/pdf/toefl_osr_layout_sept14.pdf)? Nope. Maybe [ACT](https://www.act.org/content/dam/act/unsecured/documents/ACT-College-ElectronicStudentRecordLayout_15-16.pdf)? Sorry. [SAT](https://collegereadiness.collegeboard.org/pdf/data-layout-sat-subject-tests-electronic-score-report-higher-ed.pdf)? Nothing.

After searching around in vain, I concluded: **[there is no open-source higher education ecosystem](https://www.loganfranken.com/blog/1375/there-is-no-open-source-higher-education-ecosystem/)**.

![There is No Open Source Higher Education Ecosystem](/blog/images/black_box_01.png)

## A Desert

Of course, **I knew there were _some_ open-source higher education projects out there**. In fact, working on the [UCLA Mobile Web Framework](https://github.com/ucla/mwf), a major open-source project for creating higher education mobile device experience websites, was one of my first experiences working in open-source.

[![Screenshot of UCLA Mobile Web Framework website](/blog/images/black_box_02.png)](http://mwf.ucla.edu/)

However, these projects are few and far between.

But why?

**We all know the benefits of open-source:** by throwing our code out there, we can enlist the world in making our code better. With **more hands on the code**, we have more contributors to our codebase. With **more eyes on the code**, we can better identify and address bugs and areas for enhancement.

And, of course: **it's free**.

Having said that, **open-source does have its drawbacks too**:

The biggest drawback for many people: **security**. By publishing our code to the world, we publish our security vulnerabilities to the world as well.

And the bigger issue: **maintenance**. By open-sourcing, we are committing ourselves to long-term, public maintenance of a project. If we want the world to contribute, we also must be willing to dedicate the time and resources when the world is asking us for help with bugs, to review changes they have made, to field their suggestions for enhancements, and so on.

Still, given these benefits and drawbacks, wouldn't it make sense for universities to choose **small, useful** projects and open-source those? Universities could still reap the benefits of cross-institution collaboration while reducing the workload by keeping projects small, thereby reducing the risk for security vulnerabilities and effort required for maintenance.

So what's the hold up?

## The Roadblock

The major roadblock for open-source in higher education is **a false dichotomy between open-source and closed-source systems**.

Either you choose a full, comprehensive open-source solution or a full, comprehensive closed-source solution from a vendor. Either you choose [Moodle](https://moodle.org/) or you choose [Blackboard](http://www.blackboard.com/).

![Moodle and Blackboard logos](/blog/images/black_box_03.png)

So, on the flip side: if you're building an open-source higher education system, either you build a full, comprehensive open-source system that can compete with a vendor or you don't try at all.

But, as we know, this isn't true: [meow](https://www.npmjs.com/package/meow), [node-xslx](https://www.npmjs.com/package/node-xlsx), and [gulp-tfs-checkout](https://www.npmjs.com/package/gulp-tfs-checkout) aren't giant, overarching, enterprise systems.

**They are small, useful projects that do one thing really well.**

Why aren't universities sharing more small, useful projects? Why aren't governmental organizations providing open-source projects to make meeting their requirements easier? Why aren't vendors peeling off parts of their closed-source solutions and making them open-source?

## Mapping Out the Desert

I wondered if maybe universities just needed _examples_. When I'm arguing for open-sourcing small, useful projects, what exactly do I mean? Where do those projects fit in alongside closed-source solutions?

So I created a website: **[University Commons](http://www.universitycommons.io/)**. With University Commons, I wanted to create **a list of every higher education open-source project** I could find.

[![University Commons logo and title](/blog/images/black_box_04.png)](http://www.universitycommons.io/)

Now, I wasn't interested in collecting _any_ higher education open source project: **there are many useful open-source projects out there that can't be directly used by other universities**.

For example, Portland Community College has open-sourced their [front-end responsive template](https://github.com/portlandcc/pcc). In another example, Wayne State University has open-sourced their [front-end style guide](https://github.com/waynestate/styleguide).

These projects cultivate an open, collaborative ecosystem _within_ their respective universities. However, my focus was on finding projects that could cultivate an open, collaborate ecosystem _between_ universities.

Furthermore, **some universities open-source utilities that are not specific to higher education**: Biola University maintains a [Rack middleware](https://github.com/biola/turnout) for easily putting applications into maintenance mode. Of course, this would be useful in the administration of university websites, but it would also be useful for _any_ Ruby-based web application.

If I tried to include _any and every_ project that could be useful in higher education, I worried my list would become an unwieldy mess.

With all that, I settled on the **following [search criteria](http://www.universitycommons.io/about#guidelines)**:

1. **Open-Source:** The source code of the project must be publicly accessible online
2. **Related to Higher Education:** The project must be related specifically to higher education
3. **Shareable:** The project must have applicability beyond a single university or organization

## What's Out There?

At the time of this writing, University Commons contains **over 100 open-source higher education projects**.

The list ranges from large systems, like the [eduTrac Student Information System (SIS)](https://www.edutracsis.com/), to small, specific utilities, like Chapman University's [Ruby client wrapper](https://github.com/chapmanu/series25) for the CollegeNET Series25 scheduling and resource management system.

The biggest discovery during my search, however, was that, despite my [claim to the contrary](https://www.loganfranken.com/blog/1375/there-is-no-open-source-higher-education-ecosystem/), **there _is_ an open-source higher education ecosystem out there.**

There _is_ a constellation of higher education organizations, collaborating with each other, sharing code, building on top of the work of their colleagues.

They're called **libraries.**

![Libraries share code](/blog/images/black_box_05.png)

## An Oasis

Remember my examples above where I couldn't find any open-source projects that manipulate standardized file formats? (ISIR, SAT, ACT, TOEFL, etc.)

**Let's see how libraries handle this situation.**

Library of Congress defines a [MAchine-Readable Cataloging (MARC) standard](https://www.loc.gov/marc/) for how items cataloged by libraries (books, microfiche, DVDs, etc.) should be described.

Need to manipulate MARC records in your programming language of choice? Well, take your pick: there's [MARC4J](https://github.com/marc4j/marc4j) for Java, [pymarc](https://github.com/edsu/pymarc) for Python, [ruby-marc](https://github.com/ruby-marc/ruby-marc) for Ruby, [marc-record-js](https://github.com/petuomin/marc-record-js) for JavaScript, [MARC](https://github.com/danielbcorreia/MARC) for C#, and [php-marc](https://github.com/scriptotek/php-marc) for PHP.

If you don't like MARC4J for Java you can choose an alternative, [xbib MARC](https://github.com/xbib/marc). There's also a _fork_ of MARC4J, called [FreeLib-MARC4J](https://github.com/ksclarke/freelib-marc4j), adding Maven support. If you're used to programming in Groovy, NCSU Libraries has created a set of [Groovy extensions for MARC4J](https://github.com/NCSU-Libraries/groovy-marc).

Phew!

And this is just one example; beyond the MARC standard, **the higher education library open-source landscape is sprawling**:

Out of the 69 higher education organizations currently listed on the [Universities on GitHub](https://github.com/filler/universities-on-github) repository, 29 (42%) are libraries. Out of the 110 projects currently in University Commons, 61 (55%) of them are from libraries.

One of my favorite projects is University of Arizona Library's [Guide on the Side](http://code.library.arizona.edu/gots/), a tool for creating guided online tutorials through websites (like this [tour of Wikipedia](http://code.library.arizona.edu/gots-sample/tutorial/wikipedia-demo)).

[![Sreenshot of Guide on the Side](/blog/images/black_box_06.png)](http://code.library.arizona.edu/gots/)

Another favorite is [QuickSearch](https://github.com/NCSU-Libraries/quick_search) from NCSU Libraries, a toolkit for setting up a search interface for a library using the "Bento Box" approach.

Beyond projects from individual schools, there are many major open-source systems built through the collective efforts of several university libraries, including [Open Journal Systems](https://pkp.sfu.ca/ojs/), [Open Monograph Press](https://pkp.sfu.ca/omp/), [Open Harvester System](https://pkp.sfu.ca/ohs/), [Hydra](https://projecthydra.org/), [ArchivesSpace](http://archivesspace.org/), and [Blacklight](http://projectblacklight.org/).

## The Secret

How do libraries do it?

To be fair, **university libraries benefit from being part of a larger ecosystem**: libraries, in general.

Projects from libraries outside universities can be used within the university (like the impressive [UniversalViewer](https://github.com/UniversalViewer/universalviewer) project, for example).

Still, university libraries have somehow sustained a vibrant, communal open-source ecosystem within the otherwise bureaucratic, black box fog of higher education IT. How do they achieve this and how can the rest of us do it?

There's nothing specific about the projects: they are big and small, from quick scripts to large-scale platforms. They can come from one library or they can come from a consortium of libraries. The only real difference between the open-source projects from libraries and the open-source projects from the rest of higher education is the **overwhelming amount of them**.

Maybe the answer isn't in the technical details.

## The Library Story

Stepping back, the reason university libraries have succeeded in creating an open-source ecosystem within higher education makes sense: **open-source is fundamental to the library culture**.

At their core, libraries are public spaces for gathering and sharing knowledge. We go to libraries for free, open access to information, to dip into a vast well of collective thought.

Put another way: **sharing information is the _story_ of the library**. It is the narrative that weaves throughout their culture, informing how we perceive libraries and how they see themselves.

![Open-source is part of the library story](/blog/images/black_box_07.png)

And, since sharing information is the seminal story of the library, **sharing code is a natural extension of this story**: libraries share code because sharing information is what libraries do.

In return, when university libraries participate in open-source, they also _extend_ this story, telling a new chapter. The act of sharing code is an act of sharing information; **through open-source, libraries further cement their underlying narrative as one of sharing information**.

**Altogether, not only is open-source _a part of_ the library story, open-source also _continues and defines_ this story.** In other words, libraries do open-source because sharing information is core to their culture and, because they do open-source, sharing information _continues_ to be core to their culture.

## The Stories Our Systems Tell

Looking back at the rest of the higher education landscape, **what stories do we want to tell?**

Universities are spaces of higher learning. Of diverse experiences and perspectives. Of new growth, new possibilities. Of innovative, radical thinking.

![What stories are we telling?](/blog/images/black_box_08.png)

**But is this the story our systems are telling?**

Is this the story we tell when we keep our code closed behind institutional walls? When we can't find a single open-source project to manipulate common financial aid file formats? When we don't expect organizations like College Board or the Department of Education to provide components to help us consume the data they require us to consume? When we expect that many of our vendors will produce hulking, black box, closed source solutions?

Working in higher education, I always catch my colleagues and I complaining about how slowly the bureaucracy of higher education moves, how behind-the-times some of our systems can be. And, of course, it's true: anyone who works in higher education can tell you. About the never-ending RFPs, the towering hierarchies, the labyrinth approval processes, the ancient legacy systems, the constant wringing of hands over policy. **Working in higher education, a story of the lagging bureaucracy is often told to us through the culture of our organizations.**

But what's most damning is our unquestioning acceptance of it: "That's just how it is in higher education."

In that, **we continue this narrative of the lagging bureaucracy.** We tell that story.

## A New Story

Even if we are told the story of the lagging bureaucracy, this isn't the story we, working within higher education, have to continue telling.

**Through open-source, we can start telling our own stories that disrupt this narrative.**

![What stories do we want to tell?](/blog/images/black_box_09.png)

We can expect that, when we need to build higher education systems, we won't be forced to choose between expensive, black box products or an in-house solutions. We will expect a community out there, waiting to share their projects with us, inviting us to collaborate and share in return; to build better solutions for our students, faculty, and staff through the collective, dedicated efforts of a hard-working, talented network of higher education professionals.

A community that is already out there, quietly churning away behind institutional walls; a community that only needs to stop listening to the droning of bureaucracy and start speaking a new language of sharing.

A language made up of small, useful pieces of code.

Through open-source, we can tell a new story for higher education systems. **We can tell a story, like our libraries, of open collaboration and sharing.**
