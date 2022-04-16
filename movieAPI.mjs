import fetch from "node-fetch";

//api_key=10751404afe78938788c4116a75c27c2

//test movie id 522444
const movie_id = 522444;
const keyword_id = 1964; //cave
const person_id = 7470;

//upcoming https://api.themoviedb.org/3/movie/upcoming?api_key=10751404afe78938788c4116a75c27c2&language=ja&region=JP

//上映中の映画を取得　https://api.themoviedb.org/3/movie/now_playing?api_key=10751404afe78938788c4116a75c27c2&region=JP

//高評価の映画を取得　https://api.themoviedb.org/3/movie/top_rated?api_key=10751404afe78938788c4116a75c27c2&language=ja&region=JP

//映画のジャンルを取得 https://api.themoviedb.org/3/genre/movie/list?api_key=10751404afe78938788c4116a75c27c2&language=en-US

//キーワードから映画を取得 https://api.themoviedb.org/3/keyword/{keyword_id}/movies?api_key=10751404afe78938788c4116a75c27c2&language=en-US&include_adult=false

//映画のキーワードを取得　https://api.themoviedb.org/3/movie/{movie_id}/keywords?api_key=api_key=10751404afe78938788c4116a75c27c2

//映画の詳細を取得　https://api.themoviedb.org/3/movie/{movie_id}?api_key=10751404afe78938788c4116a75c27c2&language=en-US

//映画のビデオを取得　https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=10751404afe78938788c4116a75c27c2&language=ja

//映画IDをもとにオススメ映画を取得　https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=10751404afe78938788c4116a75c27c2&language=ja
//映画IDをもとに似た映画を取得 https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=10751404afe78938788c4116a75c27c2&language=ja

//映画IDをもとにキャストの情報を取得　https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=10751404afe78938788c4116a75c27c2&language=ja

//キャストIDをもとに出演映画の情報を取得　https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=10751404afe78938788c4116a75c27c2&language=ja
const getMovie = async () => {
	const data = await fetch(
		`https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=10751404afe78938788c4116a75c27c2&language=ja`
	);
	const movie = await data.json();

	return movie.results || movie.cast;
};

getMovie().then((data) => console.log(data));

/*
getMovie().then((data) => {
	data.forEach((s) => console.log(s));
	for (let i = data.length - 1; i >= 0; i--) {
		if (data[i]["iso_3166_1"] === "PT") {
			console.log(data[i]);
			break;
		}
	}
});
*/
