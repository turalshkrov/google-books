const searchInput = document.querySelector('#input');
const searchButton = document.querySelector('#search-button');
const searchForm = document.querySelector('#search-form');
const searchBooks = document.querySelector('#search-books');
const recomendedBooks = document.querySelector('#book-for-you');

let searchBooksArray = [];
let recomendedBooksIds = ['nVGKDgAAQBAJ', 'gFbiTgEACAAJ', '9OUCDQAAQBAJ', '5vbJtQEACAAJ', '9ooz3WjkueYC'];

const url = ('https://www.googleapis.com/books/v1/volumes');

async function getReacomendedBooks(id) {
    await fetch(url + '/' + id)
    .then(data => data.json())
    .then(book => {
        console.log(book);
        recomendedBooks.innerHTML += `
        <div class="book">
            <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="">
            <div class="book-title">${book.volumeInfo.title}</div>
        </div>
        `
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
    searchBooks.innerHTML = ''
    searchBooksArray.map(book => {
        console.log(book);
        searchBooks.innerHTML += `
        <div class="book">
            <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="">
            <div class="book-title">${book.volumeInfo.title}</div>
        </div>
        `
    })
}

searchButton.addEventListener('click', getSearchBooks);
searchForm.addEventListener('submit', (e) => {
    getSearchBooks();
    e.preventDefault();
});

