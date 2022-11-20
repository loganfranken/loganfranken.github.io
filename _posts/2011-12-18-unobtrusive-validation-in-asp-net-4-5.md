---
layout: blog
title: "Unobtrusive Validation in ASP.NET 4.5"
categories: Research
redirect_from: /blog/315/unobtrusive-validation-in-asp-net-4-5
---

While listening to the [2011 BUILD presentations](http://www.buildwindows.com/), I overheard one of the speakers talking about "unobtrusive validation" in ASP.NET 4.5 Web Forms. Well, I had to see this for myself.

Let me give you a little background: validation on the web is a tricky business. To ensure the integrity of data feeding into your web application, you definitely want to validate User input server-side, but to create a responsive experience for your User, you also want to validate the input values through client-side JavaScript. Thus, you end up writing duplicate validation code which can become a real maintenance headache.

ASP.NET Web Forms "solves" this dilemma, by allowing you to put a Validator Server Control on your page:

```markup
<asp:TextBox ID="Username" runat="server"></asp:TextBox>

<asp:RequiredFieldValidator
	ErrorMessage="Username is required!"
	ControlToValidate="Username"
	runat="server"></asp:RequiredFieldValidator>

<asp:RegularExpressionValidator
	ErrorMessage="Username can only contain letters!"
	ControlToValidate="Username"
	ValidationExpression="^[A-Za-z]+$"
	runat="server"></asp:RegularExpressionValidator>
```

These Validator Server Controls handle both the client-side and server-side validation for you. That's right: you define the validation rules in one place, and everything is taken care of for you. Neat, right? The generated markup has some inline CSS, but it's not terrible:

```markup
<input name="Username" type="text" id="Username" />

<span id="ctl02" style="color:Red;">Username is required!</span>

<span id="ctl03" style="color:Red;visibility:hidden;">Username can only contain letters</span>
```

Unfortunately, to make this all work, a mess of inline JavaScript is dumped onto your page:

```javascript
<script type="text/javascript">
//<![CDATA[
var Page_Validators =  new Array(document.getElementById("ctl02"), document.getElementById("ctl03"));
//]]>
</script>

<script type="text/javascript">
//<![CDATA[
var ctl02 = document.all ? document.all["ctl02"] : document.getElementById("ctl02");
ctl02.controltovalidate = "Username";
ctl02.errormessage = "Username is required!";
ctl02.isvalid = "False";
ctl02.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl02.initialvalue = "";
var ctl03 = document.all ? document.all["ctl03"] : document.getElementById("ctl03");
ctl03.controltovalidate = "Username";
ctl03.errormessage = "Username can only contain letters";
ctl03.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl03.validationexpression = "^[A-Za-z]+$";
//]]>
</script>

<script type="text/javascript">
//<![CDATA[

var Page_ValidationActive = false;
if (typeof(ValidatorOnLoad) == "function") {
	ValidatorOnLoad();
}

function ValidatorOnSubmit() {
	if (Page_ValidationActive) {
		return ValidatorCommonOnSubmit();
	}
	else {
		return true;
	}
}
//]]>
</script
```

_Gross._

Keep in mind that this is _in addition_ to a whole separate external script that includes all of the core validation logic. What's even going on here? Let's break it down:

1. A `Page_Validators` array is created to contain all of the validator elements on the page
2. Properties (like "errormessage" and "initialvalue") are added to those same validator elements
3. Validation is initialized (via `ValidatorOnLoad`)

So how does ASP.NET 4.5 clean things up? Instead of dumping inline JavaScript onto the page, ASP.NET 4.5 includes some new client-side scripting that piggybacks on the HTML5 custom data attributes. If you're not familiar, with HTML5 you can add arbitrary descriptive attributes to an HTML element by prefixing these custom attributes with "data-":

```markup
<span class="game" data-id="3" data-comment="Fun, but takes a long time">Monopoly</span>
<span class="game" data-id="4" data-comment="Nerve-wracking!">Jenga</span>
```

In this example we tack on "id" and "comment" attribute values to provide some additional data that we can use in our client-side scripting. ASP.NET 4.5 runs with that idea to implement a more "unobtrusive" approach to validation. Here's the generated markup in ASP.NET 4.5:

```markup
<span
	data-val-controltovalidate="Username"
	data-val-errormessage="Username is required!"
	id="RequiredFieldValidator1"
	data-val="true"
	data-val-evaluationfunction="RequiredFieldValidatorEvaluateIsValid"
	data-val-initialvalue=""
	style="visibility:hidden;">Username is required!</span>

<span
	data-val-controltovalidate="Username"
	data-val-errormessage="Username can only contain letters!"
	id="RegularExpressionValidator1"
	data-val="true"
	data-val-evaluationfunction="RegularExpressionValidatorEvaluateIsValid"
	data-val-validationexpression="^[A-Za-z]+$"
	style="visibility:hidden;">Username can only contain letters!</span>
```

As you can see, all those properties (Step 2 from earlier) have now been flipped into HTML5 custom data attributes. And the best part: no inline JavaScript!

But where did all of that inline JavaScript go? Earlier I mentioned that all of that messy inline JavaScript was in _addition_ to an external script containing the core validation script. The client-side scripting to create the `Page_Validators` array (Step 1 from before) and initialize the validation (Step 3) has been rolled up into that external script and wrapped within an anonymous function. Here's the abridged code:

```javascript
// If jQuery is available, create an anonymous function that executes immediately
if (window.jQuery) { (function ($) {

var dataValidationAttribute = "data-val"

function parse(selector) {
	// parseSpecificAttribute searches for elements with "data-val" set to "true"
	var length = parseSpecificAttribute(selector, dataValidationAttribute, Page_Validators);
	return length;
}

function loadValidators() {
	// Look at the similarities between this code and the inline code from earlier
	if (typeof (ValidatorOnLoad) === "function") {
		ValidatorOnLoad();
	}
	if (typeof (ValidatorOnSubmit) === "undefined") {
		window.ValidatorOnSubmit = function () {
			return Page_ValidationActive ? ValidatorCommonOnSubmit() : true;
		};
	}
}
		
$(function () {
	if (parse(document)) {
		loadValidators();
	}
});

} (jQuery)); }
```

Actually, believe it or not, it appears that this addition to the script has been sitting out there since ASP.NET 4.0 (look for yourself). I wonder if this feature was planned to be released at an earlier time? (Or is it a secret option nested deep somewhere?)

**UPDATE:** I was not aware that ASP.NET 4.5 is [an in-place update to ASP.NET 4.0](http://www.devproconnections.com/article/net-framework/net-framework-45-versioning-faces-problems-141160). This is likely the reason why I see the extra scripting in my ASP.NET 4.0 projects.

Either way, it's definitely a step in the right direction for ASP.NET Web Forms, and I would love to see this trend continue.

Unfortunately, I have to be a jerk here and admit that I'm not completely satisfied: I would argue that most of the validation information shouldn't be stored within the HTML at all. The validation error messages, for example, would be better stored in a separated JavaScript data structure. Right now, we've essentially replaced inline client-side script bloat with data attributes bloat.

Furthermore, it would be nice to see some integration with some of the HTML5 input validation attributes: HTML5 includes both a "pattern" attribute and a "required" attribute that perform the same function as the validators used in the examples above (in the browsers that support those attributes, of course).
