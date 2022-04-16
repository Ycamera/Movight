import React from "react";
import "../CSS/CastDetail.css";

export const CastDetailComponent = (props) => {
	//名前
	const name = props.cast.name;
	//写真
	const picture = props.cast.profile_path ? (
		<img
			src={`https://image.tmdb.org/t/p/w300${props.cast.profile_path}`}
		/>
	) : (
		<div className="cast no-image"></div>
	);
	//生年月日
	const birthday = props.cast.birthday ? props.cast.birthday : "No data";
	//出身地
	const place_of_birth = props.cast.place_of_birth
		? props.cast.place_of_birth
		: "No data";

	//出演映画を表示
	const movieData = props.movieData;
	const movieContent = movieData.map((movie) => {
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

	return (
		<div className="CastDetailPage">
			<div className="cast-detail">
				<div className="box">
					<div className="cast-image">{picture}</div>
					<div className="box2">
						<p className="cast-name">{name}</p>
						<p className="birthday">生年月日：{birthday}</p>
						<p className="place-of-birth">出身：{place_of_birth}</p>
					</div>
				</div>
			</div>
			{movieContent && (
				<div className="movie-content cast-page">
					<span className="movies-height"></span>
					<div className="movies-max-width">
						<p className="movies-appeared">出演映画</p>
						<div className="movies">{movieContent}</div>
					</div>
				</div>
			)}
		</div>
	);
};
