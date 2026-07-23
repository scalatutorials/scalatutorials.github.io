---
layout: tour
title: "String interpolation"
links:
- text: String interpolation in Scala
  url: https://docs.scala-lang.org/overviews/core/string-interpolation.html
- text: What is this 'Tau' thing?
  url: https://tauday.com
code: |
  import scala.math._
  val Tau = Pi*2
  println(s"Happy $Tau Day")
---

Scala supports string interpolation (since Scala 2.10).

For complex expressions add curly braces, e.g.

```scala
s"Two times three: ${2 * 3}"
```
