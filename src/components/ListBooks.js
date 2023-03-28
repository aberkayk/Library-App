import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { upperFirstLetter } from '../utils/functions'
import actionTypes from '../redux/actions/actionTypes'

import Button from './Button'
import Modal from './Modal'

import api from "../api/api"
import urls from '../api/urls'
import { useNavigate } from 'react-router-dom'
import Totals from './Totals'

const ListBooks = () => {
    const { booksState, categoriesState, themeState } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [willDeleteBook, setWillDeleteBook] = useState("")

    const deleteBook = (id) => {
        api
            .delete(`${urls.books}/${id}`)
            .then((res) => {
                dispatch({
                    type: actionTypes.bookActions.DELETE_BOOK,
                    payload: id,
                });
                setOpenDeleteModal(false)
            })
            .catch((err) => { });
    }

    return (
        <div>
            {booksState.books.length === 0 && (
                <div className="my-5 d-flex justify-content-center">
                    <div className="alert alert-warning text-center w-75" role="alert">
                        There is no book to show.
                    </div>
                </div>
            )}
            {booksState.books.length > 0 && (
                <div>
                    <table
                        className={`table table-striped ${themeState === "light" ? "table-light" : "table-dark"
                            }`}
                        style={{ borderRadius: "10px" }}
                    >
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Book Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booksState.books.map((book, index) => {
                                const myCategory = categoriesState.categories.find(
                                    (item) => item.id === book.categoryId
                                );
                                return (
                                    <tr key={book.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{upperFirstLetter(book.title)}</td>
                                        <td>{upperFirstLetter(myCategory.name)}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <Button
                                                    text="Details"
                                                    type="success"
                                                    className="btn-sm"
                                                    onClick={() => navigate(`/book-detail/${book.id}`)}
                                                />
                                                <Button
                                                    onClick={(e) => {
                                                        setOpenDeleteModal(true)
                                                        setWillDeleteBook(book.id)
                                                    }}
                                                    text="Delete"
                                                    type="danger"
                                                    className="btn-sm"
                                                />
                                                <Button
                                                    text="Edit"
                                                    type="warning"
                                                    className="btn-sm"
                                                    onClick={() => navigate(`/edit-book/${book.id}`)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            <Modal
                title="Delete Book"
                content="Are you sure you want to delete the book?"
                hasConfirmButton={true}
                confirmButtonText="Delete"
                cancelButtonText="Close"
                confirmButtonClick={() => { deleteBook(willDeleteBook) }}
                cancelButtonClick={() => { setOpenDeleteModal(false) }}
                visible={openDeleteModal}
            />
            <Totals />
        </div>
    );
}

export default ListBooks