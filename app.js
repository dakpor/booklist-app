//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


//UI Constructor

function UI() {}

//Add book to list
UI.prototype.addBookToList = (book) => {
  const list = document.getElementById('book-list')
  //create tr and insert cols
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `
  list.appendChild(row);
}
//Show alert 
UI.prototype.showAlert = (msg, className) => {
   const div = document.createElement('div');
   div.className = `alert ${className}`;
   div.appendChild(document.createTextNode(msg))
   //insert into to the DOM
   const constainer = document.querySelector('.container')
   const form = document.querySelector('#book-form')
   //insert alert
   constainer.insertBefore(div, form);

   setTimeout(() => {
     document.querySelector('.alert').remove()
   }, 3000);
}

//Delete Book
UI.prototype.deleteBook = (target) => {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}
//Clear fields
UI.prototype.clearFields = () => {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//Event Listeners  for add book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  //Get form values
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
 

  //Instantiate Book 

  const book = new Book(title, author, isbn)
 
  // Instantiate UI
  const ui = new UI();

  //Validate
  if(title === '' || author === '' || isNaN(isbn)) {
    //Error alert
    ui.showAlert('Please enter all fields', 'error')
  }else {
     //Add book to list
  ui.addBookToList(book)

  //Show succcess
  ui.showAlert('Book Added!', 'success')

  //clear fields
  ui.clearFields()

  }

 
  e.preventDefault()
})

//Event listener for delete book
document.getElementById('book-list').addEventListener('click', (e) => {
const ui = new UI;
ui.deleteBook(e.target)

ui.showAlert('Book Removed', 'success')
e.preventDefault()
})