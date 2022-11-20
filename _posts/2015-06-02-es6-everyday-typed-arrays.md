---
layout: blog
title: "ES6 Everyday: Typed Arrays"
categories: Tutorials
redirect_from: /blog/904/es6-everyday-typed-arrays
---

**"Typed arrays"** provide an efficient method for accessing and manipulating data. The motivation behind this is to provide a construct to handle all of the raw binary data that will start flowing into JavaScript (audio data, video data, etc.).

"Typed arrays" actually encompasses two separate classes: **`ArrayBuffer`** and **`DataView`**.

The `ArrayBuffer` contains our data and the `DataView` provides a custom view into this data.

First, let's create a buffer 8 bytes long:

```javascript
var buffer = new ArrayBuffer(8);
console.log(buffer.byteLength); // 8
```

Now let's create a `DataView` to manipulate the data within our buffer:

```javascript
var buffer = new ArrayBuffer(8);

var view = new DataView(buffer);
view.setInt8(0, 3);

console.log(view.getInt8(0)); // 3
```

You'll notice here that we were pretty specific: we used `setInt8` to put the value "3" in the 0-byte offset position of the `ArrayBuffer`.

Let's try something:

```javascript
var buffer = new ArrayBuffer(8);

var view = new DataView(buffer);
view.setInt32(0, 3);

console.log(view.getInt8(0)); // 0
console.log(view.getInt8(1)); // 0
console.log(view.getInt8(2)); // 0
console.log(view.getInt8(3)); // 3

console.log(view.getInt32(0)); // 3
```

In this example, we stashed the value into our `ArrayBuffer` using `setInt32`. Since `setInt32` takes up _4 bytes_ (32 bits = 4 bytes), rather than _1 byte_ like `setInt8` (8 bits = 1 byte), our `getInt8` calls don't find the number until our offset is 4 bytes into the buffer.

Rather than creating a generic `DataView`, there are typed array view classes with more specific names that we can create and access like regular arrays:

```javascript
var buffer = new ArrayBuffer(8);

// 32-bit View
var bigView = new Int32Array(buffer);
bigView[0] = 98;
bigView[1] = 128;

for(let value of bigView)
{
  console.log(value);
  // 98
  // 128
}


// 16-bit View
var mediumView = new Int16Array(buffer);

for(let value of mediumView)
{
  console.log(value);
  // 98
  // 0
  // 128
  // 0
}

// 8-bit View
var smallView = new Int8Array(buffer);

for(let value of smallView)
{
  console.log(value);
  // 98
  // 0
  // 0
  // 0
  // -128
  // 0
  // 0
  // 0
}


// 8-bit Unsigned View
var unsignedView = new Uint8Array(buffer);

for(let value of unsignedView)
{
  console.log(value);
  // 98
  // 0
  // 0
  // 0
  // 128
  // 0
  // 0
  // 0
}
```

The example above shows how you can have several different views looking into the same `ArrayBuffer`.

You'll also notice in our third example (using `Int8Array`), our value of "128" gets flipped to a negative value. This is because our 8-bit view can't handle a number this large since it takes 8-bits to represent "128" in binary (`0b10000000`) and the extra bit is reserved for a sign. As a result, overflow occurs and we get kicked to "-128".

However, when we use `Uint8Array`, the unsigned version of `Int8Array`, we no longer care about the sign so we get a little extra room to properly represent our value.

## Resources

- [MDN: Javascript typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)
