


function fetchGallery() {
        let page = 1;
        const BASE_URL = 'https://pixabay.com/api/';
        const KEY = '22363451-8577670099bbad87a35d9bf1c';


    return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQueryForm}&page=${page}&per_page=12&key=${KEY}`)
        .then(response => response.json())
        .then(el => {
            renderMarkupCard(el)
        })
        .catch(error => {
            console.log(error)
        })  
}

export default { fetchGallery };