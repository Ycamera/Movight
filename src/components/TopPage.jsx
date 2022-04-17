import React from "react";

export const TopPageComponent = (props) => {
	const topPage = props.topPage;
	let movieList;
	const onClick = props.onClick;

	//topPageが更新されたら、映画リストを更新して代入
	if (topPage) {
		const movies = topPage.map((movie) => {
			return (
				<div className="movie" key={movie.id}>
					<p>{movie.title}</p>
					{movie.poster_path ? (
						<img
							id={movie.id}
							src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
							onClick={onClick}
						/>
					) : (
						<div
							className="movie no-image"
							id={movie.id}
							onClick={onClick}
						></div>
					)}
				</div>
			);
		});

		movieList = (
			<div className="movie-list">
				{movies.length > 0 ? (
					movies
				) : (
					<p className="no-movies">該当なし</p>
				)}
			</div>
		);
	}

	let content;

	content = <div className="TopPage">{movieList}</div>;

	return content;
};
