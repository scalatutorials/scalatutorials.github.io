---
layout: tour
title: "Useful operations"
code: |
  //Ranges
  val range = 1 to 10 //1 to 10 inclusive
  val range2 = 1 until 10 //1 to 10 exclusive
  val range3 = 2 until 10 by 3 //jumps of 3
  range3.toList

  //Number convenience methods
  val num = -5
  val numAbs = num.abs //absolute value
  numAbs.max(7)
  numAbs.min(7)

  //String operations
  "Scala".reverse //reverse a string
  "scala".capitalize //make first char caps
  "Scala!" * 7 //repeat n times
  "123".toInt //parse as Int

  //Useful methods on collections
  range.filter(_ > 4) //keep items larger than 4
  range2.map(_ * 2) //transform each item
---

Scala has a lot of "syntactic sugar" for many common operations.
Some useful ones are shown on the left.

Play with the examples (to run, click the <strong>Run</strong> button in the editor) and once you feel comfortable continue to the next step.

More will be explained later on.
