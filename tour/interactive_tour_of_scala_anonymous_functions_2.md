---
layout: tour
title: "Anonymous Functions 2"
code: |
  def add1(x:Int, y:Int) = x + y //method
  val add2 = (x:Int, y:Int) => x + y //anonymous function
  val add3:(Int,Int)=>Int = _ + _ //alternate way
  val add4 = (_ + _):((Int,Int)=>Int) //alternate way, rare

  println(add1(42,13))
  println(add2(42,13))
  println(add3(42,13))
  println(add4(42,13))
---

- The first example is a method definition as we've seen before
- The second, is like the previous slide, only assigned to a val, this is very, very roughly like the difference between

  ```javascript
  function foo(x, y) {
      return x + y;
  }
  ```

  and

  ```javascript
  var foo = function(x, y) {
      return x + y;
  }
  ```
  in JavaScript.
- The third, was briefly demonstrated in the previous slide, uses the shorter `_` placeholder syntax. However the usage on the left is rare in Scala, the `_` notation for anonymous functions is mostly useful when passing them as parameter to higher order functions (functions that receive or return other functions)
