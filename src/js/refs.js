export default function getRefs() {
    return {
        searchForm: document.getElementById('search-form'),
        gallery: document.querySelector('.gallery'),
        btnLoading: document.querySelector('.gallery-btn-loading'),
       // loadMoreBtn: decodeURIComponent.querySelector('[data-action="load-more"]'),
    }
}