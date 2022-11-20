---
layout: blog
title: "Using Web Forms Responsibly (Part 2): Restrict Form Scope"
categories: Tutorials
redirect_from: /blog/548/using-web-forms-responsibly-part-2-restrict-form-scope
---

Let's talk about a common problem in ASP.NET Web Forms.

You start a new Web Forms project, create a Master Page, and then start creating pages off that Master Page. Everything is wonderful and then you get asked:

> Can we add a Google search engine to our website?

What's involved in adding a Google search engine to a website? Just add a form that GETs to a Google-hosted page, right? Psh, that's easy:

```markup
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <form method="get" action="http://www.google.com/search">
        <label for="query">Enter Search Query:</label>
        <input id="query" name="q" type="text" />
        <input type="submit" value="Search" />
    </form>

    <p>
        This is my new Web Forms web application!
    </p>

</asp:Content>
```

Done! We pat ourselves on the back, run our application, enter a search query, and discover: this doesn't work at all. Our Google search form ends up simply posting back to itself, going nowhere.

The reason this happens is because we have a `form` within a `form`. Hidden on our Master Page is the following:

```markup
<body>
    <form id="form1" runat="server">
    <div>
        <asp:ContentPlaceHolder ID="ContentPlaceHolder1" runat="server">
        
        </asp:ContentPlaceHolder>
    </div>
    </form>
</body>
```

Enter the Web Forms [Noid](http://en.wikipedia.org/wiki/Noid): **An all-encompassing `runat="server"` `form` element**.

This omnipresent `form` element is how the ASP.NET Web Forms sausage gets made: Web Server Controls are placed within this `form` and the state of these controls is persisted within a hidden `input` on the page called [ViewState](http://msdn.microsoft.com/en-us/library/ms972976.aspx#viewstate_topic3).

There is a certain simplistic beauty to this approach: you place everything in the page within this `form` element and Web Forms handles all of the grunt work, giving you a quasi-stateful, control-based approach to developing web applications.

The downside is that this **a serious misuse of the `form` element**: instead of the `form` tag designating an actual form within a page, the element has been hacked and twisted to become nearly synonymous with the `body` tag. This became especially troublesome when [we tried to use Web Forms with UCLA's Mobile Web Framework](https://github.com/loganfranken/MWF-ASP.NET-Web-Forms), a front-end mobile framework with the reasonable expectation that a `form` is a `form` (and not the entire page itself) and that you can write CSS based on that assumption.

So what should we do now?

One possible solution is to use some JavaScript to capture the Google search request and handle sending the request ourselves. However, another, simpler approach is to just move our plain HTML `form` out of that overbearing Web Forms `form`:

```markup
<body>
    
    <form method="get" action="http://www.google.com/search">
        <label for="query">Enter Search Query:</label>
        <input id="query" name="q" type="text" />
        <input type="submit" value="Search" />
    </form>

    <form id="form1" runat="server">
    <div>
        <asp:ContentPlaceHolder ID="ContentPlaceHolder1" runat="server">
        
        </asp:ContentPlaceHolder>
    </div>
    </form>

</body>
```

And, hey, that works just fine! Our form now successfully sends the request over to Google.

The key here is that there's nothing wrong with having _multiple_ `form`s on a page. The problem is having a `form` within another `form`.

Knowing this, we can start to peel away a little at the Web Forms abstraction: **there is no rule that says the entire page needs to be covered in a `form` element**.

Now that we're thinking about it, are we even sure that all of the Web Server Controls really _need_ to be inside a form at all?

In fact, a lot of the Web Server Controls don't, including the `Hyperlink`, `Image`, `ImageMap`, `Literal`, `Panel`, `Placeholder`, and `Table` controls. We can even manipulate these controls on the server-side using Page Lifecycle events and Web Server Control-initiated events with no trouble.

These controls in particular are free from the `form` `runat="server"` constraint because they aren't capable of sending postback events. In other words, they are simplistic controls only intended to display information to the screen.

Now that we have cleared some of the fog away from how the Web Server Controls and `form` `runat="server"` interact, how can we put this information to use?

On the ASP.NET Web Forms applications that I have worked on, I generally have a mix of static content pages and more complex, interactive pages. For the static content pages, I often don't need any Web Server Controls or at least very few. But, of course, it's a very different story for the more complex pages.

So, instead of shoving the all-encompassing `form` tag onto every page, **I don't include the `form` `runat="server"` in the MasterPage at all**. I just simply bring it onto the pages where I need it.

Following this simple approach has helped me keep the scope of that hungry `form` tag to an appropriate (and semantic and accessible) level.
