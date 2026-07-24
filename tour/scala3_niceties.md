---
layout: tour
title: "Smaller niceties"
links:
- text: New in Scala 3 (overview)
  url: https://docs.scala-lang.org/scala3/new-in-scala3.html
code: |
  //creator applications: `new` is optional
  class Greeter(name: String):
    def greet = s"Hello, $name!"

  val g = Greeter("world")     //no `new` needed
  println(g.greet)

  //traits can take parameters
  trait Describable(kind: String):
    def describe = s"I am a $kind"

  class Dog extends Describable("dog")
  println(Dog().describe)

  //export: compose objects and re-expose their members
  class Engine:
    def start() = "vroom"
    def stop() = "silence"

  class Car:
    private val engine = Engine()
    export engine.{start, stop}    //Car now has start() and stop()

  println(Car().start())

  //opaque types: zero-cost wrappers with their own interface
  object Measures:
    opaque type Meters = Double
    object Meters:
      def apply(d: Double): Meters = d
    extension (m: Meters)
      def +(other: Meters): Meters = m + other
      def show: String = s"${m}m"

  import Measures.*
  val distance = Meters(1.5) + Meters(2.5)
  println(distance.show)
  //println(distance * 2.0)  //error: Meters is not a Double on the outside
---

A round-up of smaller Scala 3 improvements you'll bump into:

- **Creator applications**: `Greeter("world")` works without `new` for *every* class,
  not just case classes. (The main reason many classes were made `case` in Scala 2
  disappears.)
- **Trait parameters**: traits can declare constructor parameters, removing an old
  asymmetry with classes (and many `def`-override workarounds).
- **`export`**: the composition counterpart of `import`; forward selected members of
  an inner object as your own. Favoring composition over inheritance gets real language
  support.
- **Opaque types**: a wrapper type that exists only at compile time. Inside the
  defining scope `Meters` *is* a `Double`; outside it's a distinct type with only the
  interface you export. Type safety with zero runtime cost.

Honorable mentions you can explore from the link below: `inline` for guaranteed
compile-time evaluation, match types, dependent function types, and `derives` for
automatic type-class derivation.

This concludes the Scala 3 section, and with it the tour. Happy Scala!
