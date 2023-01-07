const myLibrary = [];

class Book {
  constructor(
    title = 'title',
    author = 'author',
    numOfPages = 'page count',
    readStatus = 'Not yet'
  ) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const removeBookFromLibrary = (event) => {
  const bookContainer = event.target.parentElement.parentElement;
  const bookTitle = bookContainer.querySelector('.book-title');

  myLibrary.splice(
    myLibrary.find((book) => book.title === bookTitle.value),
    1
  );

  document.querySelector('.book-list').removeChild(bookContainer);
};

const createBook = (book) => {
  const bookContainer = document.createElement('div');
  const bookInfo = document.createElement('div');
  const title = document.createElement('h4');
  const author = document.createElement('p');
  const numOfPages = document.createElement('p');
  const readStatus = document.createElement('p');
  const bookActions = document.createElement('div');
  const removeBtn = document.createElement('button');
  const updateBtn = document.createElement('button');

  title.textContent = `Title: ${book.title}`;
  author.textContent = `Author: ${book.author}`;
  numOfPages.textContent = `Pages: ${book.numOfPages}`;
  readStatus.textContent = `Read Status: ${book.readStatus}`;
  removeBtn.textContent = 'Remove';
  updateBtn.textContent = 'Update';

  bookContainer.classList.add('book');
  bookInfo.classList.add('book-info');
  title.classList.add('book-title');
  author.classList.add('book-author');
  numOfPages.classList.add('book-number-of-pages');
  readStatus.classList.add('book-read-status');
  bookActions.classList.add('book-actions');
  removeBtn.classList.add('btn', 'remove-btn');
  updateBtn.classList.add('btn', 'update-btn');

  removeBtn.addEventListener('click', removeBookFromLibrary);

  bookInfo.appendChild(title);
  bookInfo.appendChild(author);
  bookInfo.appendChild(numOfPages);
  bookInfo.appendChild(readStatus);
  bookContainer.appendChild(bookInfo);
  bookActions.appendChild(removeBtn);
  bookActions.appendChild(updateBtn);
  bookContainer.appendChild(bookActions);

  return bookContainer;
};

function displayLibrary() {
  const bookList = document.querySelector('.book-list');

  myLibrary.forEach((book) => {
    if (
      !Array.from(bookList.querySelectorAll('.book')).some(
        (target) =>
          target.querySelector('.book-title').textContent.split(' ')[1] ===
          book.title
      )
    ) {
      bookList.appendChild(createBook(book));
    }
  });
}

document.querySelector('.open-modal-btn').addEventListener('click', () => {
  const modal = document.querySelector('.modal');
  modal.style.display = 'grid';
});

document.querySelector('.modal').addEventListener(
  'click',
  (event) => {
    const modal = document.querySelector('.modal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  },
  { capture: true }
);

document.querySelector('.add-btn').addEventListener('click', (event) => {
  event.preventDefault();
  const form = document.querySelector('.book-form');
  let newBook;

  if (form.checkValidity()) {
    const modal = document.querySelector('.modal');

    const title = document.querySelector('.title-input');
    const author = document.querySelector('.author-input');
    const numOfPages = document.querySelector('.num-of-pages-input');
    const readStatus = document.querySelector('.read-status-input');

    newBook = new Book(
      title.value,
      author.value,
      numOfPages.value,
      readStatus.value
    );

    addBookToLibrary(newBook);
    displayLibrary();
    modal.style.display = 'none';
  }
});
