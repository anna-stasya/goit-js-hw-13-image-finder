import './sass/main.scss';

//templates
import galleryCardTmpl from './templates/gallery.hbs';

    //js folder
import getRefs from './js/refs.js';
import LoadMoreBtn from './js/load-more-btn.js';

  //basicLightbox
const basicLightbox = require('basiclightbox');

//refs
const refs = getRefs();

let searchQueryForm = '';

let page = 1;
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '22363451-8577670099bbad87a35d9bf1c';

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});


//------------------------------------поиск по форме--------------------------------
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault(); //что бы не перегружалась страничка при отправке формы
    clearMarkupCard();
    
    searchQueryForm = event.currentTarget.elements.query.value;
    if (searchQueryForm === '') {
        loadMoreBtn.hide();
        refs.gallery.innerHTML = '';
        return ;
    } else {
        fetchArticles();
    }
    
    loadMoreBtn.show();
    clearText(event);
}

//----------------------------Очистка текстового поля ввода при нажатии кнопки------------------------
function clearText(event) {
        event.currentTarget.elements.query.value = '';     
}

//------------------------------------плавный скролл во время прокрутки картинок----------------------------------
function SmoothScroll() {
    setTimeout(() => {
        refs.btnLoading.scrollIntoView({

            behavior: 'smooth',
            block: 'end',
        });
    }, 1000);
};


//-----------------------------------кнопка загрузить ещё------------------------------------
 loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onLoadMore() {
    page += 1;
    SmoothScroll();
    fetchArticles();
}

//------------------------------------функция для рендеринга картинок----------------------------
function renderMarkupCard(el) {
    refs.gallery.insertAdjacentHTML('beforeend', galleryCardTmpl(el.hits));
}

//------------------------------------очищает при новом запросе----------------------------
function clearMarkupCard() {
    refs.gallery.innerHTML = '';
}

//---------------------------------fetch-api-------------------------------------
function fetchGallery() {
       
    return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQueryForm}&page=${page}&per_page=12&key=${KEY}`)
        .then(response => response.json())
        .then(el => {
            renderMarkupCard(el)
        })
        .catch(error => {
            console.log(error)
        })  
}

//---------------------------------fetch-articls работа с кнопкой---------------------------------------
function fetchArticles() {
    loadMoreBtn.disable();
   fetchGallery().then(loadMoreBtn.enable());
  
}

//---------------------------------бесконечный скролл------------------------------


//----------------------------------модалка
refs.cardImg.addEventListener('click', modalWindow);

function modalWindow (e) {
    if (e.target.classList.contains('card-image')) {
    const instance = basicLightbox.create(
      `<img src=${e.target.getAttribute('data-src')}>`,
    );
    instance.show();
    basicLightbox.visible();
  }
}



