---
layout: tour
title: "Loops using while"
code: |
  //Loops using while

  var i, sum = 0
  while (i < 10) {
    sum += i
    i += 1
  }
  println(sum)
---

Scala doesn't have a "classic" equivalent to the imperative for loop construct that exists in C, Java, etc. For imperative "for" like loops, use `while`.

Scala doesn't support (out of the box) the `++` and `--` operators, use `+= 1` or `-= 1` for the same effect.
