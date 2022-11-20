---
layout: blog
title: "Overriding Equals in C# (Part 1)"
categories: Tutorials
redirect_from: /blog/687/overriding-equals-in-c-part-1
---

This post is **part one** in a series:

- Part 1
- [Part 2]({% post_url 2014-11-17-overriding-equals-in-c-part-2 %})
- [Part 3]({% post_url 2014-11-24-overriding-equals-in-c-part-3 %})

(View the [completed example](https://github.com/loganfranken/overriding-equals-in-c-sharp/blob/master/OverridingEquals/PhoneNumber.cs))

Hey, sometimes it's nice to go back to the basics, right?

Well, presumably the basics.

## The Set-up

Okay, so here's the scenario, you have a class that represents a phone number:

```csharp
public class PhoneNumber
{
    // First part of a phone number: (XXX) 000-0000
    public string AreaCode { get; set; }

    // Second part of a phone number: (000) XXX-0000
    public string Exchange { get; set; }

    // Third part of a phone number: (000) 000-XXXX
    public string SubscriberNumber { get; set; }
}
```

And you decide that you would like to quickly compare if one phone number is "equal" to another phone number.

## What's Equal?

Now, let's be careful with how we're defining equal here: we don't necessarily mean that it's the same exact _instance_ of a `PhoneNumber` class. In other words, we're not concerned with this case:

```csharp
PhoneNumber numberA = new PhoneNumber();
PhoneNumber numberB = numberA;

// Well, of course, it's the same exact object
numberA == numberB; // TRUE
numberA.Equals(numberB); // TRUE
```

This is **reference equality**: basically, are we referring to the same object? The `Equals` method is defined on the `System.Object` class and, by default, the `Equals` and `==` operator perform reference equality.

Later in this post, we're going to be overriding `Equals` and `==` with our own behavior, however, so you can see that depending on these two for reference equality is not always a safe bet. If we ever want to be certain that we are performing a reference equality check, we can call the following static method:

```csharp
Object.ReferenceEquals(numberA, numberB);
```

Okay, great: but what about the situation where we have two _different_ instances of a class but we still consider them equal? For example, maybe they have the same values assigned to their properties, like this:

```csharp
PhoneNumber numberC = new PhoneNumber { AreaCode = "123", Exchange = "456", SubscriberNumber = "7890" };
PhoneNumber numberD = new PhoneNumber { AreaCode = "123", Exchange = "456", SubscriberNumber = "7890" };

// Equality checks fail because these are two different objects
// But these are the *same* phone numbers as far as we're concerned
numberC == numberD; // FALSE
numberC.Equals(numberD); // FALSE
```

In this situation, we're looking for **value equality**: the notion that we'll consider two objects equal if they share the same values, regardless if they are actually the same object or not. This is the behavior that we'll want in the implementations of our `Equals` and `==` overrides.

## Overriding Equals

Alright, so let's get down to business. First, we'll define our core logic for determining equality:

```csharp
// Two PhoneNumber classes are "value equal" to each other
// if they have the same area code, exchange, and subscriber number
bool areEqual = (numberA.AreaCode == numberB.AreaCode)
    && (numberA.Exchange == numberB.Exchange)
    && (numberA.SubscriberNumber == numberB.SubscriberNumber);
```

Now let's put that logic into the actual override implementation for `Equals`:

```csharp
public override bool Equals(object value)
{
    PhoneNumber number = value as PhoneNumber;

    return (number != null)
        && (AreaCode == number.AreaCode)
        && (Exchange == number.Exchange)
        && (SubscriberNumber == number.SubscriberNumber);
}
```

As you can see, we're using the `as` keyword to cast the incoming `value` to a `PhoneNumber` and then checking if the conversion failed with a null check before proceeding with our expected value equality checks.

## Tuning Our Implementation

At this point, we've successfully overridden `Equals` with a value equality implementation. Easy, right? If we wanted, however, we could take our implementation a little bit further with a few tweaks:

First, as demonstrated in the [MSDN article](https://web.archive.org/web/20170427043825/https://msdn.microsoft.com/en-us/library/ms173147(v=vs.80).aspx), we could **check for null before casting**, failing out early if a null value has been provided:

```csharp
public override bool Equals(object value)
{
    if(value == null)
    {
        return false;
    }

    PhoneNumber number = value as PhoneNumber;

    return (number != null)
        && (AreaCode == number.AreaCode)
        && (Exchange == number.Exchange)
        && (SubscriberNumber == number.SubscriberNumber);
}
```

Also recommended in the [MSDN article](https://web.archive.org/web/20170427043825/https://msdn.microsoft.com/en-us/library/ms173147(v=vs.80).aspx), we could provide **an overloaded version of `Equals` that takes a `PhoneNumber`**, allowing us to bypass the unnecessary casting when a `PhoneNumber` is provided:

```csharp
public bool Equals(PhoneNumber number)
{
    return (number != null)
        && (AreaCode == number.AreaCode)
        && (Exchange == number.Exchange)
        && (SubscriberNumber == number.SubscriberNumber);
}
```

When generating equality members with [ReSharper](https://www.jetbrains.com/resharper/), you get an interesting result:

```csharp
public override bool Equals(object obj)
{
    if (ReferenceEquals(null, obj)) return false;
    if (ReferenceEquals(this, obj)) return true;
    if (obj.GetType() != this.GetType()) return false;
    // ...the rest of the equality implementation
}
```

The first line does a null check _without_ using the `==` operator; instead, our friend `ReferenceEquals` from above is used. The idea here is that (as you'll see below), `==` can be overridden; so, as **an added safety check we avoid using any custom implementations**.

The second line checks to see if we have, in fact, **passed in the object itself**: basically, are these objects the same object (reference equality)? Since two objects that are equal by reference equality are necessarily equal by value equality, we can avoid the trouble of matching properties.

Finally, the third line checks to see if **the types of the two objects being compared are even equal**. If they are not, then of course the two objects won't be equal to each other. This is similar to our use of `as` from before.

Taking all of this together, we have the following implementation:

```csharp
public override bool Equals(object value)
{
    // Is null?
    if(Object.ReferenceEquals(null, value))
    {
        return false;
    }

    // Is the same object?
    if (Object.ReferenceEquals(this, value))
    {
        return true;
    }

    // Is the same type?
    if (value.GetType() != this.GetType())
    {
        return false;
    }

    return IsEqual((PhoneNumber) value);
}

public bool Equals(PhoneNumber number)
{
    // Is null?
    if (Object.ReferenceEquals(null, number))
    {
        return false;
    }

    // Is the same object?
    if (Object.ReferenceEquals(this, number))
    {
        return true;
    }

    return IsEqual(number);
}

private bool IsEqual(PhoneNumber number)
{
    // A pure implementation of value equality that avoids the routine checks above
    // We use String.Equals to really drive home our fear of an improperly overridden "=="
    return String.Equals(AreaCode, number.AreaCode)
        && String.Equals(Exchange, number.Exchange)
        && String.Equals(SubscriberNumber, number.SubscriberNumber);
}
```

(Thanks to Riaan Du Plessis and John in the comments below for correcting a couple very serious errors in the example above!)

Of course, if we're not as concerned with performance, we can simplify this implementation a great deal:

```csharp
public override bool Equals(object value)
{
    PhoneNumber number = value as PhoneNumber;

    return !Object.ReferenceEquals(null, number)
        && String.Equals(AreaCode, number.AreaCode)
        && String.Equals(Exchange, number.Exchange)
        && String.Equals(SubscriberNumber, number.SubscriberNumber);
}
```

In this case, we leave out the overloaded method, let `as` handle the null and type checking, and just go through the motions of value equality checking even if it's the same instance of the class. We still keep `Object.ReferenceEquals` and `String.Equals` from above as additional safety measures, however.

(Check out the comment below by John for another great approach to implementing `Equals()`)

In the next post, we'll talk about the next step: implementing `GetHashCode`.
