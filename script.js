class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.isBorrowed = false;
    }

    toggleBorrowStatus() {
        this.isBorrowed = true;
    }
}

class Display {

    constructor() {
        this.bookList = JSON.parse(localStorage.getItem('bookList')) || [];
        this.updateUI();
    }
    book = new Book();
    add(book) {
        let uiString = `<tr>
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>${book.isBorrowed ? 'Borrowed' : 'Available'}</td>
                            <td class="borrow"><button onClick="Borrow(event)"> ${book.isBorrowed ? 'Return' : 'Borrow/Return'} </button></td> 
                        </tr>`;
                  
        bookList.innerHTML += uiString;
        this.bookList.push(book);
        this.updateLocalStorage();
    };
    clear() {
        addBookForm.reset();
    }
    validate(book) {
        if (book.title.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }   
    updateLocalStorage() {
        localStorage.setItem('bookList', JSON.stringify(this.bookList));
    }
    updateUI() {
        this.bookList.forEach(book => {
            let uiString = `<tr>
                                <td>${book.title}</td>
                                <td>${book.author}</td>
                                <td>${book.isBorrowed ? 'Borrowed' : 'Available'}</td>
                                <td class="borrow"><button class="borrow" onClick="Borrow(event)"> ${book.isBorrowed ? 'Return' : 'Borrow/Return'} </button></td> 
                            </tr>`;
            bookList.innerHTML += uiString;
        });
    }

}


function Borrow(event) {
        const row = event.target.closest('tr');
        const statusCell = row.querySelector('td:nth-child(3)');
        statusCell.textContent = statusCell.textContent === 'Available' ? 'Borrowed' : 'Available';
        alert(`Book status changed to ${statusCell.textContent}`);

        const title = row.querySelector('td:nth-child(1)').textContent;
    const author = row.querySelector('td:nth-child(2)').textContent;
    const bookList = JSON.parse(localStorage.getItem('bookList')) || [];
    const updatedBookList = bookList.map(book => {
        if (book.title === title && book.author === author) {
            book.isBorrowed = !book.isBorrowed;
        }
        return book;
    });
    localStorage.setItem('bookList', JSON.stringify(updatedBookList));
    }


let addBookForm = document.querySelector("#addBookForm");
addBookForm.addEventListener("submit", addBookFormSubmit);

let display = new Display();
function addBookFormSubmit() {

    let title = document.getElementById("bookTitle").value;
    let author = document.getElementById("bookAuthor").value;
    let book = new Book(title, author);



    if (display.validate(book)) {
        display.add(book);
        display.clear();
    } else {
        alert("Invalid book name/author!");
    }
};


function searchBook() {
    const titleInput = document.getElementById("searchTitle");
    const title = titleInput.value.trim().toLowerCase();

    if (title) {
        const tableRows = document.getElementById("bookList").getElementsByTagName("tr");

        for (let i = 0; i < tableRows.length; i++) {
            const bookTitle = tableRows[i].getElementsByTagName("td")[0].textContent.trim().toLowerCase();

            if (bookTitle.includes(title)) {
                alert("The book is present in the library.");
                return;
            }
        }
        alert("Not Present.");
    } else {
        alert("Please enter a title to search.");
    }
}

