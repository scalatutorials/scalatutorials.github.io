---
layout: tour
title: "Classes"
code: |
  //Simple class that does nothing
  class Person(fname:String, lname:String)
  val p1 = new Person("Alice", "In Chains")
  //p1.fname / lname is not accessible

  //A class with a method
  class Person2(fname:String, lname:String){
    def greet = s"Hi $fname $lname!"
  }
  val p2 = new Person2("Bob", "Marley")
  println(p2.greet)
  //p2.fname / lname is not accessible

  //A class with a public read only variable
  class Person3(fname:String, lname:String){
    // a public read only field
    val fullName = s"$fname $lname"
    def greet = s"Hi $fullName!"
  }

  val p3 = new Person3("Carlos", "Santana")
  println(p3.greet)
  println(p3.fullName)
  //p3.fname / lname is not accessible

  //auto creates a getter for fname, and getter + setter to lname
  class Person4(val fname:String, var lname:String)

  val p4 = new Person4("Dave", "Matthews") {
    //override the default string representation
    override def toString = s"$fname $lname"
  }
  println(p4.fname)
  println(p4.lname)
  //lname is defined as var, so it has a setter too
  p4.lname = "Grohl"
  println(p4)
---

- classes can be defined with a minimal amount of code
- the class body is also the default constructor's implementation
- automatic getters are generated for the class parameters defined using `val`
  e.g.

```scala
class Person(val name:String) //generates a private `name` variable, and a getter with the same name
```
- automatic getters and setters are generated for class parameters defined using `var`
  e.g.

```scala
class Person(var name:String) //generates a private name variable, a getter and a setter with the same name
```

- *Important Note:* the private variable with the same name as the automatic getter and setter exists only in byte code. It's not possible to recreate it using explicit Scala getters and setters (having a method and a variable of the same name violates the uniform access principle, and Scala's scoping rules). To create explicit getters and setters - the private variable must have a different name, some like to add an _ before it to designate it is private and local and avoid naming conflicts with public methods
- everything is public by default unless explicitly declared otherwise
