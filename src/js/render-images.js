import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getRefs } from "./get-refs";

const refs = getRefs();

export default function renderImages(images) {
    const imgCollection = images.data.hits;

    const imgRenderMarkup = imgCollection.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
        <a class="gallery-img_link" href=${largeImageURL}>
  <img src=${webformatURL} alt=${tags} loading="lazy" width="340" height="220"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: <span class="info-text">${likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views: <span class="info-text">${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments: <span class="info-text">${comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads: <span class="info-text">${downloads}</span></b>
    </p>
  </div>
</div>`
    }).join('');

    refs.gallery.insertAdjacentHTML("beforeend", imgRenderMarkup);

    let gallery = new SimpleLightbox(".gallery a");
    gallery.refresh();

    const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

}