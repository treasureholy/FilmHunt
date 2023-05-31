// [API 요청 보내기]

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTBhYjEyM2I3NDQxYjBhNzY5YzAwMzY3YzQ2MWU1ZCIsInN1YiI6IjY0NzQxMjk0OWFlNjEzMDEyNTdjN2I2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qd_1OivYhmn0qDmFGdJlDyA4HBLp3NfEkj9hg7zETgY",
  },
};
// [Fetch API를 통해 리소스(영화) 가져오기]
fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    //기존에 만든 카드 삭제
    document.querySelector(".card").remove();
    response.results.forEach((movie) => {
      // 객체 key - value pair로 .사용해서 값에 접근
      let template = `<div class="card" onclick="cardAlert(${movie.id})"> 
                          <img class="img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                          <h2 class="movie_title">${movie.title}</h2>
                          <div class="movie_score">Rating : ${movie.vote_average}</div>
                          <div class="overview">${movie.overview}</div>
                       </div>`;

      document
        .querySelector(".card-box")
        // insertAdjacentHTML(position, text) : HTML을 문서(document)에 삽입
        .insertAdjacentHTML("beforeend", template);
    });
  })
  .catch((err) => console.error(err));

// [카드마다 개별 id 알럿]
cardAlert = function (moiveId) {
  alert(`영화 id: ${moiveId}`);
};

// [검색기능]
document.getElementById("btn").addEventListener("click", () => {
  //input값 받아오기
  const inputText = document.getElementById("input-name"); //id(input-name) 속성을 통해 검색 입력 요소를 가져옴
  const value = inputText.value; //검색 입력 요소 값을 가져옴
  const card = document.querySelectorAll(".card"); //클래스가 card인 모든 요소를 선택

  //검색 (movie title) 기능
  if (value) {
    //카드의 객체를 배열로 만들어서 filter메서드 사용해서 데이터를 하나씩 가져옴
    const movieList = [...card].filter((i) => {
      const movieTitle = i
        .querySelector(".movie_title")
        .textContent.toLowerCase(); //movie_title의 text를 가져옴 + 소문자로 변환'
      //제목에 검색어가 포함되는 여부에 따라 해당 카드를 숨기거나 보이게 함
      if (!movieTitle.includes(value)) {
        i.classList.add("hide"); //
      } else {
        i.classList.remove("hide");
      }
    });
  }
});

// [페이지 새로고침]
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("header").addEventListener("click", () => {
    location.reload();
  });
  //페이지 로드 후 검색 입력란에 포커스 설정
  const inputText = document.getElementById("input-name");
  inputText.focus();
});

// [페이지 상단이동]
const $topBtn = document.querySelector(".moveTopBtn");

$topBtn.onclick = () => {
  //top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
  window.scrollTo({ top: 0, behavior: "smooth" });
};
