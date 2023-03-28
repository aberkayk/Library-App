import React from 'react'
import { useSelector } from 'react-redux'

const Price = ({ bookId }) => {
    const { booksState } = useSelector(state => state)
    const myBook = booksState.books.find(item => item.id === bookId)
    return (
        <div>
            <p className='text-danger'><b>{myBook.price}$</b></p>
        </div>
    )
}

export default Price