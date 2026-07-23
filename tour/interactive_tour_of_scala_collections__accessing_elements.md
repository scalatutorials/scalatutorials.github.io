---
layout: tour
title: "Collections - Accessing Elements"
code: |
  val array = Array(1,2,3)
  val list = List(1, 2, 3)
  val map = Map("one" -> 1, "two" -> 2, "three" -> 3)
  val set = Set("a","b","c")

  //Accessing items
  val arrayItem = array(0) //returns item at index 0 which is 1
  val listItem = list(1) //returns item at index 1 which is 2
  val mapItem = map("three") //returns 3
  val setItem = set("a")  //returns true

  println(arrayItem)
  println(listItem)
  println(mapItem)
  println(setItem)
---

- You can access the elements of Arrays, Lists, Maps and Sets using `()`
- For Maps, accessing a key that doesn't exist throws an exception: `java.util.NoSuchElementException: key not found`. To check if a key exists use `map.contains(key)`, or use a default value: `map.getOrElse(key, defaultValue)`
