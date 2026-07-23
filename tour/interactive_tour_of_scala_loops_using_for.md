---
layout: tour
title: "Loops using for"
links:
- text: More on for loops
  url: https://www.tutorialspoint.com/scala/scala_for_loop.htm
code: |
  //Loops using for
  var sum = 0
  for ( i <- 0 until 10) {
    sum += i
  }
  println(sum)
---

For loops in Scala are powerful and deserve a separate discussion. But they can be used to mimic a C / Java-like for loop as well.
