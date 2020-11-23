import galleryItems from "./gallery-items.js";

const galleryUlRef = document.querySelector('.js-gallery');
const divModalRef = document.querySelector('.js-lightbox');
const modalButtonRef = document.querySelector('.lightbox__button');
const lightBoxImgRef = document.querySelector('.lightbox__image');
const divOverlayRef = document.querySelector('.lightbox__overlay');


galleryUlRef.addEventListener('click', onGalleryClick);
modalButtonRef.addEventListener('click', onCloseModal);
divOverlayRef.addEventListener('click', onCloseModal);

function imageMarking(image) {
    const liRef = document.createElement("li");
    const aRef = document.createElement('a');
    const imgRef = document.createElement('img');

    liRef.classList.add("gallery__item");
    aRef.classList.add('gallery__link');
    imgRef.classList.add('gallery__image')


    aRef.href = image.original;
    imgRef.src = image.preview;
    imgRef.alt = image.description;
    imgRef.dataset.source = image.original
    

    liRef.appendChild(aRef);
    aRef.appendChild(imgRef);
    
    return liRef
};

function allImagesMarking(gallery) { gallery.map(image => { galleryUlRef.appendChild(imageMarking(image)) })}
allImagesMarking(galleryItems);

function onGalleryClick(event) {event.preventDefault();
    if (event.target.nodeName !== "IMG") {
        return
    }
    const largeImageUrl = event.target.dataset.source;
    lightBoxImgRef.src = largeImageUrl;
    onOpenModal(event);
        
};

function onOpenModal(event) {
    let i = +event.target.dataset.index;
    
    window.addEventListener('keydown', event => { moveNextPrev(event); if (event.code === "Escape") {onCloseModal()}}); 
    divModalRef.classList.add('is-open');

    function moveNextPrev(event) {
        if (event.code === "ArrowRight" && ((i !== newArray.length - 1)))
        {   i += 1;
            lightBoxImgRef.src = newArray[i].dataset.source;
        } else if (event.code === "ArrowLeft" && ((i !== 0)) ){
            i -= 1;
            lightBoxImgRef.src = newArray[i].dataset.source;
        }
        return
        
    };            
};

function onCloseModal() {
    window.removeEventListener("click", onPressEscape )
    divModalRef.classList.remove('is-open')
    lightBoxImgRef.src = ""
};

function onPressEscape(event) {
    if (event.code === "Escape") { 
            onCloseModal()
    }
};

const imgArray = document.querySelectorAll('.gallery__image');
imgArray.forEach((img, i) => { img.dataset.index = i });
const newArray = Array.from(imgArray);





