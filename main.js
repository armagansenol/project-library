let myLibrary = [new Book('The Catcher in the Rye', 'J.D. Salinger', '234', true), new Book('Journey to the End of the Night', 'Louis Ferdinand Celine', '464', true)];
myLibrary.forEach((item) => render(item));

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? 'Yes' : 'No';
};

if (!localStorage.getItem('library')) {
    populateStorage();
} else {
    setStyles();
};

function populateStorage() {
    let stored = JSON.stringify(myLibrary);
    localStorage.setItem('library', stored);
    setStyles();
};

function setStyles() {
    let loaded = localStorage.getItem('library');
    let books = JSON.parse(loaded);
    render(books[books.length - 1]);
};

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const pages = document.getElementById('book-pages').value;
    const read = document.getElementById("book-read").checked;

    if (title === '' || author === '' || pages === '' || read === undefined) {
        alert('Please fill in all fields!');
    } else {
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        populateStorage();
        clearForm();
    }
});

function render(book) {
    const bookList = document.querySelector('#book-list');
    const bookWrapper = document.createElement('div');
    bookWrapper.className = 'flex flex-row w-screen justify-start items-center h-auto text-gray-700 mt-4 shadow-md';

    bookWrapper.innerHTML = `
    <div class="w-1/5 text-center italic">${book.title}</div>
    <div class="w-1/5 text-center">${book.author}</div>
    <div class="w-1/5 text-center">${book.pages}</div>
    <div class="w-1/5 text-center">${book.read}</div>
    <button class="remove bg-red-500 rounded-full w-6 h-6 my-2 text-white shadow-inner text-xs text-center font-bold">X</button>
    `
    bookList.appendChild(bookWrapper);
};

document.querySelector('#book-list').addEventListener('click', (e) => {
    deleteBook(e.target);
});

function deleteBook(el) {
    if (el.classList.contains('remove')) {
        el.parentElement.remove();
        let ti = el.parentElement.firstElementChild.textContent;
        myLibrary
     }
};

function clearForm() {
    document.getElementById('book-title').value = '';
    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-pages').value = '';
    document.getElementById("book-read").checked = undefined;
};