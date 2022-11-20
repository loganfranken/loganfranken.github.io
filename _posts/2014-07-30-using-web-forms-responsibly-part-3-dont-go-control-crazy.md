---
layout: blog
title: "Using Web Forms Responsibly (Part 3): Don't Go Control Crazy"
categories: Tutorials
redirect_from: /blog/563/using-web-forms-responsibly-part-3-dont-go-control-crazy/
---

Say I want to link a user to my "About.aspx" page.

I could do this:

```markup
<asp:Button runat="server" Text="About" OnClick="OnClickAboutButton" />
```

With a server-side redirect:

```csharp
protected void OnClickAboutButton(object sender, EventArgs e)
{
   Response.Redirect("~/About.aspx");
}
```

Well, that does trick. A server-side event, though? That seems like a bit much. Oh wait! There's a `LinkButton` control specifically for this, right?

```markup
<asp:LinkButton runat="server" PostBackUrl="~/About.aspx">About</asp:LinkButton>
```

Which gets us this:

```markup
<a href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl02", "", false, "", "About.aspx", false, true))">About</a>
```

The JavaScript feels a little bit like overkill, though. What if we just tried a regular old `Hyperlink` control?

```markup
<asp:HyperLink runat="server" NavigateUrl="~/About.aspx">About</asp:HyperLink>
```

And our resulting HTML:

```markup
<a href="About.aspx">About</a>
```

Hey, nice! We now have a nice, simple link. Come to think of it, what if we tried:

```markup
<a href="About.aspx">About</a>
```

Which outputs:

```markup
<a href="About.aspx">About</a>
```

I'm only half-joking: just because we have access to a full toolbox of controls, do we always need to use them? Personally, I prefer to start with a **simple, semantic HTML base and enhance with controls when necessary**.

The Web Forms framework would like us to believe that the web is made up of WinForms-like controls. But the reality is that the web is an interplay between client-side and server-side logic. Once we see Web Forms as just an abstraction of that, the framework becomes even more powerful because we can really harness and direct its power.

(By the way, you might balk at my last example: "Hey, but you've lost `~/` URL resolving!" You're totally right; let's fix that:)

```markup
<a href="~/About.aspx" runat="server">About</a>
```

HTML output:

```markup
<a href="About.aspx">About</a>
```

**Update:**

In the comments below, Josh Andersen (thanks Josh!) provided yet another approach (that gets you around having to `runat="server"` altogether):

```markup
<a href="<%= ResolveUrl("~/About.aspx") %>">About</a>
```
