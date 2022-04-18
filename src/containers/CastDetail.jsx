import React, { useState, useEffect } from "react";
import { CastDetailComponent } from "../components/CastDetail";
import { fetchData } from "../components/fetchData";

export const CastDetail = (props) => {
	const cast_id = props.cast_id;
	const tmpCastsInfo = props.tmpCastsInfo;

	const [cast, setCast] = useState({
		name: "",
		profile_path: "",
		birthday: "",
		place_of_birth: "",
	});

	const [name, setName] = useState("");
	const [profile_path, setProfile_path] = useState("");
	const [birthday, setBirthday] = useState("");
	const [place_of_birth, setPlace_of_birth] = useState("");

	//日本語でキャストの詳細を取得
	const getCastInformation = async (cast_id) => {
		return await fetchData(
			`https://api.themoviedb.org/3/person/${cast_id}?api_key=`
		);
	};

	//英語でキャストの詳細を取得
	const getCastInformationUS = async (cast_id) => {
		return await fetchData(
			`https://api.themoviedb.org/3/person/${cast_id}?api_key=`
		);
	};

	//日本語と英語でß残りのプロフィール情報を取得
	const castInfoCheck = async (cast) => {
		const info = await getCastInformation(cast["id"]);

		setBirthday(info.birthday);
		setPlace_of_birth(info.place_of_birth);
	};

	//cast_idが更新されたら cast へ情報を代入
	useEffect(() => {
		if (tmpCastsInfo && cast_id) {
			const castData = tmpCastsInfo[cast_id];

			setName(castData.name);
			setProfile_path(castData.profile_path);

			castInfoCheck(castData);
			getMovies(cast_id);
		}
	}, [cast_id]);

	//プロフィールの情報が更新されたら cast を更新
	useEffect(() => {
		setCast({
			name: name,
			profile_path: profile_path,
			birthday: birthday
				? birthday.replace("-", "年").replace("-", "月") + "日"
				: false,
			place_of_birth: place_of_birth,
		});
	}, [name, profile_path, birthday, place_of_birth]);

	const [movieData, setMovieData] = useState([]);
	//キャストIDを渡すと出演映画の情報を取得して MovieData を更新
	const getMovies = async (cast_id) => {
		const data = await fetchData(
			`https://api.themoviedb.org/3/person/${cast_id}/movie_credits?api_key=&language=ja`
		);
		//console.log(data.cast);

		let movies = await data.cast;

		//取得した映画を最新順にソート
		function movieSort() {
			movies.sort((a, b) => {
				const a2 = a.release_date
					? Number(a.release_date.replace(/-/g, ""))
					: 0;
				const b2 = b.release_date
					? Number(b.release_date.replace(/-/g, ""))
					: 0;

				return a2 - b2;
			});
		}

		movieSort();
		setMovieData(movies.reverse());
	};

	return (
		<CastDetailComponent
			cast={cast}
			movieData={movieData}
			onClick={props.onClick}
		/>
	);
};
