class Book {

  // constructor will take the arguments for the class
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn =  isbn;
  }

}

class UI {

  // the prototype functions in es5 can simply be the methods of the class as shown bewlow. but the inside content will remain essentially the same as shown below. 
  addBookToList(book){
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

  showAlert(message, className){
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

  deleteBook(target){
    if(target.className === 'delete')
    {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }



}

// and after adding these two classes all the rest of the program be it event listeners or other parts of code all will work similarly as in es5. No change in other concepts the only change we are talking is in OOP.
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
});

// One important thing to recognise here is that under the hood everything is happening the same way. Ui and book object will have same prototype functions and other things under the hood whether it is es5 or es6/