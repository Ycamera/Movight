import React from "react";
import "../CSS/ShowMovies.css";

export const ShowMovies = (props) => {
	//出演映画を表示
	const movieData = props.movieData;

	//取得した映画を最新順にソート

	function movieSort() {
		movieData.sort((a, b) => {
			const a2 = a.release_date
				? Number(a.release_date.replace(/-/g, ""))
				: 0;
			const b2 = b.release_date
				? Number(b.release_date.replace(/-/g, ""))
				: 0;

			return a2 - b2;
		});
	}
	movieData && movieSort();

	if (movieData && movieData.length === 21) {
		movieData.shift();
	}

	let movieContent;
	if (movieData) {
		movieContent = movieData.reverse().map((movie) => {
			if (movie.title.length >= 30) {
				movie.title = movie.title.substring(0, 28) + "...";
			}
			let picture = movie.poster_path ? (
				<img
					src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
					id={movie.id}
				/>
			) : (
				<div className="movie no-image" id={movie.id}></div>
			);
			return (
				<div
					className="cast-movie"
					key={movie.id}
					onClick={props.onClick}
					id={movie.id}
				>
					<p className="title" id={movie.id}>
						{movie.title}
					</p>
					<div className="picture">{picture}</div>
				</div>
			);
		});
	}

	const title = props.title;
	let content;
	if (movieContent && movieContent.length > 0) {
		content = (
			<div className="movie-content cast-page">
				<span className="movies-height"></span>
				<div className="movies-max-width">
					<p className="movies-appeared">{title}</p>
					<div className="movies">{movieContent}</div>
				</div>
			</div>
		);
	}

	return content;
};
