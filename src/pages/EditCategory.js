import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import Header from '../components/Header'

import { upperFirstLetter } from '../utils/functions'
import actionTypes from '../redux/actions/actionTypes'

import urls from '../api/urls'
import api from '../api/api'
import Logout from '../components/Logout'

const EditCategory = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { categoryId } = useParams()
    const { categoriesState, themeState } = useSelector(state => state)
    const myCategory = categoriesState.categories.find(item => item.id === categoryId)

    const [form, setForm] = useState(myCategory)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!form.name) {
            setError(true)
            setErrorMessage("Category name can not be empty")
            setTimeout(() => {
                setError(false)
            }, 2000);
            return;
        }

        const hasCategory = categoriesState.categories.find(
            (item) =>
                upperFirstLetter(item.name.trim().replaceAll(" ", "")) ===
                upperFirstLetter(form.name.trim().replaceAll(" ", ""))
        );

        if (hasCategory) {
            setError(true)
            setErrorMessage(`${upperFirstLetter(hasCategory.name)} alredy exists`)
            setTimeout(() => {
                setError(false)
            }, 2000);
            return
        }

        api.put(`${urls.categories}/${categoryId}`, form)
            .then(res => {
                dispatch({ type: actionTypes.categoryActions.EDIT_CATEGORY, payload: form })
                navigate("/categories")
            })
            .catch(err => { })
    }

    return (
        <div>
            <Header />
            <div className="container my-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-5">
                        <label htmlFor="name" className="form-label">
                            Category Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        {error && (
                            <p className="text-danger">
                                <small>{errorMessage}</small>
                            </p>
                        )}
                    </div>
                    <div className="d-flex justify-content-center my-5">
                        <button
                            disabled={
                                upperFirstLetter(myCategory.name.trim().replaceAll(" ", "")) ===
                                    upperFirstLetter(form.name.trim().replaceAll(" ", "")) ? true : false
                            }
                            type="submit"
                            className={`btn mb-5 btn-${themeState === "light" ? "secondary" : "primary"
                                } w-50`}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <Logout />
            </div>
        </div>
    );
}

export default EditCategory