---
layout: tour
title: "Mutable Collections"
links:
- text: Concrete Mutable Collection Classes
  url: https://docs.scala-lang.org/overviews/collections-2.13/concrete-mutable-collection-classes.html
- text: What is Scala's equivalent of java.util.ArrayList on Stack Overflow
  url: https://stackoverflow.com/questions/8287360/scala-equivalent-of-java-util-arraylist
- text: scala.collection.mutable package docs
  url: https://www.scala-lang.org/api/current/scala/collection/mutable.html
code: |
  import scala.collection.mutable

  val arrayBuffer = mutable.ArrayBuffer(1, 2, 3)
  val listBuffer = mutable.ListBuffer("a", "b", "c")
  val hashSet = mutable.Set(0.1, 0.2, 0.3)
  val hashMap = mutable.Map("one" -> 1, "two" -> 2)
---

Scala "encourages" using immutable collections (hence they are the ones used by default), however sometimes mutable collections might have some benefits, either for CPU / memory performance, for code readability or simply a matter of preference. As we saw earlier, Scala provides concrete mutable collections in `scala.collection.mutable`.

- Best practice suggests that you prefix mutable collections with `mutable`; this might not seem useful for `ArrayBuffer`, but it will for `scala.collection.mutable.Map`
- `ArrayBuffer` is more or less the equivalent of Java's `java.util.ArrayList`, which is backed by an array
- `ListBuffer` is the mutable partner for Scala's immutable `List`, implemented as a linked list
- There are many other mutable collection types, see the links below for more information
