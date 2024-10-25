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
      $(".container-movies").html(containerMovies(response.Search));
    },
    error: function (error) {
      console.error(error);
    },
  });
}

function containerMovies(datas) {
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
                  <button class="showDetails" data-imdbid="${data.imdbID}">Show More Details</button>
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

function getDataI(id) {
  return fetch(`http://www.omdbapi.com/?apikey=1837682f&i=${id}`)
    .then((response) => response.json())
    .then((response) => response);
}

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("showDetails")) {
    const data = await getDataI(e.target.dataset.imdbid);
    console.log(data);
    let popup = `<div class="popup">
        <div class="close-button"><i class="ri-close-line"></i></div>
        <img
          src="${data.Poster}"
          alt=""
        />
        <div class="text">
          <table>
            <tr>
              <th>Title</th>
              <td>:</td>
              <td>${data.Title}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>:</td>
              <td>${data.Type}</td>
            </tr>
            <tr>
              <th>Writer</th>
              <td>:</td>
              <td>${data.Writer}</td>
            </tr>
            <tr>
              <th>Released</th>
              <td>:</td>
              <td>${data.Released}</td>
            </tr>
            <tr>
              <th>Genre</th>
              <td>:</td>
              <td>${data.Genre}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>:</td>
              <td>${data.Country}</td>
            </tr>
            <tr>
              <th>Actor</th>
              <td>:</td>
              <td>${data.Actors}</td>
            </tr>
          </table>
          <p class="plot">
            ${data.Plot}
          </p>
        </div>
      </div>`;
    document.querySelector(".overlay").innerHTML = popup;
    document.querySelector(".overlay").classList.remove("dNone");
  } else if (
    e.target.classList.contains("close-button") ||
    e.target.classList.contains("ri-close-line")
  ) {
    document.querySelector(".popup").remove();
    document.querySelector(".overlay").classList.add("dNone");
  }
});
