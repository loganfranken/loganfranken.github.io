---
layout: blog
title: "Mocking DbSet Queries in EF6"
categories: Tutorials
redirect_from: /blog/517/mocking-dbset-queries-in-ef6
---

I've been working on a project that uses Entity Framework and [Moq](https://github.com/Moq/moq4). So, naturally, I ran into a situation where I wanted to mock DbSet:

```csharp
public class StudentContext : DbContext
{
   public DbSet<Student> Students { get; set; }
}
```

Hey, let's go wild and just try to mock it:

```csharp
StudentContext context = new StudentContext();
context.Students = new Mock<DbSet<Student>>().Object;

Student student = context.Students.FirstOrDefault(s => s.FirstName == "Logan");
```

When we run this, we get hit with the following exception:

``The member 'IQueryable.Provider' has not been implemented on type 'DbSet`1Proxy' which inherits from 'DbSet`1'. Test doubles for 'DbSet`1' must provide implementations of methods and properties that are used.``

Moq works by creating [fake proxies](http://www.castleproject.org/projects/dynamicproxy/) to stand in for the real implementations. While these proxies may fit the interface needs of the class, we still need to provide the actual implementation of this interface for deeper testing. Luckily, with EF6, this is [pretty straightforward](http://msdn.microsoft.com/en-us/data/dn314429.aspx#queryTest):

```csharp
StudentContext context = new StudentContext();

// Create a list of students
List<Student> list = new List<Student>
{
   new Student { FirstName = "Logan" },
   new Student { FirstName = "George" }
};
            
// Convert the IEnumerable list to an IQueryable list
IQueryable<Student> queryableList = list.AsQueryable();

// Force DbSet to return the IQueryable members of our converted list object as its data source
var mockSet = new Mock<DbSet<Student>>();
mockSet.As<IQueryable<Student>>().Setup(m => m.Provider).Returns(queryableList.Provider);
mockSet.As<IQueryable<Student>>().Setup(m => m.Expression).Returns(queryableList.Expression);
mockSet.As<IQueryable<Student>>().Setup(m => m.ElementType).Returns(queryableList.ElementType);
mockSet.As<IQueryable<Student>>().Setup(m => m.GetEnumerator()).Returns(queryableList.GetEnumerator());

context.Students = mockSet.Object;
```

All we do here is create a `List` of the data we want to query, convert it to `IQueryable` and then shove it in between the `IQueryable` members on our mocked `DbSet`.

While we're here, why don't we package this up in a nice, reusable method?

```csharp
private static DbSet<T> GetQueryableMockDbSet<T>(params T[] sourceList) where T : class
{
   var queryable = sourceList.AsQueryable();

   var dbSet = new Mock<DbSet<T>>();
   dbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
   dbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
   dbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
   dbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());

   return dbSet.Object;
}
```

Which can be used like this:

```csharp
context.Students = GetQueryableMockDbSet(
   new Student { FirstName = "Logan" },
   new Student { FirstName = "George" }
);
```

(Big thanks to Jeffrey Soper in the comments below for pointing out that my use of `param` here was not quite clear)

(Huge thanks to lsamaha in the comments below for the suggestion to use a lambda in mocking the `DbSet`'s `GetEnumerator`!)
