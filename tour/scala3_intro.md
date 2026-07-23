---
layout: tour
title: "Scala 3: what changed"
links:
- text: Official Scala 3 reference
  url: https://docs.scala-lang.org/scala3/reference/
- text: Scala 3 migration guide
  url: https://docs.scala-lang.org/scala3-migration/
code: |
  //Scala 3 in one worksheet — details in the next pages

  //new control syntax: `then` and `do`, parentheses optional
  val n = 42
  val parity = if n % 2 == 0 then "even" else "odd"
  println(parity)

  //enums, finally
  enum Suit:
    case Hearts, Diamonds, Clubs, Spades
  println(Suit.values.mkString(", "))

  //extension methods (goodbye implicit class boilerplate)
  extension (s: String)
    def shout = s.toUpperCase + "!"
  println("scala".shout)

  //indentation can replace braces (both styles work)
  def describe(suit: Suit): String =
    suit match
      case Suit.Hearts | Suit.Diamonds => "red"
      case _                           => "black"
  println(describe(Suit.Spades))

  //union types
  def fmt(x: Int | String) = s"<<$x>>"
  println(fmt(1))
  println(fmt("one"))
---

Scala 3 shipped in 2021 — the biggest revision of the language since it was created,
built on a new compiler that was developed under the codename "Dotty".

The good news: it is still very much *Scala*. Everything the basic tour taught you —
`val`/`var`, type inference, case classes, pattern matching, higher-order functions —
works exactly the same. If you've done the basic tour, you already know Scala 3.

What changed falls into three buckets:

1. **Cleaner syntax** — braces became optional (indentation works, like Python),
   control structures read more like English (`if x then y else z`), and boilerplate
   like wrapper objects disappeared.
2. **New constructs** — real `enum`s, `extension` methods, and top-level definitions
   replace the old encodings (sealed trait hierarchies, implicit classes, package objects).
3. **A saner type system** — implicits were redesigned into `given`/`using`, and new
   types arrived: union (`A | B`), intersection (`A & B`), and opaque types.

The worksheet on the left is a taste of all of it. The next pages take these one at a time.

<div class="callout">
<strong>Note:</strong> everything in this section runs on Scala 3 — as does the rest of this site.
</div>
