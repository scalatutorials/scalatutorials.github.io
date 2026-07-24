---
layout: tour
title: "Enums & ADTs"
links:
- text: Enums (official docs)
  url: https://docs.scala-lang.org/scala3/book/types-adts-gadts.html
code: |
  //simple enums: at last, first-class in the language
  enum Color:
    case Red, Green, Blue

  println(Color.values.mkString(", "))
  println(Color.Red.ordinal)
  println(Color.valueOf("Green"))

  //enums can have parameters and methods
  enum Planet(mass: Double, radius: Double):
    case Mercury extends Planet(3.303e+23, 2.4397e6)
    case Earth   extends Planet(5.976e+24, 6.37814e6)

    def surfaceGravity = 6.67300E-11 * mass / (radius * radius)

  println(f"${Planet.Earth.surfaceGravity}%.2f")

  //algebraic data types (ADTs): cases can carry data,
  //and pattern matching checks you handled every case
  enum Shape:
    case Circle(radius: Double)
    case Rectangle(width: Double, height: Double)

  def area(s: Shape): Double = s match
    case Shape.Circle(r)       => math.Pi * r * r
    case Shape.Rectangle(w, h) => w * h

  println(area(Shape.Circle(1.0)))
  println(area(Shape.Rectangle(2.0, 3.0)))
---

Scala 2 had no `enum` keyword. You chose between `scala.Enumeration` (limited and
widely avoided) or hand-writing a `sealed trait` with `case object`s (powerful,
but boilerplate-heavy).

Scala 3 gives enums a first-class syntax that scales from the trivial:

```scala
enum Color:
  case Red, Green, Blue
```

…up to full **algebraic data types** (ADTs), where each case carries its own data.
Because an enum is *sealed* (no cases can be added elsewhere), the compiler warns you
if a `match` forgets a case. Try deleting the `Rectangle` case in `area` and running.

You still get everything the old sealed-trait encoding provided (pattern matching,
exhaustiveness checking, companion methods) plus conveniences like `values`,
`ordinal`, and `valueOf` for simple enums. Enums also interoperate with Java's
`enum` when you extend `java.lang.Enum`.
