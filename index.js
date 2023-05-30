// API 요청 보내기

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTBhYjEyM2I3NDQxYjBhNzY5YzAwMzY3YzQ2MWU1ZCIsInN1YiI6IjY0NzQxMjk0OWFlNjEzMDEyNTdjN2I2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qd_1OivYhmn0qDmFGdJlDyA4HBLp3NfEkj9hg7zETgY",
  },
};
//Fetch API는 리소스를 가져오기 위한 인터페이스를 제공.
fetch("https://api.themoviedb.org/3/movie/popular?language=ko&page=1", options) //language 한글로 번역 (language=ko) / language=en-US(영어)
  //response는 Fetch API의 요청에 대한 응답
  .then((response) => response.json())
  //json메서드는 response를 가져와 response가 완료될 때까지 읽는다(본문 텍스트로 구문 분석한 결과로 해결되는 약속을 반환함)
  .then((response) => {
    //기존에 만든 카드 삭제
    document.querySelector(".card").remove();
    //console.log(response.results); (html과 연결 잘 되었는지 확인)
    response.results.forEach((movie) => {
      // [객체 key - value pair로 .사용해서 값에 접근]
      //onclick 할 때 마다 cardAlert() 호출
      let template = `<div class="card" onclick="cardAlert(${movie.id})"> 
                          <img class="img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                          <h2 class="movie_title">${movie.title}</h2>
                          <div class="movie_content">
                            <span class="score">별점 : ${movie.vote_average}</span>
                          </div>
                          <p class="overview">${movie.overview}</p>
                       </div>`;

      document
        // querySelector : (card-box)는 document에서 매치되는 엘리먼트를 갖고 옴
        .querySelector(".card-box")
        // insertAdjacentHTML(position, text) : HTML을 문서(document)에 삽입
        //position : beforeend(자식요소의 마지막 위치) / text : 해당 위치에 삽입될 HTML 요소의 text값
        .insertAdjacentHTML("beforeend", template);
    });
  })
  .catch((err) => console.error(err));

//div class="card"를 onclick시 카드마다 개별 알럿창 띄우는 함수 정의
//변수명 = function (매개변수){}
cardAlert = function (moiveId) {
  alert(`영화 id: ${moiveId}`);
};

//검색 받아오기
document.getElementById("btn").addEventListener("click", () => {
  //검색 기능
  const inputText = document.getElementById("input-name"); // id 속성을 기준으로 요소를 선택
  const value = inputText.value;
  const card = document.querySelectorAll(".card"); //모든 요소를 선택
});
