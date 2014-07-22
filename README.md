r2
==

Rest Requests Helper

##Usage:

```javascript
import Request from './r2/Request';

//Get all humans
new Request("/humans").get().then((data) => {
  console.log(data);
})

//Get one human
new Request("/humans/hFPDywuRsPdJM7Fa").get()
  .then((data)=>{
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

//Create a human
new Request("/humans")
  .post({firstName:"Philippe", lastName:"Charrière"})
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  })

//Update a human
new Request("/humans/yk7LXLlHXFD9Uch2")
  .put({firstName:"Tony", lastName:"Stark"})
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  })


//delete a human
new Request("/humans/hFPDywuRsPdJM7Fa").delete()
  .then((data)=>{
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

##Development mode

First:

- `bower install`
- `npm install`

type: `gulp`, the watcher transpiles files at each changes

##Test it

type: `node app.js dev [http port, default=3000]` to run the webapp in developper mode
type: `node app.js prod [http port, default=3000]` to run the webapp in production mode
