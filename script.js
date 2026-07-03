// Get node objects
const library = document.querySelector(".grid-container");
const bookCardTemp = library.querySelector("template");
const appendBtn = document.querySelector("button.append");
const dialog = document.querySelector("dialog");
const form = dialog.querySelector("form");

// Book storage list
const myLibrary = [];

// Book Prototype to create book objs
function Book(title = "No Name", author = "anonymous", pages = "-1", read= false, time_added) {
    this.title = title;
    this.author = author;
    this.page = pages;
    this.read = read;
    this.time_added = time_added;
}

function addBookToLibrary() {
    //... add book to library list
    // track time added
}

// Add/remove hint paragraph
function checkLibEmpty(){
    if (library.children.length == 1) {
        const hintPara = document.createElement("p");
        hintPara.textContent = "Nothing to look here! Click on the button below to add books📖";
        hintPara.classList.add("hint");
        hintPara.setAttribute("style", "position: absolute; left: 20%; top: 50%; font-size: 3.5rem");
        library.appendChild(hintPara);
    }

    else {
        const hintDel = library.querySelector(".hint");
        if (hintDel) hintDel.remove();
    }
}

appendBtn.addEventListener("click", (event) => {
    dialog.showModal();
})

checkLibEmpty();

