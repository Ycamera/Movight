import React from "react";

export const NavBar = (props) => {
	return (
		<nav className="fade">
			<form onSubmit={props.handleSearchOnSubmit}>
				<input
					id="search"
					type="text"
					placeholder="映画 / キャスト"
					onChange={props.handleSearchOnChange}
				/>
				<button id="submit" type="submit">
					Search
				</button>
			</form>
			<ul>
				<li>
					<a href="#" onClick={props.handleToTopOnClick}>
						<div className="word">
							<div className="default">
								<span style={{ "--delay": 1 }}>L</span>
								<span style={{ "--delay": 2 }}>a</span>
								<span style={{ "--delay": 3 }}>t</span>
								<span style={{ "--delay": 4 }}>e</span>
								<span style={{ "--delay": 5 }}>s</span>
								<span style={{ "--delay": 6 }}>t</span>
							</div>
							<div className="change">
								<span style={{ "--delay": 3 }}>最</span>
								<span style={{ "--delay": 4 }}>新</span>
							</div>
						</div>
						<span className="hover"></span>
						<span className="hover"></span>
					</a>
				</li>
				<li>
					<a href="#" onClick={props.handleToTopPopularOnClick}>
						<div className="word">
							<div className="default">
								<span style={{ "--delay": 1 }}>P</span>
								<span style={{ "--delay": 2 }}>o</span>
								<span style={{ "--delay": 3 }}>p</span>
								<span style={{ "--delay": 4 }}>u</span>
								<span style={{ "--delay": 5 }}>l</span>
								<span style={{ "--delay": 6 }}>a</span>
								<span style={{ "--delay": 7 }}>r</span>
							</div>
							<div className="change">
								<span style={{ "--delay": 3 }}>人</span>
								<span style={{ "--delay": 4 }}>気</span>
							</div>
						</div>
						<span className="hover"></span>
						<span className="hover"></span>
					</a>
				</li>
				<li>
					<a href="#" onClick={props.handleToTopTopRatedOnClick}>
						<div className="word">
							<div className="default">
								<span style={{ "--delay": 1 }}>T</span>
								<span style={{ "--delay": 2 }}>o</span>
								<span style={{ "--delay": 3 }}>p</span>
								<span style={{ "--delay": 4 }}>R</span>
								<span style={{ "--delay": 5 }}>a</span>
								<span style={{ "--delay": 6 }}>t</span>
								<span style={{ "--delay": 7 }}>e</span>
								<span style={{ "--delay": 8 }}>d</span>
							</div>
							<div className="change">
								<span style={{ "--delay": 3 }}>高</span>
								<span style={{ "--delay": 4 }}>評</span>
								<span style={{ "--delay": 5 }}>価</span>
							</div>
						</div>
						<span className="hover"></span>
						<span className="hover"></span>
					</a>
				</li>
			</ul>
		</nav>
	);
};
