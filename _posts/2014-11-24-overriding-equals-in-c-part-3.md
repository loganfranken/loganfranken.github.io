---
layout: blog
title: "Overriding Equals in C# (Part 3)"
categories: Tutorials
redirect_from: /blog/698/overriding-equals-in-c-part-3/
---

This post is **part three** in a series:

- [Part 1]({% post_url 2014-11-12-overriding-equals-in-c-part-1 %})
- [Part 2]({% post_url 2014-11-17-overriding-equals-in-c-part-2 %})
- Part 3

(View the [completed example](https://github.com/loganfranken/overriding-equals-in-c-sharp/blob/master/OverridingEquals/PhoneNumber.cs))

## Overriding Equality Operators

Phew, we made it: we have now successfully implemented `Equals` and `GetHashCode`.

Let's wrap things up by overriding the `==` operator.

Although `Equals` now compares objects using value equality, the `==` operator still compares objects with reference equality, leading to the following inconsistent behavior:

```csharp
PhoneNumber numberX = new PhoneNumber { AreaCode = "123", Exchange = "456", SubscriberNumber = "7890" };
PhoneNumber numberY = new PhoneNumber { AreaCode = "123", Exchange = "456", SubscriberNumber = "7890" };

numberX.Equals(numberY); // TRUE
numberX == numberY; // FALSE
```

We can fix this by overriding the `==` operator:

```csharp
public static bool operator ==(PhoneNumber numberA, PhoneNumber numberB)
{
    // Implementation
}
```

When we implement this, we need to be _very careful_ not to use `==` as we could accidentally end up calling our override method again, resulting in an endless loop. Alright, let's do this:

```csharp
public static bool operator ==(PhoneNumber numberA, PhoneNumber numberB)
{
    // Check if either of the numbers are null
    if(Object.ReferenceEquals(null, numberA) || Object.ReferenceEquals(null, numberB))
    {
        return false;
    }

    // Check if the numbers are the same number
    if(Object.ReferenceEquals(numberA, numberB))
    {
        return true;
    }

    return numberA.Equals(numberB);
}
```

Simplifying this further:

```csharp
public static bool operator ==(PhoneNumber numberA, PhoneNumber numberB)
{
    return !Object.ReferenceEquals(null, numberA)
        && !Object.ReferenceEquals(null, numberB)
        && (Object.ReferenceEquals(numberA, numberB) || numberA.Equals(numberB));
}
```

As Nathan Jackson points out (thanks Nathan!) in the comments below, this implementation leads to a situation where, if both instances are null, they will not be considered equal:

```csharp
PhoneNumber phoneNumberA = null;
PhoneNumber phoneNumberB = null;

phoneNumberA == phoneNumberB; // FALSE, even though they are both the same value (null)
```

We can address this by simplifying our implementation even further:

```csharp
public static bool operator ==(PhoneNumber numberA, PhoneNumber numberB)
{
    return (Object.ReferenceEquals(numberA, numberB) || numberA.Equals(numberB));
}
```

However, as John points out (thanks John!) in the comments below, this implementation leads to a subtle bug when we try to call `Equals` on `numberA`:

```csharp
PhoneNumber phoneNumberA = null;
PhoneNumber phoneNumberB = new PhoneNumber();

// Throws a null reference exception
if (phoneNumberA == phoneNumberB)
{
}
```

We can fix this by adjusting our solution slightly (thanks John!):

```csharp
public static bool operator ==(PhoneNumber numberA, PhoneNumber numberB)
{
    if (Object.ReferenceEquals(numberA, numberB))
    {
        return true;
    }

    // Ensure that "numberA" isn't null
    if(Object.ReferenceEquals(null, numberA))
    {
        return false;
    }

    return (numberA.Equals(numberB));
}
```

Before we can finish this up, we also need to implement the opposite _not equals_ operator (`!=`). As long as we're careful not to use `!=` in our implementation, we can simply point back to our implementation of the `==` operator:

```csharp
public static bool operator !=(PhoneNumber numberA, PhoneNumber numberB)
{
    return !(numberA == numberB);
}
```
