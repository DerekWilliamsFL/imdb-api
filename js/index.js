/* Global variables
  var info = document.getElementById('info');
  var query = document.getElementById('query').value;
  var display = document.getElementById('display');
*/

(function() {
  window.tmdb = {
    "api_key": "a0a7e40dc8162ed7e37aa2fc97db5654",
    "base_uri": "http://api.themoviedb.org/3",
    "images_uri": "http://image.tmdb.org/t/p",
    "timeout": 5000,
    "size": "/w500",
    call: function(url, params, success, error) {
      var params_str = "api_key=" + tmdb.api_key;
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          params_str += "&" + key + "=" + encodeURIComponent(params[key]);
        }
      }
      var xhr = new XMLHttpRequest();
      xhr.timeout = tmdb.timeout;
      xhr.ontimeout = function() {
        throw ("Request timed out: " + url + " " + params_str);
      };
      xhr.open("GET", tmdb.base_uri + url + "?" + params_str, true);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.responseType = "text";
      xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            if (typeof success == "function") {
              success(JSON.parse(this.response));
            } else {
              throw ('No success callback, but the request gave results')
            }
          } else {
            if (typeof error == "function") {
              error(JSON.parse(this.response));
            } else {
              throw ('No error callback')
            }
          }
        }
      };
      xhr.send();
    }
  }
})()




window.addEventListener('keydown', function(e) {
  handleKeyPress(e);
}, false);

var input = document.getElementById('search');
input.addEventListener('click', IMDB.clear, false);
input.addEventListener('click', IMDB.searchTv, false);
input.addEventListener('click', IMDB.searchMovies, false);

function handleKeyPress(evt) {
  var key = evt.keyCode || evt.which;
  if (key == 13) {
    IMDB.clear();
    IMDB.searchTv();
    IMDB.searchMovies();
  }
}

