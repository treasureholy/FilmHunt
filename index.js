const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTBhYjEyM2I3NDQxYjBhNzY5YzAwMzY3YzQ2MWU1ZCIsInN1YiI6IjY0NzQxMjk0OWFlNjEzMDEyNTdjN2I2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qd_1OivYhmn0qDmFGdJlDyA4HBLp3NfEkj9hg7zETgY",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
