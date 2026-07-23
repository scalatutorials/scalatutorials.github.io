---
layout: tour
title: "Collections - Concatenation"
links:
- text: "::: vs ++"
  url: https://stackoverflow.com/questions/6559996/scala-list-concatenation-vs
code: |
  val array = Array(1,2,3)
  val list = List(1, 2, 3)
  val map = Map("one" -> 1, "two" -> 2, "three" -> 3)
  val set = Set(1, 2, 3)

  //Concatenating
  val arrayConcat = array ++ Array(3, 4, 5)
  val listConcat = list ++ List(4, 5, 6)
  val mapConcat = map ++ Map("four" -> 4, "five" -> 5, "six" -> 6)

  //Legacy ::: operator in Lists only
  val listConcat2 = list ::: List(4, 5, 6)

  println(arrayConcat.mkString(","))
  println(listConcat.mkString(","))
  println(listConcat2.mkString(","))
  println(mapConcat.mkString(","))
---

- Arrays, Lists, Maps and Sets can be concatenated using the `++` method
- You can `chain` this to concatenate multiple collections, e.g. `List(1, 2, 3) ++ List(4, 5, 6) ++ List(7, 8, 9)`
- For Maps, duplicate keys are overwritten (in the result) by the rightmost Map that has them, e.g. `Map("key" -> "value") ++ Map("key" -> "value2")` will generate a new Map containing `Map("key" -> "value2")`
- Concatenation does not modify the collections, it simply generates a new collection that contains all elements of the first collection followed by the elements of the second and so forth
