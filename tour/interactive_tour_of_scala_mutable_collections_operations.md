---
layout: tour
title: "Mutable Collections Operations"
links:
- text: scala.collection.mutable.Buffer API docs
  url: https://www.scala-lang.org/api/current/scala/collection/mutable/Buffer.html
code: |
  import scala.collection.mutable

  val arrayBuffer = mutable.ArrayBuffer(1, 2, 3)
  val listBuffer = mutable.ListBuffer("a", "b", "c")
  val hashMap = mutable.Map("one" -> 1, "two" -> 2, "three" -> 3)

  arrayBuffer += 4
  listBuffer += "d"
  arrayBuffer -= 1
  listBuffer -= "a"
  hashMap += "four" -> 4
  hashMap -= "one"

  arrayBuffer ++= List(5, 6, 7)
  hashMap ++= Map("five" -> 5, "six" -> 6)
  hashMap --= Set("one", "three")

  println(arrayBuffer)
  println(listBuffer)
  println(hashMap)
---

- Mutable collections allow you to add / remove single / multiple items while modifying the collection itself
- The methods `+=`, `++=`, `-=`, `--=` are actually defined in the mutable collections
