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
    title.setAttribute(`id`,`bookWhat`);
    title.textContent = book.name;

    const writer = document.createElement(`p`);
    writer.setAttribute(`id`,`bookWho`);
    writer.textContent = book.author;

    const totalPages = document.createElement(`p`);
    totalPages.setAttribute(`id`,`bookHow`);
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

    const del = document.createElement(`svg`);
    del.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                        <g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z" fill="#F4EDD3"/> </g>
                    </svg>`;

    const remover = document.createElement(`div`);
    remover.setAttribute(`class`,`removeBtn`);
    remover.appendChild(del);

    const content = document.createElement(`div`);
    content.setAttribute(`class`,`cardContent`);

    const bookSleeve = document.createElement(`div`);
    bookSleeve.setAttribute(`class`,`bookSleeve`);

    bookSleeve.appendChild(coverPic);
    content.appendChild(title);
    content.appendChild(writer);
    content.appendChild(totalPages);
    content.appendChild(readCheck);
    content.appendChild(remover);
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
    {name: "Crime and Punishment",
    author: "Fyodor Dostoevsky", 
    pages: '527',
    read: false,
    cover: "./images/CnP.jpg"
    },
    {name: "Moby Dick",
    author: "Herman Melville", 
    pages: '635',
    read: true,
    cover: "./images/MB.jpg"
    },
    {name: "1984",
    author: "George Orwell", 
    pages: '328',
    read: false,
    cover: "./images/1984.jpg"
    },
    {name: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien", 
    pages: '423',
    read: true,
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
    document.querySelector(`.sideNav`).setAttribute(`style`,`transform:scaleX(1);`);
    display.setAttribute(`style`, `margin-left:300px`);
}

function closeNav(){
    document.querySelector(`.sideNav`).setAttribute(`style`,`transform:scaleX(0);`);
    display.setAttribute(`style`, `margin-left:0px`);
}