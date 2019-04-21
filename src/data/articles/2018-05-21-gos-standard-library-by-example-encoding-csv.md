---
title: "Go's Standard Library By Example: encoding/csv"
date: 2018-05-21T01:00:00-07:00
path: /blog/golang-standard-library-encoding-csv
excerpt: Reading from and writing to CSV files is extremely simple with Go’s encoding/csv package
tags: ["golang"]
---

Reading from and writing to CSV files is extremely simple with Go's encoding/csv package. Today, I'm going to discuss just how simple it is.

## Introduction
The standard library is very robust. Consider standard library packages over bulky third-party frameworks. Essentially, a lot of your needs as a Go engineer can be fulfilled with the standard library. So it's important to understand and use the built-in packages Go has to offer.

This is one article in my Go's Standard Library By Example article series that provides simplified explanations and practical examples of Go's standard library.

### Level of Difficulty: Beginner

### Prerequisites: Basic understanding of "io" and "os" packages

## Reading From CSVs
To read from a CSV file it must be opened with os.Open. This will return a pointer to the file descriptor, os.File. Now since the file implements the io.Reader interface it can be given to the csv.NewReader to make a csv.Reader.

Let's say we have this CSV file named "foo.csv":

```
| ID  | Name | Email            | Revenue  |
|-----|------|------------------|----------|
| 123 | John | john@example.com | $141,987 |
|-----|------|------------------|----------|
| 456 | Sam  | sam@example.com  | $905,234 |
```

We then can open it and create a `csv.Reader`.
```
csvFile, err := os.Open("./foo.csv")
if err != nil {
  panic(err)
}
defer csvFile.Close()

csvReader := csv.NewReader(csvFile)
```

Let me take a second to highlight the beauty of interfaces. Since `csv.NewReader` accepts the `io.Reader` interface you can provide it with any source besides CSV files as long as it fulfills the interface. It doesn't have to be a file. You can also use:

- `strings.NewReader` to create a reader from a string
- `bytes.NewReader` to create a reader from a byte slice
- `bufio.NewReader` to create a buffered reader from an existing reader

> Pro Tip: testing and debugging with these are extremely useful

## Reading a Single Row
You're now ready to read a single row with `csv.Reader.Read`.
```
row, err := csvReader.Read()
```

It returns a string slice and an error. If you've hit the end of the file the error will be `io.EOF`.

This should go without saying but each string in the slice are in the same order as the CSV. By knowing the order of the cells in the CSV header you can index the corresponding cell in another row. For example, since the first row of this file is the header, the slice would be `[]string{"ID", "Name", "Email", "Revenue"}`. So,

```
n := row[1] // n == "Name"
```

`n` equals "Name". All subsequent rows will contain the same order. Cool! We have read the header row successfully. From here we can keep reading each row one at a time. If you want to read every row, a practical way is to use a for-loop and handle each error like this:

```
for {
  row, err := csvReader.Read()
  if err == io.EOF {
    break
  } else if err != nil {
    panic(err) // or handle it another way
  }
  // use the `row` here
}
```

We continuously read each row, break if we hit the end, panic if we hit another error, or use the data in the row if no error exists.

## Reading the Remaining Rows
You can also read the remaining rows from the `csv.Reader` with `csv.ReadAll`. It returns a slice of string slices and an error. When it reaches the end of the file it does not return an error.
```
rows, err := csvReader.ReadAll() // `rows` is of type [][]string
if err != nil {
  panic(err)
}
for i, row := range rows {
  // process the `row` here
}
```

## Writing To CSVs
To write to a CSV file, the file must first be created with `os.Create`. If the file exists already it will be overwritten. Just like `os.Open`, this will also return a pointer to the file descriptor, `os.File`. The file, again, implements the `io.Writer` interface; thus it can be given to the `csv.NewWriter` to make a `csv.Writer`.

```
csvFile, err := os.Create("./bar.csv")
if err != nil {
  panic(err)
}
defer csvFile.Close()

csvWriter := csv.NewWriter(csvFile)
```

## Writing a Single Row
Now we're ready to write to the file with `csv.Writer.Write`. This function takes a slice of strings.

```
err := csvWriter.Write([]string{"678", "Jane", "jane@example.com", "$548,980"})
```

Surprisingly, this does not write to the file. It only writes to a buffer. When you're finished writing to the buffer and want to write to the file you must call `csv.Writer.Flush`. You can think of this "flushing" the buffered data to the underlying writer.

```
csvWriter.Flush()
err := csvWriter.Error()
if err != nil {
  // an error occurred during the flush
}
```

## Writing Many Rows
To write many rows and flush at once you can use `csv.Writer.WriteAll`.

```
rows := [][]string{
  { "123", "John", "john@example.com", "$141,987"},
  { "456", "Sam", "sam@example.com", "$905,234"},
  { "678", "Jane", "jane@example.com", "$548,980"},
}
err := csvWriter.WriteAll(rows)
```

## Conclusion
This package has to be the most simplest package to learn and use. It's main focus is reading from and writing to CSV files. You simply create readers and writers and call a few functions. What you do with with the CSV data after reading and before writing is what other standard library packages are useful for. You can:
- convert cells, which when read are a string type, to basic data types with the "strconv" package. You'll also convert these types back to strings with this package when you want to write a row
- use the "strings" package to perform string manipulations like trimming spaces and splitting on comma delimiters
- use concurrency primitives such as channels and goroutines to process each row concurrently instead of sequentially
- use the "math" package to perform math calculations

🤙 Mahalo for reading!