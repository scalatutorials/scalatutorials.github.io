---
layout: tour
title: "Arrays"
links:
- text: Array's scala docs
  url: https://www.scala-lang.org/api/current/scala/Array.html
code: |
  def printArray[K](array:Array[K]) = array.mkString("Array(" , ", " , ")")

  //Mutable array of type Array[Int]
  val array1 = Array(1, 2, 3)   //>array1 = [I@6ae01647
  printArray(array1) //>Array(1, 2, 3)
  //Mutable array of type Array[Any]
  val array2 = Array("a", 2, true)   //>array2 = [Ljava.lang.Object;@1dd6c622
  printArray(array2) //>Array(a, 2, true)
  //Mutable array of type Array[String]
  val array3 = Array("a", "b", "c")   //>array3 = [Ljava.lang.String;@7f69f17b
  printArray(array3)  //>Array(a, b, c)
  //Access items using (index) not [index]
  val itemAtIndex0 = array3(0)   //>itemAtIndex0 = a

  //Modify items the same way
  array3(0) = "d"
  printArray(array3)  //>Array(d, b, c)

  //Concatenation using the ++ operator,
  //Prepending items using +: and appending using :+
  val concatenated = "prepend" +: (array1 ++ array2) :+ "append"  //>concatenated = [Ljava.lang.Object;@46d0397
  printArray(concatenated)  //>Array(prepend, 1, 2, 3, a, 2, true, append)

  //Finding an index of an item
  array3.indexOf("b") //>1

  //Diff
  val diffArray = Array(1,2,3,4).diff(Array(2,3))  //>diffArray = [I@1106b0c6
  printArray(diffArray) //>Array(1, 4)

  //Find (stops when item is found)
  val personArray = Array(("Alice",1), ("Bob",2), ("Carol",3))  //>personArray = [Lscala.Tuple2;@4e3f9fe5
  def findByName(name:String) = personArray.find(_._1 == name).getOrElse(("David",4))  //>findByName(name = "foo") => (David,4)
  val findBob = findByName("Bob")  //>findBob = (Bob,2)
  val findEli = findByName("Eli")  //>findEli = (David,4)

  val bobFound = findBob._2  //>bobFound = 2
  val eliFound = findEli._2  //>eliFound = 4
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
