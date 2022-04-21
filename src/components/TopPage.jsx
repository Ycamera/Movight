import React from "react";

export const TopPageComponent = (props) => {
	const topPage = props.topPage;
	let movieList;
	const movieOnClick = props.movieOnClick;
	const castOnClick = props.castOnClick;
	//topPageが更新されたら、映画リストを更新して代入
	if (topPage) {
		const movies = [];

		topPage.map((movie) => {
			if (movie.title) {
				if (movie.title.length >= 38) {
					movie.title = movie.title.substring(0, 35) + "...";
				}
				movies.push(
					<div className="movie" key={movie.id}>
						<p>{movie.title}</p>
						{movie.poster_path ? (
							<img
								id={movie.id}
								src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
								onClick={movieOnClick}
							/>
						) : (
							<div
								className="movie no-image"
								id={movie.id}
								onClick={movieOnClick}
							></div>
						)}
					</div>
				);
			}
		});

		const casts = [];

		topPage.map((cast) => {
			if (cast.name) {
				casts.push(
					<div className="cast" key={cast.id}>
						<p>{cast.name}</p>
						{cast.profile_path ? (
							<img
								id={cast.id}
								src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
								onClick={castOnClick}
							/>
						) : (
							<div
								className="movie no-image"
								id={cast.id}
								onClick={castOnClick}
							></div>
						)}
					</div>
				);
			}
		});

		let movieLists;
		if (movies.length > 0) {
			movieLists = (
				<div className="movie-list list-title">
					<p className="title">
						{props.movieInfoForTitle ? props.movieInfoForTitle : ""}
						映画
					</p>
					{movies}
				</div>
			);
		}

		let castLists;
		if (casts.length > 0) {
			castLists = (
				<div className="cast-list list-title">
					<p className="title">キャスト</p>
					{casts}
				</div>
			);
		}

		let search;
		const searchWord = props.searchWordForAppear;
		if (searchWord) {
			search = (
				<div className="searched-title">
					<p>検索：{searchWord}</p>
				</div>
			);
		}

		movieList =
			movieLists || castLists ? (
				<div className="TopPage">
					{search}
					{movieLists}
					{castLists}
				</div>
			) : (
				<div className="TopPage">
					{search}
					<p className="no-movies">該当なし</p>
				</div>
			);
	}
	let content;

	content = movieList;

	return content;
};
