import React, { useState, useEffect } from "react";
import "./App.css";
import { TopPage, Top } from "./containers/TopPage.jsx";
import { FooterNav } from "./containers/FooterNav";

function App() {
	//Pageと検索単語のリセット
	function pageReset() {
		setTimeout(() => {
			setPage("");
			document.getElementById("search").value = "";
			setSearchWord("");
		}, 10);
	}

	//header のロゴをクリックすると　TopPage.jsx のトップ画面へ遷移
	const [page, setPage] = useState();
	const handleToTopOnClick = () => {
		handleBrowserHidtoryAddTopPage();
		setPage("top");
		pageReset();
	};

	//検索する単語を取得して送信 TopPageへ　パス
	const [searchWord, setSearchWord] = useState();
	const handleSearchOnSubmit = (e) => {
		e.preventDefault();
		if (searchWord) {
			setPage("search");

			browserHistoryAdd({ page: "search", word: searchWord });
			pageReset();
		}
	};

	//検索する単語を取得
	const handleSearchOnChange = (e) => {
		setSearchWord(e.target.value);
	};

	//navをクリックでナビを開くクラスを付与
	const handleNavOnClick = () => {
		const nav = document.querySelector("nav");
		nav.classList.toggle("active");
	};
	useEffect(() => {
		document.addEventListener("click", (e) => {
			if (
				!(
					e.target.closest("nav") ||
					e.target.closest("#nav-button") ||
					e.target.closest(".background")
				)
			) {
				document.querySelector("nav").classList.remove("active");
			}
		});
	}, []);

	//進む戻る機能
	const [browserHistory, setBrowserHistory] = useState({
		0: { page: "top" },
	});
	//現在のページ
	const [browserHistoryPage, setBrowserHistoryPage] = useState(0);

	useEffect(() => {
		if (browserHistory) {
			const back = document.getElementById("browser-back");
			const next = document.getElementById("browser-next");
			browserHistoryPage <= 0
				? back.classList.add("disappear")
				: back.classList.remove("disappear");

			browserHistoryPage >= Object.keys(browserHistory).length - 1
				? next.classList.add("disappear")
				: next.classList.remove("disappear");
		}
	}, [browserHistoryPage]);

	//browserHisory に履歴オブジェを追加
	function browserHistoryAdd(obj) {
		setBrowserHistory((prev) => {
			const newObj = {};
			let lastObj;
			Object.keys(prev).forEach((key) => {
				if (key <= browserHistoryPage) {
					newObj[key] = prev[key];
					lastObj = newObj[key];
				}
			});
			//同じ履歴を連続して記録しない
			if (JSON.stringify(lastObj) !== JSON.stringify(obj)) {
				const list = Object.keys(newObj);
				const key = Number(list[list.length - 1]) + 1;
				newObj[key] = obj;

				setBrowserHistoryPage(Object.keys(newObj).length - 1);

				return { ...newObj };
			} else {
				return prev;
			}
		});
	}

	//browserHistory　に映画の履歴オブジェを追加
	//映画の詳細履歴
	const [movie_id, setMovie_Id] = useState();
	const handleBrowserHidtoryAddMovieDetail = (e) => {
		browserHistoryAdd({ page: "movieDetail", movie_id: e.target.id });
	};

	//キャストの詳細履歴
	const [cast_id, setCast_Id] = useState();
	const handleBrowserHidtoryAddCastDetail = (e) => {
		browserHistoryAdd({ page: "castDetail", cast_id: e.target.id });
	};

	//TopPageの履歴
	const handleBrowserHidtoryAddTopPage = () => {
		browserHistoryAdd({ page: "top" });
	};

	//クリックでひとつ前のページに戻る
	const handleBrowserBack = () => {
		if (0 < browserHistoryPage) {
			const obj = browserHistory[browserHistoryPage - 1];
			setBrowserHistoryPage((prev) => prev - 1);

			browserSwitch(obj);
		}
	};

	//クリックで次のページへ戻る
	const handleBrowserNext = () => {
		if (browserHistoryPage < Object.keys(browserHistory).length - 1) {
			const obj = browserHistory[browserHistoryPage + 1];
			setBrowserHistoryPage((prev) => prev + 1);

			browserSwitch(obj);
		}
	};

	//戻る進む機能のページの移動を確定させる
	function browserSwitch(obj) {
		if (obj.page === "top") {
			setPage("top");
			pageReset();
		} else if (obj.page === "search") {
			setSearchWord(obj.word);
			setPage("search");

			pageReset();
		} else if (obj.page === "movieDetail") {
			setMovie_Id(obj.movie_id);
			setPage("movieDetail");

			pageReset();
		} else if (obj.page === "castDetail") {
			setCast_Id(obj.cast_id);
			setPage("castDetail");

			pageReset();
		} else {
			console.log("Error");
		}
	}

	return (
		<div className="App">
			<header>
				<div className="logo">
					<a href="#" onClick={handleToTopOnClick}>
						<span style={{ "--delay": 0 }}>M</span>
						<span style={{ "--delay": 1 }}>o</span>
						<span style={{ "--delay": 2 }}>v</span>
						<span style={{ "--delay": 3 }}>i</span>
						<span style={{ "--delay": 4 }}>g</span>
						<span style={{ "--delay": 5 }}>h</span>
						<span style={{ "--delay": 6 }}>
							<div className="t">t</div>
						</span>
					</a>
				</div>
				<div className="background"></div>
				<nav>
					<form onSubmit={handleSearchOnSubmit}>
						<input
							id="search"
							type="text"
							placeholder="映画タイトル"
							onChange={handleSearchOnChange}
						/>
						<input id="submit" type="submit" value="検索" />
					</form>
				</nav>
				<div id="nav-button" onClick={handleNavOnClick}>
					<span></span>
				</div>
			</header>
			<div className="content">
				<TopPage
					page={page}
					searchWord={searchWord}
					movieOnClick={handleBrowserHidtoryAddMovieDetail}
					movie_id={movie_id}
					castOnClick={handleBrowserHidtoryAddCastDetail}
					cast_id={cast_id}
				/>
			</div>
			<FooterNav
				handleBrowserBack={handleBrowserBack}
				handleBrowserNext={handleBrowserNext}
			/>
		</div>
	);
}

export default App;
