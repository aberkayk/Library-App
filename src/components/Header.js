import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import actionTypes from "../redux/actions/actionTypes";

const Header = () => {
	const { themeState, booksState, categoriesState } = useSelector(state => state)
	const dispatch = useDispatch()
	return (
		<div>
			<nav
				className={`navbar navbar-expand-sm navbar-dark bg-${themeState === "light" ? "secondary" : "primary"}`}
				style={{ position: "relative", height: "60px" }}
			>
				<div className="container-fluid">
					<h1 className={`navbar-brand text-center pt-2 active text-${themeState === "dark" ? "light" : "dark"}`}>
						Library
					</h1>
					<button
						className="navbar-toggler"
						style={{ position: "absolute", right: "90px" }}
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className={`nav-link active text-${themeState === "dark" ? "light" : "dark"}`} to={"/"}>
									Book Actions
								</Link>
							</li>
							<li className="nav-item">
								<Link className={`nav-link active text-${themeState === "dark" ? "light" : "dark"}`} to={"/categories"}>
									Category Actions
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="d-flex align-items-center" style={{ position: "absolute", right: "55px" }}>
					{themeState === "light" ? (
						<button
							onClick={() =>
								dispatch({
									type: actionTypes.themeActions.CHANGE_THEME,
									payload: "dark",
								})
							}
							style={{ color: "#2C3333", fontSize: "25px", border: "none", backgroundColor: "#6c757d" }}
						>
							<i className="fa-solid fa-moon"></i>
						</button>
					) : (
						<button
							onClick={() =>
								dispatch({
									type: actionTypes.themeActions.CHANGE_THEME,
									payload: "light",
								})
							}
							style={{ color: "white", fontSize: "23px", border: "none", backgroundColor: "#0d6efd" }}
						>
							<i className="fa-solid fa-sun"></i>
						</button>
					)}
				</div>
			</nav >
		</div >
	);
};

export default Header;
