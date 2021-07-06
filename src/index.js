import './sass/main.scss';

//templates
import galleryCardTmpl from './templates/gallery.hbs';

    //js folder
//import API from './js/fetch-api.js';
import getRefs from './js/refs.js';

//refs
const refs = getRefs();

    let searchQueryForm = '';
    let page = 1;
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '22363451-8577670099bbad87a35d9bf1c';

//------------------------------------поиск по форме
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault(); //что бы не перегружалась страничка при отправке формы
    clearMarkupCard();
    searchQueryForm = event.currentTarget.elements.query.value;

    

    fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQueryForm}&page=${page}&per_page=12&key=${KEY}`)
        .then(response => response.json())
        .then(el => {
            renderMarkupCard(el)
        })
        .catch(error => {
            console.log(error)
        })  
}

//------------------------------------плавный скролл
function SmoothScroll() {
    refs.btnLoading.scrollIntoView({

  behavior: 'smooth',
  block: 'end',
});
}

//-----------------------------------кнопка загрузить ещё
 refs.btnLoading.addEventListener('click', onLoadMore);

function onLoadMore() {
    page += 1;
    SmoothScroll();
   
    fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQueryForm}&page=${page}&per_page=12&key=${KEY}`)
        .then(response => response.json())
        .then(el => {
            renderMarkupCard(el)
        })
        .catch(error => {
            console.log(error)
        })  
}

//------------------------------------функция для рендеринга картинок
function renderMarkupCard(el) {
    refs.gallery.insertAdjacentHTML('beforeend', galleryCardTmpl(el.hits));
}

//------------------------------------очищает при новом запросе
function clearMarkupCard() {
    refs.gallery.innerHTML = '';
    
}




