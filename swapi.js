fetch('https://swapi.co/api/people')
  .then(res => res.json())
  .then(peeps => console.log(peeps))
  .catch(err => console.log(err))
  // .then( function(res){
  //   return res.json()
  // })

// GET A LIST OF PLANETS loop through results using es6 and display the name
fetch('https://swapi.co/api/planets')
  .then(res => res.json())
  .then(planets => {
    planets.results.map(p => console.log(p.name))
  })
  .catch(err => console.log(err))

// THEN A SINGLE PLANET
fetch('https://swapi.co/api/planets/1')
  .then(res => res.json())
  .then(planet => console.log(planet.name))

// the rails shoes api
fetch('http://localhost:3000/shoes.json')
    .then(res => res.json())
    .then(shoes => console.log(shoes))
// get a single shoe
fetch('http://localhost:3000/shoes/1.json')
    .then(res => res.json())
    .then(shoe => console.log(shoe))
// create a new shoe using fetch
let vans = {
  shoe: {
    brand: 'vans',
    color: 'red',
    imgURL: 'https://images-na.ssl-images-amazon.com/images/I/81lWpSPpfGL._UX395_.jpg',
    size: 11
  }
}

fetch('http://localhost:3000/shoes', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'accept': 'application/json'
  },
  body: JSON.stringify(vans)

})
.then(res => res.json())
.then(shoe => console.log(shoe))
// update an existing shoe using fetch
let vans = {
  shoe: {
    color: 'green'
  }
}

fetch('http://localhost:3000/shoes/2', {
  method: 'PUT',
  headers: {
    'content-type': 'application/json',
    'accept': 'application/json'
  },
  body: JSON.stringify(vans)

})
.then(res => res.json())
.then(shoe => console.log(shoe))
//delet a shoe from the database
fetch('http://localhost:3000/shoes/2', {
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
    'accept': 'application/json'
  }
})
.then(res => console.log(res))
