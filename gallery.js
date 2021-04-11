import gallery from './gallery-items.js';


const galleryContainer = document.querySelector('.js-gallery');
const galleryMarkup = createGalleryItemMarkup(gallery);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick)

function createGalleryItemMarkup(gallery) {
  return gallery.map(({ preview, original, description }) => {
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
    `
  })
    .join('');
    
  return markup;
}

function onGalleryContainerClick(evt) {
  if (!evt.target.classList('gallery__image')) {
    return;
  }

  // const swatchEl = evt.target;
  // swatchEl.classList.add()

  return evt.target.dataset.source;
  
}