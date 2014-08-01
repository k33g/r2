import r2 from 'src/r2';

var body = document.querySelector('body');

//=== JSONP tests ===
new r2.Request("http://www.cjihrig.com/development/jsonp/jsonp.php")
  .jsonp("message=Hello")
  .then((data) => {
    body.innerHTML += "<b>JSONP(cjihrig.com):</b><br>";
    console.log("JSONP:", data);
    body.innerHTML += `<p>${JSON.stringify(data)}</p>`;
  })
  .catch((error) => {
    console.log(error);
  });


//http://www.geonames.org/postalCodeLookupJSON?postalcode=15261&country=US&callback=jsonpCallback
new r2.Request("http://www.geonames.org/postalCodeLookupJSON")
  .jsonp("postalcode=15261&country=US")
  .then((data) => {
    body.innerHTML += "<b>JSONP(geonames.com):</b><br>";
    console.log("JSONP (postalCodeLookupJSON):", data);
    body.innerHTML += `<p>${JSON.stringify(data)}</p>`;
  })
  .catch((error) => {
    console.log(error);
  });

//=== GET Tests ===

var request = new r2.Request("/humans");

request.get().then((data) => {
  console.log(data);
  body.innerHTML += "<b>Get all Humans:</b><br>";
  data.forEach( (human) => { body.innerHTML += `<p>${JSON.stringify(human)}</p>`; });
})

new r2.Request("/humans/hFPDywuRsPdJM7Fa").get()
  .then((data)=>{
    console.log("hFPDywuRsPdJM7Fa:", data);
    body.innerHTML += `<p>Get one Human:<br>${JSON.stringify(data)}</p>`;
  })
  .catch((error) => {
    console.log(error);
  });

new r2.Request("/humans").get("hFPDywuRsPdJM7Fa")
  .then((data)=>{
    console.log("Bis: hFPDywuRsPdJM7Fa:", data);
    body.innerHTML += `<p>Get an other Human:<br>${JSON.stringify(data)}</p>`;
  })
  .catch((error) => {
    console.log(error);
  });

new r2.Request("/animals/hFPDywuRsPdJM7Fa").get()
  .then((data)=>{
    console.log(data);
    body.innerHTML += `<p>Get an Animal:<br>${JSON.stringify(data)}</p>`;
  })
  .catch((error) => {
    console.log(error);
    body.innerHTML += `<p>Error:<br>${error.message}</p>`;
  });


//=== POST Tests ===

new r2.Request("/humans")
  .post({firstName:"Philippe", lastName:"Charrière"})
  .then((data) => {
    console.log("POST Results:", data);
    body.innerHTML += `<p>Create a Human:<br>${JSON.stringify(data)}</p>`;
  })
  .catch((error) => {
    console.log(error);
  })

//=== PUT Tests ===

new r2.Request("/humans/yk7LXLlHXFD9Uch2")
  .put({firstName:"Tony", lastName:"Stark"})
  .then((data) => {
    console.log("PUT Results:", data);
    body.innerHTML += `<p>Update a Human:<br>${JSON.stringify(data)}</p>`;
  })
  .catch((error) => {
    console.log(error);
  })

//=== String Response ===

new r2.Request("/README.md")
  .get()
  .then((data) => {
    console.log("GET String response Results:", data);
    body.innerHTML += `<p>Load a file:<br><code><pre>${data}</pre></code></p>`;
  })
  .catch((error) => {
    console.log(error);
  })