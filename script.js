// Get node objects
const library = document.querySelector(".grid-container");
const bookCardTemp = library.querySelector("template");
const appendBtn = document.querySelector("button.append");
const dialog = document.querySelector("dialog");
const form = dialog.querySelector("form");

// Book storage array
let myLibrary = [];

// Book Prototype to create book objs
// function Book(title, author, pages, read, timeStr, id) {
//     this.title = title;
//     this.author = author;
//     this.page = pages;
//     this.read = read;
//     this.timeStr = timeStr;
//     this.id = id;
// }

// Book prototype built from class

class Book {
    constructor(title, author, pages, read, timeStr, id){
        this.title = title;
        this.author = author;
        this.page = pages;
        this.read = read;
        this.timeStr = timeStr;
        this.id = id;
    }

    static addBookToLibrary(title, author, pages, read, timeObj, id) {
        // process timeObj to get timestring
        const formatter = new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            weekday: "short"
        });
        const timeStr = formatter.format(timeObj);

        // create Book obj
        const tempBookObj = new Book(title, author, pages, read, timeStr, id);

        // append Book obj
        myLibrary.push(tempBookObj);
    }

    static checkLibEmpty(){
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
}



// iterate storage arr and display book
function updateLibraryDisplay(){
    // clean all book-cards first
    const childArr = Array.from(library.children);
    childArr.forEach(child => {
        if (child.tagName == "DIV") {
            child.remove();
        }
    });

    // iterate over library arr
    myLibrary.forEach(bookObj => {

        // clone a node from template
        const tempBookCard = bookCardTemp.content.cloneNode(true);
        const bookCardNode = tempBookCard.querySelector(".book-card");

        // populate the text fields
        tempBookCard.querySelector(".name").textContent = bookObj.title;
        tempBookCard.querySelector(".author").textContent = bookObj.author;
        tempBookCard.querySelector(".pages").textContent = bookObj.page;
        tempBookCard.querySelector(".time").textContent = bookObj.timeStr;

        // toggle read attr and check the box
        if (bookObj.read) {
            bookCardNode.classList.add("read");
            tempBookCard.querySelector("input").checked = true;
        }

        // add eventlistener for read & remove button
        tempBookCard.querySelector("input").addEventListener("change", () => {
            bookCardNode.classList.toggle("read");
        });

        const cancelDialog = tempBookCard.querySelector("dialog");
        tempBookCard.querySelector(".bookTitle").textContent = bookObj.title + "?";

        tempBookCard.querySelector(".remove").addEventListener("click", ()=> {
            cancelDialog.showModal();
        })

        cancelDialog.addEventListener("close", ()=>{
            // perform deletion
            if (cancelDialog.returnValue) {
                myLibrary = myLibrary.filter(bookObj => bookObj.id != bookCardNode.id);
                updateLibraryDisplay();
            }
        });

        // set id
        bookCardNode.id = bookObj.id;

        library.appendChild(tempBookCard);
    })

    checkLibEmpty();
}


// open up the modal
appendBtn.addEventListener("click", (event) => {
    dialog.showModal();
})

dialog.addEventListener("close", ()=> {
    if (dialog.returnValue) {
        // fetch data from Form
        const fdata = new FormData(form);
        const title = fdata.get('title');
        const author = fdata.get('author');
        const page = fdata.get('page');
        const read = fdata.has('read');
        const currTime = new Date();
        const id = crypto.randomUUID();

        // call helper func
        addBookToLibrary(title, author, page, read, currTime, id);

        updateLibraryDisplay();
    }

    form.reset();

})

// Check intial empty state
checkLibEmpty();

