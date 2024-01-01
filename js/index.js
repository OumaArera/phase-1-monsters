fetch("http://localhost:3000/monsters")
.then(response => response.json())
.then(data => data.forEach(element => showAllMonsters(element)))
.catch(error => console.log(error))
// Function shows all the animals
const showAllMonsters = monster => {
    let mon = document.createElement("li");
    mon.id = "mon-id";
    monId = mon.id;
    // Creating HTML tags 
    mon.innerHTML = `
        <h4>Name: ${monster.name}</h4>
        <p>Age: ${monster.age}</p>
        <br>
        <p>Description: ${monster.description}</p>
    `;
    document.querySelector("#monster-container").appendChild(mon)
}