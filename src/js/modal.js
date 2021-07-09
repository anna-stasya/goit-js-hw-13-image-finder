//================================открыть модалку ========================================

const openModalImage = document.querySelector('.js-lightbox');
const lightboxImage = openModalImage.querySelector('.card-image');
const closeModalImage = document.querySelector('[data-action="close-lightbox"]'); 


galleryContainer.addEventListener('click', onOpenModal);

function onOpenModal(event) {
    window.addEventListener('keydown', onEscClick); //для закрытия по ESС 
    event.preventDefault();

    const isGallerySwatch = event.target.classList.contains('gallery__image');
    
    if(!isGallerySwatch){
        return;
    }

    if (event) {
        openModalImage.classList.add('is-open');

        lightboxImage.src = event.target.dataset.source; 
        lightboxImage.alt = event.target.alt;
    }
}

//================================пролистывание изображений ========================================
//! в процессе. Что-то не то. Понять бы что))

// const arrayImages = [];

// document.addEventListener('keydown', (event) => {
//     let newIndex;
//     const swipeGalleryImage = arrayImages.indexOf(lightboxImage.src);
//     if (event.key === 'ArrowLeft') {
        
//             newIndex = swipeGalleryImage - 1;
//             if (newIndex === -1) {
//                 newIndex = arrayImages.length - 1;
//             }    
        
//     } else if (event.key === 'ArrowRight') {
//         newIndex = swipeGalleryImage + 1;
//         if (newIndex === (arrayImages.length)) {
//                 newIndex = 0;
//             }
//     }
//     lightboxImage.src = arrayImages[newIndex];
// })

//========================закрыть модалку через иконку ========================================

closeModalImage.addEventListener('click', onCloseModal);

function onCloseModal() {
    window.removeEventListener('keydown', onEscClick); //для закрытия по ESС
    openModalImage.classList.remove('is-open');
     
    lightboxImage.src = '';
    lightboxImage.alt = '';
}

// ==============================закрыть по backdrop====================

const backdropClick = document.querySelector('.lightbox__overlay');

backdropClick.addEventListener('click', onBackdropClick);

function onBackdropClick() {
    onCloseModal();

    console.log('кликнули по backdrop');
}

// ===========================закрыть по ESС==========================

function onEscClick(event) {
    const ESC_KEY_CODE = 'Escape';
    console.log(event.code);

    if (event.code === ESC_KEY_CODE) {
        onCloseModal();
    }
}