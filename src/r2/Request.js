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

##JSONP

    new Request("http://www.geonames.org/postalCodeLookupJSON")
      .jsonp("postalcode=15261&country=US")
      .then((data) => {
        console.log("JSONP (postalCodeLookupJSON):", data);
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

  jsonp (params) {

    return new Promise((resolve, reject) => {

      this.callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());

      var script = document.createElement('script');
      script.id = this.callbackName;

      window[this.callbackName] = (data) => {
        delete window[this.callbackName];
        var findScript = document.querySelector("#"+this.callbackName);
        findScript.parentElement.removeChild(findScript);
        resolve(data);
      };

      script.src = this.url + (this.url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + this.callbackName +(params === undefined ? "" : "&"+params);

      document.body.appendChild(script);

      script.onerror = (error) => {
        reject(error);
      }
    });

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

