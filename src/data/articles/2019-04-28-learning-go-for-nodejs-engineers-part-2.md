---
title: "Learning Go - For NodeJS Engineers (Part 2)"
date: 2019-05-06T01:00:00-07:00
path: /blog/learning-go-for-nodejs-engineers-part-2
excerpt: A comprehensive tutorial on learning Go from the perspective of Javascript.
tags: ["golang", "javascript", "nodejs"]
---

In [Part 1](/blog/learning-go-for-nodejs-engineers-part-1) we covered the following Go topics:
- compiled language type
- static type system
- zero-values
- dependency management
- importing and exporting packages
- compiling and executing Go binaries and packages
- structs, arrays, slices, maps
- flow control
- type checking and assertions

In Part 2 we will cover:
- pointers & pointer receivers
- interfaces
- error handling
- concurrency

## Pointers

One major difference between Javascript and Golang is the concept of pointers. In Javascript, you don't have to worry about pointers. Everything, except arrays and objects, is passed by its value. For example:

```
function changeHobby(old) {
  old = "golang"
}
let old = "node"
changeHobby(old)
console.log(old === "golang") // prints false
```

The function `changeHobby` mutates the `old` argument. The changes are only applied to that scoped variable and not to the same named variable outside the function because it was copied to it. The same functionality applies to this function if it was translated to Golang.

```
func changeHobby(old string) {
  old = "golang"
}
old := "node"
changeHobby(old)
fmt.Println(old == "golang") // prints false
```

### Pointers and Functions

In Golang, you can mutate the value at the address of a variable by using a pointer. A pointer is an object that contains the memory location of a variable.

```
func changeHobby(old *string) {
  *old = "golang" // go to the memory address and change it
}
old := "node"
changeHobby(&old) // provide a pointer
fmt.Println(old == "golang") // prints true
```

We provide `changeHobby` a pointer as an argument. It then takes the value at the address of `old` and replaces it with "golang".

> Pro Tip: The `&` operator references the address of a value and the `*` operator references the value at an address. I like the think the "a" in ampersand represents the "a" in address. This helps me differentiate between the two.

### Pointers and Methods
In Javascript, you can change instance properties by simply changing it. Consider this pseudoclass:

```
const Dude = function(hobby) {
  this.hobby = hobby
}

Dude.prototype.changeHobby = function(newHobby) {
  this.hobby = newHobby
}

const dude = new Dude("node")
dude.changeHobby("golang")
console.log(dude.hobby === "golang") // prints true
```

