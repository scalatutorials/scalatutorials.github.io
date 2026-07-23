---
layout: tour
title: "Overview"
links:
- text: Scala official site
  url: https://scala-lang.org
- text: Scala on Wikipedia
  url: https://en.wikipedia.org/wiki/Scala_(programming_language)
code: |
  //type inference, semicolons optional
  var number = -1

  //Lists are lists...
  val list = List(1, 2, 3, 4, 5)

  //Maps are maps
  val map = Map(1 -> "one", 2 -> "two")

  //`return` keyword is optional, so are {} on one liners
  def square(x: Int) = x * x

  //higher order functions
  list.filter(_ > 2).map(_ * 3).sum

  //convenient string ops
  val strAsNum = "1000".toInt

  //easy output (uses System.out.println)
  println(strAsNum)

  //convenient number ops
  number = number.abs

  //easy ranges
  val range = 1 until 100 by 2

  //easy tuples
  val tuple = ("Tuples are", 1, true, "awesome thing")

  //convenient collection ops
  val tsil = list.reverse

  //easy iterations
  for ((k, v) <- map) println((k, v))

  //easy nested loops. Everything is an expression
  val result = for (i <- 0 to 10; j <- 0 to i) yield (i, j)

  //lambda functions / function literals
  val functionLiteral = (n: Int) => math.sqrt(n) * n

  //String literals
  val longString = """
  put " anything  you like in here except three consecutive " :)
  """

  //default values for parameters
  def lotsOfParams(num: Int = 10, str: String = "N/A") = str * num

  //named parameters
  lotsOfParams(str = "wat")

  //curried methods, partial application
  def addNumbers(x: Int)(y: Int) = x + y
  val add2 = addNumbers(2)
  add2(3)

  //easy interfaces / mixins
  trait Namable { val name: String; def greet: String = s"Hi $name!" }

  //lazy evaluation
  trait Randomable { lazy val rand: Int = (math.random() * 100).toInt }

  //easy class definition, support for mixins using traits
  case class Person(name: String, favoriteLanguage: String) extends Namable with Randomable

  val person: Namable & Randomable = Person("Alice", "Scala")

  //Pattern Matching
  person match {
    case p @ Person(n, fl) => println(s"${p.greet} p.s. we like $fl too!" +
        s" Random number: ${p.rand}. (Still ${p.rand})")
    case _ => println("hm...")
  }

  //everything is an expression #2
  val condition = if person.name == "Alice" then "Hi Alice!" else "Superman?"

  //extension methods ("pimp my library")
  extension (i: Int)
    def squared = i * i
    def sqrt = math.sqrt(i)

  println((7.squared, 49.sqrt))

  //Duck typing (structural types)
  import scala.reflect.Selectable.reflectiveSelectable
  def quackTheDuck(quackable: { def quack: String }) =
    "What does a duck say? " + quackable.quack
  class RealDuck { def quack = "Quack!" }
  class ImposterDuck { def quack = "Qwaack!" }
  quackTheDuck(RealDuck())
  quackTheDuck(ImposterDuck())

  //Dynamic method calls (don't do it unless you have a good reason...)
  import scala.language.dynamics
  class Useless extends Dynamic {
    def applyDynamic(name: String)(args: Any*): Unit = {
      println(s"Sorry, I wish I could $name...")
      if (args.nonEmpty) {
        println(s"Here, you can have your ${args.mkString(", ")} back.")
      }
    }
  }
  val useless = new Useless
  useless.reticulate("splines", "marbles")
---

### Overview

Welcome to the basic Scala tour! It is aimed at anyone who would like to learn Scala's basics, while writing and running code directly in the browser.
On the left is a summary of Scala's language features that will be covered.

*Important:* if you don't understand any of the code on the left, this is OK — and not just OK, it's expected. It will all be covered in the next steps. Simply click "Next" to get the tour started.

### Executable examples

<div class="callout">
<strong>Tip:</strong> to execute the code, click the <strong>Run</strong> button in the editor, or press <kbd>Ctrl</kbd>+<kbd>Enter</kbd>.
</div>

### Some fun facts

- Scala is a statically typed, object-oriented functional language, merging two popular programming approaches into one
- Created by Martin Odersky at EPFL, launched in 2003, open source; Scala 3 (a major redesign of the language) shipped in 2021
- Used by Netflix, X (Twitter), LinkedIn, Airbnb, Zalando, Databricks (Apache Spark is written in Scala) and many others
- It runs on the JVM, and also compiles to JavaScript ([Scala.js](https://www.scala-js.org)) and to native binaries ([Scala Native](https://scala-native.org))
- Therefore it has great interop with Java (and any other JVM language)
