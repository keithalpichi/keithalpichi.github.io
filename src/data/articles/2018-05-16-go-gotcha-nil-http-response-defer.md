---
title: "Go Gotcha: Closing a Nil HTTP Response Body With Defer"
date: 2018-05-16T08:00:00-07:00
path: /blog/go-gotcha-nil-http-response-body-with-defer
excerpt: "When handling HTTP responses it is important to check the errors first before handling the responses."
tags: ["golang"]
---

When handling HTTP responses it is important to check the errors first before handling the responses. Even if you defer to close the `io.Closer`, in this case a response body, you’ll be surprised what happens when it is nil. Avoiding this crucial step or assuming defer can deflect or handle errors will lead to a nasty panic; ultimately crashing your program. Let’s see an example of this.

## How To Do It Incorrectly

```go
res, err := http.Get("abc.com/coffee")
defer res.Body.Close()
if err != nil {
    // handle `err`
}
// do something with `res`
```

If this function returns valid responses and nil errors you won’t experience any issues. Cool! That is, until `res` is nil. When it is you’ll get a panic that looks something like this:

```go
PANIC: runtime error: invalid memory address or nil pointer dereference
```

If you follow the call stack you’ll be lead to the line `defer res.Body.Close()`. This error has occurred from trying to close a nil `io.Closer`. It just won’t work, it’s impossible.

## How To Do It Correctly

By simply checking for an error before doing anything with the response we can conclude what we can and cannot do next.

- if the error is not nil, we have an error and the response is nil. Return now or continue but avoid using the nil response
- if the error is nil, we don’t have an error and the response is not nil. We can freely use the response as we originally intended

Our code could then look like this:

```go
res, err := http.Get("abc.com/coffee")
if err != nil {
    return err
}
defer res.Body.Close()
// continue to use `res`
```

As you can see we’ve handled the error first and returned if it was not nil. Otherwise we continued to use the response.

## Conclusion
- always check errors immediately after functions that return them
- `defer` should only prepend non-nil functions
- `defer` does not deflect or handle errors automatically. You can, however, handle them with `recover`
