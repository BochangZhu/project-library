# Virtual Book Library

A vanilla HTML, CSS, and JavaScript project from [The Odin Project](https://www.theodinproject.com/) curriculum. This project simulates a virtual library where users can add, track, and remove their books.

## Video Demo

https://github.com/user-attachments/assets/323dbc92-01d2-4560-a6a1-fc9cca1002f9

## Features

- Add books with title, author, page count, and read status
- Toggle a book's read/unread status
- Remove a book, with a confirmation window.
- Responsive grid layout
- Book data stored in an array by JS object.

---

## Details

### Book Obj to DOM elements

Book-card structure is based on the `<template>` element in the HTML. When a book needs to be displayed, that template is cloned and all fields are filled with data from the book object. `Date & Intl.DateTimeFormat` object API are used to track time added.

### User input

Adding a new book is handled entirely with a `<dialog>` element and a `<form>` inside it:

- Clicking "Add a New Book" opens the dialog as a modal.
- The form's built-in validation (`required`, `min`/`max`) checks for valid input.
- `FormData` is used to organize form result, which are then transferred into a new book object and pushed into `myLibrary`.

`The same `<dialog>` and form pattern is reused for delete confirmations as well.`

### Layout

CSS Grid and Flexbox are used throughout:

- **Grid** builds overall page structure and the responsive book-card container, which uses `repeat(auto-fill, minmax(...))`.
- **Flexbox** organizes smaller components — form rows, button groups etc.

### Style

- A **toggle switch** built from a checkbox, label, and pseudo-element to mark a book as read with a animated slider.

---

## About

This was my first real hands-on experience with "backend" logic. Every book is stored as an object in `myLibrary` array. Each time a book is added or removed, the array is updated first, then the book-card container is rendered based on objects inside the `myLibrary` array.

## Built With

- HTML5
- CSS3
- JavaScript
