import React, { useState, useEffect } from "react";
import "../CSS/FooterNav.css";

export const FooterNav = (props) => {
	return (
		<div className="footer-nav">
			<div
				className="back disappear"
				id="browser-back"
				onClick={props.handleBrowserBack}
			></div>
			<div
				className="next disappear"
				id="browser-next"
				onClick={props.handleBrowserNext}
			></div>
		</div>
	);
};
