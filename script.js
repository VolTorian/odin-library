const myLibrary = [];
const cardsDisplay = document.getElementById("book-cards");
const addBookButton = document.getElementById("add-book");
const bookForm = document.getElementById("book-form");
const submitBookAddButton = document.getElementById("submit-book-add");
const submitBookEditButton = document.getElementById("submit-book-edit");
const cancelAddBook = document.getElementById("cancel");
let counter = 0;
let submitType = "add";

addBookButton.addEventListener("click", openBookDialog);
bookForm.addEventListener("submit", submitBook);
cancelAddBook.addEventListener("click", () => document.getElementById("book-dialog").close());

class Book {
    #author;
    #title;
    #pageCount;
    #isRead;
    #libraryIndex;

    constructor(author, title, pageCount, isRead, libraryIndex) {
        this.#author = author;
        this.#title = title;
        this.#pageCount = pageCount;
        this.#isRead = isRead;
        this.#libraryIndex = libraryIndex;
    }

    createCard() {
        this.containerCard = document.createElement("div");
        this.containerCard.classList.add("card");
        this.containerCard.id = this.libraryIndex;

        this.cardTitle = document.createElement("div");
        this.cardTitle.classList.add("title");
        this.cardAuthor = document.createElement("div");
        this.cardAuthor.classList.add("author");
        this.cardPageCount = document.createElement("div");
        this.cardPageCount.classList.add("page-count");
        this.cardIsRead = document.createElement("div");
        this.cardIsRead.classList.add("is-read");

        this.cardTitle.textContent = this.title;
        this.cardAuthor.textContent = this.author;
        this.cardPageCount.textContent = this.pageCount;
        if (this.isRead) {
            this.cardIsRead.textContent = "Already read";
        }
        else {
            this.cardIsRead.textContent = "Not yet read";
        }

        this.containerCard.appendChild(this.cardTitle);
        this.containerCard.appendChild(this.cardAuthor);
        this.containerCard.appendChild(this.cardPageCount);
        this.containerCard.appendChild(this.cardIsRead);

        this.cardControls = document.createElement("div");
        this.cardControls.classList.add("card-controls");

        this.toggleReadButton = document.createElement("img");
        if (this.isRead) {
            toggleReadButton.src = "./images/eye-remove-outline.svg";
        }
        else {
            toggleReadButton.src = "./images/eye-check-outline.svg";
        }
    
        this.toggleReadButton.addEventListener("click", this.toggleRead);
        this.toggleReadButton.classList.add("toggle-read");
        this.cardControls.appendChild(this.toggleReadButton);
    
        this.editCardButton = document.createElement("img");
        this.editCardButton.src = "./images/cog-outline.svg";
        this.editCardButton.addEventListener("click", openBookDialog);
        this.cardControls.appendChild(editCardButton);
    
        this.removeCardButton = document.createElement("img");
        this.removeCardButton.src = "./images/delete-outline.svg";
        this.removeCardButton.addEventListener("click", removeBook);
        this.cardControls.appendChild(removeCardButton);
    
        this.containerCard.append(cardControls);
        cardsDisplay.appendChild(newCard);
    }

    editBook() {
        document.getElementById("book-dialog").close();
        
        this.title = document.getElementById("input-title").value;
        this.author = document.getElementById("input-author").value;
        this.pageCount = Math.floor(document.getElementById("input-page-count").value);
        this.isRead = document.getElementById("input-is-read").checked;

        this.cardTitle.textContent = this.title;
        this.cardAuthor.textContent = this.author;
        this.cardPageCount.textContent = this.pageCount;
        if (this.isRead) {
            this.cardIsRead.textContent = "Already read";
            this.toggleReadButton.src = "./images/eye-remove-outline.svg";
        }
        else {
            this.cardIsRead.textContent = "Not yet read";
            this.toggleReadButton.src = "./images/eye-check-outline.svg";
        }
    }

    toggleRead() {
        if (this.isRead) {
            this.toggleReadButton = "./images/eye-check-outline.svg";
            this.cardIsRead.textContent = "Not yet read";
            this.isRead = false;
        }
        else {
            this.toggleReadButton = "./images/eye-remove-outline.svg";
            this.cardIsRead.textContent = "Already read";
            this.isRead = true;
        }
    }

    get author() {
        return this.#author;
    }

    set author(author) {
        this.#author = author;
    }

    get title() {
        return this.#title;
    }

    set title(title) {
        this.#title = title;
    }

    get pageCount() {
        return this.#pageCount;
    }

    set pageCount(pageCount) {
        this.#pageCount = pageCount;
    }

    get isRead() {
        return this.#isRead;
    }

    set isRead(isRead) {
        this.#isRead = isRead;
    }

    get libraryIndex() {
        return this.#libraryIndex;
    }
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
        submitBookEditButton.value = e.target.parentNode.parentNode.id;
        submitType = "edit";
        editBookPrefill(submitBookEditButton.value);
    }
    document.getElementById("book-dialog").showModal();
}

