import React, { useState } from 'react'
import Header from '../components/Header'
import { useSelector, useDispatch } from 'react-redux';
import { upperFirstLetter } from '../utils/functions';
import api from "../api/api"
import urls from "../api/urls"
import actionTypes from '../redux/actions/actionTypes';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import Totals from '../components/Totals';
import Logout from '../components/Logout';



const AddBook = () => {
    const { categoriesState, themeState } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [openSuccessModal, setOpenSuccessModal] = useState(false)

    // const [title, setTitle] = useState("")
    // const [author, setAuthor] = useState("")
    // const [publisher, setPublisher] = useState("")
    // const [price, setPrice] = useState("")
    // const [isbn, setIsbn] = useState("")
    // const [categoryId, setCategoryId] = useState("empty")
    // We have used one object state for all inputs

    const [formState, setFormState] = useState({
        id: String(new Date().getTime()),
        title: "",
        author: "",
        publisher: "",
        price: "",
        isbn: "",
        categoryId: "empty"
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        if (formState.categoryId === "empty") {
            alert("Category must be selected")
            return
        }
        if (formState.title === "") {
            alert("Book title must be filled")
            return
        }
        if (formState.author === "") {
            alert("Author must be filled")
            return
        }
        if (formState.price === "") {
            alert("Price must be filled")
            return
        }

        api.post(urls.books, formState)
            .then(res => {
                dispatch({ type: actionTypes.bookActions.ADD_BOOK, payload: formState })
                setOpenSuccessModal(true)
            })
            .catch(err => { })
    }

    return (

        <div style={{ height: "100%", overflow: "hidden" }} className={`${themeState === "dark" && "bg-dark"}`}>
            < Header />
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
                            placeholder="e.g. 35"
                            value={formState.price}
                            onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                        />
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
                    <div className='d-flex justify-content-center mt-5'>
                        <button type='submit' className={`btn mb-5 btn-${themeState === "light" ? "secondary" : "primary"} w-50`}>Save</button>
                    </div>
                </form>
            </div>
            <Modal
                title='Successful'
                content='Book successfully added'
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

        </div >
    );
};

export default AddBook