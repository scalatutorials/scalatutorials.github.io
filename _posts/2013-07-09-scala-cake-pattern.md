---
layout: post
title: "Scala Cake Pattern"
description: ""
category: Code
tags: [scala]
---

I've been trying to understand the [cake pattern] (http://www.cakesolutions.net/teamblogs/2011/12/19/cake-pattern-in-depth/) in Scala for some time, and until I didn't sit and write some code, it didn't click. Here is my attempt to explain it (to myself mostly) hope it might help others get a better understanding of this interesting pattern.

### What is it for? 

Dependency injection, "the scala way" (among other possible usages, but this post focuses on this one)

### What is Dependency Injection? 

The reverse of look-ups / named dependencies, e.g. if class X needs a database connection and gets it using 

```scala

   val con = DBConnectionRepository.getByName("appDBConnection")
   
```
then this is not dependency injection, it is coupled to the repository, and to the name (can't ever change it...)

Dependency injection tries to solve this coupling by reversing the direction, instead of having a component lookup a dependency, it has a "plug" (constructor / setter) for the dependency, and "someone else" should inject it in (developer, framework, etc), one simple way of doing so is by non optional constructor argument, another way is an abstract def. There are many other ways doing it (Spring, CDI, Guice) but this post will focus on a pattern called "the cake pattern" 
    
### What's with the "cake" anyway?

Good question, not sure what is the etymology, this [comment](http://jonasboner.com/2008/10/06/real-world-scala-dependency-injection-di/#comment-433064471) is all I found 

### Why not use `extends`?

So first thing, why do we need injection? why not just extend a trait we need to use or "inject"? since we can extend multiple traits, and each can have implementations, isn't that enough?

Well, let's see:

Let's assume we have a dependency:

```scala 

trait FooAble {
  def foo() = "here is your foo"
}

```

And something that uses it 

```scala 
class BarUsingFooAble extends FooAble {
  def bar() = "bar calls foo: " + foo()
}
```
And client code 

```scala 
object Main {
  def main(args: Array[String]) {
    val barWithFoo = new BarUsingFooAble
    println(barWithFoo.bar())
  }
}
```

What is the problem? well, first, you are stuck with this specific `FooAble`, if you want something that extends / implements `FooAble` you need to modify the class or create another one, but this is not exactly dependency *injection*, the user of the dependency declares it specifically, it's not injected. 

### Why not use `with`?

Why can't we use `with` then? e.g. 


```scala 
object Main {
  def main(args: Array[String]) {
    val barWithFoo = new BarUsingFooAble with FooAble 
    println(barWithFoo.bar())
  }
}
```

```scala 
class BarUsingFooAble {
  def bar() = "bar calls foo: " + foo()
}
```

Well, this of course doesn't compile, as BarUsingFooAble doesn't have a method `foo` defined...

### Why not use abstract methods then?

Dependency

```scala

abstract class BarUsingFooAble {
  def bar() = "bar calls foo: " + foo.foo()
  def foo:FooAble //abstract 
}
```


```scala 

object Main {
  def main(args: Array[String]) {
    val fooable = new FooAble {}
    val barWithFoo = new BarUsingFooAble{
      def foo: FooAble = fooable 
    }
    println(barWithFoo.bar())
  }
}

```

Well, it works, but don't you rather use mixins over implementing abstract methods? (although eventually abstract methods will be used in some way, but stay with me)

### Self type annotations / Explicitly Typed Self References to the rescue 

Here is where self type annotations come to help 

```scala 

class BarUsingFooAble {
  this: FooAble => //see note #1
  def bar() = "bar calls foo: " + foo() //see note #2
}
```

```scala
object Main {
  def main(args: Array[String]) {
    val barWithFoo = new BarUsingFooAble with FooAble //see note #3
    println(barWithFoo.bar())
  }
}
```

**Explanation:**

So what just happened here? what is this `this: FooAble =>` thing? Well, it basically means that this class declares that it will eventually extend `FooAble` somehow (e.g. via `with FooAble`). 

What's the difference from extending it? as said above, `extends` is actually *extending* it and is very type specific. The self type annotation is just declaring that this type needs to extend / implement the annotated type, but it doesn't extend it yet. It lets you "inject" the extension, thus supports dependency injection.

**More details:**

1) you can use `this`, `self` or any identifier for the self type annotation see [here] (http://stackoverflow.com/a/4018995/239168) for more information (answer by Martin Odersky himself on SO)

2) now `BarUsingFooAble` asumes it was started with `with FooAble` (or something that extends it)

3) if you don't use `with FooAble` you'll get a compile error: 

