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
	const [moviesNowPlaying, setMoviesNowPlaying] = useState();

	const [topPage, setTopPage] = useState();
	const [topPageAppear, setTopPageAppear] = useState(true);

	const [movieDetailAppear, setMovieDetailAppear] = useState(false);

	const [movie_id, setMovie_id] = useState();

	const [castDetailAppear, setCastDetailAppear] = useState(false);
	const [tmpCastsInfo, setTmpCastsInfo] = useState();
	const [cast_id, setCast_id] = useState();

	//URLを渡すとトップ画面の映画情報を取得
	const getMovies = async (url) => {
		const data = await fetchData(url);

		return data.results;
	};

	//上映中の映画を取得してstateに代入
	const getNowPlayingMovies = () => {
		getMovies(
			"https://api.themoviedb.org/3/movie/now_playing?api_key=10751404afe78938788c4116a75c27c2&region=JP&language=ja&page=1"
		).then((data) => {
			setMoviesNowPlaying(data);
		});
	};

	//初回読み込み時に上映映画の情報を取得
	useEffect(() => {
		getNowPlayingMovies();
	}, []);

	//上映映画が更新されたらtopPageを更新
	useEffect(() => {
		setTopPage(moviesNowPlaying);
	}, [moviesNowPlaying]);

	//ページを全て非表示にする
	const resetPages = () => {
		setTopPageAppear(false);
		setMovieDetailAppear(false);
		setCastDetailAppear(false);
	};

	//映画をクリックすると　映画の詳細ページへ遷移
	const handleMovieOnClick = (e) => {
		const movie_id = e.target.id;

		setMovie_id(movie_id);

		resetPages();
		setMovieDetailAppear(true);
	};

	//映画詳細ページのキャストをクリックすると　キャスト詳細ページへ遷移
	const handleCastOnClick = (e) => {
		const cast_id = e.target.id;

		setCast_id(cast_id);

		resetPages();
		setCastDetailAppear(true);
	};

	//Topページへ遷移
	const handleToTopPage = () => {
		resetPages();
		setTopPageAppear(true);
	};

	//headerのロゴをクリックすると　トップページへ遷移
	useEffect(() => {
		if (props.page === "top") {
			handleToTopPage();
		}
	}, [props.page]);

	return (
		<div>
			{topPageAppear && (
				<TopPageComponent
					topPage={topPage}
					onClick={handleMovieOnClick}
				/>
			)}
			{movieDetailAppear && (
				<MovieDetail
					movie_id={movie_id}
					castOnClick={handleCastOnClick}
					setTmpCastsInfo={setTmpCastsInfo}
				/>
			)}
			{castDetailAppear && (
				<CastDetail
					cast_id={cast_id}
					tmpCastsInfo={tmpCastsInfo}
					onClick={handleMovieOnClick}
				/>
			)}
		</div>
	);
};
