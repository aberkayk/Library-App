import React from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

const Logout = () => {
    const { loginState, themeState } = useSelector((state) => state);
    const dispatch = useDispatch()

    return (
        <div
            className={`d-flex justify-content-center align-items-center ${themeState === "dark" ? "text-light" : "text-dark"}`}
            style={{
                position: "absolute",
                right: "5px",
                zIndex: 100,
                top: "0px",
                flexDirection: "column",
                padding: "10px",
                maxWidth: "50px",
                maxHeight: "70px",
            }}
        >
            <span
                onClick={() => {
                    dispatch({ type: actionTypes.loginActions.LOGOUT });
                }}
            >
                <i
                    style={{ fontSize: "20px", cursor: "pointer" }}
                    className="fa-solid fa-right-from-bracket"
                ></i>
            </span>
            <span
                style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    fontFamily: "sans-serif",
                }}
            >
                {loginState.username}
            </span>
        </div>
    );
};

export default Logout;
