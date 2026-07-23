---
layout: tour
title: "Return multiple variables"
links:
- text: More on Tuples
  url: https://www.tutorialspoint.com/scala/scala_tuples.htm
code: |
  def swap(x:String, y:String) = (y, x)
  val (a,b) = swap("hello","world")
  println((a, b))
---

It is possible to return multiple variables using Tuples.
