r2
==

Rest Requests Helper

##Usage:

```javascript
import r2 from './r2';

//Get all humans
new r2.Request("/humans").get().then((data) => {
  console.log(data);
})

//Get one human
new r2.Request("/humans/hFPDywuRsPdJM7Fa").get()
  .then((data)=>{
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

//Create a human
new r2.Request("/humans")
  .post({firstName:"Philippe", lastName:"Charrière"})
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  })

//Update a human
new r2.Request("/humans/yk7LXLlHXFD9Uch2")
  .put({firstName:"Tony", lastName:"Stark"})
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  })


//delete a human
new r2.Request("/humans/hFPDywuRsPdJM7Fa").delete()
  .then((data)=>{
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });


//JSONP Call
new r2.Request("http://www.geonames.org/postalCodeLookupJSON")
  .jsonp("postalcode=15261&country=US")
  .then((data) => {
    console.log("JSONP (postalCodeLookupJSON):", data);
  })
  .catch((error) => {
    console.log(error);
  });
```

##Development mode

First:

- `cd dev`
- `bower install`
- `npm install`

type: `gulp dist`, to generate distribution files

##Test it

type: `node app.js [http port, default=3000]`
