---
title: "Learning Go - For NodeJS Engineers (Part 1)"
date: 2018-05-24T01:00:00-07:00
path: /blog/learning-go-for-nodejs-engineers-part-1
excerpt: A comprehensive tutorial on learning Go from the perspective of Javascript.
tags: ["golang", "javascript", "nodejs"]
---

If you're a NodeJS engineer interested in learning Go, this article is for you! If you already know Go, this article isn't for you.

To learn Go concepts and terminology this article contains some Javascript subtitles to present the contrasting term and concept in Go. I believe this approach will make it easier to relate to Go. However, as with learning and using any new language it's important to drop NodeJS semantics and idioms, and incorporate the [Go way](https://golang.org/doc/effective_go.html).

## Prerequisites
I assume you're familiar with Javascript. I don't expect you to know anything about the Go's ecosystem, syntax, semantics, the concept of pointers, and compiled languages. You'll learn all of this in this article.

I can't cover _everything_ so I'll just focus on the concepts that are relatable to Javascript. To direct curious readers in the right direction I have provided:
- resources and links throughout and at the end of each article so you can learn more
- "Pro Tip" sections explaining best practices, brief definitions, and "getting-started" advice

Let's get _Go'ing_!

## Where They're Similar
They both:
- utilize garbage-collection
- support asynchronous and synchronous API's
- contain similar types (like arrays, maps/objects) and flow control statements, but with small differences
- share the same syntax for comments (ie, `//` and `/* ... */`)
- have immediately invoked functions and closures
- share functionality of ES6's spread and rest operations (ie, ...args)
- share the concepts of functions as first-class citizens

## Where They're Different

### Language Type
JavaScript is interpreted. To run a program, the interpreter interprets the program as it's being executed.

Golang is compiled. To run a program, the compiler must be executed on source code first. If an error is encountered doing compile-time, the compilation fails and the errors are displayed. If it succeeds, the compiled code can be executed directly.

```
// compile 'main.go'
go build main.go
// then execute the binary 'main'
./main
// or compile, to memory, and execute 'main.go' together
go run main.go
```

### Type System
Javascript is dynamically-typed. You don't have to specify a variable's type. If you don't initialize a value for `var` or `let` variables they become `undefined` by default.

```
let x;
let y = 1;
const drink = 'espresso';
```

Golang is statically-typed. You must specify all types, except in cases where they can be inferred. Let's see some examples.

#### Zero-Valued Variables
Variables declared without an explicit initial value are given their zero-value:

```
var x int
```

