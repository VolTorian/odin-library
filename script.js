const myLibrary = [];
const cardsDisplay = document.getElementById("book-cards");
const addBookButton = document.getElementById("add-book");
let counter = 0;

addBookButton.addEventListener("click", addBookToLibrary);

function Book(author, title, pageCount, isRead, libraryIndex) {
    this.author = author;
    this.title = title;
    this.pageCount = pageCount;
    this.isRead = isRead;
    this.libraryIndex = libraryIndex;
}

function addBookToLibrary() {
    let author = prompt("Enter the author of the book:", "Placeholder Author");
    let title = prompt("Enter the book's title:", "Placeholder Title");
    let pageCount = prompt("Enter the number of pages the book has:", "-1");
    let isRead = prompt("Have you read the book already? [y/n]:", "n");
    let book = new Book(author, title, pageCount, isRead, counter)
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
    newCardIsRead.textContent = `Already read?: ${book.isRead}`;

    newCard.appendChild(newCardTitle);
    newCard.appendChild(newCardAuthor);
    newCard.appendChild(newCardPageCount);
    newCard.appendChild(newCardIsRead);

    const removeCardButton = document.createElement("button");
    removeCardButton.textContent = "Remove";
    removeCardButton.addEventListener("click", removeBook);
    newCard.appendChild(removeCardButton);

    cardsDisplay.appendChild(newCard);
}

function removeBook(e) {
    const bookCard = e.target.parentNode;
    let cardIndex = bookCard.id;

    delete(myLibrary[cardIndex]);
    bookCard.remove();

    // console.log(`Book "${bookCard.firstChild.textContent}" was removed`);
}

let firstBook = new Book("Orson Scott Card", "Ender's Game", "324", "y", counter);
addBookCard(firstBook);
myLibrary.push(firstBook);
counter++;
