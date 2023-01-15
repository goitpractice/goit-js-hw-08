import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const galleryEl = document.querySelector('.gallery');

const galleryItemEls = galleryItems.map(item => buildGalleryItem(item));
galleryEl.append(...galleryItemEls);

new SimpleLightbox('.gallery a', { captionDelay: 250 });

function buildGalleryItem({ preview, original, description }) {
  const galleryItemEl = document.createElement('a');

  galleryItemEl.classList.add('gallery__item');
  galleryItemEl.href = original;
  galleryItemEl.innerHTML = `
        <img class="gallery__image" src="${preview}" alt="${description}" title="${description}"/>
  `;

  return galleryItemEl;
}
