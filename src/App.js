import React, { useState } from "react";
import "./App.css";
import { TopPage, Top } from "./containers/TopPage.jsx";

function App() {
	//header のロゴをクリックすると　TopPage.jsx のトップ画面へ遷移
	const [page, setPage] = useState();
	const handleToTopOnClick = () => {
		setPage("top");
		setTimeout(() => {
			setPage("");
		}, 100);
	};

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
				<nav></nav>
			</header>
			<div className="content">
				<TopPage page={page} />
			</div>
		</div>
	);
}

export default App;
