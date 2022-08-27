const searchInput = document.querySelector('#input');
const searchButton = document.querySelector('#search-button');
const searchForm = document.querySelector('#search-form');
const searchBooks = document.querySelector('#search-books');
const recomendedBooks = document.querySelector('#book-for-you');
const mainSection = document.querySelector('main');

let booksArray = [];
let searchBooksArray = [];
let recomendedBooksArray = [];
let recomendedBooksIds = ['nVGKDgAAQBAJ', 'gFbiTgEACAAJ', '9OUCDQAAQBAJ', '5vbJtQEACAAJ', '9ooz3WjkueYC'];

const url = ('https://www.googleapis.com/books/v1/volumes');

async function getReacomendedBooks(id) {
    await fetch(url + '/' + id)
    .then(data => data.json())
    .then(book => {
        booksArray.push(book);
        recomendedBooksArray.push(book)
        recomendedBooks.innerHTML += `
        <div class="book" id="${book.id}">
            <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="">
            <div class="book-title">${book.volumeInfo.title}</div>
        </div>`
    })
}

recomendedBooksIds.map(id => {
    getReacomendedBooks(id);
})

async function getSearchBooks() {
    await fetch(url + '?q=' + searchInput.value)
    .then(data => data.json())
    .then(result => {
        searchBooksArray = result.items;
    })
    searchBooks.innerHTML = '';
    searchBooksArray.map(book => {
        searchBooks.innerHTML += `
        <div class="book" id="${book.id}">
        <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="">
        <div class="book-title">${book.volumeInfo.title}</div>
        </div>`
    })
    booksArray = searchBooksArray.concat(recomendedBooksArray);
}

searchButton.addEventListener('click', getSearchBooks);
searchForm.addEventListener('submit', (e) => {
    getSearchBooks();
    e.preventDefault();
});

function showBook(volumeInfo) {
    mainSection.innerHTML += `
    <div class='book-more-info'>
    <div class='book-info'>
        <img src="${volumeInfo.imageLinks.thumbnail}">
        <div class='close-book-info'><i class="fa-solid fa-xmark"></i></div>
        <ul class="book-info-list">
        <li>Title: ${volumeInfo.title}</li>
        <li>Author: ${volumeInfo.authors}</li>
        <li>Published date: ${volumeInfo.publishedDate}</li>
        <li>Publisher: ${volumeInfo.publisher}</li>
        <li>Language: ${volumeInfo.language}</li>
        <li>page: ${volumeInfo.pageCount}</li>
        </ul>
        </div>
    </div>`;
    console.log(volumeInfo);
}

mainSection.addEventListener('click', (e) => {
    if(e.target.parentElement.className === 'book'){
        let bookElement = e.target.parentElement;
        booksArray.map(book => {
            if (book.id === bookElement.id) {
                showBook(book.volumeInfo);
            }
        })
    }
    else if(e.target.className === 'close-book-info' || e.target.className === 'fa-solid fa-xmark') {
        let bookElement = document.querySelector('.book-more-info');
        bookElement.remove();
    }
})