import React, { useRef, useState } from 'react'
import { FaEyeSlash, FaEye } from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import actionTypes from '../redux/actions/actionTypes'

const Login = () => {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const dispatch = useDispatch(state => state)
    const navigate = useNavigate()

    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = (e) => {
        const username = "admin"
        const password = "123456"
        e.preventDefault()
        if (!form.password && !form.username) {
            passwordRef.current.style.display = "block"
            usernameRef.current.style.display = "block"
            setTimeout(() => {
                passwordRef.current.style.display = "none"
                usernameRef.current.style.display = "none"
            }, 2000);
            return
        }
        if (!form.username) {
            usernameRef.current.style.display = "block"
            setTimeout(() => {
                usernameRef.current.style.display = "none"
            }, 2000);
            return
        }
        if (!form.password) {
            passwordRef.current.style.display = "block"
            setTimeout(() => {
                passwordRef.current.style.display = "none"
            }, 2000);
            return
        }

        if (form.username !== username || form.password !== password) {
            setShowModal(true)
            setModalMessage("Username or password is not correct")
            return
        }

        dispatch({ type: actionTypes.loginActions.LOGIN_SUCCESS, payload: form.username })
        navigate("/")
    }

    return (
        <div
            style={{ height: "90vh" }}
            className="d-flex justify-content-center align-items-center"
        >
            <form
                onSubmit={handleLogin}
                className="bg-light"
                style={{
                    width: "50%",
                    padding: "20px",
                    borderRadius: "5px",
                    boxShadow: "0 0 10px 0 gray",
                }}
            >
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        autoComplete="off"
                    />
                    <p
                        ref={usernameRef}
                        style={{ display: "none" }}
                        className="text-danger"
                    >
                        <small>Username can not be empty</small>
                    </p>
                </div>
                <div style={{ position: "relative" }} className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type={!showPassword ? "password" : "text"}
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        autoComplete="new-password"
                    />
                    <div
                        style={{
                            position: "absolute",
                            right: "3%",
                            top: "53%",
                            color: "gray",
                            cursor: "pointer",
                        }}
                    >
                        {!showPassword ? (
                            <FaEye onClick={() => setShowPassword(true)} />
                        ) : (
                            <FaEyeSlash onClick={() => setShowPassword(false)} />
                        )}
                    </div>
                    <p
                        ref={passwordRef}
                        style={{ display: "none" }}
                        className="text-danger"
                    >
                        <small>Password can not be empty</small>
                    </p>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-dark my-3 px-5" type="submit">
                        Login
                    </button>
                </div>
            </form>
            <Modal
                visible={showModal}
                title="Error"
                content={modalMessage}
                cancelButtonClick={() => setShowModal(false)}
            />
        </div>
    );
}

export default Login