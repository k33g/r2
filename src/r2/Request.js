/*
#R2 Request

##GET

    new Request("/humans").get().then((data) => {
      console.log(data);
    })

    new Request("/humans/hFPDywuRsPdJM7Fa").get()
      .then((data)=>{
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

##POST

    new Request("/humans")
      .post({firstName:"Philippe", lastName:"Charrière"})
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })

##PUT

    new Request("/humans/yk7LXLlHXFD9Uch2")
      .put({firstName:"Tony", lastName:"Stark"})
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })

##DELETE

    new Request("/humans/hFPDywuRsPdJM7Fa").delete()
      .then((data)=>{
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

 */
class Request {

  constructor (url) {
    this.request = new XMLHttpRequest();
    this.url = url;
  }

  url (url) {
    this.url = url;
    return this;
  }

  sendRequest () { /*json or text only*/

    return new Promise((resolve, reject) => {
      this.request.open(this.method, this.url);
      this.request.onload = () => {
        // If the request was successful
        if (this.request.status === 200) {
          // Get the type of the response
          var type = this.request.getResponseHeader("Content-Type");
          // Check type
          if (type === "application/json") {
            resolve(JSON.parse(this.request.response)); // JSON response
          } else {
            resolve(this.request.response); // String response
          }
        } else { /* oups */
          reject(Error(this.request.statusText));
        }
      }
      // Handle network errors
      this.request.onerror = function() {
        reject(Error("Network Error"));
      };

      this.request.setRequestHeader("Content-Type", "application/json");
      this.request.send(this.method === undefined ? null : JSON.stringify(this.data));
    });
  }

  get (id) {
    this.url = id === undefined ? this.url : this.url + "/" + id;
    this.method = "GET";
    return this.sendRequest();
  }

  post (jsonData) {
    this.method = "POST";
    this.data = jsonData;
    return this.sendRequest();
  }

  put (jsonData, id) {
    this.url = id === undefined ? this.url : this.url + "/" + id;
    this.method = "PUT";
    this.data = jsonData;
    return this.sendRequest();
  }

  delete (id) {
    this.url = id === undefined ? this.url : this.url + "/" + id;
    this.method = "DELETE";
    return this.sendRequest();
  }
}

export default Request;

