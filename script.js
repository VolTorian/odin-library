const myLibrary = [];

function Book(author, title, pageCount, isRead) {
    this.author = author;
    this.title = title;
    this.pageCount = pageCount;
    this.isRead = isRead;
}

function addBookToLibrary() {
    let author = prompt("Enter the author of the book:");
    let title = prompt("Enter the book's title:");
    let pageCount = prompt("Enter the number of pages the book has:");
    let isRead = prompt("Have you read the book already? [y/n]:");
    myLibrary.push(new Book(author, title, pageCount, isRead));
}