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

// Show alert prototype function
UI.prototype.showAlert = function(message, className){ 
  // create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector('.container');
  // get form 
  const form = document.querySelector('#book-form');
  // Insert alert. Following line says take the container and inside the container, add the alert just before the form
  container.insertBefore(div, form);

  // Timeout the alert after three seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  },3000);

}

// Delete book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete')
  {
    target.parentElement.parentElement.remove();
  }
}

// Another prototype function to clear the fields.
UI.prototype.clearFields = function()
{
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';

}



// Event listener for adding book
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

  // Validate
  if(title === '' || author === '' || isbn === ''){
    // Error alert
    ui.showAlert('Please fill in all the fields', 'error');
  }else{
     // add items to book list
  ui.addBookToList(book);

  // show alert for sucessfully added book
  ui.showAlert('Book added sucessfully', 'sucess');

  // clear input fields
  ui.clearFields();
}


 

  e.preventDefault();
});

// event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

  // Instantiate Ui
  const ui = new UI();

  // Delete book: here below e.target means the thing in which we click
  ui.deleteBook(e.target);

  // Show alert for deleted book
  ui.showAlert('Book removed', 'sucess');

  e.preventDefault();
})
