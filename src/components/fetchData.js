//urlを渡すとAPI経由でデータを取得して返す
export const fetchData = async (url) => {
	const data = await fetch(url);
	const info = await data.json();

	return info;
};
