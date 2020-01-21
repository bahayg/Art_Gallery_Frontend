const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM LOADED")
    getTrainers()
})
const getTrainers = () => {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => showTrainers(data))
}
const showTrainers = (trainerArray) => {
    trainerArray.forEach(trainer => {
        addTrainer(trainer)
    })
}
const addTrainer = (trainerObj) => {
    const main = document.querySelector("main")
    const div = makeTrainerCard(trainerObj)
    main.appendChild(div)
}
const makeTrainerCard = (trainerObj) => {
    let trainerDiv = document.createElement("div")
    trainerDiv.className = "card"
    trainerDiv.setAttribute(`data-id`, trainerObj.id)
    let trainerP = document.createElement("p")
    trainerP.textContent = `${trainerObj.name}`
    let addButton = document.createElement("button")
    addButton.setAttribute('data-trainer-id' , trainerObj.id); 
    addButton.innerText = "Add Pokemon"
    addButton.addEventListener("click", function() {
        generatePokemon(trainerObj.id)
        pokeUl.innerHTML = ""
        console.log("Before add")
        getPokemon(trainerObj.id)
        console.log("After add")
    })
    let pokeUl = document.createElement("ul")
    pokeUl.id = trainerObj.id
    // let pokeUl = getPokemon(trainerObj.id)
    // console.log(pokeUl)
    trainerDiv.appendChild(trainerP)
    trainerDiv.appendChild(addButton)
    trainerDiv.appendChild(pokeUl)
    getPokemon(trainerObj.id)
    return trainerDiv
}
const getPokemon = (trainerId) => {
    fetch(`http://localhost:3000/trainers/${trainerId}`)
    .then(res => res.json())
    .then(json => showPokemons(json.pokemons))
}
const showPokemons = (pokemonArray) => {
    pokemonArray.map(pokemon => {
        addPokemon(pokemon)
    })
}
const addPokemon = (pokemonObj) => {
    const ul = document.getElementById(pokemonObj.trainer_id)
    const li = makeLi(pokemonObj)
    ul.appendChild(li)
}
const makeLi = (pokemonObj) => {
    let li = document.createElement("li")
    li.innerText = `${pokemonObj.nickname} (${pokemonObj.species})`
    let releaseButton = document.createElement("button")
    releaseButton.className = "release"
    releaseButton.innerText = "Release"
    releaseButton.setAttribute("data-pokemon-id", pokemonObj.id)
    li.appendChild(releaseButton)
    releaseButton.addEventListener("click", function() {
        deletePokemon(pokemonObj.id)
        pokeUl = document.getElementById(pokemonObj.trainer_id)
        console.log(pokeUl)
        // pokeUl.innerHTML = ""
        // getPokemon(pokemonObj.trainer_id)
        // console.log(pokemonObj.trainer_id)
    })
    // console.log(li)
    return li
}
const deletePokemon = (pokemonId) => {
    fetch(POKEMONS_URL + `/${pokemonId}`, {
        method: "DELETE"
    })
}
const generatePokemon = (trainerId) => {
    return fetch(POKEMONS_URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({
            "trainer_id": trainerId
        })
    }).then(res => res.json())
    .then(json => addPokemon(json))
}