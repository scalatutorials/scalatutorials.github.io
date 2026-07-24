---
layout: tour
title: "Lists"
links:
- text: List's scala docs
  url: https://www.scala-lang.org/api/current/scala/collection/immutable/List.html
- text: scala package object docs
  url: https://www.scala-lang.org/api/current/scala.html
code: |
  //Immutable list of type List[Int]
  val list1 = List(1, 2, 3)
  //Immutable list of type List[Any]
  val list2 = List("a", 2, true)
  import collection.mutable
  //the "mutable version" of List
  val mlist = mutable.ArrayBuffer("a", "b", "c")

  //Access items using (index) not [index]
  val firstItem = list1(0)

  //Modify items the same way (mutable Lists only)
  mlist(0) = "d"
  mlist

  //Concatenation using the ++ operator or ::: (lists only)
  list1 ++ list2
  list1 ::: list2

  //Prepending an item using either :: (lists only) or +:
  0 :: list1
  0 +: list1

  //appending an item using :+ (not efficient for immutable List)
  list1 :+ 4

  //all together
  val concatenated = 1 :: list1 ::: list2 ++ mlist :+ 'd'
  //concatenation doesn't modify the lists themselves
  list1

  //Removing elements with diff (creates a new collection):

  //creates a new ArrayBuffer with "c" removed, mlist is not touched
  mlist diff List("c")
  //creates a new ArrayBuffer with e, f removed (they are not present), mlist is not touched
  mlist diff List("e", "f")
  //mlist not modified
  mlist

  //Removing elements in place (mutable Lists only):

  //removes c from the list itself
  mlist -= "c"
  mlist
  //removes e and f from mlist itself (no-op here, they are not present)
  mlist --= List("e", "f")
  mlist

  //Adding elements (mutable Lists only)
  mlist += "e"
  mlist ++= List("f", "g")

  mlist

  //Diff
  val diffList = List(1,2,3,4) diff List(2,3)

  //Find (stops when item is found)
  val personList = List(("Alice",1), ("Bob",2), ("Carol",3))
  def findByName(name:String) = personList.find(_._1 == name).getOrElse(("David",4))
  val findBob = findByName("Bob")
  val findEli = findByName("Eli")

  findBob._2
  findEli._2
---

- Lists are constructed simply using `List(element1, element2, ...)`
- List elements can be of any type, but the List final type will be the lowest common denominator

  ```scala
  class Foo(val value1:Int)
  class Bar(value1:Int, val value2:Int) extends Foo(value1)
  val list:List[Foo] = List(new Foo(1), new Bar(2,3))
  ```
- The default `List` in Scala is `scala.List`, which points to `scala.collection.immutable.List` [src](https://github.com/scala/scala/blob/2.13.x/src/library/scala/collection/immutable/List.scala) [docs](https://www.scala-lang.org/api/current/scala/collection/immutable/List.html), and defined in scala/package.scala [src](https://github.com/scala/scala/blob/2.13.x/src/library/scala/package.scala) [docs](https://www.scala-lang.org/api/current/scala.html)
- The default List is implemented as a linked list
- It is immutable (any "changes" create a new list, the original is untouched)
