---
layout: blog
title: "Overriding Equals in C# (Part 2)"
categories: Tutorials
redirect_from: /blog/692/overriding-equals-in-c-part-2
---

This post is **part two** in a series:

- [Part 1]({% post_url 2014-11-12-overriding-equals-in-c-part-1 %})
- Part 2
- [Part 3]({% post_url 2014-11-24-overriding-equals-in-c-part-3 %})

(View the [completed example](https://github.com/loganfranken/overriding-equals-in-c-sharp/blob/master/OverridingEquals/PhoneNumber.cs))

## The Importance of GetHashCode

As soon as you polish off your `Equals` implementation, Visual Studio will start whining at you about the fact that you have _not_ overridden a method called `GetHashCode`.

So what's this business about `GetHashCode`?

Well, imagine we decide to create a directory that maps phone numbers to employees: for this example, we'll use our `PhoneNumber` class as a key in a `Dictionary`:

```csharp
Dictionary<PhoneNumber, Employee> directory = new Dictionary<PhoneNumber, Employee>();

directory.Add(
    new PhoneNumber { AreaCode = "123", Exchange = "456", SubscriberNumber = "7890" },
    new Employee { FirstName = "Gordon", LastName = "Freeman" });

directory.Add(
    new PhoneNumber { AreaCode = "111", Exchange = "222", SubscriberNumber = "3333" },
    new Employee { FirstName = "Samus", LastName = "Aran" });
```

Great, we have our directory; now let's try to pull stuff out out of it:

```csharp
Employee employee = directory[new PhoneNumber { AreaCode = "123", Exchange = "456", SubscriberNumber = "7890" }];
// Throws exception: "The given key was not present in the dictionary"
```

Whoops, that didn't work. On top of that, we can do horrifying things like this too:

```csharp
Dictionary<PhoneNumber, Employee> directory = new Dictionary<PhoneNumber, Employee>();

directory.Add(
    new PhoneNumber { AreaCode = "123", Exchange = "456", SubscriberNumber = "7890" },
    new Employee { FirstName = "Super", LastName = "Mario" });

directory.Add(
    new PhoneNumber { AreaCode = "123", Exchange = "456", SubscriberNumber = "7890" },
    new Employee { FirstName = "Princess", LastName = "Peach" });

// No duplicate key exceptions thrown!
```

So what _would_ work? Well, what if we pass in the original instance:

```csharp
Dictionary<PhoneNumber, Employee> directory = new Dictionary<PhoneNumber, Employee>();

PhoneNumber number = new PhoneNumber { AreaCode = "123", Exchange = "456", SubscriberNumber = "7890" };

directory.Add(number, new Employee { FirstName = "Super", LastName = "Mario" });

Employee employee = directory[number]; // Works!
```

As these examples demonstrate, the `Dictionary` uses `GetHashCode` to quickly pull up a set of results from the collection. Once it has this set, then it can go through each one and verify equality by using `Equals`; calling `Equals` on a small set retrieved via a hash-based search is a lot more efficient than calling `Equals` on the whole lot.

If we haven't implemented our own version of `GetHashCode`, then the default implementation of the method is used, which generates a hash specific to the _instance_ of the object itself, rather than a hash based on the _values_ within our class. To be able to properly use our `PhoneNumber` in a hash-based collections, we need the latter.

(You'll note that this is analogous to how the default, reference equality implementation of `Equals` differs from our overridden, value equality implementation above)

Now that we're convinced we need to override `GetHashCode`, let's do it:

## Overriding GetHashCode

Here's the golden rule for implementing `GetHashCode` (from [MSDN](http://msdn.microsoft.com/en-us/library/system.object.gethashcode(v=vs.110).aspx)):

> If your overridden Equals method returns true when two objects are tested for equality, your overridden GetHashCode method must return the same value for the two objects.

Based on that, we can surmise that the properties of the class used in our implementation of `Equals` should make a reappearance in our implementation of `GetHashCode`. On top of that, we know that we need to return an `int` from `GetHashCode`.

Furthermore, because `GetHashCode` will be used to find objects within hash-based collections, our implementation of `GetHashCode` should meet two other qualifications: **quick** to compute with a relatively **unique** result.

If we have an implementation of `GetHashCode` that takes a long time, then we will severely impact the performance of any hash-based collection that uses our class.

Furthermore, recall from above that hash-based collections first use `GetHashCode` to get a smaller subset of items from a collection and then look through those objects with `Equals`. If our implementation often generates similar hashes, this will cause "collisions" (essentially, similar or identical hashes crowded together) in our hash-based collections, forcing these collections to constantly rifle through a large set of results from a `GetHashCode` search.

As a first attempt, we could dust off the exclusive OR operator (`^`) and XOR together the individual hash codes of the properties we're using for equality:

```csharp
public override int GetHashCode()
{
    return AreaCode.GetHashCode() ^ Exchange.GetHashCode() ^ SubscriberNumber.GetHashCode();
}
```

But this quickly fails on the uniqueness front:

```csharp
// Two *different* phone numbers
PhoneNumber number1 = new PhoneNumber { AreaCode = "123", Exchange = "456", SubscriberNumber = "7890" };
PhoneNumber number2 = new PhoneNumber { AreaCode = "456", Exchange = "123", SubscriberNumber = "7890" };

number1.GetHashCode() == number2.GetHashCode(); // True
```

Instead of just adding together our hash numbers, what if we were to multiply our hash numbers by some value (as demonstrated in this [StackOverflow post](http://stackoverflow.com/questions/371328/why-is-it-important-to-override-gethashcode-when-equals-method-is-overridden)):

```csharp
public override int GetHashCode()
{
    int hash = 13;
    hash = (hash * 7) + AreaCode.GetHashCode();
    hash = (hash * 7) + Exchange.GetHashCode();
    hash = (hash * 7) + SubscriberNumber.GetHashCode();
    return hash;
}
```

In this implementation, we are building an increasingly random product over a series of steps, preventing the collisions we encountered before.

How did we end up with 7 and 13? Well, we were looking for _prime numbers_ as this ensures our hash will produce evenly distributed numbers as explained in this [StackOverflow post](http://stackoverflow.com/questions/1145217/why-should-hash-functions-use-a-prime-number-modulus).

Of course, this is all going to fall apart if one of our properties is null, so we should introduce some null checks:

```csharp
public override int GetHashCode()
{
    int hash = 13;
    hash = (hash * 7) + (!Object.ReferenceEquals(null, AreaCode) ? AreaCode.GetHashCode() : 0);
    hash = (hash * 7) + (!Object.ReferenceEquals(null, Exchange) ? Exchange.GetHashCode() : 0);
    hash = (hash * 7) + (!Object.ReferenceEquals(null, SubscriberNumber) ? SubscriberNumber.GetHashCode() : 0);
    return hash;
}
```

Since we are multiplying together increasingly large integers, it's likely we will cause an "overflow". An "overflow" occurs when we reach the maximum value allowed for an `int` and then attempt to add more to the `int`: the additional amount will "overflow" and we'll end up starting from the _lowest_ value for `int` and working our way backwards.

It makes the most sense when you see an example:

```csharp
// Int32.MaxValue == 2147483647
int value = 0;  // == 0
value += Int32.MaxValue; // == 2147483647
value = value + 10; // == -2147483639
```

So what? We're just looking for a random-ish number, right? If .NET wants to quietly wrap our integers around a number line, it's no big deal to us.

The catch is that you _can_ make this a hard runtime exception: in other words, you can set up your environment to throw an exception in the code sample above (here are [instructions](http://stackoverflow.com/questions/4878548/c-sharp-overflow-not-working-how-to-enable-overflow-checking) on how to do so). In these environments, our `GetHashCode` is going to bomb out.

We can prevent this by wrapping our `GetHashCode` logic in an `unchecked` block (essentially saying, yes, we know overflow will occur and that's okay):

```csharp
public override int GetHashCode()
{
    unchecked
    {
        int hash = 13;
        hash = (hash * 7) + (!Object.ReferenceEquals(null, AreaCode) ? AreaCode.GetHashCode() : 0);
        hash = (hash * 7) + (!Object.ReferenceEquals(null, Exchange) ? Exchange.GetHashCode() : 0);
        hash = (hash * 7) + (!Object.ReferenceEquals(null, SubscriberNumber) ? SubscriberNumber.GetHashCode() : 0);
        return hash;
    }
}
```

Beautiful! We have ourselves a fine `GetHashCode` implementation.

If you read over the comments in response to [Jon Skeet's implementation of GetHashCode](http://stackoverflow.com/questions/263400/what-is-the-best-algorithm-for-an-overridden-system-object-gethashcode), you'll find two suggested improvements to the hashing algorithm used above:

- Use XOR instead of addition for improved performance (see [comment](http://stackoverflow.com/questions/263400/what-is-the-best-algorithm-for-an-overridden-system-object-gethashcode#comment35577850_263416))
- Use a higher prime for the multiplier to further reduce collisions with large data sets

Taking those suggestions, we can implement a modified version of [Skeet's modified version of the FNV hashing algorithm](http://stackoverflow.com/questions/263400/what-is-the-best-algorithm-for-an-overridden-system-object-gethashcode):

```csharp
public override int GetHashCode()
{
    unchecked
    {
        // Choose large primes to avoid hashing collisions
        const int HashingBase = (int) 2166136261;
        const int HashingMultiplier = 16777619;

        int hash = HashingBase;
        hash = (hash * HashingMultiplier) ^ (!Object.ReferenceEquals(null, AreaCode) ? AreaCode.GetHashCode() : 0);
        hash = (hash * HashingMultiplier) ^ (!Object.ReferenceEquals(null, Exchange) ? Exchange.GetHashCode() : 0);
        hash = (hash * HashingMultiplier) ^ (!Object.ReferenceEquals(null, SubscriberNumber) ? SubscriberNumber.GetHashCode() : 0);
        return hash;
    }
}
```

In the next post, we'll wrap things up by overriding the `==` and `!=` operators.
