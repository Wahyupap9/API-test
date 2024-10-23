$.ajax({
  url: "http://www.omdbapi.com/?apikey=1837682f&s=harry potter",
  success: function (response) {
    console.log(response.Search);
  },
  error: function (error) {
    console.error(error);
  },
});
