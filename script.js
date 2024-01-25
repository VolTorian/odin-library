const myLibrary = [];
const cardsDisplay = document.getElementById("book-cards");
const addBookButton = document.getElementById("add-book");
const addBookForm = document.getElementById("add-book-form");
const submitBookButton = document.getElementById("submit-book-button");
const cancelAddBook = document.getElementById("cancel");
let counter = 0;

addBookButton.addEventListener("click", () => document.getElementById("add-book-dialog").showModal());
// addBookForm.addEventListener("submit", addBookToLibrary);
submitBookButton.addEventListener("click", submitBook);
cancelAddBook.addEventListener("click", () => document.getElementById("add-book-dialog").close());

function Book(author, title, pageCount, isRead, libraryIndex) {
    this.author = author;
    this.title = title;
    this.pageCount = pageCount;
    this.isRead = isRead;
    this.libraryIndex = libraryIndex;
}

function submitBook(e) {
    // check if book dialog was activated by adding or editing a book
    // if adding book, add book functions
    // else, edit book functions
}

function addBookToLibrary() {
    event.preventDefault();
    document.getElementById("add-book-dialog").close();

    let author = document.getElementById("input-author").value;
    let title = document.getElementById("input-title").value;
    let pageCount = Math.floor(document.getElementById("input-page-count").value);
    let isRead = document.getElementById("input-is-read").checked;
    
    let book = new Book(author, title, pageCount, isRead, counter);
    addBookForm.reset();
    addBookCard(book);
    myLibrary.push(book);
    counter++;
}

function addBookCard(book) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("id", book.libraryIndex);

    const newCardTitle = document.createElement("div");
    newCardTitle.classList.add("title");
    const newCardAuthor = document.createElement("div");
    newCardAuthor.classList.add("author");
    const newCardPageCount = document.createElement("div");
    newCardPageCount.classList.add("page-count");
    const newCardIsRead = document.createElement("div");
    newCardIsRead.classList.add("is-read");

    newCardTitle.textContent = `Title: ${book.title}`;
    newCardAuthor.textContent = `Author: ${book.author}`;
    newCardPageCount.textContent = `Number of pages: ${book.pageCount}`;
    if (book.isRead) {
        newCardIsRead.textContent = "Already read";
    }
    else {
        newCardIsRead.textContent = "Not yet read";
    }

    newCard.appendChild(newCardTitle);
    newCard.appendChild(newCardAuthor);
    newCard.appendChild(newCardPageCount);
    newCard.appendChild(newCardIsRead);

    const toggleReadButton = document.createElement("button");
    toggleReadButton.textContent = "Not read";
    if (book.isRead === false) {
        toggleReadButton.textContent = "Read";
    }
    toggleReadButton.addEventListener("click", toggleRead);
    newCard.appendChild(toggleReadButton);

    const editCardButton = document.createElement("button");
    editCardButton.textContent = "Edit";
    editCardButton.addEventListener("click", editBook);
    newCard.appendChild(editCardButton);

    const removeCardButton = document.createElement("button");
    removeCardButton.textContent = "Remove";
    removeCardButton.addEventListener("click", removeBook);
    newCard.appendChild(removeCardButton);

    cardsDisplay.appendChild(newCard);
}

function editBook(e) {
    const bookCard = e.target.parentNode;
    let cardIndex = bookCard.id;
}

function removeBook(e) {
    const bookCard = e.target.parentNode;
    let cardIndex = bookCard.id;

    delete(myLibrary[cardIndex]);
    bookCard.remove();

    // console.log(`Book "${bookCard.firstChild.textContent}" was removed`);
}

function toggleRead(e) {
    const bookCard = e.target.parentNode;
    let cardIndex = bookCard.id;
    const cardIsRead = bookCard.querySelector("div:last-of-type")

    if (myLibrary[cardIndex].isRead) {
        e.target.textContent = "Read";
        cardIsRead.textContent = "Not yet read";
        myLibrary[cardIndex].isRead = false;
    }
    else if (!myLibrary[cardIndex].isRead) {
        e.target.textContent = "Not read";
        cardIsRead.textContent = "Already read";
        myLibrary[cardIndex].isRead = true;
    }
    else {
        console.log("input validation where");
    }
}

let firstBook = new Book("Orson Scott Card", "Ender's Game", "324", true, counter);
addBookCard(firstBook);
myLibrary.push(firstBook);
counter++;
