import './sass/main.scss';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import ApiImages from './js/get-images';
import renderImages from './js/render-images';
import { getRefs } from './js/get-refs';

const refs = getRefs();
const apiImages = new ApiImages();

refs.loadMoreBtn.classList.add('is-hidden');

refs.form.addEventListener('submit', toLoadImg);
refs.loadMoreBtn.addEventListener('click', toLoadMoreImg);

async function toLoadImg(evt) {
    evt.preventDefault();

    apiImages.startPage();
    apiImages.searchQuery = evt.currentTarget.elements.query.value;
    refs.gallery.innerHTML = '';

    if (apiImages.searchQuery === '') {
        refs.gallery.innerHTML = '';
        refs.loadMoreBtn.classList.add('is-hidden');
        return Notiflix.Notify.failure('Please enter any data you would like to find.');
    }

    await apiImages.getImagesByName().then(response => {
        const hitsLength = response.data.hits.length;
        if (hitsLength === 0) {
             refs.gallery.innerHTML = '';
            refs.loadMoreBtn.classList.add('is-hidden');
            
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }

        Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
        renderImages(response);
         refs.loadMoreBtn.classList.remove('is-hidden');
    })
    evt.target.reset();
}



async function toLoadMoreImg() {
    apiImages.getImagesByName().then(response => {
        const hitsLength = response.data.hits.length;
        console.log(hitsLength);
        if (40 > hitsLength ) {
            refs.loadMoreBtn.classList.add('is-hidden');
            Notiflix.Notify.success("We're sorry, but you've reached the end of search results.");
        }
        renderImages(response);
    })
}