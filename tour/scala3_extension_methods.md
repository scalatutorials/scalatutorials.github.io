---
layout: tour
title: "Extension methods"
links:
- text: Extension methods (official docs)
  url: https://docs.scala-lang.org/scala3/book/ca-extension-methods.html
code: |
  //add methods to types you don't own
  extension (i: Int)
    def squared = i * i
    def isEven = i % 2 == 0

  println(5.squared)      //> 25
  println(4.isEven)       //> true

  //works on any type, including other people's classes
  extension (s: String)
    def vowels = s.count("aeiou".contains(_))
    def initials = s.split(" ").map(_.head).mkString(".")

  println("scala rocks".vowels)
  println("Martin Odersky".initials)   //> M.O

  //extensions can take parameters and be generic
  extension [T](list: List[T])
    def second: T = list.tail.head
    def penultimate: T = list.init.last

  println(List(1, 2, 3, 4).second)       //> 2
  println(List(1, 2, 3, 4).penultimate)  //> 3

  //the Scala 2 way, for comparison (still works, but wordier):
  implicit class RichIntOld(private val i: Int) {
    def cubed = i * i * i
  }
  println(2.cubed)
---

Remember "pimp my library" from the basic tour? In Scala 2, adding methods to an
existing type meant wrapping it in an `implicit class`: a clever encoding, but you
were really defining a wrapper class just to get one method.

Scala 3 says what it means: **`extension`**.

```scala
extension (i: Int)
  def squared = i * i
```

After this, `5.squared` works anywhere the extension is visible (imported or in scope).
Extensions can:

- define **several methods** at once for the same receiver,
- be **generic** (`extension [T](list: List[T])`),
- take extra parameters, type bounds, and `using` clauses (they combine naturally
  with the contextual abstractions on the next page).

The old `implicit class` still compiles, so existing libraries keep working, but new
Scala 3 code uses `extension`, and the standard library's own enrichments are moving
that way too.
