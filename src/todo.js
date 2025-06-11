import { addDays } from "date-fns";
// create the todo form

<form id="userForm">
  <div class="form-group">
    <label for="bookname">Name:</label>
    <input autocomplete="off" type="text" id="bookname" name="name" required />
  </div>
  <div class="form-group">
    <label for="author">Author:</label>
    <input autocomplete="off" type="text" id="author" name="name" required />
  </div>

  <div class="form-group">
    <label for="pages">Pages:</label>
    <input type="number" id="pages" name="age" min="1" required />
  </div>
  <div class="form-group">
    <input type="checkbox" id="myCheckbox" name="myCheckbox" value="yes" />
    <label for="myCheckbox">Read?</label>
  </div>
  <button type="submit">Submit</button>
</form>;

class Task {
  constructor(id, dueDate, priority, notes) {
    // the constructor...will only have the properties
    this.id = crypto.randomUUID();
    this.dueDate = title;
    this.priority = author;
    this.notes = pages;
  }

  addBookToLibrary() {
    const bookdetails = {
      id: this.id,
      title: this.title,
      author: this.author,
      pages: this.pages,
      status: this.status,
    };
    myLibrary.push(bookdetails);
    console.log("Current library:", myLibrary);
  }
}

//adding the date to the task object
userform.addEventListener("submit", function (event) {
  event.preventDefault();
  let status = "";
  const isChecked = document.getElementById("myCheckbox").checked;
  if (isChecked) {
    status = "read";
  } else {
    status = "unread";
  }
  const bookName = document.getElementById("bookname");
  const authorName = document.getElementById("author");
  const pages = document.getElementById("pages");
  console.log("Form submitted");
  const book = new Book(
    "",
    bookName.value,
    authorName.value,
    pages.value,
    status
  );

  book.addBookToLibrary();
  displayBook();
  console.log("Current library:", myLibrary);

  this.reset();
  formModal.style.display = "none";
  formbutton.style.display = "block";
});
