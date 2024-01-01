// Set first page to 1 and page limit to 50
let page = 1;
let limit = 50;
// Function feteches pages
const fetchMonsters = page => {
    fetch(`http://localhost:3000/monsters?_page=${page}&_limit=${limit}`)
    .then(response => response.json())
    .then(data => data.forEach(element => showAllMonsters(element)))
    .catch(error => console.log(error))  
}
// Function shows all the animals
const showAllMonsters = monster => {
    let mon = document.createElement("li");
    mon.id = "mon-id";
    monId = mon.id;
    // Creating HTML tags 
    mon.innerHTML = `
    <div>
        <h4>Name: ${monster.name}</h4>
            <p>Age: ${monster.age}</p>
            <br>
            <p>Description: <span>${monster.description}</span></p>
    </div>
    `;
    document.querySelector("#monster-container").appendChild(mon)
}
// Function to navigate to the next page
const nextPage = () => {
    // Increment the page number
    page++;
    // Call the fetchMonsters function with the new page number
    fetchMonsters(page);
  }
// Create an event listener on the button to move to the next page
document.querySelector("#forward").addEventListener('click', e => {e.preventDefault(); nextPage()})
// Function to navigate to the previous page
const previousPage = () => {
    // Check if the current page is greater than 1
    if (page > 1) {
      // Decrement the page number
      page--;
      // Call the fetchMonsters function with the new page number
      fetchMonsters(page);
    }
  }
// Event listener executes moving to the previous page 
  document.querySelector("#back").addEventListener('click', e => {e.preventDefault(); previousPage()})

// Create a form card
const newMon = document.createElement("form")
newMon.id = 'new-mon';
// Create Html tags
newMon.innerHTML = `
    <label for='name'>Name:</label>
    <br>
    <input type="text" id="name" name="name" placeholder="Enter name of monster">
    <br>
    <label for='age'>Age:</label>
    <br>
    <input type="text" id="age" name="age" placeholder="Enter age of monster">
    <br>
    <label for='description'>Description:</label>
    <br>
    <input type="text" id="description" name="description" placeholder="Enter description of monster">
    <br>
    <button style="font-size:1vw" id="add-monster-btn">Create Monster</button>
`;
// Append newMon to the div
document.querySelector("#create-monster").appendChild(newMon)

// POSTs new animal in the server
const createMonster = () => {
    // Target and access new monster details
    let newName = document.querySelector("#name").textContent;
    let newAge = document.querySelector('#age').textContent;
    let newDescp = document.querySelector("#description").textContent;
    // New monster
    let newMonster = {
        name: newName,
        age: newAge,
        description: newDescp
    }
    // Fetch the data in the server and POST new monster
    fetch(`http://localhost:3000/monsters/${monId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify(newMonster)
    })
    .then(res => res.json())
    .then(data => showAllMonsters(data))
    .catch(err => console.log(err))
}
// Event listener executes createMonster()
document.querySelector("#add-monster-btn").addEventListener('click', () => createMonster())