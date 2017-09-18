console.log('app running')

var allPokemon = []

$.ajax({
  method: 'GET',
  url: 'http://pokeapi.co/api/v2/pokemon/',
  success: function (res) {
    console.log('successfully communicated with api', res)
    allPokemon = res.results
    var p = new Pokemon()
    for (var i = 0; i < allPokemon.length; i++) {
      p.createPokemon(allPokemon[i])
    }
  },
  error: function (err) {
    console.log('something went wrong with the api', err)
  }

})

class Pokemon {
  constructor () {
    this.pokeDiv = document.querySelector('.pokemon')
  }
  createPokemon (pokemonObj) {
    this.pokeDiv.innerHTML += `<p><a href="${pokemonObj.url}">${pokemonObj.name}</a></p>`
  }
}

console.log('here is an empty array', allPokemon)
