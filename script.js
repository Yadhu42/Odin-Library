const root = document.querySelector(`root`);
const show = document.querySelector(`#show`);
const answer = document.querySelector(`#answer`);
const title = document.querySelector(`#bookTitle`);
const auth = document.querySelector(`#bookAuthor`);
const page = document.querySelector(`#bookPages`);
const read = document.querySelector(`#readStatus`);
const coverimg = document.querySelector(`#bookCover`);
const display = document.querySelector(`.display`);


const library = [];

function Book(name, author, pages, status, cover){
    if(!new.target){
        throw new Error(`You must invoke this constructor via new Object`);
    }

    this.name = name;
    this.author = author;
    this.pages = pages;
    this.setId();
    this.setRead(status);
    this.cover = cover;
}

Book.prototype.setId = function (){
    this.id = crypto.randomUUID();
}

Book.prototype.setRead = function(status){
    this.read = status ? true:false;
}

function addBook(name,author,nop,read,cover){
    let book = new Book(name,author,nop,read,cover);
    library.push(book);
    addToDisplay();
}

function submitEntry(name,author,nop,readStatus,cover){
    if(!name){
        throw new Error(`You must enter the name of the book`);
    }
    if(!author){
        throw new Error(`You must enter the name of the author`);
    }

    if(typeof(cover)===`object`){
        const reader = new FileReader();
        reader.readAsDataURL(cover);

        reader.addEventListener(`load`,(event) =>{
            const coversrc = event.target.result;
            addBook(name,author,nop,readStatus, coversrc);

        });

    }
    else{
        addBook(name,author,nop,readStatus,cover);
    }

}

function removeBook(id){

    let pos;
    library.forEach((book) =>{ 
    if(book.id===id){
            pos = library.indexOf(book);
        }
    });

    library.splice(pos,1);
    addToDisplay();
}

function showDisplay(book){
    const card = document.createElement(`div`);
    card.setAttribute(`id`,book.id);
    card.setAttribute(`class`,`card`);

    const title = document.createElement(`p`);
    title.textContent = book.name;

    const writer = document.createElement(`p`);
    writer.textContent = book.author;

    const totalPages = document.createElement(`p`);
    totalPages.textContent = `${book.pages} pages`;

    const readStatus = document.createElement(`label`);
    readStatus.setAttribute(`for`,`checkbox`);
    readStatus.textContent=`Completed`;

    const changeStatus = document.createElement(`input`);
    changeStatus.setAttribute(`type`,`checkbox`);
    changeStatus.checked = book.read? true:false;

    const readCheck = document.createElement(`div`);
    readCheck.setAttribute(`class`,`readCheck`);
    readCheck.appendChild(readStatus);
    readCheck.appendChild(changeStatus);

    const coverPic = document.createElement(`img`);
    coverPic.setAttribute(`class`,`coverPhoto`);
    coverPic.src=book.cover;

    const del = document.createElement(`button`);
    del.textContent = `Delete`;
    
    const content = document.createElement(`div`);
    content.setAttribute(`class`,`cardContent`);

    const bookSleeve = document.createElement(`div`);
    bookSleeve.setAttribute(`class`,`bookSleeve`);

    bookSleeve.appendChild(coverPic);
    content.appendChild(title);
    content.appendChild(writer);
    content.appendChild(totalPages);
    content.appendChild(readCheck);
    content.appendChild(del);
    card.appendChild(bookSleeve);
    card.append(content);

    del.addEventListener(`click`, ()=>{
        removeBook(book.id);
    });

    changeStatus.addEventListener(`click`,() =>{
        if(changeStatus.checked){
            book.setRead(changeStatus.checked);
        }
    });

    display.appendChild(card);
    console.log(library);
}

const defaultLib = [
    {name: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien", 
    pages: '423',
    read: false,
    cover: "./images/lotr.jpg"
    }];



function showDefaultLib(){
    defaultLib.forEach((book) =>{
        submitEntry(book.name,book.author,book.pages,book.read,book.cover);
    });
}

showDefaultLib();


function addToDisplay(){
    display.innerHTML=``;
    library.forEach((book) =>{
        showDisplay(book);
    })
}

answer.addEventListener('click',(event) =>{
    event.preventDefault();
    console.log(typeof(coverimg.files[0]));
    submitEntry(title.value,auth.value,page.value,read.checked,coverimg.files[0]);
});

function openNav(){
    document.querySelector(`.sideNav`).setAttribute(`style`,`width:300px`);
    display.setAttribute(`style`, `margin-left:300px`);
}