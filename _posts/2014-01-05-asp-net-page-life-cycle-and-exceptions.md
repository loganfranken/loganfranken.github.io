---
layout: blog
title: "ASP.NET Page Life Cycle and Exceptions"
categories: Tutorials
redirect_from: /blog/434/asp-net-page-life-cycle-and-exceptions
---

A few months ago at work, we were working with a complex ASP.NET Web Forms application built by a third-party. There were a number of performance problems with the application, a few of which we traced back to database connections that were left open. However, we noticed that there _was_ logic for closing the connections, so how were they left open?

We eventually discovered that the connections were left open after exceptions occurred in the application. The exceptions would cause the application to skip the logic for closing the connections.

So: we needed a way to ensure that these connections were closed.

On top of that, the application made use of threading, so we needed to also understand how the Page Life Cycle and exceptions interacted with threading.

## How Do Exceptions Impact Page Life Cycle?

The Master Page and Page Life Cycle occur in the following order:

```csharp
Page_PreInit fired!
MasterPage Page_Init fired!
Page_Init fired!
Page_InitComplete fired!
Page_PreLoad fired!
Page_Load fired!
MasterPage Page_Load fired!
Page_LoadComplete fired!
Page_PreRender fired!
MasterPage Page_PreRender fired!
Page_PreRenderComplete fired!
Page_SaveStateComplete fired!
MasterPage Page_Unload fired!
Page_Unload fired!
```

If an unhandled exception occurs in one of these event handlers, none of the subsequent event handlers will be called except the `Unload` event handler will always be called, even if an exception occurs (this includes exceptions from both the Page and Master Page). For example:

```csharp
Page_PreInit fired!
MasterPage Page_Init fired!
Page_Init fired!
Page_InitComplete fired!
Page_PreLoad fired!
Throwing exception in Page_Load
A first chance exception of type 'System.Exception' occurred in LifeCycleTest.dll
MasterPage Page_Unload fired!
Page_Unload fired!
```

However, the Master Page's `Unload` will not be called if the Master Page has not yet reached its `Init` event (in other words, if an exception is thrown in `Page_PreInit`).

```csharp
Throwing exception in Page Page_PreInit
A first chance exception of type 'System.Exception' occurred in LifeCycleTest.dll
Page_Unload fired!
```

## What About Exceptions In Background Threads?

If an exception is thrown from a background thread created using the `Thread` class:

```csharp
Thread thread = new Thread(ThreadWorker.ThrowException) { IsBackground = true };
thread.Start();
```

The Page events may or may not fire predictably. In my tests, the unhandled exception in this scenario usually crashes the Visual Studio debugging server. If you're actively debugging, the exception will happen over and over while the remaining page events fire.

In contrast, if an exception is thrown from a background thread using [thread pooling](http://stackoverflow.com/questions/6465517/why-unhandled-exception-in-a-background-thread-doesnt-crash-the-app-domain):

```csharp
Action a = ThreadWorker.ThrowException;
a.BeginInvoke(null, null);
```

The exception will simply silently kill the thread and the page events will fire as normal.

## What About Response.Redirect?

If a `Response.Redirect` occurs in one of the event handlers, a `ThreadAbortException` is thrown and all subsequent Page and Master Page events are not called (except for `Unload`). All of the events for the new Page fire as normal.

If you provide "false" as the second parameter for the `Response.Redirect` method (do not end the response), the events for both pages will fire as normal. "True" is the default value (which causes the exception described above).

## What About Page\_Error?

The `Page_Error` event handler is called if either the Page or Master Page throws an unhandled exception.

## What About Application\_Error?

If an unhandled exception occurs, `Application_Error` in the Global.asax fires after `Page_Error` and `Page_Unload` (for both Page and Master Page) fire. `Application_Error` did not fire in the case of a background thread exception (thread pooled or otherwise).

## What About Dispose?

In both the case of an unhandled exception and the normal Page Life Cycle, `Dispose` is called directly after Unload:

```csharp
MasterPage Page_Unload fired!
MasterPage Dipose fired!
Page_Unload fired!
Dipose fired!
```
