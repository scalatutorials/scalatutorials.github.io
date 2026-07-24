---
layout: tour
title: "Maps"
links:
- text: Predef source
  url: https://github.com/scala/scala/blob/2.13.x/src/library/scala/Predef.scala
- text: Predef docs
  url: https://www.scala-lang.org/api/current/scala/Predef$.html
- text: Map's scala docs
  url: https://www.scala-lang.org/api/current/scala/collection/immutable/Map.html
- text: Map's sources
  url: https://github.com/scala/scala/blob/2.13.x/src/library/scala/collection/immutable/Map.scala
code: |
  val map1 = Map("one" -> 1, "two" -> 2, "three" -> 3)
  //Map of type Map[String, Int]
  val map2 = Map(1 -> "one", "2" -> 2.0, 3.0 -> false)
  //Map of type Map[Any, Any]

  import collection.mutable
  val mmap = mutable.HashMap("a" -> 1, "b" -> 2, "c" -> 3)
  //the "mutable version" of Map

  //Maps remove duplicate keys:
  println(Map("a" -> 1, "a" -> 2))

  //Get items using map(key)
  val one = map1("one")

  //NoSuchElementException will be thrown if key doesn't exist!
  //e.g. this code: val fourExists = map1("four")
  //throws NoSuchElementException: key not found: four
  //the get method returns an Option, which will be explained later
  val fourExistsOption = map1.get("four")

  println(one)
  println(fourExistsOption.isDefined)

  //You can set / modify items using map(key) = value
  mmap("d") = 4
  println(mmap)

  //Concatenation using the ++ operator
  //(removes duplicate keys, order not guaranteed)
  //note: map2 (whose key type is Any) goes first,
  //because ++ keeps the key type of the map on its left
  val concatenated = map2 ++ map1 ++ mmap
  println(concatenated)
  //Concatenation doesn't modify the maps themselves
  println(map1)

  //Removing elements (mutable Maps only)
  mmap -= "c"
  println(mmap)

  //Adding elements (mutable Maps only)
  mmap += "e" -> 5
  mmap ++= Map("f" -> 6, "g" -> 7)

  println(mmap)

  //Find
  val personMap = Map(("Alice",1), ("Bob",2), ("Carol",3))
  def findByName(name:String) = personMap.getOrElse(name, 4)
  val findBob = findByName("Bob")
  val findEli = findByName("Eli")

  println(findBob)
  println(findEli)
---

- Maps are constructed simply using `Map(key1 -> value1, key2 -> value2, ...)`
- The Map can contain mixed types, but the final type of the Map keys / values will be the lowest common denominator type
- The default `Map` is `Predef.Map` which points to `scala.collection.immutable.Map`
- As it currently stands, Map implementation up to size of 4 has a specific class Map1, Map2, Map3, Map4, beyond that, it uses an immutable `HashMap`
- You can't have duplicate keys, adding a key value pair whose key already exists overwrites the value
- Order of iteration is not guaranteed to be consistent
