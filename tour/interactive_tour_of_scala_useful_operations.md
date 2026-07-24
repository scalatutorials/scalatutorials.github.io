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
  val max5or7 = numAbs.max(7)
  val min5or7 = numAbs.min(7)

  //String operations
  val reverse = "Scala".reverse //reverse a string
  val cap = "scala".capitalize //make first char caps
  val multi = "Scala!" * 7 //repeat n times
  val int = "123".toInt //parse as Int

  //Useful methods on collections
  val moreThan4 = range.filter(_ > 4) //keep items larger than 4
  val doubleIt = range2.map(_ * 2) //transform each item
---

Scala has a lot of "syntactic sugar" for many common operations.
Some useful ones are shown on the left.

Play with the examples (to run, click the <strong>Run</strong> button in the editor) and once you feel comfortable continue to the next step.

More will be explained later on.
