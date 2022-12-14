---
layout: blog
title: "Using Web Forms Responsibly (Part 4): Watch the Outcome"
categories: Tutorials
redirect_from: /blog/579/using-web-forms-responsibly-part-4-watch-the-outcome/
---

For my final post on using ASP.NET Web Forms, I want to talk about, what I feel, is the most important aspect of wrangling Web Forms applications: **keeping an eye on the output**.

You're encouraged by the Web Forms framework to just drop Controls onto a page as if you are creating a desktop application. But a big difference is that you're not just generating boilerplate code that your desktop GUI framework will happily churn through and display: you're generating HTML, CSS, and JavaScript that will get interpreted by a variety of browsers on a variety of devices, search engine crawlers, screenreaders, and more.

There's no shame in using tools and abstractions to generate our nitty-gritty front-end (ASP.NET MVC is chock full of them), but we can't afford to think of front-end languages as some kind of compiler-generated bytecode that we can ignore.

Take this, for example:

```markup
<asp:RadioButtonList runat="server">
	<asp:ListItem>Option 1</asp:ListItem>
	<asp:ListItem>Option 2</asp:ListItem>
	<asp:ListItem>Option 3</asp:ListItem>
</asp:RadioButtonList>
```

When I run this and open it in a browser, it looks good to me. The list of radio buttons appear. They work. So I'm done, right?

Well, hold on; take a look at the resulting markup:

```markup
<table id="ctl02">
	<tr>
		<td><input id="ctl02_0" type="radio" name="ctl02" value="Option 1" /><label for="ctl02_0">Option 1</label></td>
	</tr><tr>
		<td><input id="ctl02_1" type="radio" name="ctl02" value="Option 2" /><label for="ctl02_1">Option 2</label></td>
	</tr><tr>
		<td><input id="ctl02_2" type="radio" name="ctl02" value="Option 3" /><label for="ctl02_2">Option 3</label></td>
	</tr>
</table>
```

Ouch: _a table_? This causes a whole slew of problems: we have extra markup we don't need (bloat), this supposed list of radio options will appear as a table to screenreaders (accessibility), and it's now much more difficult to style since we have to fight against any CSS applied to tables (maintenance).

A lot of these Web Server Controls were built this way to ensure their consistency across various legacy browsers. But we don't need these crutches anymore: nowadays we can start with a semantic HTML base and use CSS to get the visual look we want.

So are we out of luck here? No, not at all! With one attribute:

```markup
<asp:RadioButtonList runat="server" RepeatLayout="UnorderedList">
	<asp:ListItem>Option 1</asp:ListItem>
	<asp:ListItem>Option 2</asp:ListItem>
	<asp:ListItem>Option 3</asp:ListItem>
</asp:RadioButtonList>
```

We get:

```markup
<ul id="ctl02">
	<li><input id="ctl02_0" type="radio" name="ctl02" value="Option 1" /><label for="ctl02_0">Option 1</label></li>
	<li><input id="ctl02_1" type="radio" name="ctl02" value="Option 2" /><label for="ctl02_1">Option 2</label></li>
	<li><input id="ctl02_2" type="radio" name="ctl02" value="Option 3" /><label for="ctl02_2">Option 3</label></li>
</ul>
```

Now we have our radio buttons in a nice, semantic unordered list with minimal effort.

All of this fits in with the general theme of these posts: if we understand the strengths and weaknesses of ASP.NET Web Forms, then we can really harness the power that Web Forms offers us.

Web Forms doesn't have to be treated as a pariah or declared dead. In fact, in doing that we ostracize the myriad developers who really enjoy Web Forms. Instead, it can be an option alongside ASP.NET MVC with its own benefits, annoyances, and peculiarities.
