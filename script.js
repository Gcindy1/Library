var shelf = document.getElementById('books-container');
var form = document.getElementById('myForm');

let myLibrary = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(myLibrary));
const data = JSON.parse(localStorage.getItem('items'));

// the constructor
function book(title, author, pages, stat) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.stat = stat;
}

//New Entry. Open the form
var newForm = document.getElementById('newForm');
var newEntryBtn = document.getElementById('new');
newEntryBtn.addEventListener('click', () => {
	newForm.style.display = 'block';
	form.elements[0].value = '';
	form.elements[1].value = '';
	form.elements[2].value = '';
});

//Submit button. Add book from the form
var submit = document.getElementById('submit');
submit.addEventListener('click', () => {
	if (form.elements[0].value !== '' && form.elements[1].value !== '' && form.elements[2].value !== '') {
		newForm.style.display = 'none';

		title = form.elements[0].value;
		author = form.elements[1].value;
		pages = form.elements[2].value;
		stat = 'not finished';

		addBookToLibrary();
		booksDisplay(book1);
	}
});

//Cancel button
var cancel = document.getElementById('cancel');
cancel.addEventListener('click', () => {
	newForm.style.display = 'none';
});

//Put some initial book
bookShow = new book('My Library', 'By Cindy', 456, 'not finished');
booksDisplay(bookShow);

//local storage
data.forEach((item) => {
	booksDisplay(item);
});

//Display books
function booksDisplay(newBook) {
	var bookContainer = document.createElement('div');
	bookContainer.classList.add('bookContainer');
	shelf.appendChild(bookContainer);

	for (let i = 0; i < 5; i++) {
		var item = document.createElement('p');
		item.classList.add('item');
		bookContainer.appendChild(item);
	}

	var child = bookContainer.querySelectorAll('p');
	child[0].textContent = newBook.title;
	child[1].textContent = newBook.author;
	child[2].textContent = newBook.pages;
	child[2].style.display = 'none';
	child[3].style.display = 'none';

	//Delete button
	var btn = document.createElement('BUTTON');
	btn.classList.add('btn-delete');
	btn.textContent = 'Delete';
	bookContainer.appendChild(btn);

	btn.addEventListener('click', () => {
		deleteBook(newBook.title);
		bookContainer.remove();
	});

	btn.style.display = 'none';

	//toggle button

	var btn2 = document.createElement('BUTTON');
	btn2.classList.add('btn-toggle');
	btn2.textContent = 'Finished';
	if (newBook.stat === 'Finished') {
		btn2.style.opacity = '1';
	} else {
		btn2.style.opacity = '0.5';
	}
	bookContainer.appendChild(btn2);

	btn2.addEventListener('click', () => {
		if (btn2.style.opacity === '1') {
			btn2.style.opacity = '0.5';
		} else {
			btn2.style.opacity = '1';
		}

		toggleFinished(newBook.title);
	});

	btn2.style.display = 'none';

	//Book forward display
	bookContainer.addEventListener('click', () => {
		bookContainer.classList.toggle('preview');
		if (btn.style.display === 'none') {
			btn.style.display = 'block';
			btn2.style.display = 'block';
			child[0].style.transform = 'none';
			child[0].style.padding = '20px';
			child[0].style.marginTop = '5px';
			child[0].style.fontSize = '40px';
			child[1].style.position = 'relative';
			child[1].style.textShadow = '2px 2px #000';
			child[2].style.display = 'block';
		} else {
			btn.style.display = 'none';
			btn2.style.display = 'none';
			child[0].style.transform = 'rotate(90deg)';
			child[0].style.padding = '5px';
			child[0].style.marginTop = '140px';
			child[0].style.fontSize = '25px';
			child[1].style.position = 'absolute';
			child[2].style.display = 'none';
			child[3].style.display = 'none';
		}
	});
}

//Add a new book trough the form
function addBookToLibrary() {
	book1 = new book(title, author, pages, stat);
	myLibrary.push(book1);
	localStorage.setItem('items', JSON.stringify(myLibrary));
}

function deleteBook(bookTitle) {
	for (let i = 0; i < myLibrary.length; i++) {
		if (myLibrary[i].title === bookTitle) {
			myLibrary.splice([ i ], 1);
			localStorage.setItem('items', JSON.stringify(myLibrary));
		}
	}
}

function toggleFinished(bookTitle) {
	for (let i = 0; i < myLibrary.length; i++) {
		if (myLibrary[i].title === bookTitle && myLibrary[i].stat === 'not finished') {
			myLibrary[i].stat = 'Finished';
			localStorage.setItem('items', JSON.stringify(myLibrary));
		} else if (myLibrary[i].title === bookTitle && myLibrary[i].stat === 'Finished') {
			myLibrary[i].stat = 'not finished';
			localStorage.setItem('items', JSON.stringify(myLibrary));
		}
    }
}