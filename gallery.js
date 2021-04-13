import galleryImages from './gallery-items.js';


const galleryContainer = document.querySelector('.js-gallery');
const galleryElementsMarkup = createGalleryItemsMarkup(galleryImages)

galleryContainer.insertAdjacentHTML('beforeend', galleryElementsMarkup)

galleryContainer.addEventListener('click', onGalleryItemsClick)

const buttonCloseModal = document.querySelector('.lightbox__button');
buttonCloseModal.addEventListener('click', onButtonCloseModalClick)

const ightboxOverlay = document.querySelector('.lightbox__overlay');
ightboxOverlay.addEventListener('click', onButtonCloseModalClick)

window.addEventListener('keydown', onCloseModalEscapeKeydown)

function createGalleryItemsMarkup(galleryImages) {
  return galleryImages
    .map(({ preview, original, description }) => {
    return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
  `;
  })
    .join('');
}

function onGalleryItemsClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  console.log(evt.target.dataset.source);

  const modalOpen = document.querySelector('.js-lightbox');
  modalOpen.classList.add('is-open');

  const imageModal = document.querySelector('.lightbox__image');
  imageModal.src = evt.target.dataset.source;
  imageModal.alt = evt.target.alt;
}


function onButtonCloseModalClick(evt) {
   const modalOpen = document.querySelector('.js-lightbox');
  modalOpen.classList.remove('is-open');

   const imageModal = document.querySelector('.lightbox__image');
  imageModal.src = '';
  imageModal.alt = '';
}

// function onOverlayCloseModalClick(evt) {
//   onButtonCloseModalClick();
// }

function onCloseModalEscapeKeydown(evt) {
  if (evt.code === 'Escape') {
    onButtonCloseModalClick();
  }
}

