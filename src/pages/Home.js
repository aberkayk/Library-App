import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ListBooks from '../components/ListBooks'
import Button from '../components/Button'
import { useSelector } from 'react-redux'
import Logout from '../components/Logout'

const Home = () => {
    const navigate = useNavigate()
    const { themeState, loginState } = useSelector(state => state)

    if (!loginState.success) navigate("/login")

    return (
        <div
            style={{ height: "100vh" }}
            className={`${themeState === "dark" && "bg-dark"}`}
        >
            <Header />
            <div className="container my-5">
                <div className="d-flex justify-content-end">
                    <Button
                        text="Add Book"
                        type={`${themeState === "light" ? "secondary" : "primary"}`}
                        onClick={() => {
                            navigate("/add-book");
                        }}
                    />
                </div>
                <ListBooks />
            </div>
            <div>
                <Logout />
            </div>
        </div>
    );
}

export default Home