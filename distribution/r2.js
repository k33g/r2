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
    jsonp: function(params) {
      var $__0 = this;
      return new Promise((function(resolve, reject) {
        $__0.callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        var script = document.createElement('script');
        script.id = $__0.callbackName;
        window[$__0.callbackName] = (function(data) {
          delete window[$__0.callbackName];
          var findScript = document.querySelector("#" + $__0.callbackName);
          findScript.parentElement.removeChild(findScript);
          resolve(data);
        });
        script.src = $__0.url + ($__0.url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + $__0.callbackName + (params === undefined ? "" : "&" + params);
        document.body.appendChild(script);
        script.onerror = (function(error) {
          reject(error);
        });
      }));
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
var $___46__46__47_src_47_r2__ = (function() {
  "use strict";
  var __moduleName = "../src/r2";
  var Request = $___46__46__47_src_47_r2_47_Request__.default;
  window.r2 = {};
  r2.Request = Request;
  return {};
})();

//# sourceMappingURL=r2.map
