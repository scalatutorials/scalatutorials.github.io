---
layout: tour
title: "Method definition"
code: |
  def add(x:Int, y:Int):Int = {
    return x + y
  }
  println(add(42,13))
---

- In Scala methods are defined using `def`
- Methods that return a value must have an equal sign before the body of the method
- Methods that have either a return statement or are recursive must declare a return type