`x` is 0 here, whereas in Javascript the `x` in `let x` is `undefined`. Zero values are a convenient way to set variables to default values without having to explicitly declare them (read [A Tour of Go- Zero Values](https://tour.golang.org/basics/12) to learn more about this).

> Pro Tip: The zero values for integers is 0, booleans are false, and strings are empty strings


#### Type Inferred Variables
For variables that are declared with an explicit initial value, the type can be omitted.

```
var x = 1
```

The compiler sees, "oh an integer, then x must be an integer."

#### Short Assignment Variables
If variables are declared within a function, the `:=` short assignment statement can be used in place of a `var` declaration.

```
x := 1
```

The type is inferred from it's value. This is a super handy way to declare a variable with less code.

#### Function Arguments And Return Values
The types of function arguments and return values must be specified.

```
func drink(cups int, fluid string) string {
  // ...
}
```

This function expects two arguments; the first is an integer, the second is a string, and the return type is a string. You can also declare variables for the return types. This allows you to use them inside the function. For example:

```
func drink(cups int, fluid string) (sound string) {
  // use the `sound` string
  sound = "gulp"
  return
}
```

You may return without specifying the return variables; the compiler knows to return it's value in the correct order.

By reading the function signature you know exactly what it takes and returns.

```
drink(2, "coffee")   // all good
drink("2", "coffee") // all bad: "2" is a string, not an int
```

The compiler throws an error anytime a function is given the wrong argument types, like drink above, or returns the wrong type. Once you start working in Go you'll really appreciate the type safety. When it catches your error you'll jump in joy!


### Dependency Management
Javascript uses npm to create a `node_modules` directory to keep dependencies within a project's directory. This keeps a project's dependencies isolated from other projects. You could install dependencies globally, but it's not recommended.

In Go, dependencies are installed globally. A simple command of `go get <domain.com>/<remote-package-name>` will download the latest versioned package to a single workspace directory that the `$GOPATH` variable is set to. Here, all Go source code is stored. Unfortunately, all projects reference a single version of the same package.

Some Go developers considered this an issue. So, many dependency management tools were created. Unlike npm, Go doesn't have an official dependency management tool yet (read more about [Golang workspaces](https://golang.org/doc/code.html#Workspaces)).

> Pro Tip: When installing Go, make sure to correctly set up your workspace and Go environment variables

> Edit: As of January 2019, Golang version 1.11 supports versioned modules; improving the issue of global dependencies

### Modules
To achieve encapsulation, Javascript enforces one module per file and one file per module. Functions and variables in modules have to be explicitly exported using one of the module patterns. For example:

```
module.exports = Dude
exports.drink = drink
```

In Go, there are packages and they work a little different than Javascript modules. A package consists of a directory and all files within it that contain the same package name share variables and types. So there is no need to import between files like you do in Javascript.

A package that wants to export their types and variables so other packages can use them must do so explicitly. Go follows a very simple protocol to exporting- __any name that begins with a capital letter is exported__. Any functions and types that are lowercased are not.

```
package dude

// Exported struct
type Dude struct {
  Name string    // exported
  Money float64  // exported
  hobby string   // not exported
}

// Exported function
func Drink() string {
  return "slurp"
}

// Not exported
type surfboard struct {}
func eat() string {}
```

In another package you'd use it like this:

```
import "github.com/surfer/dude" // import "dude" package
surfer := dude.Dude{"Duke"}
surfer.Name // "Duke"
dude.Drink() // "slurp"
```

Referencing any lower-cased variables or types will return an undefined error.

> Pro Tip: Only export what you need to export, keep everything else within the package

### Execution
In NodeJS, you can execute any `.js` file. In Go, the only files you can execute are Go binaries and files within main packages that contain the main function. Whew, that's a lotta mains mane!

```
// main.go
package main

import "fmt"

func main() {
    fmt.Println("Hello world!")
}
```

Then run it with go run main.go or compile it with `go build main.go` and execute the binary with `./main`.

> Pro Tip: `run` is a common command. Make sure to utilize all other available Go commands. There are some really cool ones; especially `fmt` and `doc`.

> Pro Tip: The main file can be named anything you want but it's best practice to name it `main.go`.

### Arrays & Objects
In Javascript you simply declare dynamic arrays and objects like,

```
const array = [];
const obj = {};
```

and you're good to go. You can simply add items as you see fit.

Go handles these data structures a little differently by allowing you to specify how Go should resize them. Arrays are rarely directly used because they cannot be resized. Instead, Go introduces slices to achieve dynamically-sized arrays. Objects in Javascript are Go maps.

You can declare slices and maps using what is called "composite literals", but as we'll see next you'll most often use the `make` function. We'll talk about composite literals when we get to structs.

#### Arrays
Arrays are simply created by specifying the type and the element count.

```
var x [5]int
fmt.Println(len(x)) // prints 5
fmt.Println(cap(x)) // prints 5
fmt.Printf("%v", x) // prints [0,0,0,0,0]
```

This is an array of five zero-valued integers.

> Pro Tip: The `cap` function tells you the capacity of the underlying array. `len` tells you how many items are in the array.

In the previous example you can only retrieve and mutate indices zero to four. We cannot add new integers nor change it's capacity or length. If you want a dynamic array you'll use slices.

#### Slices
Creating a slice is very similar to an array. You just omit the element count.

```
var x []int
fmt.Println(len(x)) // prints 0
fmt.Println(cap(x)) // prints 0
fmt.Printf("%v", x) // prints []
```

We can now start appending items into the slice with the built-in append function.

```
x = append(x, 1)
fmt.Printf("%v", x) // prints [1]
```

Creating a slice like this works for cases when you want to start with a zero length and capacity. To allocate a zeroed array with a custom length and capacity larger than zero you'd use the function `make`. This function returns a slice that refers to that array.

```
x := make([]int, 0, 5)
fmt.Println(len(x)) // prints 0
fmt.Println(cap(x)) // prints 5
fmt.Printf("%v", x) // prints []
```

The first argument is the type. The second is the slice length and the third is it's capacity. If the initial slice length and capacity are the same you can omit the third argument.

```
x := make([]int, 5)
fmt.Println(len(x)) // prints 5
fmt.Println(cap(x)) // prints 5
fmt.Printf("%v", x) // prints [0 0 0 0 0]
```

If we use the append function and expect to see that integer at the zero index you will be surprised at the result.

```
x := make([]int, 5)
x = append(x, 1)
fmt.Printf("%v", x) // prints [0 0 0 0 0 1]
```

The reason for this is because initial length was 5. Appending to this slice will only append to this length. If you want to change the items from index 0 to 4 you must do so by indexing.

```
x[0] = 1
fmt.Printf("%v", x) // prints [1 0 0 0 0]
```

> Pro Tip: Utilize the capacity argument when you know the number of items that will be in the array. Consider indexing to update each index in the slice and use `append` when you want to, well, append. At times when you don't know the capacity of the slice, initialize a slice with a smaller length, a reasonable capacity, use `append`, and let Go resize the slice for you.

> Pro Tip: When you append an item to a slice that makes it's length exceed it's capacity, Go will resize the underlying array for you with the new capacity set to the previous capacity multiplied by two. So `make([]int, 2)` that gets appended a third item will now have a capacity of four with a length of three.

Slices are just references to arrays. To confirm this I will take a slice from another slice or array, change an element in the sliced version, and see it affect the source. Go provides a slice expression that allows you to "slice" an existing array or slice by using a start and end index delimited by a colon. This will return a slice. For example:

```
x := [3]int{1,2,3} // an array
y := x[2:3] // slice from index two up to three, exclusive
fmt.Println(x) // [1 2 3]
fmt.Println(y) // [3]
```

If we change elements within the slice it will also be reflected in the array it is referencing.

```
y[0] = 4
fmt.Println(x) // [1 2 4]
fmt.Println(y) // [4]
```

This is a very common "gotcha" so I think it's important to cover in an introduction to Go. If you're interested in copying slices so that the destination slice does not reference the source slice you will use the built-in `copy` function.

#### Maps
The `make` function can also be used for maps and is useful to specify it's initial capacity to allocate and initialize a new hash map

```
x := make(map[string]int, 5)
fmt.Println(len(x)) // prints 0 since it has no key-value pairs yet
fmt.Printf("%v", x) // prints map[]
```

If you don't need to specify it's initial capacity, you're free to initialize a zero-length, nil-capacity map using a map literal

```
x := map[string]int{}
fmt.Println(len(x)) // prints 0 since it has no key-value pairs yet
```

> Pro Tip: Utilize the capacity argument when you know the number of key-value pairs that will be in the map.

### Prototypes & Classes
Javascript has many different ways to declare objects that can be instantiated.

```
// Pseudoclassical
var Dude = function(name) { this.name = name }
Dude.prototype.name = function() { return this.name }

// Or as a class
class Dude {
  constructor(name) { this.name = name }
  name() { return this.name }
}
```

Go doesn't have classes. It has structs instead and methods are defined on them.

```
type Dude struct {
  Name string
  Money float64
}

func (d Dude) Balance() float64 {
  return d.Money
}
```

Notice how the function, `Balance`, has the struct `Dude` before it in parenthesis? We say `Balance` has a receiver of type `Dude` named `d`. In this function, we have access to the struct's fields using the receiver variable and dot notation like so - `d.Money`. To relate this concept to Javascript you can think of the `d` as Javascript's `this`. It would then look like this:

```
func (this Dude) Balance() float64 { return this.Money }
```

However, in Go it's best practice to use short variables that contain the same letter(s) as it's type; similar to the previous example.

The function `Balance` was a getter function and just returned `d.Money`. What if we wanted to provide a setter function and change `d.Money` instead? If this was a method in Javascript, you'd simply change the property. In Go, manipulating values of struct fields is done a little differently. I'll explain why and how when we get to the Pointers section.

### Constructors
In Javascript you can create an instance of a class in various ways. However, in Go there are no constructors. Instead, you create composite literals or factory functions to create instances of a struct. Here's an example for composite literals:

```
dude := Dude{Name: "Keith", Money: 0}
```

If you provide all the arguments to the composite literal you can get rid of the struct field names. It then becomes:

```
dude := Dude{"Keith", 0}
```

We can do better! If you don't mind fields to be their default values (zero-values) just omit them. It then looks like:

```
dude := Dude{Name: "keith"}
dude.Money == 0 // returns true
```

`dude.Money` implicitly becomes it's zero-value, 0. In this approach you must provide the struct field name. Otherwise which field would the compiler know to apply the values to?

```
dude := Dude{"Keith"} // compile error
```

Go does have a `new` function but it allocates memory for a type and return it's address (a pointer). I won't cover `new` in this article; you'll see it Part 2.

### Flow control
#### For-Loop
To iterate over collections you can use a `for` loop or `range`. These collection types include:
- arrays
- slices
- maps
- channels (in Part 2)

```
// Traditional C-style for-loop
for i := 0; i < 10; i++ {
  fmt.Println(i) // this is similar to JS's "console.log"
}
// With arrays or slices
for i, v := range []string{"one", "two", "three"} {
   // "i" is the index, "v" is the item
}
// With maps
for k, v := range map[string]string{"coffee": "iced", "tea": "hot"} {
  // "k" is the key, "v" is the value
}
```

Like Javascript, Go uses the underscore as a blank identifier to ignore variables we don't intend to use:

```
for _, v := range []string{"one", "two", "three"} {
   // we only want "v", the index is ignored
}
```

If we left the first variable in and didn't use it the compiler would complain.

#### While
Go doesn't have a `while` construct. It really doesn't need one since `for` loops basically do the same thing. So, in Go you'd use a `for` loop to achieve a continuous loop. When you wan't to stop the loop, you can break from it or set the initial conditional to false.

```
surfing := true
for surfing {
  // do work while surfing
}
```

Or:

```
for {
  // run until explicitly broken out of
}
```

#### Switch
Go's switch statement is similar to Javascript's but with small differences:

```
n := 3
switch n % 2 {
case 0:
  return "even"
default:
  return "odd"
}
```

In Javascript, the execution of code falls through into the next case unless a break or return exists. So, fallthrough's are implicit.

In Golang, you don't need to break at the end of each case; they're implicit. A matching case will only match that case and exit the switch statement. If you want the functionality of a `fallthrough` you must explicitly add that term to the case.

To handle multiple cases at once separate them with commas like so:

```
case "lions", "tigers", "bears":
  response = "oh my"
```

### Type Checking And Assertions
In Javascript, you can use `typeof` to retrieve the type of a variable and `instanceof` to test whether the prototype property of a constructor appears anywhere in the prototype chain of an object.

In Golang, you simply check a variables type by using a type assertion in the form of `x.(T)` where `T` is the type and `x` is the variable.

```
x := "1" // string type
n, ok := x.(int)
if !ok {
  // oh no it's not an integer
}
```

If `ok` is true, then `n` is for sure an integer. We can then utilize it correctly such as pass it to functions that accept an integer or perform math with it. If `ok` is false, like the case above, then we couldn't do that.

There will be times when you may not know the type and using multiple type assertions for each type would be cumbersome. In this case you'd use a "type switch".

```
n := "secret"
switch n.(type) {
case int:
  return "n is an integer"
case string:
  return "n is a string"
case Dude:
  return "n is a Dude struct type. You can use it's methods"
default:
  return "unknown"
}
```

Here, each case corresponds to a type we're asserting. When a case matches, we know the type and can act accordingly. Also note the third case; the "type switch" can match on types you or others have defined as well.

## Part 1: Conclusion
In this article we've discussed Go's:
- compiled language type
- static type system
- zero-values
- dependency management
- importing and exporting packages
- compiling and executing Go binaries and packages
- structs, arrays, slices, maps
- flow control
- type checking and assertions

We've covered a lot in this article. If you're unsure about a concept go back to the section, read it again, and follow the links and tips I've provided to learn more. If you'd like a more in-depth article in a specific topic just let me know on Twitter.

We aren't finished yet. We actually just touched the basics. In Part 2 we will discuss more advanced topics such as error handling, interfaces, pointers and references, and concurrency.

Stay tuned for this article! In the meantime, head over to the official [golang.org](https://golang.org) site and the golang wiki to learn more.

🤙 Mahalo for reading!