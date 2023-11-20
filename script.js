// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

const imgContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = [];

const apiKey = '0vcMcjkjiPovqzSsTZK2zK0G0KlPF3II8rvnaUZNwcs'
const count = 10

const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// create elements for links and photos, add to dom
function displayPhotos() {
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a')
        item.setAttribute('href', photo.links.html)
        item.setAttribute('target', '_blank')
        // create <img> for photo
        const img = document.createElement('img')
        img.setAttribute('src', photo.urls.regular)
        img.setAttribute('alt', photo.alt_description)
        img.setAttribute('title', photo.alt_description)
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

getPhotos();