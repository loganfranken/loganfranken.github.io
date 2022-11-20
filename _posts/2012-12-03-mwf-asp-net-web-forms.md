---
layout: blog
title: "MWF ASP.NET Web Forms"
categories: Projects
redirect_from: /blog/358/mwf-asp-net-web-forms/ 
---

In the 1.3 release of the [UCLA Mobile Web Framework](http://mwf.ucla.edu/), the [Forms API](http://mwf.ucla.edu/framework13/doc/index.php?p=entity/form) was introduced, providing an easy mechanism for styling forms for display on a mobile device.

The CSS rules for the Forms API, however, were attached directly to the `form` element. In other words, you can simply add a `form` element to your MWF page:

```markup
<form>
	<h1>Sign-up</h1>
	<label>
		<span>Username</span>
		<input type="text" name="username" />
	</label>
	<input class="primary" type="submit" value="Sign-up"/>
</form>
```

And the MWF Forms API will apply styling directly to this element. This is desired behavior in most cases. However, the ASP.NET Web Forms model, in an effort to simulate a stateful Windows Form, requires wrapping many Server Controls in a `form` element like so:

```markup
<form runat="server">
	<!-- Placing this button outside of the form element causes an exception -->
	<asp:Button runat="server" ID="btnAddItem" Text="Add Item" OnClick="OnClickAddItem" />
</form>
```

On top of this, the default Web Forms templates in Visual Studio encourage wrapping the _entire_ page in an all-encompassing `form` element by dropping the following into the MasterPage:

```markup
<body>
	<form runat="server">
	<!-- Page Contents -->
	</form>
</body>
```

However, because the MWF CSS expects that only the traditional form elements will be within a `form` element on the page, the wrapping `form` element causes [a number of styling errors](https://github.com/ucla/mwf/issues/158).

This is a problem that is not likely to go away because it would require adding an API-breaking change to MWF to merely suit the needs of the (arguably misguided) ASP.NET Web Forms model.

## Introducing MWF ASP.NET Web Forms

There are two main solutions to this problem:

- **Hack the CSS** to fix any styling errors
- **Restructure your page** to only use the `form` element when necessary

The good news here is that I've [created a repository](https://github.com/loganfranken/MWF-ASP.NET-Web-Forms) that covers both of these solutions. More specifically, the repository includes:

- **Override stylesheets** to correct the styling errors
- **General guidelines** for restructuring ASP.NET Web Forms pages

Instructions for installing and applying the styles are [listed in the README](https://github.com/loganfranken/MWF-ASP.NET-Web-Forms). Let me know what you think!
