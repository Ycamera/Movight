import React from "react";

export const MovieDetailComponent = (props) => {
	//映画のオブジェクト
	const movie = props.movieDetail ? props.movieDetail : {};
	//映画のタイトル
	const title = movie.title;
	//映画の写真
	const picture = movie.poster_path ? (
		<img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
	) : (
		<div className="movie-detail no-image"></div>
	);
	//説明
	const overview = movie.overview ? (
		movie.overview
	) : (
		<div className="no-overview">No data</div>
	);
	//上映開始日
	const release_date = movie.release_date ? movie.release_date : "No data";

	//Videoデータ
	let video;
	if (movie.video && movie.video.length > 0) {
		let key = movie.video[0]["key"];

		//デフォルト：width:560 height:315
		video = (
			<div className="video youtube" key={key}>
				<div className="video-height">
					<p>Trailer</p>
					<div className="video-content">
						<iframe
							width="1280"
							height="720"
							src={`https://www.youtube.com/embed/${key}`}
							title="YouTube video player"
							allow="fullscreen"
						></iframe>
					</div>
				</div>
			</div>
		);
	} else {
		video = <div className="video youtube no-video"></div>;
	}

	return (
		<div className="movie-detail-page">
			<div className="box">
				<div className="space"></div>
				<div className="move">{picture}</div>
				<div className="box2">
					<p className="movie-title">{title}</p>
					<div className="picture-max-width">{picture}</div>
					<p className="release-date">上映開始日：{release_date}</p>
					<p className="overview">
						概要
						<br />
						{overview}
					</p>
				</div>
			</div>
			{video}
		</div>
	);
};
