import React, { useState, useEffect } from "react";
import { MovieDetailComponent } from "../components/MovieDetail";
import { Casts } from "./Casts";
import { fetchData } from "../components/fetchData";
import { ShowMovies } from ".//ShowMovies";
import "../CSS/MovieDetail.css";

export const MovieDetail = (props) => {
	const [movie_id, setMovie_id] = useState();

	const [movieDetail, setMovieDetail] = useState();
	const [title, setTitle] = useState();
	const [poster_path, setPoster_path] = useState();
	const [release_date, setReleaseDate] = useState();
	const [overview, setOverview] = useState();
	const [videoUrl, setVideoUrl] = useState();

	//日本語の映画情報を取得
	const getMovieInformationJP = async (movie_id) => {
		return await fetchData(
			`https://api.themoviedb.org/3/movie/${movie_id}?api_key=&language=ja`
		);
	};

	//英語の映画情報を取得
	const getMovieInformationUS = async (movie_id) => {
		return await fetchData(
			`https://api.themoviedb.org/3/movie/${movie_id}?api_key=`
		);
	};

	//映画のビデオを取得
	const getMovieVideoUrl = async (movie_id) => {
		const data = await fetchData(
			`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=&language=ja`
		);
		let video = data.results;

		return video;
	};

	//日本語のoverview含まれていない場合は　USverをoverviewに代入
	const movieInfoCheck = async (movie) => {
		async function overview() {
			if (!movie["overview"]) {
				const movieDataUS = await getMovieInformationUS(movie["id"]);
				setOverview(movieDataUS["overview"]);
			}
		}
		async function video() {
			setVideoUrl(await getMovieVideoUrl(movie["id"]));
		}
		Promise.all([video(), overview()]);
	};

	//日本語映画の情報を取得して更新
	const setMovieInfo = async (movie_id) => {
		const movie = await getMovieInformationJP(movie_id);

		setTitle(movie.title);
		setPoster_path(movie.poster_path);
		setReleaseDate(movie.release_date);
		setOverview(movie.overview);

		movieInfoCheck(movie);
		getRecommendations(movie_id);
	};

	//idが更新されたら映画の詳細を movieDetail stateへ代入
	useEffect(() => {
		let movie_id = props.movie_id;
		setMovie_id(movie_id);

		if (movie_id) {
			setMovieInfo(movie_id);
		}
	}, [props.movie_id]);

	//映画の内容が更新されたら詳細を movieDetail state へ代入
	useEffect(() => {
		setMovieDetail({
			title: title,
			poster_path: poster_path,
			overview: overview,
			release_date: release_date
				? release_date.replace("-", "年").replace("-", "月") + "日"
				: false,
			video: videoUrl,
		});
	}, [title, poster_path, release_date, overview, videoUrl]);

	//おすすめ映画の情報を取得
	const [recommendMovies, setRecommendMovies] = useState();
	const getRecommendations = async (movie_id) => {
		const data = await fetchData(
			`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=&language=ja&page=1`
		);
		setRecommendMovies(data.results);
		//getTest(movie_id);
	};

	/* テスト用のデータ取得コード
	const getTest = async (movie_id) => {
		const data = await fetchData(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=&language=ja&page=1`
		);
		console.log(data);
	};
	*/

	//appear が true の場合コンテンツを表示
	return (
		<div className="movie-detail">
			<MovieDetailComponent movieDetail={movieDetail} />
			<Casts movie_id={movie_id} onClick={props.castOnClick} />
			<ShowMovies
				movieData={recommendMovies}
				title="おすすめ映画"
				onClick={props.movieOnClick}
			/>
		</div>
	);
};
