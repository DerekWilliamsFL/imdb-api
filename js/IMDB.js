var IMDB = (function () {

  function _infoClear() {
    var info = document.getElementById('info');
    info.innerHTML = '';
  }

  function _search(e) {
    var results = Object.keys(e.results);
    console.log("Success: " + e);
    console.log(e.results);
    var resultLen = e.results.length;
    for (var i = 0; i < resultLen; i++) {
      console.log(JSON.stringify(e.results[i]));
      var show = document.createElement('div');
      show.id = i;
      var json = e.results[i];
      var poster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
      var name = e.results[i].title || e.results[i].original_name;
      var img = new Image();
      img.src = poster;
      info.appendChild(show);
      show.appendChild(img);
      if (img.src === 'http://image.tmdb.org/t/p/w500null') {
        img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
      }
      show.innerHTML += '<p>' + name + '</p>';

      function click() {
        var display = document.getElementById('display');
        display.innerHTML = '';
        //img.src = '';
        var i = this.id;
        console.log(i);
        var displayPoster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
        img.src = displayPoster;
        if (img.src === 'http://image.tmdb.org/t/p/w500null') {
          img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
        }
        display.appendChild(img);
        if (e.results[i].release_date != undefined) {
        display.innerHTML += '<p>Air date: ' + e.results[i].release_date + '</p>';
        display.innerHTML += '<p>Name: ' + e.results[i].title  + '</p>';
        }
        else if (e.results[i].first_air_date != undefined){
        display.innerHTML += '<p>Air date: ' + e.results[i].first_air_date + '</p>';
        display.innerHTML += '<p>Name: ' + e.results[i].original_name + '</p>';
        }
        display.innerHTML += '<p>Description: ' + e.results[i].overview + '</p>';

      };
      show.addEventListener('click', click, false);
    };
}
  function _searchTv() {
    var query = document.getElementById('query').value;
    tmdb.call('/search/tv', {
      'query': query,
    },
    function(e) {
      _search(e);
    },
      function(e) {
        console.log("Error: " + e)
      }
    )
  }
  function _searchMovies() {
    var query = document.getElementById('query').value;
    tmdb.call('/search/movie', {
      'query': query,
    },
    function(e) {
      _search(e);
    },
      function(e) {
        console.log("Error: " + e)
      }
    )
  }

function _topMovies() {
  tmdb.call('/movie/top_rated', {},
    function(e) {
      IMDB.clear();
      IMDB.search(e);
    },
    function(e) {
      console.log("Error: " + e)
    })
}


function _popular() {
  tmdb.call('/movie/popular', {},
    function(e) {
      IMDB.clear();
      IMDB.search(e);
    },
    function(e) {
      console.log("Error: " + e)
    }
  )
}

function _nowPlaying() {
  tmdb.call('/movie/now_playing', {},
    function(e) {
      IMDB.clear();
      IMDB.search(e);
    },
    function(e) {
      console.log("Error: " + e)
    })
}

function _upcoming() {
  tmdb.call('/movie/upcoming', {},
    function(e) {
      IMDB.clear();
      IMDB.search(e);
    },
    function(e) {
      console.log("Error: " + e)
    })
}

function _tvPopular() {
  tmdb.call('/tv/popular', {},
    function(e) {
      IMDB.clear();
      IMDB.search(e);
    },
    function(e) {
      console.log("Error: " + e)
    })
}

function _tvTopRated() {
  tmdb.call('/tv/top_rated', {},
    function(e) {
      IMDB.clear();
      IMDB.search(e);
    },
    function(e) {
      console.log("Error: " + e)
    })
}
  return {
  //Public API : Private function
    searchTv : _searchTv,
    searchMovies : _searchMovies,
    search : _search,
    clear : _infoClear,
    tvTop : _tvTopRated,
    movTop : _topMovies,
    tvPop : _tvPopular,
    movPop : _popular,
    soon : _upcoming,
    now : _nowPlaying,
  }

})();