function submitBook() {
    event.preventDefault();
    if (submitType === "add") {
        addBookToLibrary();
    }
    else if (submitType === "edit") {
        editBook(submitBookEditButton.value);
        // myLibrary[submitBookEditButton.value].editBook();
    }
}

function addBookToLibrary() {
    document.getElementById("book-dialog").close();
    
    let title = document.getElementById("input-title").value;
    let author = document.getElementById("input-author").value;
    let pageCount = Math.floor(document.getElementById("input-page-count").value);
    let isRead = document.getElementById("input-is-read").checked;
    
    let book = new Book(author, title, pageCount, isRead, counter);
    bookForm.reset();
    addBookCard(book);
    myLibrary.push(book);
    counter++;
}

function addBookCard(book) { //remove once card functionality has been moved into Book class
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.id = book.libraryIndex;

    const newCardTitle = document.createElement("div");
    newCardTitle.classList.add("title");
    const newCardAuthor = document.createElement("div");
    newCardAuthor.classList.add("author");
    const newCardPageCount = document.createElement("div");
    newCardPageCount.classList.add("page-count");
    const newCardIsRead = document.createElement("div");
    newCardIsRead.classList.add("is-read");

    newCardTitle.textContent = `${book.title}`;
    newCardAuthor.textContent = `by ${book.author}`;
    newCardPageCount.textContent = `${book.pageCount} pages`;
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

    const cardControls = document.createElement("div");
    cardControls.classList.add("card-controls");

    const toggleReadButton = document.createElement("img");
    if (book.isRead) {
        toggleReadButton.src = "./images/eye-remove-outline.svg";
    }
    else {
        toggleReadButton.src = "./images/eye-check-outline.svg";
    }

    toggleReadButton.addEventListener("click", toggleRead);
    toggleReadButton.classList.add("toggle-read");
    cardControls.appendChild(toggleReadButton);

    const editCardButton = document.createElement("img");
    editCardButton.src = "./images/cog-outline.svg";
    editCardButton.addEventListener("click", openBookDialog);
    cardControls.appendChild(editCardButton);

    const removeCardButton = document.createElement("img");
    removeCardButton.src = "./images/delete-outline.svg";
    removeCardButton.addEventListener("click", removeBook);
    cardControls.appendChild(removeCardButton);

    newCard.append(cardControls);
    cardsDisplay.appendChild(newCard);
}

function editBookPrefill(cardIndex) {
    document.getElementById("input-title").value = myLibrary[cardIndex].title;
    document.getElementById("input-author").value = myLibrary[cardIndex].author;
    document.getElementById("input-page-count").value = myLibrary[cardIndex].pageCount;
    document.getElementById("input-is-read").checked = myLibrary[cardIndex].isRead;
}

function editBook(cardIndex) { //remove once card functionality has been moved into Book class
    document.getElementById("book-dialog").close();
    const bookCard = document.getElementById(cardIndex);
    const toggleReadButton = bookCard.querySelector(".toggle-read");

    myLibrary[cardIndex].title = document.getElementById("input-title").value;
    myLibrary[cardIndex].author = document.getElementById("input-author").value;
    myLibrary[cardIndex].pageCount = Math.floor(document.getElementById("input-page-count").value);
    myLibrary[cardIndex].isRead = document.getElementById("input-is-read").checked;

    bookCard.querySelector(".title").textContent = `${myLibrary[cardIndex].title}`;
    bookCard.querySelector(".author").textContent = `by ${myLibrary[cardIndex].author}`;
    bookCard.querySelector(".page-count").textContent = `${myLibrary[cardIndex].pageCount} pages`;

    if (myLibrary[cardIndex].isRead) {
        toggleReadButton.src = "./images/eye-remove-outline.svg";
        bookCard.querySelector(".is-read").textContent = "Already read";
    }
    else {
        toggleReadButton.src = "./images/eye-check-outline.svg";
        bookCard.querySelector(".is-read").textContent = "Not yet read";
    }
}

function removeBook(e) {
    const bookCard = e.target.parentNode.parentNode;
    let cardIndex = bookCard.id;

    delete(myLibrary[cardIndex]);
    bookCard.remove();
}

function toggleRead(e) { //remove once card functionality has been moved into Book class
    const bookCard = e.target.parentNode.parentNode;
    let cardIndex = bookCard.id;
    const cardIsRead = bookCard.querySelector(".is-read");
    const toggleReadButton = bookCard.querySelector(".toggle-read");

    if (myLibrary[cardIndex].isRead) {
        toggleReadButton.src = "./images/eye-check-outline.svg";
        cardIsRead.textContent = "Not yet read";
        myLibrary[cardIndex].isRead = false;
    }
    else {
        toggleReadButton.src = "./images/eye-remove-outline.svg";
        cardIsRead.textContent = "Already read";
        myLibrary[cardIndex].isRead = true;
    }
}

let firstBook = new Book("Orson Scott Card", "Ender's Game", "324", true, counter);
addBookCard(firstBook);
myLibrary.push(firstBook);
counter++;
