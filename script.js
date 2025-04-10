const root = document.querySelector(`root`);
const show = document.querySelector(`#show`);
const dialog = document.querySelector(`#favD`);
const answer = document.querySelector(`#answer`);
const title = document.querySelector(`#bookTitle`);
const auth = document.querySelector(`#bookAuthor`);
const page = document.querySelector(`#bookPages`);
const read = document.querySelector(`#readStatus`);
const display = document.querySelector(`.display`);

const library = [];

function Book(name, author, pages, status){
    console.log(status);
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.setId();
    this.setRead(status);
}

Book.prototype.setId = function (){
    this.id = crypto.randomUUID();
}

Book.prototype.setRead = function(status){
    this.read = status ? `read` : `unread`;
}

function addBook(name,author,nop,readStatus){
    
    let book = new Book(name,author,nop,readStatus);
    library.push(book);
    console.log(library);

    addToDisplay();
    
}

function removeBook(id){

    let pos;
    library.forEach((book) =>{ 
    if(book.id===id){
            pos = library.indexOf(book);
        }
    });

    library.splice(pos,1);
    console.log(library);
    addToDisplay();
}

function showDisplay(book){
    const card = document.createElement(`div`);
    card.setAttribute(`id`,book.id);

    const title = document.createElement(`p`);
    title.textContent = book.name;

    const writer = document.createElement(`p`);
    writer.textContent = book.author;

    const totalPages = document.createElement(`p`);
    totalPages.textContent = book.pages;

    const finished = document.createElement(`p`);
    finished.textContent = book.read;

    const del = document.createElement(`button`);
    del.textContent = `Delete`;
    
    card.appendChild(title);
    card.appendChild(writer);
    card.appendChild(totalPages);
    card.appendChild(finished);
    card.appendChild(del);

    del.addEventListener(`click`, ()=>{
        removeBook(book.id);
    });
    display.appendChild(card);
}

function addToDisplay(){
    display.innerHTML=``;
    library.forEach((book) =>{
        showDisplay(book);
    })
}

show.addEventListener(`click`,() =>{
    dialog.showModal();
});

answer.addEventListener('click',(event) =>{
    event.preventDefault();
    addBook(title.value,auth.value,page.value,read.checked);
    dialog.close();
});
