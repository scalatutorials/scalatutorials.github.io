---
layout: tour
title: "Optional braces & new control syntax"
links:
- text: Optional braces (official reference)
  url: https://docs.scala-lang.org/scala3/reference/other-new-features/indentation.html
- text: New control syntax
  url: https://docs.scala-lang.org/scala3/reference/other-new-features/control-syntax.html
code: |
  //new control syntax: no parentheses, `then` and `do` keywords
  val x = 7

  if x % 2 == 0 then
    println("even")
  else
    println("odd")

  var i = 0
  while i < 3 do
    println(s"i = $i")
    i += 1

  for fruit <- List("apple", "banana", "cherry") do
    println(fruit)

  //indentation instead of braces: like Python, but typed
  def greet(name: String): String =
    val upper = name.capitalize
    s"Hello, $upper!"

  println(greet("world"))

  //`end` markers (optional) help readability in long blocks
  def classify(n: Int): String =
    if n < 0 then "negative"
    else if n == 0 then "zero"
    else "positive"
  end classify

  println(classify(-5))

  //the old style still compiles; both are valid Scala 3
  def greetOldStyle(name: String): String = {
    val upper = name.capitalize
    s"Hello, $upper!"
  }
  println(greetOldStyle("braces"))
---

Scala 3's most visible change: **braces are optional**. Indentation defines structure,
the way it does in Python, except everything is still statically typed and checked
by the compiler.

Alongside it came a new **control syntax**:

- `if cond then a else b`: no parentheses around the condition
- `while cond do body`
- `for x <- xs do body` (and `for x <- xs yield expr` for comprehensions)

Both changes are *optional*. Braces and the old parenthesized style still compile,
and you'll see plenty of both in the wild. Pick a style per codebase and stay consistent.

For long indented blocks, an optional `end` marker (`end classify`, `end if`,
`end while`) documents where a block finishes.

<div class="callout">
<strong>Tip:</strong> try removing an indentation level in the editor and running:
the compiler will tell you exactly what it expected.
</div>
