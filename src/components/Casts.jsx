import React from "react";

export const CastsComponent = (props) => {
	const casts = props.casts;
	const onClick = props.onClick;

	//映画への出演キャストの JSX を作成
	const castsJsx = casts.map((cast) => {
		const name = cast.name;
		const picture = `https://image.tmdb.org/t/p/w300${cast.profile_path}`;
		const cast_id = cast.id;
		//console.log(cast);

		//プロファイルデータ
		const castPicture = cast.profile_path ? (
			<img src={picture} id={cast_id} />
		) : (
			<div className="no-image" id={cast_id}></div>
		);

		return (
			<li className="cast" key={cast_id} id={cast_id} onClick={onClick}>
				<p id={cast_id}>{name}</p>
				{castPicture}
			</li>
		);
	});

	let content;

	if (castsJsx.length > 0) {
		content = (
			<div className="CastsPage">
				<div className="casts">
					<p className="title">キャスト</p>
					<ul className="casts-list">{castsJsx}</ul>
				</div>
			</div>
		);
	}

	return content;
};
