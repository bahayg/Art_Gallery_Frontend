// const ARTWORKS_URL = "https://api.artsy.net/api/tokens/xapp_token?client_id=6823a01cacfc8eb52c8b&client_secret=476506b96c59c125414d8ae951344725"
const ArtWork_Url = "http://localhost:3000/artworks"
const Gallery_Url = "http://localhost:3000/galleries"

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM LOADED")
    getArtwork()
    getGalleries()
    createUser()
    loginUser()
    addNewArt()
  

    
       
    
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
    // column.setAttribute("id", "card-outer-div")

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

          let addButton = document.getElementById('modal-add-button')
    
          addButton.addEventListener('click', function(){
            let galleryId = localStorage.getItem("gallery_id")
            fetchGalleryForUpdate(galleryId, artwork)
            console.log(artwork)
          })
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

const createUser = () => {
    galleryName = null;
    let signupForm = document.getElementById("signup-form")
    signupForm.onsubmit = e => {
        e.preventDefault()
        galleryName = e.target[0].value
        getGalleriesSignup(galleryName)
    }
}

const getGalleriesSignup = (galleryName) => {
    fetch('http://localhost:3000/galleries')
    .then(res => res.json())
    .then(json => allGalleriesSignup(json))
    .then(data => checkGalleriesSignup(data, galleryName))
  }

  const allGalleriesSignup = (galleriesArray) => {
    galleryNames = []
    galleriesArray.forEach(gallery => {
        galleryNames.push(gallery.name)
    })
        return galleryNames
  }

const checkGalleriesSignup = (data, galleryName) => {
    if (data.find(name => name === galleryName)) {
        alert("You are already a user, please log in!")
        let signupInput = document.getElementById("signup-input")
        signupInput.value = ""
    } else {
        postUser(galleryName)   
    }
}


const postUser = galleryName => {
    return fetch(Gallery_Url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: galleryName
        })
    })
    .then(res => res.json())
    .then(json => {
        localStorage.setItem("gallery_id", json["id"]);
        currentUser(galleryName)   
        // tannersFunction(localStorage.getItem("gallery_id"))
    }) 
}

const currentUser = galleryName => {
    let signupInput = document.getElementById("signup-input")
    signupInput.value = ""
    let loginInput = document.getElementById("login-input")
    loginInput.value = ""
    let userContainer = document.getElementById("user-container")
    userContainer.style.display = "none"

    let currentUserForm= document.getElementById("current-user")
    let p = document.createElement("p")
    p.innerText = `Hi ${galleryName}`
    currentUserForm.appendChild(p)
    currentUserForm.style.display = "block"

    let deleteUserBtn = document.getElementById("delete-user-btn")
    deleteUserBtn.onclick = () => {
        // deleteUser(galleryName)
    }

    let logoutBtn = document.getElementById("logout-btn")
    logoutBtn.onclick = () => {
        logoutUser()
    }

} 

const loginUser = () => {
    let galleryName = null;
    let loginForm = document.getElementById("login-form")
    loginForm.onsubmit = e => {
        e.preventDefault()
        galleryName = e.target[0].value
        getGalleriesLogin(galleryName)
    }
}

const getGalleriesLogin = galleryName => {
    fetch(`http://localhost:3000/galleries/${galleryName}`)
    .then(resp => resp.json())
    .then(json => {
        localStorage.clear()
        localStorage.setItem("gallery_id", json["id"]);
        currentUser(json.name)  
        // tannersFunction(localStorage.getItem("gallery_id")) 
    })
}


// const deleteUser = (galleryName) => {
//     fetch(`http://localhost:3000/galleries/${galleryName}`,{
//         method: "DELETE",    
//     })
//     .then (function() {
//         let currentUserForm= document.getElementById("current-user")
//         currentUserForm.style.display = "none"
//         let userContainer = document.getElementById("user-container")
//         userContainer.style.display = "block"
//         // div.remove();
//         localStorage.clear()
//       alert("User deleted")

//     })
// }

const logoutUser = () => {
    localStorage.clear()
    let currentUserForm= document.getElementById("current-user")
    currentUserForm.style.display = "none"
    let userForm = document.getElementById("user-form")
    userForm.style.display = "block"
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


const fetchGalleryForUpdate = (gallery, artwork) => {
    //letPaintingsArray = artwork.gallery
    console.log(gallery)
    console.log(artwork.id)
    fetch(`http://localhost:3000/artwork_galleries`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "artwork_id": artwork.id,
            "gallery_id": gallery
        })
    }).then(res => res.json())
    .then(json => console.log(json))
}
