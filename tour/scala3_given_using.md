---
layout: tour
title: "given & using"
links:
- text: Contextual abstractions (official docs)
  url: https://docs.scala-lang.org/scala3/book/ca-context-parameters.html
code: |
  //a value the compiler can pass around for you
  case class Config(indent: Int, bullet: String)

  given Config = Config(2, "-")

  //`using` marks a parameter the compiler fills in from givens in scope
  def renderList(items: List[String])(using cfg: Config): String =
    items.map(item => " " * cfg.indent + cfg.bullet + " " + item).mkString("\n")

  //no need to pass the config; the given is found automatically
  println(renderList(List("read", "run", "tweak")))

  //you can still pass one explicitly when you want to override
  println(renderList(List("override"))(using Config(4, "*")))

  //`summon` fetches the current given directly
  println(summon[Config])

  //type classes: givens that implement a trait for a type
  trait Show[T]:
    def show(t: T): String

  given Show[Int] with
    def show(t: Int) = s"Int($t)"

  given Show[Boolean] with
    def show(t: Boolean) = if t then "yes" else "no"

  def describe[T](t: T)(using s: Show[T]) = s.show(t)

  println(describe(42))
  println(describe(true))
---

Scala 2's `implicit` keyword did too many unrelated jobs (implicit parameters,
implicit conversions, implicit classes) and earned a reputation for being confusing.
Scala 3 split it into purpose-built keywords:

- **`given`** declares a value the compiler may supply automatically: a canonical
  instance for a type.
- **`using`** marks a parameter list the compiler fills in from the givens in scope.
- **`summon[T]`** retrieves the current given of type `T` (Scala 2's `implicitly`).

The mechanics are what Scala always had (term inference), but the intent is now
explicit at both ends: the *definition* says "this is available for injection", and
the *call site's signature* says "this gets injected".

The second half of the worksheet shows the pattern this exists for: **type classes**.
A trait like `Show[T]` describes a capability; `given` instances implement it per type;
any function can then demand the capability with `using`. This is how Scala libraries
do JSON encoding, ordering, equality, and much more.

(Implicit *conversions*, the most abused implicit feature, still exist but are now
deliberately harder to define, requiring an explicit `Conversion` given.)
