import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Button from './Button';
import Totals from './Totals';
import Modal from './Modal';

import api from '../api/api';
import urls from '../api/urls';

import { upperFirstLetter } from '../utils/functions';
import actionTypes from '../redux/actions/actionTypes';
import { Link, useNavigate } from 'react-router-dom';

const ListCategories = () => {
    const { themeState, categoriesState, booksState } = useSelector(state => state)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [willDeleteCategory, setWillDeleteCategory] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteCategory = (id) => {
        api.delete(`${urls.categories}/${id}`)
            .then(res => {
                dispatch({ type: actionTypes.categoryActions.DELETE_CATEGORY, payload: id })
                dispatch({ type: actionTypes.bookActions.DELETE_BOOKS_AFTER_DELETE_CATEGORY, payload: id })
                setShowDeleteModal(false)
            })
            .catch(err => { })
    }

    return (
        <div>
            {categoriesState.categories.length === 0 && (
                <div className="my-5 d-flex justify-content-center">
                    <div className="alert alert-warning text-center w-75" role="alert">
                        There is no category to show.
                    </div>
                </div>
            )}
            {
                categoriesState.categories.length > 0 && (
                    <table
                        className={`table table-striped ${themeState === "light" ? "table-light" : "table-dark"
                            } `}
                    >
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Number of Books</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categoriesState.categories.map((category, index) => {
                                    // const myBooks = booksState.books.filter(item => item.categoryId === category.id)
                                    const myBooks = []
                                    for (let i = 0; i < booksState.books.length; i++) {
                                        if (booksState.books[i].categoryId === category.id) {
                                            myBooks.push(booksState.books[i])
                                        }
                                    }

                                    return (
                                        <tr key={category.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {upperFirstLetter(category.name)}
                                            </td>
                                            <td>{myBooks.length}</td>
                                            <td>
                                                <Button
                                                    text="Delete"
                                                    type="danger"
                                                    className="btn-sm"
                                                    onClick={() => {
                                                        setShowDeleteModal(true);
                                                        setWillDeleteCategory(category.id);
                                                    }}
                                                />
                                                <Button
                                                    text="Edit"
                                                    type="warning"
                                                    className="btn-sm"
                                                    onClick={() => {
                                                        navigate(`/edit-category/${category.id}`)
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                )}
            <Modal
                title='Delete Category'
                content='When the category is deleted, all books belonging to that category will be deleted.'
                visible={showDeleteModal}
                cancelButtonClick={() => { setShowDeleteModal(false) }}
                cancelButtonText='Close'
                hasConfirmButton={true}
                confirmButtonText='Delete'
                confirmButtonClick={() => { deleteCategory(willDeleteCategory) }}
            />
            <Totals />
        </div>
    );
}

export default ListCategories