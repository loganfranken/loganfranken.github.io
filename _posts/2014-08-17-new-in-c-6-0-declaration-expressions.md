---
layout: blog
title: "New in C# 6.0: Declaration Expressions"
categories: Tutorials
redirect_from: /blog/589/new-in-c-6-0-declaration-expressions
---

When attempting to parse and validate input, one approach is to reactively catch exceptions:

```csharp
int productId;

try
{
    productId = Int32.Parse(rawProductId);
}
catch (Exception)
{
    throw new Exception("Invalid product ID provided");
}
```

However, .NET offers a variety of `TryParse` methods to make this process cleaner:

```csharp
int productId;

if (Int32.TryParse(rawProductId, out productId))
{
    // Product ID is valid
}
else
{
    throw new Exception("Invalid product ID provided");
}
```

In **C# 6.0**, this becomes even easier, with the ability to declare local variables directly within an expression (in this case, the method call):

```csharp
if (Int32.TryParse(rawProductId, out int productId))
{
    // Product ID is valid
}
else
{
    throw new Exception("Invalid product ID provided");
}
```

It's important to note, however, that this local variable will remain within its scope, so the following will _not_ work:

```csharp
if (!Int32.TryParse(rawProductId, out int productId))
{
    throw new Exception("Invalid product ID provided");
}

// Can't access local variable "productId" out here
Console.WriteLine(productId);
```

Of course, there's no reason this has to be restricted to only parsing situations:

```csharp
if ((User user = UserService.GetUser(userId)) != null)
{
    // Valid User has been found
}
else
{
    throw new Exception("User could not be found");
}
```
