---
layout: tour
title: "Operators are methods"
links:
- text: Style Guide - Method Invocation
  url: https://docs.scala-lang.org/style/method-invocation.html
- text: Tour of Scala - Operators
  url: https://docs.scala-lang.org/tour/operators.html
code: |
  (1).+(2) //> 3
---

In Scala, primitives are represented as objects. (Although after compilation they use Java's primitives when possible for performance.)

Since they are objects, operators are simply method calls!

So `1 + 2` is simply calling a method named `+` on the object `1` (an `Int` literal)

e.g.

`1 + 2` is actually: `(1).+(2)`

Scala has precedence for operator-like methods (that will be discussed later) to support correct arithmetic operations.

This notation is called "operator notation" or "infix notation" and is not limited just to arithmetic operations, but this will be explained later.
