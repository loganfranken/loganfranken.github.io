---
layout: blog
title: "Developing a Web Application Locally with IIS7 and Web Developer Express"
categories: Tutorials
redirect_from: /blog/284/developing-a-web-application-locally-with-iis7-and-web-developer-express/
---

This post will guide you through developing a web application locally with IIS7 and Web Developer Express.

## 1\. Install IIS7

Of course, the first thing we'll need to do is [install Internet Information Services (IIS)](http://learn.iis.net/page.aspx/28/installing-iis-on-windows-vista-and-windows-7/). IIS will be the web server that hosts our web application.

## 2\. Install Visual Web Developer 2010 Express

Next, we'll [install Visual Web Developer 2010 Express](http://www.microsoft.com/visualstudio/en-us/products/2010-editions/visual-web-developer-express), the free integrated development environment (IDE) that we'll use to build our web application.

## 3\. Create the Web Application

Open up Visual Web Developer and select "File" > "New Project...". For this tutorial, create a new project with the "ASP.NET Empty Web Application" template under "Visual C#" > "Web" (or "Visual Basic" > "Web", if you prefer Visual Basic):

![Creating a new web application project in Visual Studio](/blog/images/localweb_screen1.png "Local IIS Development: Screenshot 1")

Let's create a page so we have something to look at when we debug our web application. Go to "Project" > "Add New Item...", choose "Web Form", and name it "Default.aspx":

![Adding a Default.aspx to the project](/blog/images/localweb_screen2.png "Local IIS Development: Screenshot 2")

Add a little text to the page (right between the body tags):

```markup
<body>
	<form id="form1" runat="server">
	<div>
		Welcome to my website!
	</div>
	</form>
</body>
```

If you want, you can actually stop at this point. Visual Web Developer contains a built-in server that you can use right away. Just click the green arrow at the top (or press "F5") and your default web browser should pop open, displaying your new web application. However, often times you'll want your local development environment to closely match the environment of your actual web application. In other words, if your web application will be hosted on Apache, you'll want the local web application running on Apache (using something like [WampServer](http://www.wampserver.com/en/)). For our purposes, if our web application's going to be running on IIS, we should host our local web application on IIS.

Before we move onto the next step, make sure you build your web application (go to "Debug" > "Build {Your Project's Name}").

## 4\. Create a Local DNS Mapping

Let's create a local DNS mapping so we can access our local web application through a friendly URL. Open up your hosts file (located in %systemroot%\\system32\\drivers\\etc\\) and add a line like the following:

```markup
127.0.0.1	example.local
```

This will redirect all requests to "example.local" back to our local IIS. I like to use "local" as the top-level domain for all of my local websites, but you can use whatever hostname you want here: "examplewebsite.com," "mywebsite.local," or "example.sandwich."

## 5\. Add a Website in IIS

Alright, we're almost there, now let's get our web application hosted! Open IIS Manager, right-click the "Sites" node in the left-hand menu and select "Add Web Site...":

![Adding a new website in IIS Manager](/blog/images/localweb_screen3.png "Local IIS Development: Screenshot 3")

For simplicity, use the hostname you chose in Step 4 as your "Site name" and provide that value under the "Host name" field as well. Finally, in the "Physical path" field, provide the directory containing the "Default.aspx" file you created in Step 3:

![Configuring the new website in IIS Manager](/blog/images/localweb_screen4.png "Local IIS Development: Screenshot 4")

## 6\. Test Your Web Application

Alright, now let's test our handiwork. Pop open a browser and navigate to your web application (using the hostname you provided in Step 4). If everything's working, you should see your Default.aspx page. Congratulations!

## 7\. Debug Your Web Application

The real power of locally developing a web application in IIS comes with debugging your web application's code right from Visual Studio. Head back into Visual Web Developer, open "Solution Explorer" (go to "View" > "Other Windows" > "Solution Explorer"), and open the "Default.aspx.cs" page (you may need to expand "Default.aspx" to find it):

![The Solution Explorer in Visual Web Developer Express](/blog/images/localweb_screen5.png "Local IIS Development: Screenshot 5")

Add the following code to the Page\_Load method:

```csharp
protected void Page_Load(object sender, EventArgs e)
{
	string rawUrl = Request.RawUrl;
}
```

Add a breakpoint (by clicking in the left sidebar alongside the code) on the closing brace of the Page\_Load method:

![Adding a breakpoint](/blog/images/localweb_screen6.png "Local IIS Development: Screenshot 6")

Now go back into "Solution Explorer", right-click the root node of your web application, and select "Properties". This will open the settings screen for your web application. Select the "Web" tab on the left-hand menu and find the "Use Local IIS Web Server" option (under "Servers"). Select this option and provide your web application's URL in the "Project URL" field:

![Setting up debugging for local IIS](/blog/images/localweb_screen7.png "Local IIS Development: Screenshot 7")

Now try pressing the green arrow at the top or F5 to start debugging. Your web browser should fly open and Visual Studio will display the "Default.aspx.cs" file, stopping at your breakpoint. Awesome, now you've got a web application running on your local IIS _and_ you're debugging that same web application right within Visual Web Developer Express!
