---
layout: blog
title: "Why Your Web Application Can't Connect to SQL Server"
categories: Tutorials
redirect_from: /blog/1345/why-your-web-application-cant-connect-to-sql-server
---

One of the trickiest problems I encountered when I was just starting ASP.NET web development was debugging issues with my web application connecting to SQL server, _especially_ when connecting to a local instance of SQL Server.

Often the error messages related to these issues were not quite clear or ended up sending me on a wild goose chase.

To that end, here's a list of a few error messages I've often encountered and how to solve them:

## A network-related or instance-specific error occurred

> A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: Named Pipes Provider, error: 40 - Could not open a connection to SQL Server)

This is the most generic and most frustrating of the errors. There are a couple possible solutions:

First, **double-check the server name in your connection string.** In other words, let's say your connection string is the following:

```markup
Server=ServerName;Database=DatabaseName;
```

The error above can occur if something has gone wrong with the `Server=ServerName` piece. Check for the following:

- Server name is spelled correctly
- Server port number (if applicable) is correct
- Application pool account has permissions to send requests to the server

If you are connecting to a _local_ instance, this will likely be `Server=(local)`. However, it's also possible your local instance could have a different name (e.g. `(local)\SQLEXPRESS` or `(local)\MSSQLSERVER`).

Second, **ensure that the instance of SQL server has not stopped.**

You can do this by accessing the "Services" list in Windows. In Windows 10, this is simply a tab on the Task Manager:

![Top portion of the Task Manager in Windows 10, with the Services tab selected](/blog/images/debugging_sql_server_4.png)

(In earlier versions of Windows go to "Run" and enter "services.msc".)

Once you have accessed the list of Services, look for your instance of SQL server in the list (probably named `MSSQLSERVER` or `MSSQL$SQLEXPRESS`) and ensure that is "Running." If it has stopped, simply right-click the service and click "Start":

![SQL Server instance selected in list of Services with mouse hovering over option to start service](/blog/images/debugging_sql_server_1.png)

## Login failed for user ''

> Login failed for user ''.

The important bit to notice here is that there is no username displayed, which means no username is being sent to SQL Server for authentication. So, with that in mind:

First, **did you intend to send over a username and password but forgot?**

```markup
Server=ServerName;Database=DatabaseName;User Id=Username;Password=Password;
```

Second, **did you intend to use integrated security (Windows Authentication) but didn't specify that?**

```markup
Server=ServerName;Database=DatabaseName;Integrated Security=SSPI;
```

(In most cases, this is probably what you want: this setting allows your web application to use Windows Authentication to authenticate with your application pool's account)

## Cannot open database "DatabaseName" requested by the login

> Cannot open database "DatabaseName" requested by the login. The login failed. Login failed for user 'DOMAIN\\Username'.

This is another generic error with a couple solutions:

First, **double-check the database name in your connection string is spelled correctly.**

Second, **ensure your website's domain account has permissions to access the database:**

![Screenshot of SQL Server Management Studio with the users assigned to a particular database displayed](/blog/images/debugging_sql_server_2.png)

## Login failed for user 'DOMAIN\\Username'

> Login failed for user 'DOMAIN\\Username'.

This is _similar_ to the error above. The slight difference, however, is that there is no "Cannot open database" alongside this error message.

This means that your website's application pool account does not have permissions to access the database instance itself (_not_ the actual database, but the _instance_ on which the database is hosted):

![Screenshot of SQL Server Management Studio with the users assigned to a particular SQL server instance displayed](/blog/images/debugging_sql_server_3.png)
