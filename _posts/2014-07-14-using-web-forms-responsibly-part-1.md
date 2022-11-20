---
title: "Using Web Forms Responsibly (Part 1)"
date: "2014-07-14"
categories: 
  - "development"
tags: 
  - "net"
  - "asp-net"
  - "web-forms"
---

I am not a huge fan of ASP.NET Web Forms.

I learned to use Web Forms at the same time that I was learning how to write web applications. As a result, I had trouble untangling the differences between the traditional aspects of developing a web application on any platform and the peculiarities specific to the world of ASP.NET Web Forms. As far as I could tell, the [Page Lifecycle](http://msdn.microsoft.com/en-us/library/ms178472(v=vs.85).aspx) was a part of every page in every web application. Dragging and dropping Web Server Controls was how the web was constructed. Skins and themes were the way the web was styled.

I was trying to gather an understanding of web development using an abstraction of web development as my guide.

So I did stupid things. Once, when I needed to bring the user from one page to another, I ended up with this:

```markup
<asp:LinkButton runat="server" PostBackUrl="~/About.aspx" Text="About Us" />
```

Which generates this mess:

```markup
<a href='javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$MainContent$ctl00", "", false, "", "About.aspx", false, true))'>About Us</a>
```

Of course, if I had just realized that ASP.NET Web Forms sits in the same exact realm as the basic HTML websites I cobbled together in high school, I would have remembered this neat trick for bringing the user to another page:

```markup
<a href="About.aspx">About Us</a>
```

Over time, I started to learn more about web development, exploring principles like [separation of concerns](http://en.wikipedia.org/wiki/Separation_of_concerns) and [progressive enhancement](http://en.wikipedia.org/wiki/Progressive_enhancement). Little by little, the landscape of web development shifted into focus and I saw what Web Forms really was: an abstraction on top of the web to make developing a web application feel like developing a stateful desktop application.

There was no secret magic here: Server Controls just generated plain old (ugly) HTML, state was "persisted" through hidden form inputs, events were "fired" via JavaScript postbacks.

I felt like ASP.NET Web Forms had been lying to me.

So I rebelled, throwing away all of the Web Server Controls except the ones that I felt I could control. Instead of embracing the ASP.NET Web Forms approach to things, I actively fought against it:

```markup
<asp:Literal runat="server" ID="userTable"></asp:Literal>
```

```csharp
userTable.Text = "<table>" +
   "<thead>" +
      "<tr>" +
         "<th>" +
            // ...and so on
```

I thought I was regaining control, doing it "right" by meticulously hand-writing each angle bracket. The result was clean, semantic HTML with a clear separation between the responsibilities of HTML, CSS, and JavaScript on my pages. My pages were accessible and standards-compliant. I felt I had gotten something over on everyone else who unknowingly slopped together pages with those bulky Web Server Controls.

But what I didn't understand were the negative side effects of my cowboy coding: forging ahead with my own enterprising approach to doing things meant that I couldn't build on top of the hard work that had already been done. I ended up with a code base that no one else could easily pick up and understand. A stack of reinvented wheels.

Nowadays, I mostly work with ASP.NET MVC applications. I am much happier. But, we still have older Web Forms applications that need love and care and new features. Instead of struggling against Web Forms, I have learned to embrace the platform for what it does well: there is a freedom in not worrying about state, there is a familiarity in treating the complexity of the web as a set of simple Web Controls, there is a power in the data-binding features of those Controls. Of course, ASP.NET Web Forms has its drawbacks: left unchecked, applications built with Web Forms can easily spiral into slow, bloated heaps of sprawling View States and erratic page refreshes.

There is a balance here: embrace the strong characteristics of ASP.NET Web Forms and control the weaker ones. Over the next few posts, I'll discuss how I find this balance.
