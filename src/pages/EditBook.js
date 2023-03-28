import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import Header from '../components/Header'

import { upperFirstLetter } from '../utils/functions'

import api from '../api/api'
import urls from '../api/urls'
import actionTypes from '../redux/actions/actionTypes'
import Logout from '../components/Logout'

const EditBook = () => {
    const titleRef = useRef()
    const authorRef = useRef()
    const priceRef = useRef()

    const { bookId } = useParams()
    const { booksState, categoriesState, themeState } = useSelector(state => state)
    const myBook = booksState.books.find(item => item.id === bookId)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formState, setFormState] = useState(myBook)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (formState.categoryId === "empty") {
            alert("Category must be selected")
            return
        }
        if (formState.title === "") {
            // alert("Book title must be filled")
            titleRef.current.style.display = 'block'
            return
        }
        if (formState.author === "") {
            authorRef.current.style.display = 'block'
            return
        }
        if (formState.price === "") {
            priceRef.current.style.display = 'block'
            return
        }

        api.put(`${urls.books}/${bookId}`, formState)
            .then(res => {
                dispatch({ type: actionTypes.bookActions.EDIT_BOOK, payload: formState })
                navigate("/")
            })
            .catch(err => { })
    }

    return (
        <div>
            <Header />
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-5">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="e.g. 1984"
                            value={formState.title}
                            onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                        />
                        <p><small ref={titleRef} style={{ display: 'none' }} className='text-danger'>Book name is mandatory</small></p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">
                            Author
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            placeholder="e.g. George Orwell"
                            value={formState.author}
                            onChange={(e) => setFormState({ ...formState, author: e.target.value })}
                        />
                        <p><small ref={authorRef} style={{ display: 'none' }} className='text-danger'>Author is mandatory</small></p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="publisher" className="form-label">
                            Publisher
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="publisher"
                            placeholder="e.g. Secker & Warburg"
                            value={formState.publisher}
                            onChange={(e) => setFormState({ ...formState, publisher: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                            Price
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            placeholder="e.g. 1984"
                            value={formState.price}
                            onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                        />
                        <p><small ref={priceRef} style={{ display: 'none' }} className='text-danger'>Price is mandatory</small></p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="isbn" className="form-label">
                            ISBN
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="isbn"
                            placeholder="e.g. xxxxxxxxxxxxx"
                            value={formState.isbn}
                            onChange={(e) => setFormState({ ...formState, isbn: e.target.value })}
                        />
                    </div>
                    <select
                        value={formState.categoryId}
                        onChange={(e) => setFormState({ ...formState, categoryId: e.target.value })}
                        className="form-select mt-4"
                    >
                        <option value="empty">Select Category</option>
                        {categoriesState.categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {upperFirstLetter(category.name)}
                            </option>
                        ))}
                    </select>
                    <div className='d-flex justify-content-center my-5'>
                        <button type='submit' className={`btn mb-5 btn-${themeState === "light" ? "secondary" : "primary"} w-50`}>Save</button>
                    </div>
                </form>
            </div>
            <div>
                <Logout />
            </div>
        </div>
    )
}

export default EditBook