---
layout: blog
title: "Watch Your Rounding in .NET"
categories: Tutorials
redirect_from: /blog/424/watch-your-rounding/
---

While working on the [Financial Aid Estimator project](https://github.com/ucsbfinaid/Financial-Aid-Estimator-.NET/), which involves a number of calculations, I noticed that I would sometimes receive slightly inaccurate results: an "Asset Contribution" total, for example, might be off by a dollar or two.

I was confused: all of the formulas in the code were correct. And then I noticed something:

```csharp
Math.Round(3.5); // Equals 4
Math.Round(4.5); // Equals 4
```

Intuitively, I expected `3.5` to round to `4` and `4.5` to round to `5`. Apparently, this behavior is expected: by default, the .NET framework uses the [`ToEven`](http://msdn.microsoft.com/en-us/library/system.midpointrounding(v=vs.110).aspx) (also called ["Banker's Rounding"](http://en.wikipedia.org/wiki/Rounding#Round_half_to_even)) approach to rounding, where the nearest even number is chosen when a number is between two integers.

You can modify this behavior by explicitly specifying the midpoint rounding behavior:

```csharp
Math.Round(3.5, MidpointRounding.AwayFromZero); // Equals 4
Math.Round(4.5, MidpointRounding.AwayFromZero); // Equals 5
```

As explained in a [Stack Overflow answer](http://stackoverflow.com/a/6562018/74053), this method is actually part of the [IEEE 754 standard](http://en.wikipedia.org/wiki/IEEE_754-2008#Roundings_to_nearest).
