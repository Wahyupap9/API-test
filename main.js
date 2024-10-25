$("#searchButton").on("click", function (event) {
  $(".container-movies").html("");
  $("#notFound").html("");
  getMovies();
  document.querySelector("#searchInput").value = "";
});

function getMovies() {
  const keyword = $("#searchInput").val();
  $.ajax({
    url: `http://www.omdbapi.com/?apikey=1837682f&s=${keyword}`,
    success: function (response) {
      if (response.Response === "False") {
        $("#notFound").html(response.Error);
        return;
      }
      $(".container-movies").html(htmlMovies(response.Search));
    },
    error: function (error) {
      console.error(error);
    },
  });
}

function htmlMovies(datas) {
  let movies = "";
  for (data of datas) {
    movies += `<div class="movie">
                  <div class="container-image">
                    <img
                      src="${data.Poster}"
                      alt=""
                    />
                  </div>
                  <div class="info">
                    <h1 class="title">${data.Title}</h1>
                    <div class="yearType">
                      <p class="year">${data.Year}</p>
                      <p class="type">${data.Type}</p>
                    </div>
                  </div>
                  <button>Show More Details</button>
                </div>`;
  }

  return movies;
}

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    getMovies();
    document.querySelector("#searchInput").value = "";
  }
});

fetch("http://www.omdbapi.com/?apikey=1837682f&i=tt1490017")
  .then((response) => response.json())
  .then((response) => console.log(response));
