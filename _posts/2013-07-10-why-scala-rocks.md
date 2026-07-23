---
layout: post
title: "Why Scala Rocks*"
description: ""
category: Code
tags: [scala]
---

<small>* a response to [Why Ruby Rocks](http://skofo.github.io/blog/why-ruby-rocks/)</small>

In case you are new to Scala, don't take it as a representing case, this is *not* idiomatic scala, and there are much better featrues making Scala a great language in my opinion.
Having said that, here are the 2 examples in the "Why Ruby Rocks" post, implemented in Scala:

***

### Automatic getters / setters

Just like in Ruby, the boilerplate of writing getters / setters for simple properties is eliminated. Scala automatically generates a getter and setter method (named the same as the member)  

```scala
class Person(var sanity:Int = 50)

object Main extends App {
  val programmer = new Person(50)
  programmer.sanity += 1000000
  println(programmer.sanity)
}
```
This is equivalent more or less to Ruby's `attr_accessor :sanity`

The syntactic desugar version of it is something (very roughly) like this: 

```scala
class Person(private[this] var _sanity:Int = 50) {
  def sanity:Int = this._sanity
  def sanity_= (sanity:Int) {this._sanity = sanity}
}
```

<div class="alert alert-error">
Note - idiomatic Scala discourages mutable objects, so prefer using <code>val</code> which is final and will only generate an automatic getter
</div>


### Dynamic methods 

The second example was Ruby's `method_missing`, here is the Scala equivalent more or less 

```scala 

import scala.language.dynamics
class Useless extends Dynamic {
  def applyDynamic(name: String)(args: Any*) {
    println(s"Sorry, I wish I could $name...")
    if (!args.isEmpty) {
      println(s"Here, you can have your ${args.mkString(", ")} back.")
    }
  }
}

object Main {
  def main(args: Array[String]) {
    val useless = new Useless
    useless.reticulate("splines")
  }
}
```

This will print pretty much the same as the Ruby example 


    Sorry!, I wish I could reticulate...
    Here, you can have your splines back.


<div class="alert alert-error">Note - don't do this unless you have a very good reason, it has performance and code smell issues</div>

There are of course many other features that make Scala "rock", which probably deserve a separate post.