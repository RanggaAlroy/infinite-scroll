// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

const imgContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const apiKey = '0vcMcjkjiPovqzSsTZK2zK0G0KlPF3II8rvnaUZNwcs'
let count = 5;
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log("imagesLoaded");
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
    }
}


// helper function to set attributes on dom elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// create elements for links and photos, add to dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a')

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // create <img> for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img)
        imgContainer.appendChild(item)
    })
}

//  get photos from unsplash api

async function getPhotos() {
    try {
        const response = await fetch(apiURL)
        photosArray = await response.json()
     displayPhotos()
    } catch (error) {
        console.log(error);
        throw error
        
    }
}


window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos()
    }
})

getPhotos();