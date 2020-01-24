// const ARTWORKS_URL = "https://api.artsy.net/api/tokens/xapp_token?client_id=6823a01cacfc8eb52c8b&client_secret=476506b96c59c125414d8ae951344725"
const ArtWork_Url = "http://localhost:3000/artworks"
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM LOADED")
    getArtwork()
    getGalleries()
    addNewArt()
})

const getArtwork = () => {
    fetch(ArtWork_Url)
    .then(res => res.json())
    .then(json => showArtwork(json))
}

const showArtwork = artworksArray => {
    console.log(artworksArray)
    artworksArray.forEach(artwork  => makeArtCard(artwork))
}

const thousands_separators = num => {
    let num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${num_parts.join(".")}`;
} 

const makeArtCard = artwork => {
    let imageSectionRow= document.getElementById("image-section-row")
    // let row = document.querySelector(".row")
    let column = document.createElement("div")
    column.className = "col-sm"
    column.setAttribute("id", "card-outer-div")

    let cardDiv = document.createElement("div")
    cardDiv.className = "card"
    cardDiv.setAttribute("id", "art-card-holder")
    let modal = document.getElementById("art-detail-modal");
    cardDiv.onclick = () =>{
        modal.style.display = "block";

        let artworkTitle = document.getElementById('artworktitle')
        artworkTitle.innerText = artwork.title

        let artistworkname = document.getElementById('artistworkname')
        artistworkname.innerText = artwork.artist_name
        artistworkname.classList.add("font-italic")

        let price = document.getElementById('price')
        priceValue = thousands_separators(artwork.price)
        price.innerText = priceValue

        let modalImage = document.getElementById('modal-image-art')
        modalImage.src=artwork.image
        
        let span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
          }
          window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }
      }

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
    // cardBody.appendChild(detailsButton)
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
        galleryOption.innerText = gallery.name
        galleryDropdown.appendChild(galleryOption)
    })
}

const addNewArt = () => {
    let modal = document.getElementById('add-new-art-modal')
    modal.addEventListener("submit", (e) => {
        console.log(e)
        postArt(e)
    })
}

const postArt = (e) => {
    fetch('http://localhost:3000/artworks', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "title": e.target[0].value,
             "artist_name": e.target[1].value,
             "image": e.target[2].value,
             "price": e.target[3].value
        })
    }).then(res => res.json())
    .then(json => makeArtCard(json))
}