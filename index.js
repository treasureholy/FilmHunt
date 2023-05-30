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
fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
) //language (language=ko)한글버전 / language=en-US(영어) 영문버전
  .then((response) => response.json())
  //json메서드는 response를 가져와 response가 완료될 때까지 읽는다(본문 텍스트로 구문 분석한 결과로 해결되는 약속을 반환함)
  .then((response) => {
    //기존에 만든 카드 삭제
    document.querySelector(".card").remove();
    //console.log(response.results); (html과 연결 잘 되었는지 확인)
    response.results.forEach((movie) => {
      //response는 Fetch API의 요청에 대한 응답
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

//검색기능
document.getElementById("btn").addEventListener("click", () => {
  //input값 받아오기
  const inputText = document.getElementById("input-name"); //id 속성을 기준으로 요소를 선택
  const value = inputText.value;
  const card = document.querySelectorAll(".card"); //card의 모든 요소를 선택

  //검색 (movie title) 기능
  if (value) {
    //카드의 객체를 배열로 만들어서 filter메서드 사용해서 데이터를 하나씩 가져옴
    const movieList = [...card].filter((i) => {
      const movieTitle = i
        .querySelector(".movie_title") //class="movie_title"를 가져옴
        .textContent.toLowerCase(); //movie_title의 text를 가져옴 + 제목의 텍스트를 소문자로 변환
      if (!movieTitle.includes(value)) {
        i.classList.add("hide");
      } else {
        i.classList.remove("hide");
      }
    });
  }

  //검색기능 코드 설명(꼼꼼하게...)
  //1. if : 입력된 검색어(value)가 있는지 확인
  //2. [...card]으로 카드 요소들을 배열로 만든다
  //3. filter() 메서드를 사용하여 각 카드 요소를 순회한다.
  //4. querySelector 메서드를 사용하여 해당 카드 요소의 제목(.movie_title)을 선택
  //5. movie_title의 text를 가져온 후 소문자로 변환한다 (대소문자 상관없이 검색 가능하게)
  //6. if : 제목에 검색어가 포함되지 않는다면, 해당 카드 요소에 hide 클래스를 추가하여 숨김
  //7. else : 제목에 검색어가 포함된다면, 해당 카드 요소의 hide 클래스를 제거하여 보이게 함.
  //8. filter 메서드를 통해 반환된 배열은 변수 movieList에 할당
  //9.(css: .hide {display: none} 추가)

  //return 문은 필요x
  //forEach 메서드는 각 요소를 순회하면서 콜백 함수를 실행하는데, 해당 순회를 중단하고자 할 때 사용함.
  //하지만 여기서는 각 요소에 대해 hide 클래스를 추가하거나 제거하기만 하면 되므로 return 문은 필요없음.
});
