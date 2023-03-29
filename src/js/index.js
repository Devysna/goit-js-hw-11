import { fetchImages } from '../js/fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-form-input');
const btnSearch = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

btnLoadMore.style.display = 'none';

let pageNumber = 1;

btnSearch.addEventListener('click', onBtnSearch);
btnLoadMore.addEventListener('click', onBtnLoadMore);

function onBtnSearch(e) {

    e.preventDefault();
    cleanGallery();
    const inputValue = input.value.trim();    

    if (!inputValue) {return;} 
    fetchImages(inputValue, pageNumber)
        .then(foundList => renderResponseSearch(foundList));
};
       
function onBtnLoadMore(e) {
    
    pageNumber++;
    const inputValue = input.value.trim();
    btnLoadMore.style.display = 'none';

    fetchImages(inputValue, pageNumber)
        .then(foundList => renderResponseLoadMore(foundList));   
};

function cleanGallery() {
    gallery.innerHTML = '';
    pageNumber = 1;
    btnLoadMore.style.display = 'none';    
};

function renderResponseSearch(foundList) {
    if (foundList.hits.length === 0) {
        Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
    } else {
        renderImageList(foundList.hits);
        Notiflix.Notify.success(
                `Hooray! We found ${foundList.totalHits} images.`
        );
        btnLoadMore.style.display = 'block';
        gallerySimpleLightbox.refresh();
    }
};

function renderResponseLoadMore(foundList) {
    if (foundList.hits.length === 0) {
        Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
    } else {
        renderImageList(foundList.hits);
        Notiflix.Notify.success(
            `Hooray! We found ${foundList.totalHits} images.`
        );
        btnLoadMore.style.display = 'block';
    }
};

function renderImageList(images) {
  console.log(images, 'images');
  const markupList = images
    .map(image => {
      console.log('img', image);
        return `
            <div class="photo-card">
                <a href="${image.largeImageURL}">
                    <img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/>
                </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
                    </p>
                    <p class="info-item">
                        <b>Views</b> <span class="info-item-api">${image.views}</span>  
                    </p>
                    <p class="info-item">
                        <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
                    </p>
                    <p class="info-item">
                        <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
                    </p>
                </div>
            </div>`;
    })
    .join('');
  gallery.innerHTML += markupList;
};
