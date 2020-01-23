const ARTWORKS_URL = "https://api.artsy.net/api/artworks"

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM LOADED")
    getArtwork()
})

const getArtwork = () => {
    fetch(ARTWORKS_URL)
    .then(res => res.json())
    .then(json => console.log(json))
}

const showArtwork = (artworksArray) => {
    artworksArray.forEach(artwork  => addArtwork(artwork))
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

