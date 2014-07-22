import Request from './r2/Request';

//=== GET Tests ===

var request = new Request("/humans");

var body = document.querySelector('body');

request.get().then((data) => {
  console.log(data);
  body.innerHTML += "Get all Humans:<br>";
  data.forEach( (human) => { body.innerHTML += `<p>${JSON.stringify(human)}</p>`; });
})

new Request("/humans/hFPDywuRsPdJM7Fa").get()
  .then((data)=>{
    console.log("hFPDywuRsPdJM7Fa:", data);
    body.innerHTML += `<p>Get one Human:<br>${JSON.stringify(data)}</p>`;
  })
  .catch((error) => {
    console.log(error);
  });

new Request("/humans").get("hFPDywuRsPdJM7Fa")
  .then((data)=>{
    console.log("Bis: hFPDywuRsPdJM7Fa:", data);
    body.innerHTML += `<p>Get an other Human:<br>${JSON.stringify(data)}</p>`;
  })
  .catch((error) => {
    console.log(error);
  });

new Request("/animals/hFPDywuRsPdJM7Fa").get()
  .then((data)=>{
    console.log(data);
    body.innerHTML += `<p>Get an Animal:<br>${JSON.stringify(data)}</p>`;
  })
  .catch((error) => {
    console.log(error);
    body.innerHTML += `<p>Error:<br>${error.message}</p>`;
  });


//=== POST Tests ===

new Request("/humans")
  .post({firstName:"Philippe", lastName:"Charrière"})
  .then((data) => {
    console.log("POST Results:", data);
    body.innerHTML += `<p>Create a Human:<br>${JSON.stringify(data)}</p>`;
  })
  .catch((error) => {
    console.log(error);
  })

//=== PUT Tests ===

new Request("/humans/yk7LXLlHXFD9Uch2")
  .put({firstName:"Tony", lastName:"Stark"})
  .then((data) => {
    console.log("PUT Results:", data);
    body.innerHTML += `<p>Update a Human:<br>${JSON.stringify(data)}</p>`;
  })
  .catch((error) => {
    console.log(error);
  })

//=== String Response ===

new Request("/README.md")
  .get()
  .then((data) => {
    console.log("GET String response Results:", data);
    body.innerHTML += `<p>Load a file:<br><code><pre>${data}</pre></code></p>`;
  })
  .catch((error) => {
    console.log(error);
  })