// const ARTWORKS_URL = "https://api.artsy.net/api/tokens/xapp_token?client_id=6823a01cacfc8eb52c8b&client_secret=476506b96c59c125414d8ae951344725"
const ArtWork_Url = "http://localhost:3000/artworks"
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM LOADED")
    getArtwork()
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