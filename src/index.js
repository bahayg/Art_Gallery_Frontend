// const ARTWORKS_URL = "https://api.artsy.net/api/tokens/xapp_token?client_id=6823a01cacfc8eb52c8b&client_secret=476506b96c59c125414d8ae951344725"
const ArtWork_Url = "http://localhost:3000/artworks"
const Gallery_Url = "http://localhost:3000/galleries"

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM LOADED")
    getArtwork()
    getGalleries()
    createUser()
    loginUser()
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
    let row = document.querySelector(".row")
    let column = document.createElement("div")
    column.className = "col-sm"
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
    row.appendChild(column)
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
        galleryOption.innerText = gallery.name
        galleryDropdown.appendChild(galleryOption)
    })
}




//------------------
// const addTrainer = (trainer) => {
//     const main = document.querySelector("main")
//     const div = makeTrainerCard(trainer)
//     main.appendChild(div)
// }

// const makeTrainerCard = (trainer) => {
//     let trainerDiv = document.createElement("div")
//     trainerDiv.className = "card"
//     trainerDiv.setAttribute("data-id", trainer.id)

//    let trainerP = document.createElement("p")
//    trainerP.textContent = `${trainer.name}`

//    let addButton = document.createElement("button")
//    addButton.setAttribute("data-trainer-id", trainer.id)
//    addButton.innerText = "Add Pokemon"

//    addButton.addEventListener("click", function(){
//         generatePokemon(trainer.id)
//         // pokeUl.innerHTML = ""
//         // getPokemon(trainer.id)
//    })

//     let pokeUl = document.createElement("ul")
//     pokeUl.id = trainer.id


//    trainerDiv.appendChild(trainerP)
//    trainerDiv.appendChild(addButton)
//    trainerDiv.appendChild(pokeUl)

// //    getPokemon(trainer.id)
//    showPokemons(trainer)
   
//    return trainerDiv
// }

// // const getPokemon = (trainerId) => {
// //     fetch(`http://localhost:3000/trainers/${trainerId}`)
// //     .then(res => res.json())
// //     .then(data => showPokemons(data.pokemons))
// // }

// const showPokemons = (trainer) => {
//     trainer.pokemons.map(pokemon => {
//         addPokemon(pokemon, trainer.id)
//     })
// }

// const addPokemon = (pokemon, trainerId) => {
//     let ul = document.getElementById(trainerId)
//     const li = makeLi(pokemon)
//     ul.appendChild(li)
// }

// const makeLi = (pokemon) => {
//     let li = document.createElement("li")
//     li.innerText = `${pokemon.nickname} (${pokemon.species})`

//     let releaseButton = document.createElement("button")
//     releaseButton.className = "release"
//     releaseButton.innerText = "Release"
//     releaseButton.setAttribute("data-pokemon-id", pokemon.id)

//     li.appendChild(releaseButton)
//     releaseButton.addEventListener("click", function(){
//         deletePokemon(pokemon.id)
//         li.remove()
//     })
//     return li
// }

// const deletePokemon = (pokemonId) => {
//    fetch(POKEMONS_URL + `/${pokemonId}`, {
//         method: "DELETE"
//     })
// }

// const generatePokemon = (trainerId) => {
//    fetch(POKEMONS_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             trainer_id: trainerId
//         })
//     })
//     .then(res => res.json())
//     .then(data => {
//         // data.trainer_id = data.trainer.id
//         addPokemon(data)
//     })
// }