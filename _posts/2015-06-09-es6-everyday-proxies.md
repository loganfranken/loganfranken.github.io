---
layout: blog
title: "ES6 Everyday: Proxies"
categories: Tutorials
redirect_from: /blog/900/es6-everyday-proxies
---

ES6 introduces a new meta-programming object called the **`Proxy`**.

First, say you have an anonymous object:

```javascript
var user = {
    name: "Logan",
    role: "Admin"
};
```

Now let's say we wanted to inject some logic when trying to access `user.name`; a `Proxy` lets us do this.

First, we create a handler:

```javascript
var handler = {
    get: function(target, name) {
        return "CLASSIFIED";
    }
};
```

In this handler, we are specifying a _trap_ for the `get` operation. In other words, whenever a `get` operation is executed, we want our handler to intercept this and inject its own logic.

Now we just create a new `Proxy` that matches the handler to our anonymous object:

```javascript
var user = {
    name: "Logan",
    role: "Admin"
};

var handler = {
    get: function(target, name) {
        return "CLASSIFIED";
    }
};

var userProxy = new Proxy(user, handler);

console.log(user.name); // "Logan"
console.log(user.role); // "Admin"

console.log(userProxy.name); // "CLASSIFIED"
console.log(userProxy.role); // "CLASSIFIED"
```

As you can see, when we try to access properties on our proxied `user` object (i.e. do a `get` operation), we get back the value from our handler, which has a trap set for the `get` operation.

Similarly, we can trap the `set` operation as well:

```javascript
var user = {
    name: "Logan",
    role: "Admin"
};

var handler = {
    set: function(target, name, value) {
        
        // Only validate "role" property
        if(name === "role") {
            
            // Only "Admin" and "User" are valid roles
            if(value != "Admin" && value != "User") {
                throw "Invalid role provided";
            }
            
            // Assign property
            target[name] = value;
            
        }
    }
};

var userProxy = new Proxy(user, handler);
userProxy.role = "Donkey"; // uncaught exception: Invalid role provided
```

There's a handy list of traps in the [MDN Proxy article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

The browser support for this is still pretty minimal (it only worked for me in the latest Firefox).

## Resources

- [MDN: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [2ality: Metaprogramming with ECMAScript 6 proxies](http://www.2ality.com/2014/12/es6-proxies.html)
