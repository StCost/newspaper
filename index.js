import {$} from './src/libs'

window.PDFJS_LOCALE = {
  pdfJsWorker: 'https://cdn.jsdelivr.net/npm/flip-book@1.9.7/js/pdf.worker.js'
};
require('./src/flip-book');

import books from './src/config';
let bookIndex = books.length - 1;
const setPage = () => {
  const index = parseInt(new URL(window.location.href).searchParams.get('page'));
  if (!isNaN(index)) {
    bookIndex = index;
  }
};
setPage();

const changeBookIndex = (change = 0) => {
  bookIndex += change;
  if (bookIndex < 0) {
    bookIndex = books.length - 1;
  } else if (bookIndex > books.length - 1) {
    bookIndex = 0;
  }
  window.location.replace('?page=' + bookIndex)
};

const body = document.body;
const wrapper = document.createElement('div');
wrapper.classList.add('changer');
body.appendChild(wrapper);

const leftB = document.createElement('button');
leftB.classList.add('index-changer');
leftB.innerHTML = '<';
wrapper.appendChild(leftB);
leftB.onclick = () => changeBookIndex(-1);

const index = document.createElement('div');
wrapper.appendChild(index);
index.classList.add('index');
index.innerHTML = '' + (bookIndex + 1);

const rightB = document.createElement('button');
rightB.classList.add('index-changer');
rightB.innerHTML = '>';
rightB.onclick = () => changeBookIndex(1);
wrapper.appendChild(rightB);

$('#container').FlipBook({
  pdf: `books/${books[bookIndex]}.pdf`,
  template: {
    html: 'https://cdn.jsdelivr.net/npm/flip-book@1.9.7/templates/default-book-view.html',
    styles: [
      'https://cdn.jsdelivr.net/npm/flip-book@1.9.7/css/short-black-book-view.css'
    ],
    links: [{
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/flip-book@1.9.7/css/font-awesome.min.css'
    }],
    script: 'https://cdn.jsdelivr.net/npm/flip-book@1.9.7/js/default-book-view.js'
  }
});

