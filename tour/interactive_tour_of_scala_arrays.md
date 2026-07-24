---
layout: tour
title: "Arrays"
links:
- text: Array's scala docs
  url: https://www.scala-lang.org/api/current/scala/Array.html
code: |
  def printArray[K](array:Array[K]) = array.mkString("Array(" , ", " , ")")

  //Mutable array of type Array[Int]
  val array1 = Array(1, 2, 3)
  printArray(array1)
  //Mutable array of type Array[Any]
  val array2 = Array("a", 2, true)
  printArray(array2)
  //Mutable array of type Array[String]
  val array3 = Array("a", "b", "c")
  printArray(array3)
  //Access items using (index) not [index]
  val itemAtIndex0 = array3(0)

  //Modify items the same way
  array3(0) = "d"
  printArray(array3)

  //Concatenation using the ++ operator,
  //Prepending items using +: and appending using :+
  val concatenated = "prepend" +: (array1 ++ array2) :+ "append"
  printArray(concatenated)

  //Finding an index of an item
  array3.indexOf("b")

  //Diff
  val diffArray = Array(1,2,3,4).diff(Array(2,3))
  printArray(diffArray)

  //Find (stops when item is found)
  val personArray = Array(("Alice",1), ("Bob",2), ("Carol",3))
  def findByName(name:String) = personArray.find(_._1 == name).getOrElse(("David",4))
  val findBob = findByName("Bob")
  val findEli = findByName("Eli")

  val bobFound = findBob._2
  val eliFound = findEli._2
---

- Arrays are constructed simply using `Array(element1, element2, ...)`
- Arrays in Scala map to Java primitive Arrays (e.g. Java's `int[]` is Scala's `Array[Int]`, Java's `String[]` is `Array[String]` in Scala)
- Arrays are *mutable* (can't change their size once created, but can modify their elements)
- Since they are using Java's arrays, to print an Array's content nicely, use `.mkString(",")`
- Array elements can be of any type, but the Array's final type will be the lowest common denominator

  ```scala
  class Foo(val value1:Int)
  class Bar(value1:Int, val value2:Int) extends Foo(value1)
  val list:Array[Foo] = Array(new Foo(1), new Bar(2,3))
  ```
