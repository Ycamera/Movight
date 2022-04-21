import React, { useState, useEffect } from "react";
import "./App.css";
import { TopPage, Top } from "./containers/TopPage.jsx";
import { FooterNav } from "./containers/FooterNav";

function App() {
	//Pageと検索単語のリセット
	function pageReset(search) {
		if (search !== "search") setSearchWordForAppear("");
		setMovies("");
		setTimeout(() => {
			setPage("");
			document.getElementById("search").value = "";
			setSearchWord("");
		}, 10);
		closeNav();
	}

	//header または　nav をクリックすると　TopPage.jsx のトップ画面へ遷移
	const [page, setPage] = useState();
	const [movies, setMovies] = useState();

	//header のロゴをクリックすると　トップへ遷移
	const handleToTopOnClick = () => {
		handleBrowserHistoryAddTopPage();
		setPage("top");
		pageReset();
		setMovies("upcoming");
	};
	const handleBrowserHistoryAddTopPage = () => {
		browserHistoryAdd({ page: "top", movies: "upcoming" });
	};

	//nav の人気をクリックすると　トップ画面へ遷移
	const handleToTopPopularOnClick = () => {
		handleBrowserHistoryAddTopPagePopular();
		setPage("top");
		pageReset();
		setMovies("popular");
	};
	const handleBrowserHistoryAddTopPagePopular = () => {
		browserHistoryAdd({ page: "top", movies: "popular" });
	};

	//nav の高評価をクリックすると　トップ画面へ遷移
	const handleToTopTopRatedOnClick = () => {
		handleBrowserHistoryAddTopPageTopRated();
		setPage("top");
		pageReset();
		setMovies("toprated");
	};
	const handleBrowserHistoryAddTopPageTopRated = () => {
		browserHistoryAdd({ page: "top", movies: "toprated" });
	};

	//検索する単語を取得して送信 TopPageへ　パス
	const [searchWord, setSearchWord] = useState();
	const [searchWordForAppear, setSearchWordForAppear] = useState();
	const handleSearchOnSubmit = (e) => {
		e.preventDefault();
		if (searchWord) {
			setPage("search");
			setSearchWordForAppear(searchWord);

			browserHistoryAdd({ page: "search", word: searchWord });
			pageReset("search");
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

	//nav の外をクリックすると nav を閉じる
	function closeNav() {
		document.querySelector("nav").classList.remove("active");
	}
	useEffect(() => {
		document.addEventListener("click", (e) => {
			if (
				!(
					e.target.closest("nav") ||
					e.target.closest("#nav-button") ||
					e.target.closest(".background")
				)
			) {
				closeNav();
			}
		});

		window.addEventListener("resize", () => {
			let width = window.innerWidth;
			let nav = document.querySelector("nav");
			if (width <= 1200) {
				setTimeout(() => {
					nav.classList.add("fade");
				}, 300);
			} else {
				nav.classList.remove("fade");
			}
		});
	}, []);

	//進む戻る機能
	const [browserHistory, setBrowserHistory] = useState({
		0: { page: "top", movies: "upcoming" },
	});
	//現在のページ
	const [browserHistoryPage, setBrowserHistoryPage] = useState(0);

	//ブラウザ進む戻るボタンの表示
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
	//映画の詳細履歴を追加
	const [movie_id, setMovie_Id] = useState();
	const handleBrowserHistoryAddMovieDetail = (e) => {
		browserHistoryAdd({ page: "movieDetail", movie_id: e.target.id });
	};

	//キャストの詳細履歴を追加
	const [cast_id, setCast_Id] = useState();
	const handleBrowserHistoryAddCastDetail = (e) => {
		browserHistoryAdd({ page: "castDetail", cast_id: e.target.id });
	};

	//クリックでひとつ前のページに戻る
	const handleBrowserBack = () => {
		if (0 < browserHistoryPage) {
			const obj = browserHistory[browserHistoryPage - 1];
			setBrowserHistoryPage((prev) => prev - 1);

			browserSwitch(obj);
		}
	};

	//クリックで次のページへ進む
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
			if (obj.movies === "upcoming") {
				setMovies("upcoming");
			} else if (obj.movies === "popular") {
				setMovies("popular");
			} else if (obj.movies === "toprated") {
				setMovies("toprated");
			}
		} else if (obj.page === "search") {
			setSearchWord(obj.word);
			setSearchWordForAppear(obj.word);
			setPage("search");

			pageReset("search");
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

				<nav className="fade">
					<form onSubmit={handleSearchOnSubmit}>
						<input
							id="search"
							type="text"
							placeholder="映画 / キャスト"
							onChange={handleSearchOnChange}
						/>
						<button id="submit" type="submit">
							Search
						</button>
					</form>
					<ul>
						<li>
							<a href="#" onClick={handleToTopOnClick}>
								Latest
								<span></span>
								<span></span>
							</a>
						</li>
						<li>
							<a href="#" onClick={handleToTopPopularOnClick}>
								Popular
								<span></span>
								<span></span>
							</a>
						</li>
						<li>
							<a href="#" onClick={handleToTopTopRatedOnClick}>
								Top Rated
								<span></span>
								<span></span>
							</a>
						</li>
					</ul>
				</nav>
				<div id="nav-button" onClick={handleNavOnClick}>
					<span></span>
				</div>
			</header>
			<div className="content">
				<TopPage
					page={page}
					searchWord={searchWord}
					searchWordForAppear={searchWordForAppear}
					movieOnClick={handleBrowserHistoryAddMovieDetail}
					movie_id={movie_id}
					castOnClick={handleBrowserHistoryAddCastDetail}
					cast_id={cast_id}
					movies={movies}
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
