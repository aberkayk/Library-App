import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import Button from '../components/Button'
import ListCategories from '../components/ListCategories'

import bg from '../assets/bg.png'
import Logout from '../components/Logout'

const CategoriesHome = () => {
    const { categoriesState, themeState } = useSelector(state => state)
    const navigate = useNavigate()


    return (
        <div style={{ overflow: "hidden", height: "100vh" }} className={`${themeState === "dark" && "bg-dark"}`}>
            <Header />
            <div className="container my-5" style={{ minHeight: "100vh" }}>
                <div className="d-flex justify-content-end">
                    <Button
                        text="Add Category"
                        type={`${themeState === "light" ? "secondary" : "primary"}`}
                        onClick={() => {
                            navigate("/add-category");
                        }}
                    />
                </div>
                <ListCategories />
                <div>
                    <Logout />
                </div>
            </div>
        </div>
    )
}

export default CategoriesHome