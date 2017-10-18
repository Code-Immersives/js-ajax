













































































































//event handler
function createShoe () {
  // event.target === form element
  event.preventDefault()
  console.log('submiting your shoe data')

  let myShoe = {
    shoe: {
      brand: event.target[0].value,
      color: event.target[2].value,
      imgURL: event.target[3].value,
      size: event.target[1].value
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
  .then(shoe => {
    document.querySelector('.success .success').style.display = 'block'
  })
  .catch(err => {
    console.log('error', err)
    document.querySelector('.error .error').style.display = 'block'
    document.getElementById('errmsg').innerHTML = err
  })
}

function allShoes () {
  // clear out the form
  let container = document.querySelector('.segment')
  container.innerHTML = ''
  // retrieve all the shoes from the api
  fetch('http://localhost:3000/shoes.json')
    .then(res => res.json())
    .then(shoes => {
      let htmlShoes = shoes.map(createShoeItem)
      container.innerHTML = htmlShoes.join('')
    })
    .catch(err => console.log(err))
  // render them to the screen
}

function createShoeItem (shoe) {
  return `
    <div class="item">
      <a class="ui tiny image">
        <img src="${shoe.imgURL}">
      </a>
      <div class="content">
        <a class="header">${shoe.brand}</a>
         <i id="${shoe.id}" class="trash icon"></i>
         <i id="${shoe.id}" class="pencil icon"></i>
        <div class="description">
          <p>color:${shoe.color}, size: ${shoe.size}</p>
        </div>
      </div>
    </div>
  `
}
//event delegation
document.querySelector('.segment').addEventListener('click', function () {
  if (event.target.classList.contains('trash')) {
    let shoeID = event.target.id
    fetch(`http://localhost:3000/shoes/${shoeID}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    })
    .then(res => {
      console.log('worked')
      allShoes()
    })
  }
  if(event.target.classList.contains('pencil')){
    let shoeID = event.target.id
    fetch(`http://localhost:3000/shoes/${shoeID}.json`)
      .then( res => res.json() )
      .then( shoe =>  editForm(shoe) )
  }
})
//event handler
function editShoe(){
  event.preventDefault()
  console.log('editing your shoe data')
  let shoeID = event.target.id
  let myShoe = {
    shoe: {
      brand: event.target[0].value,
      color: event.target[2].value,
      imgURL: event.target[3].value,
      size: event.target[1].value
    }
  }

  fetch(`http://localhost:3000/shoes/${shoeID}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(myShoe)

  })
  .then(res => res.json())
  .then(shoe => {
    allShoes()
  })
  .catch(err => {
    console.log('error', err)
    document.querySelector('.error .error').style.display = 'block'
    document.getElementById('errmsg').innerHTML = err
  })


}


function showForm(){
  let container = document.querySelector('.segment')
  container.innerHTML = `  <form class="ui form success error" onsubmit="createShoe()">
      <div class="field">
        <label>Shoe Brand</label>
        <input type="text" name="shoe-brand" placeholder="Shoe Brand">
      </div>
      <div class="field">
        <label>Shoe Size</label>
        <input type="number" name="shoe-size" placeholder="Shoe Size">
      </div>
      <div class="field">
        <label>Shoe Color</label>
        <input type="text" name="shoe-color" placeholder="Shoe Color">
      </div>
      <div class="field">
        <label>Shoe Image Link</label>
        <input type="text" name="shoe-image" placeholder="Shoe Image URL">
      </div>
      <div class="ui success message" style="display: none">
        <div class="header">Form Completed</div>
        <p>You have succesfully created a show.</p>
      </div>
      <div class="ui error message" style="display: none">
        <div class="header">Action Forbidden</div>
        <p id="errmsg"></p>
      </div>
      <button class="ui button" type="submit">Create Shoe</button>
    </form>`

}
function editForm(shoe){
  let container = document.querySelector('.segment')
  container.innerHTML = `  <form id="${shoe.id}" class="ui form success error" onsubmit="editShoe()">
      <div class="field">
        <label>Shoe Brand</label>
        <input type="text" name="shoe-brand" value="${shoe.brand}" placeholder="Shoe Brand">
      </div>
      <div class="field">
        <label>Shoe Size</label>
        <input type="number" name="shoe-size" value="${shoe.size}" placeholder="Shoe Size">
      </div>
      <div class="field">
        <label>Shoe Color</label>
        <input type="text" name="shoe-color" value="${shoe.color}" placeholder="Shoe Color">
      </div>
      <div class="field">
        <label>Shoe Image Link</label>
        <input type="text" name="shoe-image" value="${shoe.imgURL}" placeholder="Shoe Image URL">
      </div>
      <div class="ui success message" style="display: none">
        <div class="header">Form Completed</div>
        <p>You have succesfully created a show.</p>
      </div>
      <div class="ui error message" style="display: none">
        <div class="header">Action Forbidden</div>
        <p id="errmsg"></p>
      </div>
      <button class="ui button" type="submit">Update Shoe</button>
    </form>`

}
