

function Borrow(event) {
    const row = event.target.closest('tr');

    const statusCell = row.querySelector('td:nth-child(4)');

    statusCell.textContent = statusCell.textContent === 'Available' ? 'Borrowed' : 'Borrowed';

    alert(`Book status changed to ${statusCell.textContent}`);

    
}   

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.isBorrowed = false;
    }

    toggleBorrowStatus() {
        this.isBorrowed = !this.isBorrowed;
    }
}
class Display {
    book = new Book();
    add(book) {
        let uiString = `<tr>
                          
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>${book.isBorrowed ? 'Borrowed' : 'Available'}</td>
                            <td><button> ${book.isBorrowed ? 'Return' : 'Borrow'} </button></td>
                            
                        </tr>`;
        bookList.innerHTML += uiString;
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
    toggleBorrowStatus(index) {
        if (index >= 0 && index < this.bookList.length) {
            const book = this.bookList[index];
            book.toggleBorrowStatus();
            this.updateBookList();
            alert(`${book.title} ${book.isBorrowed ? 'borrowed' : 'returned'} successfully!`);
        } else {
            alert('Invalid book index.');
        }
    }
    // saveToLocalStorage() {
    //     localStorage.setItem('addBookList', JSON.stringify(this.bookList));
    // }
}


let addBookForm = document.querySelector("#addBookForm");
addBookForm.addEventListener("submit", addBookFormSubmit);

function addBookFormSubmit() {

    let title = document.getElementById("bookTitle").value;
    let author = document.getElementById("bookAuthor").value;
    let book = new Book(title, author);

    let display = new Display();

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

