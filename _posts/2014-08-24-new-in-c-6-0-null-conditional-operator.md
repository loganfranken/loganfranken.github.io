---
layout: blog
title: "New in C# 6.0: Null-Conditional Operator"
categories: Tutorials
redirect_from: /blog/594/new-in-c-6-0-null-conditional-operator/
---

Null checking can get real annoying real quick:

```csharp
if (HttpContext.Current != null && HttpContext.Current.Session != null && HttpContext.Current.Session["UserId"] != null)
{
    return Int32.Parse(HttpContext.Current.Session["UserId"].ToString());
}
else
{
    return 0;
}
```

Thankfully, [C# 6.0](https://roslyn.codeplex.com/wikipage?title=Language%20Feature%20Status&referringTitle=Documentation) introduces **null-conditional operators**, which allow us to transform this:

```csharp
User user = GetUser();

string username;

if(user == null)
{
    // I know this is redundant, just go with me for example's sake
    username = null;
}
else
{
    username = user.Username;
}
```

Into this:

```csharp
User user = GetUser();
string username = user?.Username;
```

With the null-coalescing (`??`) operator, we can even provide a default value in the same line:

```csharp
User user = GetUser();
string username = user?.Username ?? String.Empty;
```

Rewriting our messy example above:

```csharp
public static int GetUserId()
{
    return Int32.Parse(HttpContext.Current?.Session?["UserId"].ToString() ?? "0");
}
```

That looks nice, but why don't we use a [declaration expression](http://www.loganfranken.com/blog/589/new-in-c-6-0-declaration-expressions/) to get rid of that nasty string literal:

```csharp
public static int GetUserId()
{
    Int32.TryParse(HttpContext.Current?.Session?["UserId"].ToString(), out int result = 0);
    return result;
}
```

_Ahhh_, how beautiful.
