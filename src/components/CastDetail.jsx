import React from "react";
import "../CSS/CastDetail.css";
import { ShowMovies } from "../containers/ShowMovies";

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

	return (
		<div className="CastDetailPage">
			<div className="cast-detail">
				<div className="box">
					<div className="cast-image">{picture}</div>
					<div className="box2">
						<p className="cast-name">{name}</p>
						<div className="cast-image-max-width">{picture}</div>
						<p className="birthday">生年月日：{birthday}</p>
						<p className="place-of-birth">出身：{place_of_birth}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
