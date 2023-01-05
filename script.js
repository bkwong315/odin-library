const myLibrary = [];

class Book {
  constructor(
    title = 'title',
    author = 'author',
    desc = 'desc',
    numOfPages = 'page count',
    readStatus = 'Not yet'
  ) {
    this.title = title;
    this.author = author;
    this.desc = desc;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary() {
  const bookList = document.querySelector('.book-list');

  myLibrary.forEach((book) => {
    const bookContainer = document.createElement('div');
    const bookInfo = document.createElement('div');
    const title = document.createElement('h4');
    const author = document.createElement('p');
    const desc = document.createElement('p');
    const numOfPages = document.createElement('p');
    const readStatus = document.createElement('p');
    const bookActions = document.createElement('div');
    const removeBtn = document.createElement('button');
    const updateBtn = document.createElement('button');

    title.textContent = `Title: ${book.title}`;
    author.textContent = `Author: ${book.author}`;
    desc.textContent = `Description: ${book.desc}`;
    numOfPages.textContent = `Number of Pages: ${book.numOfPages}`;
    readStatus.textContent = `Read Status: ${book.readStatus}`;
    removeBtn.textContent = 'Remove';
    updateBtn.textContent = 'Update';

    bookContainer.classList.add('book');
    bookInfo.classList.add('book-info');
    title.classList.add('book-author');
    author.classList.add('book-author');
    desc.classList.add('book-desc');
    numOfPages.classList.add('book-number-of-pages');
    readStatus.classList.add('book-read-status');
    bookActions.classList.add('book-actions');
    removeBtn.classList.add('btn', 'remove-btn');
    updateBtn.classList.add('btn', 'update-btn');

    bookInfo.appendChild(title);
    bookInfo.appendChild(author);
    bookInfo.appendChild(desc);
    bookInfo.appendChild(numOfPages);
    bookInfo.appendChild(readStatus);
    bookContainer.appendChild(bookInfo);
    bookActions.appendChild(removeBtn);
    bookActions.appendChild(updateBtn);
    bookContainer.appendChild(bookActions);

    bookList.appendChild(bookContainer);
  });
}

document.querySelector('.add-btn').addEventListener('click', (event) => {
  event.preventDefault();
  const form = document.querySelector('.book-form');
  let newBook;

  if (form.checkValidity()) {
    const modal = document.querySelector('.modal');

    const title = document.querySelector('.title-input');
    const author = document.querySelector('.author-input');
    const desc = document.querySelector('.desc-input');
    const numOfPages = document.querySelector('.num-of-pages-input');
    const readStatus = document.querySelector('.read-status-input');

    const readStatusFormatted =
      readStatus.value.slice(0, 1).toUpperCase() +
      readStatus.value.replace('-', ' ').slice(1, readStatus.value.length);

    newBook = new Book(
      title.value,
      author.value,
      desc.value,
      numOfPages.value,
      readStatusFormatted
    );

    addBookToLibrary(newBook);
    displayLibrary();
    modal.style.display = 'none';
  }
});

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
