import React, { useState, useEffect } from "react";
import { CastsComponent } from "../components/Casts";
import { fetchData } from "../components/fetchData";
import "../CSS/Casts.css";

export const Casts = (props) => {
	const [casts, setCasts] = useState();
	const [movie_id, setMovie_Id] = useState(
		props.movie_id ? props.movie_id : false
	);

	//キャストのデータを取得
	const fetchCasts = async (movie_id) => {
		const data = await fetchData(
			`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=10751404afe78938788c4116a75c27c2&language=ja`
		);
		setCasts(data.cast);
	};

	//映画IDが更新されたらキャストデータを取得
	useEffect(() => {
		let movie_id = props.movie_id;
		movie_id && fetchCasts(movie_id);
	}, [props.movie_id]);

	let content;
	if (casts) {
		content = <CastsComponent casts={casts} onClick={props.onClick} />;
	}

	return content;
};