In Go, you use [**pointer receiver methods**](https://tour.golang.org/methods/4) to mutate the field values of a struct. For example:

```
type Dude struct {
  Hobby string
}

func (d *Dude) changeHobby(h string) {
  d.Hobby = h
}

d := Dude{"node"}
d.changeHobby("golang")
fmt.Println(d.Hobby == "golang") // prints true
```

The method `func (d *Dude) changeHobby` is a pointer receiver method and uses a pointer (`d`) to mutate the values on the `Dude` struct.

> Pro Tip: The obvious use case for pointer receiver methods is to mutate the receiver. If in doubt, use a pointer receiver. Learn more about when to use pointer receiver methods in the [Go wiki](https://github.com/golang/go/wiki/CodeReviewComments#receiver-type)

## Interfaces

Javascript doesn't have interfaces (except for Typescript) but I think it's an important concept to introduce in an introduction to the Go language. Consider this struct:

```
type Human struct {}
func (h *Human) Greet() string {
  return "Hello" 
}
```
Let's create a function to accept the `Human` struct as an argument:

```
func Shout(h Human) string {
  return d.Greet() + "!"
}
```

`Shout` is a simple function that accepts a `Human` and appends "!" to the string returned by `Greet`. Now, what if we wanted this same function to accept other types as well, how do we accomplish that? We could duplicate this function to accept a different struct type but that goes against the DRY principle. What do we do? Enter interfaces.

A Go interface is a set of method signatures. A method signature defines a method name, the cardinality of arguments and the types of each. An interface describes the *behavior* of a type. Any type that implements *every* method in an interface definition is considered to satisfy that interface. Let's look at an example.

```
type Talker interface {
  Greet() string
}
```

The `Talker` interface has one method, `Greet` that returns a string. `Greet`'s method signature is that it takes zero arguments and returns a string. The `Human` struct we created above satisfies the `Talker` interface because it implements all methods defined in the interface. 

Let's create another struct that also satisfies this interface.

```
type Dog struct {}
func (d *Dog) Greet() string {
  return "Ruff" 
}
```

Now we can alter the `Shout` function to accept `Talker`'s.

```
func Shout(t Talker) string {
  return t.Greet() + "!"
}
```

We can now provide the function any type that satisfies this interface.

```
Shout(Human) // returns "Hello!"
Shout(Dog) // returns “Ruff!"
```

Interfaces are great for achieving modularity, eliminating duplication, and mocking and stubbing in tests.

## Error Handling

In Javascript, there are various ways to handle errors. Depending on the approach and context you can use:

- `try`: to call functions that may throw errors themselves
- `catch`: to catch those errors
- `throw`: to throw errors
- the error argument in a callback
- the `catch` in Promises

### Throw

Let's look at a Javascript function that throws an error:

```
function divide(a, b) {
  if (b === 0) {
   throw new Error("Cannot divide by zero")
  }
  return a / b
}
```

`divide` divides two numbers but throws an error if the second argument is zero. A client invoking this function should be cautious since it's possible it could crash the program if the error is not avoided or is not handled correctly. Constructs like `try` and `catch` would need to be used to prevent this from happening.

Golang handles errors quite differently from Javascript. It does have a construct called `panic`, that is loosely analogous to `throw`, but it is rarely used. Actually, how you use `throw` in Javascript is different than how you use `panic` in Go. The only cases I see `panic` being used is when it's not possible for your code or others integrating your code to continue. We'll soon revisit how programs can recover from `panic`'s.

So if `panic` and `throw` aren't synonymous how should you handle errors? The Go convention for notifying callers that an error was encountered is for functions to return a tuple. That tuple contains one or more values for the success and a single value for the failure. The right-most value represents the failure and it is always an `error` type. Let's see an example.

```
func divide(a int, b int) (int, error) {
  if b == 0 {
    return -1, errors.New("Cannot divide by zero")
  }
  return a / b, nil
}
```

The `divide` function returns an `int` and an `error`; in that order. It doesn't raise an exception. The caller can be confident that it will not crash the program if it provides a zero as the second argument. The way you call this function looks like this:

```
n, err := divide(1, 2)
```

`n` is the integer result and `err` is the error result. The existence of the error tells the caller something didn't go right. A `nil` value means that there was no error. An error exists if it is not `nil`.

```
n, err := divide(1, 2)
if err != nil {
  fmt.Println("Whoops, there was an error")
  return
}
fmt.Printf("The answer is %d", n)
return
```

After calling the function we immediately check if an error exists. We then handle it accordingly. Of course, the code above does not produce an error but providing the function with zero as the second argument would. 

> Pro Tip: The Go convention is to handle errors immediately after they are encountered. You are discouraged from ignoring errors or simply just relaying them back to callers.

For fun, let's rewrite the code above to show a common practice when using if-conditionals:

```
if n, err := divide(1, 2); err != nil {
  fmt.Println("Whoops, there was an error")
} else {
  fmt.Printf("The answer is %d", n)
}
return
```

This is called a *compound if-statement* and it is super helpful if you only need the variables within the conditional and not outside it. After this conditional, the two variables `n` and `err` are not accessible because they'll be garbage collected. This neat feature isn't possible in Javascript.

Let's revisit `panic`. 

### Panic 
We will rewrite our `divide` function to use `panic`:

```
func divide(a int, b int) int {
  if b == 0 {
    panic("Cannot divide by zero")
  }
  return a / b
}
```

It now returns an integer and panics if `b` is zero. Now, if you did invoke this function with zero as the second argument how would you recover from this error? You would use `defer` and `recover`.

> Pro Tip: Only use a `panic` if it's best the program should crash immediately. Furthermore, when using a `panic` never assume a caller can resolve the error.

### Defer
Javascript does not have a similar feature to `defer` so I'll just have to explain how it works. `defer` is a keyword that is prepended to a function allowing it to be executed after the surrounding function returns. `defer` is commonly used to simplify functions that perform various clean-up actions or to recover from panics. Let's see an example.

```
func createFile(filename string) error {
  file, err := os.Create(filename)
  if err != nil {
    return err
  }
  defer file.Close()
  return nil
}
```

This function creates a file, checks for an error and returns it if one exist, runs `defer file.Close()`, then returns `nil`. The `defer` section allows the function `file.Close()` to be called after the surrounding function, `createFile`, returns. No matter what happens in this function, success or failure, `file.Close()` will be called. As a result, the file will always be closed after this function finishes. Neat huh? You'll see this a lot in I/O, concurrency, and exception recovery operations. Let's now see how this works with `panic` and `recover`.

### Recover
`recover` is a built-in function that regains control of a panicking goroutine. Recover is only useful inside deferred functions. Let's see an example by combining the above code with our `divide` function to create a file and write the contents of the `divide` function to it. I've redacted some of it to only show how we're using `recover`.

```
func createFile(filename string) (err error) {
  defer func() {
    if r := recover(); r != nil {
      fmt.Println("Recovered from divide. Got error- ", r)
      err = errors.New("File could not be created")
    }
  }()

  // ...

  n := divide(1, 0) // this will panic

  // ... code after this will not execute
}
```

The first operation you see is a `defer` with an anonymous function. I'll explain the details of the contents of this function in a second. It then does some other stuff and eventually calls the `divide` function with zero as the second argument to cause it to panic.

In the anonymous function we call the `recover` function. `recover` returns either `nil` or a string that was produced from a panic. If it returns `nil`, no panic was produced. If not, you have a chance to inspect the panic details and resume normal execution. Since a panic occurred in this code we print the panic details and return an error to the caller. The output of the above code is this:

```
"Recovered from divide. Got error- Cannot divide by zero"
```

> Pro Tip: Deferred functions have access to the variables within the function it was called in. The deferred function above set the return error value to an error. You learned about named return values in Part 1.

That's all for error handling in this article. Let's summarize it because we covered a lot: functions should avoid using `panic` but instead return a tuple that contains one or more success values and a single `error` value as the right-most value. Callers should always immediately check for an error and respond appropriately.

> Pro Tip: Surprisingly, there's really nothing unique about the `error` type. It's actually an interface (see the [built-in `error` interface](https://golang.org/pkg/builtin/#error) for more details). This interface is the simplest to satisfy as it only has a single method, `Error() string`. There are some really neat ways to implement and handle errors. Make sure to check out more practical examples at the Golang [blog](https://blog.golang.org/error-handling-and-go) and [wiki](https://github.com/golang/go/wiki/Errors).

## Concurrency
Javascript's event loop and the use of callbacks and promises allow it to accomplish concurrency.

```
function run(i) {
  console.log(i)
}

console.log(0)
for (let i = 1; i < 5; i++) {
  setTimeout(run.bind(null, i), 0)
}
console.log(5)
``` 

We use `setTimeout` as an asynchronous function to place the `run` functions on the callback queue within the event loop. The result of this code is:

```
0
5
1
2
3
4
```

Integers 0 and 5 were run synchronously and 1 through 4 were run asynchronously. To accomplish similar functionality in Go we'll use a goroutine.

### Goroutine
A goroutine is a lightweight thread managed by the Go runtime. Creating a goroutine is as simple as prepending a function with the `go` keyword. 

```
go helloWorld()
```

And that's it! Let's rewrite the Javascript code above to use goroutines.

```
func run(i int) {
  fmt.Println(i)
}

fmt.Println(0)
for i := 1; i < 5; i++ {
  go run(i)
}
fmt.Println(5)
time.Sleep(time.Millisecond)
```

This runs four goroutines concurrently. We added a `time.Sleep` function call to sleep one millisecond because otherwise this code would finish and exit before the goroutines would themselves finish. However, the use of sleep calls to wait for goroutines to finish is an anti-pattern. 

To improve this code we need to get notified when these goroutines finish and wait until they do. We can communicate with goroutines by using [channels](https://tour.golang.org/concurrency/2). Explaining channels and the many other concurrency constructs are outside the scope of this article, so we'll end our discussion of concurrency here.

> Pro Tip: The `main` function is itself a goroutine. Once this function returns any and all child goroutines get terminated 

## Part 2: Conclusion
In this article we’ve discussed Go’s:
- pointers & pointer receivers
- interfaces
- error handling
- concurrency

Like Part 1, we’ve covered a lot in this article. If you’re unsure about a concept go back to the section, read it again, and follow the links and tips I’ve provided to learn more. If you’d like a more in-depth article in a specific topic just let me know on Twitter.

If you've come to the point where you're considering learning Golang take a look at the following resources. They are the perfect place to start next.

- [Official Documenation](https://golang.org/doc)
- [Golang Wiki](https://github.com/golang/go/wiki)
- [Go Playground](https://play.golang.org/)- to quickly test, run, and share code snippets