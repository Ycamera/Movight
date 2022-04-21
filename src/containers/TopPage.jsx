import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from "react";
import { fetchData } from "../components/fetchData";
import { TopPageComponent } from "../components/TopPage";
import "../CSS/TopPage.css";
import { MovieDetail } from "./MovieDetail";
import { CastDetail } from "./CastDetail";

export const TopPage = (props) => {
	const [TopMovies, setTopMovies] = useState();

	const [topPage, setTopPage] = useState();
	const [topPageAppear, setTopPageAppear] = useState(true);

	const [movieDetailAppear, setMovieDetailAppear] = useState(false);

	const [movie_id, setMovie_id] = useState();

	const [castDetailAppear, setCastDetailAppear] = useState(false);
	const [cast_id, setCast_id] = useState();

	const [movieInfoForTitle, setMovieInfoForTitle] = useState();

	//URLを渡すとトップ画面の映画情報を取得
	const getMovies = async (url) => {
		const data = await fetchData(url);

		return data.results;
	};

	//上映中の映画を取得して TopMovies に代入
	const getTopMovies = (url) => {
		setTopMovies("");
		getMovies(url).then((data) => {
			setTopMovies(data);
		});
	};
	//検索された映画とキャストの情報を取得して　TopMovies に代入
	const getSearchedMoviesCasts = async (keyword) => {
		let data = {};

		//映画データ 取得
		await getMovies(
			`https://api.themoviedb.org/3/search/movie?api_key=&region=JP&language=ja&page=1&query=${keyword}`
		).then((info) => (data = info));

		//キャストデータ 取得
		await getMovies(
			`https://api.themoviedb.org/3/search/person?api_key=&region=JP&language=ja&page=1&query=${keyword}`
		).then((info) => {
			if (info) {
				const num = Object.keys(data).length;
				Object.keys(info).forEach((key, index) => {
					data[num + index] = info[key];
				});
			}
		});
		setTopMovies(data);
	};

	//最近の上映映画情報を取得　TopMovies に代入
	const getNowPlayingMovies = () => {
		getTopMovies(
			"https://api.themoviedb.org/3/movie/now_playing?api_key=&region=JP&language=ja&page=1"
		);
	};
	//人気な映画の情報を取得　TopMovies　に代入
	const getPopularMovies = () => {
		getTopMovies(
			`https://api.themoviedb.org/3/movie/popular?api_key=&language=ja&page=1`
		);
	};
	//高評価な映画の情報を取得　TopMovies　に代入
	const getTopRatedMovies = () => {
		getTopMovies(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=&language=ja&page=1`
		);
	};

	//初回読み込み時に上映映画の情報を取得
	useEffect(() => {
		getNowPlayingMovies();
	}, []);

	//上映映画が更新されたらtopPageを更新
	useEffect(() => {
		setTopPage(TopMovies);
	}, [TopMovies]);

	//ページを全て非表示にする
	const resetPages = () => {
		setTopPageAppear(false);
		setMovieDetailAppear(false);
		setCastDetailAppear(false);
	};

	//映画をクリックすると　映画の詳細ページへ遷移
	const handleMovieOnClick = (e) => {
		const movie_id = e.target.id;
		props.movieOnClick(e);
		toMovieDetailPage(movie_id);
	};
	function toMovieDetailPage(movie_id) {
		setMovie_id(movie_id);

		resetPages();
		setTimeout(() => setMovieDetailAppear(true), 10);

		window.scrollTo(0, 0);
	}

	//映画詳細ページのキャストをクリックすると　キャスト詳細ページへ遷移
	const handleCastOnClick = (e) => {
		const cast_id = e.target.id;
		props.castOnClick(e);

		toCastDetailPage(cast_id);
	};
	function toCastDetailPage(cast_id) {
		setCast_id(cast_id);

		resetPages();
		setCastDetailAppear(true);
		window.scrollTo(0, 0);
	}

	//Topページへ遷移
	const handleToTopPage = () => {
		resetPages();
		setTopPageAppear(true);
		window.scrollTo(0, 0);
	};

	//header nav をクリックすると　トップページへ遷移
	const [tmpPage, setTmpPage] = useState();
	useEffect(() => {
		if (props.page === "top") {
			handleToTopPage();
			if (props.movies === "upcoming" && tmpPage !== "upcoming") {
				getNowPlayingMovies();
				setTmpPage("upcoming");
			} else if (props.movies === "popular" && tmpPage !== "popular") {
				getPopularMovies();
				setTmpPage("popular");
			} else if (props.movies === "toprated" && tmpPage !== "toprated") {
				getTopRatedMovies();
				setTmpPage("toprated");
			}
		} else if (props.page === "search") {
			handleToTopPage();
			getSearchedMoviesCasts(props.searchWord);

			setTmpPage("");
		} else if (props.page === "movieDetail") {
			toMovieDetailPage(props.movie_id);

			setTmpPage("");
		} else if (props.page === "castDetail") {
			toCastDetailPage(props.cast_id);

			setTmpPage("");
		}
	}, [props.page, props.movies]);

	//TopPageの映画文字の前に　"〇〇" な映画　という情報を付加する
	useEffect(() => {
		if (tmpPage === "upcoming") {
			setMovieInfoForTitle("最新の");
		} else if (tmpPage === "popular") {
			setMovieInfoForTitle("人気な");
		} else if (tmpPage === "toprated") {
			setMovieInfoForTitle("高評価な");
		} else {
			setMovieInfoForTitle("");
		}
	}, [tmpPage]);

	return (
		<div>
			{topPageAppear && (
				<TopPageComponent
					topPage={topPage}
					movieOnClick={handleMovieOnClick}
					castOnClick={handleCastOnClick}
					searchWordForAppear={props.searchWordForAppear}
					movieInfoForTitle={movieInfoForTitle}
				/>
			)}
			{movieDetailAppear && (
				<MovieDetail
					movie_id={movie_id}
					castOnClick={handleCastOnClick}
					movieOnClick={handleMovieOnClick}
				/>
			)}
			{castDetailAppear && (
				<CastDetail cast_id={cast_id} onClick={handleMovieOnClick} />
			)}
		</div>
	);
};
