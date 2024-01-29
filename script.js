const myLibrary = [];
const cardsDisplay = document.getElementById("book-cards");
const addBookButton = document.getElementById("add-book");
const addBookForm = document.getElementById("add-book-form");
const submitBookAddButton = document.getElementById("submit-book-add");
const submitBookEditButton = document.getElementById("submit-book-edit");
const cancelAddBook = document.getElementById("cancel");
let counter = 0;
let submitType = "add";

addBookButton.addEventListener("click", openBookDialog);
addBookForm.addEventListener("submit", submitBook);
cancelAddBook.addEventListener("click", () => document.getElementById("add-book-dialog").close());

function Book(author, title, pageCount, isRead, libraryIndex) {
    this.author = author;
    this.title = title;
    this.pageCount = pageCount;
    this.isRead = isRead;
    this.libraryIndex = libraryIndex;
}

function openBookDialog(e) {
    if (e.target.id === "add-book") {
        document.getElementById("dialog-header").textContent = "Enter a new book";
        submitBookAddButton.style.display = "inline-block";
        submitBookEditButton.style.display = "none";
        submitType = "add";
    }
    else {
        document.getElementById("dialog-header").textContent = "Edit book";
        submitBookAddButton.style.display = "none";
        submitBookEditButton.style.display = "inline-block";
        submitBookEditButton.value = e.target.parentNode.id;
        submitType = "edit";
        editBookPrefill();
    }
    document.getElementById("add-book-dialog").showModal();
}

function submitBook() {
    event.preventDefault();
    if (submitType === "add") {
        addBookToLibrary();
    }
    else if (submitType === "edit") {
        editBook();
    }
}

function addBookToLibrary() {
    document.getElementById("add-book-dialog").close();
    
    let title = document.getElementById("input-title").value;
    let author = document.getElementById("input-author").value;
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
    editCardButton.addEventListener("click", openBookDialog);
    newCard.appendChild(editCardButton);

    const removeCardButton = document.createElement("button");
    removeCardButton.textContent = "Remove";
    removeCardButton.addEventListener("click", removeBook);
    newCard.appendChild(removeCardButton);

    cardsDisplay.appendChild(newCard);
}

function editBookPrefill() {
    let cardIndex = document.getElementById("submit-book-edit").value;
    const bookCard = document.getElementById(cardIndex);

    document.getElementById("input-title").value = myLibrary[cardIndex].title;
    document.getElementById("input-author").value = myLibrary[cardIndex].author;
    document.getElementById("input-page-count").value = myLibrary[cardIndex].pageCount;
    document.getElementById("input-is-read").checked = myLibrary[cardIndex].isRead;
}

function editBook() {
    document.getElementById("add-book-dialog").close();
    let cardIndex = document.getElementById("submit-book-edit").value;
    const bookCard = document.getElementById(cardIndex);

    myLibrary[cardIndex].title = document.getElementById("input-title").value;
    myLibrary[cardIndex].author = document.getElementById("input-author").value;
    myLibrary[cardIndex].pageCount = Math.floor(document.getElementById("input-page-count").value);
    myLibrary[cardIndex].isRead = document.getElementById("input-is-read").checked;

    bookCard.querySelector(".title").textContent = `Title: ${myLibrary[cardIndex].title}`;
    bookCard.querySelector(".author").textContent = `Author: ${myLibrary[cardIndex].author}`;
    bookCard.querySelector(".page-count").textContent = `Page count: ${myLibrary[cardIndex].pageCount}`;
    if (myLibrary[cardIndex].isRead) {
        bookCard.querySelector(".is-read").textContent = "Already read";
    }
    else {
        bookCard.querySelector(".is-read").textContent = "Not yet read";
    }
}

function removeBook(e) {
    const bookCard = e.target.parentNode;
    let cardIndex = bookCard.id;

    delete(myLibrary[cardIndex]);
    bookCard.remove();
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
