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
    myLibrary.push(new Book(author, title, pageCount, isRead, counter));
    counter++;
}

function addBookCard() {
    const newCard = document.createElement("div");
    newCard.classList.add("card");

    cardsDisplay.appendChild(newCard);
}

myLibrary.push(new Book("Orson Scott Card", "Ender's Game", "324", "y", counter));
counter++;
