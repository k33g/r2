var $___46__46__47_src_47_r2_47_Request__ = (function() {
  "use strict";
  var __moduleName = "../src/r2/Request";
  var Request = function Request(url) {
    this.request = new XMLHttpRequest();
    this.url = url;
  };
  ($traceurRuntime.createClass)(Request, {
    url: function(url) {
      this.url = url;
      return this;
    },
    sendRequest: function() {
      var $__0 = this;
      return new Promise((function(resolve, reject) {
        $__0.request.open($__0.method, $__0.url);
        $__0.request.onload = (function() {
          if ($__0.request.status === 200) {
            var type = $__0.request.getResponseHeader("Content-Type");
            if (type === "application/json") {
              resolve(JSON.parse($__0.request.response));
            } else {
              resolve($__0.request.response);
            }
          } else {
            reject(Error($__0.request.statusText));
          }
        });
        $__0.request.onerror = function() {
          reject(Error("Network Error"));
        };
        $__0.request.setRequestHeader("Content-Type", "application/json");
        $__0.request.send($__0.method === undefined ? null : JSON.stringify($__0.data));
      }));
    },
    get: function(id) {
      this.url = id === undefined ? this.url : this.url + "/" + id;
      this.method = "GET";
      return this.sendRequest();
    },
    post: function(jsonData) {
      this.method = "POST";
      this.data = jsonData;
      return this.sendRequest();
    },
    put: function(jsonData, id) {
      this.url = id === undefined ? this.url : this.url + "/" + id;
      this.method = "PUT";
      this.data = jsonData;
      return this.sendRequest();
    },
    delete: function(id) {
      this.url = id === undefined ? this.url : this.url + "/" + id;
      this.method = "DELETE";
      return this.sendRequest();
    }
  }, {});
  var $__default = Request;
  return {get default() {
      return $__default;
    }};
})();
var $___46__46__47_src_47_tests__ = (function() {
  "use strict";
  var __moduleName = "../src/tests";
  var Request = $___46__46__47_src_47_r2_47_Request__.default;
  var request = new Request("/humans");
  var body = document.querySelector('body');
  request.get().then((function(data) {
    console.log(data);
    body.innerHTML += "Get all Humans:<br>";
    data.forEach((function(human) {
      body.innerHTML += ("<p>" + JSON.stringify(human) + "</p>");
    }));
  }));
  new Request("/humans/hFPDywuRsPdJM7Fa").get().then((function(data) {
    console.log("hFPDywuRsPdJM7Fa:", data);
    body.innerHTML += ("<p>Get one Human:<br>" + JSON.stringify(data) + "</p>");
  })).catch((function(error) {
    console.log(error);
  }));
  new Request("/humans").get("hFPDywuRsPdJM7Fa").then((function(data) {
    console.log("Bis: hFPDywuRsPdJM7Fa:", data);
    body.innerHTML += ("<p>Get an other Human:<br>" + JSON.stringify(data) + "</p>");
  })).catch((function(error) {
    console.log(error);
  }));
  new Request("/animals/hFPDywuRsPdJM7Fa").get().then((function(data) {
    console.log(data);
    body.innerHTML += ("<p>Get an Animal:<br>" + JSON.stringify(data) + "</p>");
  })).catch((function(error) {
    console.log(error);
    body.innerHTML += ("<p>Error:<br>" + error.message + "</p>");
  }));
  new Request("/humans").post({
    firstName: "Philippe",
    lastName: "Charrière"
  }).then((function(data) {
    console.log("POST Results:", data);
    body.innerHTML += ("<p>Create a Human:<br>" + JSON.stringify(data) + "</p>");
  })).catch((function(error) {
    console.log(error);
  }));
  new Request("/humans/yk7LXLlHXFD9Uch2").put({
    firstName: "Tony",
    lastName: "Stark"
  }).then((function(data) {
    console.log("PUT Results:", data);
    body.innerHTML += ("<p>Update a Human:<br>" + JSON.stringify(data) + "</p>");
  })).catch((function(error) {
    console.log(error);
  }));
  new Request("/README.md").get().then((function(data) {
    console.log("GET String response Results:", data);
    body.innerHTML += ("<p>Load a file:<br><code><pre>" + data + "</pre></code></p>");
  })).catch((function(error) {
    console.log(error);
  }));
  return {};
})();

//# sourceMappingURL=r2.tests.map