> class BarUsingFooAble cannot be instantiated because it does not conform to its self-type BarUsingFooAble with FooAble

### Multiple Implementations

Let's make `FooAble` abstract to better illustrate the benefit of self type annotations over extension

```scala 

trait FooAble {
  def foo() : String
}

```

And have some concrete implementation 

```scala 
trait MyFooAble extends FooAble {
  def foo() = "foo impl"
}

```

Now our client code won't compile because `FooAble.foo` is abstract 

It forces us to use an implementation (any implementation) 

So changing it to `with MyFooAble` (or any other implementation of FooAble) will work

```scala

object Main {
  def main(args: Array[String]) {
    val barWithFoo = new BarUsingFooAble with MyFooAble
    println(barWithFoo.bar())
  }
}
```
This is the greatness of dependency injection, `BarUsingFooAble` depends on a `FooAble` (any `FooAble` implementation) and the client is forced to mix one in.

### What about multiple injections?

Well, this is also possible, using `with`

e.g. 

Let's add another dependency 

```scala 
trait BazAble{
  def baz() = "baz too"
}

```

```scala
class BarUsingFooAble {
  this: FooAble with BazAble =>
  def bar() = s"bar calls foo: ${foo()} and baz: ${baz()}"
}
```

```scala

object Main {
  def main(args: Array[String]) {
    val barWithFoo = new BarUsingFooAble with MyFooAble with BazAble
    println(barWithFoo.bar())
  }
}
```

You can use this to "force" mix in of any number of dependencies this way

### Why not use constructor params then?

Good question, let's assume these 2 dependencies

```scala

trait FooAble {
  def foo() = "here is your foo"
}
trait BazAble{
  def baz() = "baz too"
}

```
And something that uses the dependency, declaring it in the constructor

```scala
class  BarUsingFooAble (dep:FooAble with BazAble) {
  def bar() = s"bar calls foo: ${dep.foo()} and baz: ${dep.baz()}"
}
```

And some client code

```scala

object Main {
  def main(args: Array[String]) {
    val barWithFooAndBaz = new BarUsingFooAble(new FooAble with BazAble)
    println(barWithFooAndBaz.bar())
  }
}

```
Is it better / worse than using type annotations? I would say it's a matter of style and preference, couldn't find any deeper difference (please feel free to comment if you do)

### Speaking of constructor params, why not use implicits?

There is a great [thread] (https://groups.google.com/forum/#!msg/scala-user/DC2vUuCZmI0/RO3JYoKnj20J) on this in the scala-user Google  group

### Taking it further

now that we got self type annotations covered, let's see how it can be used for real world dependency injection 

Wrap it in a component trait (abstract) 

```scala 

trait FooAbleComponent {
  val fooAble: FooAble
  class FooAble {
    def foo() = "here is your foo"
  }
}
```

```scala 
trait BazAbleComponent {
  val bazAble: BazAble
  class BazAble {
    def baz() = "baz too"
  }
}
```
Depend on the components

```scala 
class BarUsingFooAble {
  this: FooAbleComponent with BazAbleComponent =>
  def bar() = s"bar calls foo: ${fooAble.foo()} and baz: ${bazAble.baz()}"
}
```
Define the actual concrete implementation during injection time

```scala 

object Main {
  def main(args: Array[String]) {
    val barWithFoo = new BarUsingFooAble with FooAbleComponent with BazAbleComponent {
      val bazAble = new BazAble() //or any other implementation
      val fooAble = new FooAble() //or any other implementation
    }
    println(barWithFoo.bar())
  }
}

```

More on the rational above can be found in this [excellent article] (http://jonasboner.com/2008/10/06/real-world-scala-dependency-injection-di/)

That's it, piece of cake...

Is it the best way to do injection in Scala? I personally prefer using CDI and @Inject if I'm in a Java EE / CDI container, but not always this is possible, and it's nice to know the alternatives!

If you think I missed something / wrote something incorrect / utterly stupid please feel free to correct / suggest / improve in the comments below