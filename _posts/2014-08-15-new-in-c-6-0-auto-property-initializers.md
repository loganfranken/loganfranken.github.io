---
layout: blog
title: "New in C# 6.0: Auto-Property Initializers"
categories: Tutorials
redirect_from: /blog/586/new-in-c-6-0-auto-property-initializers/
---

**C# 6.0** is coming and there are [a lot of exciting new features](https://roslyn.codeplex.com/wikipage?title=Language%20Feature%20Status&referringTitle=Documentation) on the way.

One of these exciting new features is **auto-property initializers**: basically, you can set the default value of a property directly next to the property. Check it out:

```csharp
public class Game
{
    public int DifficultyLevel { get; set; } = 6;
}
```

On top of that, we also get **"getter-only" auto properties**:

```csharp
public class Book
{
    public string Name { get; } = "Generic Book";
}
```

The big win here for me is being able to initialize collections from the auto property declaration:

```csharp
public class User
{
    public List<Role> Roles { get; } = new List<Role>();
}
```
