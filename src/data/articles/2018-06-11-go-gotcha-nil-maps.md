---
title: "Go Gotcha: Nil Maps"
date: 2018-06-11T01:00:00-07:00
path: /blog/go-gotcha-nil-maps
excerpt: Common beginner mistakes around declaring, initializing, and allocating map types.
tags: ["golang"]
---

A common beginner mistake in Go is forgetting to allocate the space for a `map`. Declaring variables with the map type will only default the `map` to `nil`. If you add an item to a `nil` map you will get a panic error. Let's see some examples of using maps correctly and incorrectly.

## How To Use Maps Incorrectly
Consider this `map` declaration:
```
var bankAccounts map[string]float64
```
We've declared the variable `bankAccounts` of type `map`. If we try to add an item to this `map` we'll get an error.
```
bankAccounts["123-456"] = 100.00
panic: assignment to entry in nil map
```
Since we didn't initialize the map it is `nil` by default.

Consider this next example; another common mistake. We have this Person struct:
```
type Person struct {
  Name string
  BankAccounts map[string]float64
}
```
Let's initialize a new Person, with only a name, and immediately add an item to the `Person.BankAccounts` map.
```
p := Person{Name: "Keith"}
p.BankAccounts["123-456"] = 100.00
```
We initialized the struct so the map should be initialized as well, right? Let's build it and see if it succeeds.
```
panic: assignment to entry in nil map
```
Whoops! No. The oversight here is not explicitly allocating and initializing the map. Again, we tried to add an item to a nil map and our program panicked. Now let's see how to handle maps correctly.

## How To Use Maps Correctly
Maps, under the covers, reference data structures that must be initialized before use. There are two options we can pursue:
- use the built-in `make` function
- use a map literal

### The Built-In `Make` Function
The definition of `make` is:
> Allocates and initializes an object of type slice, map, or chan (only). An empty map is allocated with enough space to hold the specified number of elements. The size may be omitted, in which case a small starting size is allocated.

By simply calling this function with an initial capacity we can start utilizing the map immediately.
```
var bankAccounts map[string]float64
bankAccounts = make(map[string]float64, 1)
bankAccounts["123-456"] = 100.00
```
We allocated and initialized a map with enough space to hold one element. We then successfully added a new element afterwards. Let's see the previous example where we used a Person struct type.
```
p := Person{Name: "Keith"}
p.BankAccounts = make(map[string]float64, 1)
bankAccounts["123-456"] = 100.00
```
Once again we made sure we allocated and initialized the map. We can improve the previous example by initializing a map when we initial a Person.
```
p := Person{Name: "Keith", BankAccounts: make(map[string]float64, 1)}
```
This will work as well; either way works. Using `make` is ideal when you know the number of elements will be added to the map.

### A Map Literal
If we don't know the initial size we can omit the size in the `make` function or use a map literal instead.
```
p := Person{Name: "Keith", BankAccounts: map[string]float64{} }
```
This is a smaller map that will grow as we add items to it.

Sometimes you may not want to or cannot immediately initialize a map when you initialize the struct it's contained within. In any case, you must do so when you first use the map.
Let's, again, initialize a new Person:
```
p := Person{Name: "Keith"}
```
Later in your code you want to add an item to the `Person.BankAccounts` map. Before doing so you remember, or check, that it's nil so you initialize a new map using `make` or a map literal.
```
bankAccts := make(map[string]float64, 2)
bankAccts["123-456"] = 100.00
bankAccts["456-789"] = 75.00
p.BankAccounts = bankAccts
```

## Make vs Map Literal?
Most of the time you'll use `make`; especially if you know the number of elements you'll be adding to the map. Remember, the second argument to `make` is the initial size, not the max number of elements a map can hold. A map will grow as it's capacity gets fuller.

What if you don't know the number of elements, what do you provide as the initial size to `make? You could use a small number, zero, or omit it entirely. Note that using zero or omitting the size (ie,`make(map[string]float64)`) is fundamentally the same as using map literals (ie, `map[string]float64{}`).

## Conclusion
Forgetting to initialize maps is often overlooked. Just remember to always initialize maps when you can and check for nil maps (ie, compare the map to nil) to initialize maps before using them. Utilize the make function when you know the size.