---
layout: tour
title: "Match as a Switch"
links:
- text: More on pattern matching
  url: https://docs.scala-lang.org/tour/pattern-matching.html
code: |
  val selection = "One"
  selection match {
    case "One" => println("You selected option one!")
    case "Two" => println("You selected option two!")
    case _ => println("You selected something else: ")
  }
---

Pattern matching will be familiar to anyone coming from a Haskell background, however it might look a bit weird at first for anyone coming from imperative languages.

Pattern matching in its most basic form, can look like an extended `switch`, with some differences:

- The `match` keyword comes after the variable (`selection match` compared to `switch(selection)`)
- There is no need for `break;`
- There is no fall through
- The default case is `case _` (or `case x` where x can be any lower case identifier, more about it in the next slides)

Pattern matching can be very powerful beyond a `switch` replacement, and will be explained in later slides.
