// we start with older es5 constructor based object oriented javascript

// Book Constructor -- handles creating the actual book object
function Book(title, author, isbn)
{
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Costructor  -- set of prototype methods which handles actions like adding book to the list, showing alerts
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book)
{
  const list = document.getElementById('book-list');

  // create element
  const row =document.createElement('tr');
  // Insert columns
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}

// Another prototype function to clear the fields.
UI.prototype.clearFields = function()
{
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';

}



// Event listeners
document.getElementById('book-form').addEventListener('submit',function(e){
  // console.log('test');
  // get form values 
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  // instantiate  a book object
  const book = new Book(title, author, isbn);

  // instantiate UI
  const ui = new UI();


  // add items to book list
  ui.addBookToList(book);

  // clear input fields
  ui.clearFields();

  e.preventDefault();
})
