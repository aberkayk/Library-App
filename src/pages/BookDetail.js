import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { upperFirstLetter } from '../utils/functions'
import Header from '../components/Header'
import Price from '../components/Price'
import bg from '../assets/bg.png'
import Logout from '../components/Logout'


const BookDetail = () => {
    const { bookId } = useParams()
    const navigate = useNavigate()
    const { booksState, categoriesState, themeState } = useSelector(state => state)

    /* let myBook = null
    for (let i = 0; i < booksState.books.length; i++) {
        if (booksState.books[i].id === bookId) {
            myBook = booksState.books[i]
            break
        }
    } */

    const myBook = booksState.books.find(item => item.id === bookId)
    const myCategory = categoriesState.categories.find(item => item.id === myBook.categoryId)

    return (
        <div className={`${themeState === "dark" && "bg-dark"}`} style={{ backgroundImage: `url(${bg})`, backgroundSize: "300px", backgroundPosition: 'center bottom', backgroundRepeat: 'space', height: "100vh" }}>
            <Header />
            <div>
                <div className='container my-5 d-flex justify-content-center'>
                    <div className='bg-white rounded' style={{ border: `2px solid ${themeState === "dark" ? "#212529" : "#fff"}`, boxShadow: "1px 1px 20px 1px rgba(0,0,0,0.1)", padding: "30px", width: "90%" }}>
                        <h5 className='text-center mb-4 d-flex justify-content-center align-items-center' style={{ position: "relative" }}>
                            <span onClick={() => { navigate("/") }} className="badge bg-secondary" style={{ position: "absolute", left: "0", cursor: "pointer", top: "8px" }}>Back</span>
                            <p style={{ fontSize: "30px", fontWeight: "600" }}>Book Information</p>
                        </h5>
                        <div className='d-flex justify-content-between'>
                            <p><b>Book Name</b></p>
                            <p>{myBook.title === "" ? "Not entered" : upperFirstLetter(myBook.title)}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p><b>Author</b></p>
                            <p>{myBook.author === "" ? "Not entered" : upperFirstLetter(myBook.author)}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p><b>Publisher</b></p>
                            <p>{myBook.publisher === "" ? "Not entered" : upperFirstLetter(myBook.publisher)}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p><b>Price</b></p>
                            <Price bookId={bookId} />
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p><b>ISBN</b></p>
                            <p>{myBook.title === "" ? "Not entered" : myBook.isbn}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p><b>Category</b></p>
                            <p>{upperFirstLetter(myCategory.name)}</p>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <Logout />
            </div>
        </div>
    )
}

export default BookDetail