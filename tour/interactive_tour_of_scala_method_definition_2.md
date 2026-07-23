---
layout: tour
title: "Method definition 2"
code: |
  def add(x:Int, y:Int) = { //result type is inferred
    x + y //"return" keyword is optional
  }
  println(add(42,13))
---

- `return` keyword is optional
- Return type is inferred (for non-recursive methods and methods that don't have an explicit `return` value)
