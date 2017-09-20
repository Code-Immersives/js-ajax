function createShoe () {
  event.preventDefault()
  console.log('submiting your shoe data')

  let myShoe = {
    shoe: {
      brand: event.target[0],
      color: event.target[2],
      imgURL: event.target[3],
      size: event.target[1]
    }
  }

  fetch('http://localhost:3000/shoes', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(myShoe)

  })
  .then(res => res.json())
  .then(shoe => console.log(shoe))
}
