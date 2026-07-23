---
layout: tour
title: "Top-level definitions & @main"
links:
- text: "@main methods (official docs)"
  url: https://docs.scala-lang.org/scala3/book/methods-main-methods.html
- text: Top-level definitions
  url: https://docs.scala-lang.org/scala3/book/taste-toplevel-definitions.html
code: |
  //In Scala 3, definitions can live directly at the top of a file;
  //no wrapper object needed.

  val language = "Scala 3"

  def welcome(name: String) = s"Welcome to $language, $name!"

  case class User(name: String)

  println(welcome(User("Alice").name))

  //In a real .scala file, an entry point is just an annotated method:
  //  @main def run(): Unit = println(welcome("world"))
  //(this worksheet already runs top-to-bottom like a script,
  // so here we just call the method directly)
  def run(): Unit = println(welcome("world"))
  run()
---

In Scala 2, *everything* had to live inside a class, trait, or object. A simple script
meant ceremony:

```scala
object Main {
  def main(args: Array[String]): Unit = {
    println("Hello!")
  }
}
```

Scala 3 removes both layers of ceremony:

- **Top-level definitions**: `val`s, `def`s, type aliases, and givens can sit directly
  in a file, next to your classes. (This replaces Scala 2's "package objects", which
  are being phased out.)
- **`@main` methods**: any method annotated with `@main` becomes a program entry point.
  Its parameters become command-line arguments, parsed for you:

```scala
@main def greet(name: String, times: Int) =
  for _ <- 1 to times do println(s"Hello, $name!")
```

Running `scala run . -- Alice 3` prints the greeting three times; no `Array[String]`
in sight.

<div class="callout">
<strong>Note:</strong> the editor here runs in <em>worksheet</em> mode: your code is
already inside a script, so <code>@main</code> is shown in a comment (a worksheet has
no place for a program entry point; a plain <code>.scala</code> file does).
</div>
