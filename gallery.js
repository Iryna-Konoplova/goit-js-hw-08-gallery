import galleryImages from './gallery-items.js';


const galleryContainer = document.querySelector('.js-gallery');
const buttonCloseModal = document.querySelector('.lightbox__button');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const imageModal = document.querySelector('.lightbox__image');
const modalOpen = document.querySelector('.js-lightbox');

galleryContainer.addEventListener('click', onGalleryItemsClick)

const arrayOriginalImages = galleryImages.map(galleryImage => galleryImage.original);
const arrayDescriptionImages = galleryImages.map(galleryImage => galleryImage.description);

const galleryElementsMarkup = createGalleryItemsMarkup(galleryImages)
galleryContainer.insertAdjacentHTML('beforeend', galleryElementsMarkup)

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

  modalOpen.classList.add('is-open');

  imageModal.src = evt.target.dataset.source;
  imageModal.alt = evt.target.alt;

  buttonCloseModal.addEventListener('click', onButtonCloseModalClick)
  lightboxOverlay.addEventListener('click', onButtonCloseModalClick)
  window.addEventListener('keydown', onCloseModalEscapeKeydown)
  document.addEventListener('keydown', onArrowKeyPressAddSrc);
  document.addEventListener('keydown', onArrowKeyPressAddDescription);
}

function onButtonCloseModalClick(evt) {
  modalOpen.classList.remove('is-open');

  imageModal.src = '';
  imageModal.alt = '';
}

function onCloseModalEscapeKeydown(evt) {
  if (evt.code === 'Escape') {
    onButtonCloseModalClick();
  }
}

function onArrowKeyPressAddSrc(evt) {
  let newIndex = arrayOriginalImages.indexOf(imageModal.src);
  if (newIndex < 0) {
    return;
  }
  if (evt.code === 'ArrowLeft') {
    newIndex -= 1;
    if (newIndex === -1) {
      newIndex = arrayOriginalImages.length - 1;
    }
  } else if (evt.code === 'ArrowRight') {
    newIndex += 1;
    if (newIndex === arrayOriginalImages.length) {
      newIndex = 0;
    }
  }
  imageModal.src = arrayOriginalImages[newIndex];
};

function onArrowKeyPressAddDescription(evt) {
    let newIndex = arrayDescriptionImages.indexOf(imageModal.alt);
  if (newIndex < 0) {
    return;
  }
  if (evt.code === 'ArrowLeft') {
    newIndex -= 1;
    if (newIndex === -1) {
      newIndex = arrayDescriptionImages.length - 1;
    }
  } else if (evt.code === 'ArrowRight') {
    newIndex += 1;
    if (newIndex === arrayDescriptionImages.length) {
      newIndex = 0;
    }
  }
  imageModal.alt = arrayDescriptionImages[newIndex]
};
