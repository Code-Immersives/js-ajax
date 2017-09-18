console.log('app running')
// ES5 JQuery version
// var allPokemon = []
//
// $.ajax({
//   method: 'GET',
//   url: 'http://pokeapi.co/api/v2/pokemon/',
//   success: function (res) {
//     console.log('successfully communicated with api', res)
//     allPokemon = res.results
//     var p = new Pokemon()
//     for (var i = 0; i < allPokemon.length; i++) {
//       p.createPokemon(allPokemon[i])
//     }
//   },
//   error: function (err) {
//     console.log('something went wrong with the api', err)
//   }
//
// })
// obj.myfunc.anotherfunc
// ES6 FETCH
fetch('http://pokeapi.co/api/v2/pokemon/')
  .then(res => res.json()) // turning a json string js object
  .then(pokemon => {
    let myPoke = new Pokemon()
    pokemon.results.map(p => myPoke.createPokemon(p))
  })

class Pokemon {
  constructor () {
    this.pokeDiv = document.querySelector('.pokemon')
    this.dataDiv = document.getElementById('pokedata')
    this.pokeDiv.addEventListener('click', this.displayPokeData.bind(this))
  }
  createPokemon (pokemonObj) {
    this.pokeDiv.innerHTML += `<p id="${pokemonObj.name}">${pokemonObj.name}</p>`
  }
  displayPokeData () {
    let pokemonName = event.target.id
    this.getSinglePokemon(pokemonName)
  }
  getSinglePokemon (name) {
    fetch(`http://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json()) // method chaining
      .then(this.createPokemonData.bind(this))
  }
  createPokemonData (pokemon) {
    this.dataDiv.innerHTML = `<div>
                                <img src="${pokemon.sprites.front_shiny}"/>
                                <p>${pokemon.name}</p>
                                <p>${pokemon.height}</p>
                                <p>${pokemon.weight}</p>
                              </div>`
  }
}
