
// const ARTWORKS_URL = "https://api.artsy.net/api/tokens/xapp_token?client_id=6823a01cacfc8eb52c8b&client_secret=476506b96c59c125414d8ae951344725"
const ArtWork_Url = "http://localhost:3000/artworks"

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM LOADED")
    getArtwork()
    getGalleries()
})

const getArtwork = () => {
    fetch(ArtWork_Url)
    .then(res => res.json())
    .then(json => showArtwork(json))
}

const showArtwork = artworksArray => {
    artworksArray.forEach(artwork  => makeArtCard(artwork))
}

const thousands_separators = num => {
    let num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${num_parts.join(".")}`;
} 

const makeArtCard = artwork => {
    let imageSectionRow= document.getElementById("image-section-row")
    let column = document.createElement("div")
    column.className = "col-sm"
    column.setAttribute("id", `${artwork.id}`)
    let cardDiv = document.createElement("div")
    cardDiv.className = "card"
    cardDiv.style = "width: 18rem"
    let img = document.createElement("img")
    img.className = "card-img-top"
    img.src = artwork.image
    let cardBody = document.createElement("div")
    cardBody.className = "card-body"
    let h5 = document.createElement("h5")
    h5.className = "card-title"
    h5.innerText = artwork.title
    let h6 = document.createElement("h6")
    h6.innerText = artwork.artist_name

    let p = document.createElement("p")
    let pValue = thousands_separators(artwork.price)
    p.innerText = pValue

    cardBody.appendChild(h5)
    cardBody.appendChild(h6)
    cardBody.appendChild(p)
    cardDiv.appendChild(img)
    cardDiv.appendChild(cardBody)
    column.appendChild(cardDiv)
    imageSectionRow.appendChild(column)
}

const getGalleries = () => {
    fetch('http://localhost:3000/galleries')
    .then(res => res.json())
    .then(json => allGalleries(json))
}

const allGalleries = (galleriesArray) => {
    let galleryDropdown = document.getElementById('inputGroupSelect01')
    galleriesArray.forEach( gallery => {
        
        let galleryOption = document.createElement('option')
        galleryOption.id = gallery.id
        galleryOption.innerText = gallery.name
        
        galleryDropdown.onchange = (e) => {
            let artworkDisplay = document.querySelectorAll(".col-sm")
            artworkDisplay.forEach(artCard => {
                artCard.style.display = 'none'
            })
             getGallery(e, galleriesArray)
        }
        galleryDropdown.appendChild(galleryOption)
    })                                        
}

const getGallery = (e, galleriesArray) => {
    galleriesArray.forEach(gallery => {
        showGalleryArt(e, gallery)
    })
}

const showGalleryArt = (e, gallery) => {
    if (e.target.value === gallery.name) {
        let artworkDisplay = document.querySelectorAll(".col-sm")
        artworkDisplay.forEach(artCard => {
            gallery.artworks.forEach(artWork => {
                if (parseInt(artCard.id) === artWork.id) {
                    artCard.style.display = 'block'
                }
            })
        })
    }
}