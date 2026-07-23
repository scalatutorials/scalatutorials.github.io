---
layout: tour
title: "Variables"
code: |
  var x = 1 + 2 //> x = 3
  println(x)
  x = 3 * 4 //> x = 12
  println(x)
---

Variables are declared using the `var` keyword.

In many cases, the type information can be omitted, thanks to Scala's type inference.

To declare a variable with explicit type, put the type after the variable name following a colon `:`

e.g.

```scala
var x: Int = 1 + 2
```

<div class="callout">
<strong>Tip:</strong> Adding an explicit type is a matter of preference: on one hand it helps "document" your code, on the other hand it might make it more "cluttered". Use judgment: e.g. add explicit types to public interfaces and APIs, and skip them for internal implementation.
</div>
