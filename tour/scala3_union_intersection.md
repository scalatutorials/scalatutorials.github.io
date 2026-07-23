---
layout: tour
title: "Union & intersection types"
links:
- text: Union types (official docs)
  url: https://docs.scala-lang.org/scala3/book/types-union.html
- text: Intersection types (official docs)
  url: https://docs.scala-lang.org/scala3/book/types-intersection.html
code: |
  //union types: a value that is one of several types
  def describe(x: Int | String): String = x match
    case n: Int    => s"number $n"
    case s: String => s"text '$s'"

  println(describe(42))
  println(describe("hi"))

  //great for precise error handling without exceptions
  case class NotFound(id: Int)

  def findUser(id: Int): String | NotFound =
    if id == 1 then "Alice" else NotFound(id)

  findUser(1) match
    case name: String  => println(s"found $name")
    case NotFound(id)  => println(s"no user $id")

  //intersection types: a value that is several types at once
  trait Named { def name: String }
  trait Aged { def age: Int }

  def intro(x: Named & Aged) = s"${x.name}, ${x.age} years old"

  case class Person(name: String, age: Int) extends Named, Aged

  println(intro(Person("Alice", 30)))
---

Two new kinds of types arrived in Scala 3, both straight from type theory:

**Union types**: `A | B` is a value that is *either* an `A` or a `B`. Before Scala 3
you'd reach for `Either[A, B]` (with wrapping/unwrapping) or a common supertype (losing
precision). A union is exact and requires no wrapper: `findUser` above returns a real
`String` or a real `NotFound`, and pattern matching takes them apart. Unions also power
safer Java interop: under the `-Yexplicit-nulls` flag, a nullable Java `String` becomes
`String | Null`, making null-handling visible in the types.

**Intersection types**: `A & B` is a value that is *both* an `A` and a `B`. It replaces
Scala 2's `A with B` in type positions, with a cleaner property: `A & B` and `B & A` are
the same type. You saw one in this tour's overview page: `val person: Namable & Randomable`.

Both are structural glue: you'll use unions frequently in application code, and meet
intersections mostly in APIs that combine capabilities.

<div class="callout">
<strong>Note:</strong> also new in the type department (worth a look once these feel
comfortable): <em>opaque types</em> for zero-cost wrappers, and <em>match types</em>
for type-level computation.
</div>
