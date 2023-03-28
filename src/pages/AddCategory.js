import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../components/Header'
import Totals from '../components/Totals'
import Modal from '../components/Modal'
import Logout from '../components/Logout'

import urls from '../api/urls'
import api from '../api/api'

import { upperFirstLetter } from '../utils/functions'
import { type } from '@testing-library/user-event/dist/type'
import actionTypes from '../redux/actions/actionTypes'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const { themeState, categoriesState } = useSelector(state => state)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [form, setForm] = useState({
        id: String(new Date().getTime()),
        name: "",
    })

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

        api.post(urls.categories, form)
            .then(res => {
                dispatch({ type: actionTypes.categoryActions.ADD_CATEGORY, payload: form })
                navigate("/categories")
                setOpenSuccessModal(true)
            })
            .catch(err => { })
    }

    return (
        <div style={{ height: "100vh", overflow: "hidden" }} className={`${themeState === "dark" && "bg-dark"}`}>
            <Header />
            <div className='container my-5'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-5">
                        <label htmlFor="name" className="form-label">
                            Category Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="e.g. Novel"
                            value={form.name}
                            onChange={(event) =>
                                setForm({ ...form, name: event.target.value })}
                        />
                        {
                            error && (<p><small className='text-danger'>{errorMessage}</small></p>)
                        }
                    </div>
                    <div className='d-flex justify-content-center my-5'>
                        <button type='submit' className={`btn mb-5 btn-${themeState === "light" ? "secondary" : "primary"} w-50`}>Save</button>
                    </div>
                </form>
            </div>
            <Modal
                title='Successful'
                content='Category successfully added'
                cancelButtonText='Home Page'
                cancelButtonType='success'
                cancelButtonClick={() => { navigate("/") }}
                visible={openSuccessModal}
            />
            <div className='d-flex justify-content-center mb-5'>
                <Totals />
            </div>
            <div>
                <Logout />
            </div>
        </div>

    )
}

export default AddCategory