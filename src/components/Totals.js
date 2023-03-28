import React from 'react'
import { useSelector } from 'react-redux'

const Totals = () => {
    const { booksState, categoriesState, themeState } = useSelector(state => state)

    return (
        <div
            className="d-flex"
            style={{
                backgroundColor: `${themeState === "light" ? "#ECEDEE" : "#343a40"}`,
                color: `${themeState === "light" ? "#343a40" : "#f8f9fa"}`,
                width: "180px",
                flexDirection: "column",
                justifyContent: "center",
                padding: "15px 0 0 10px",
                borderRadius: "3px",
            }}
        >
            <p>
                <b>Total Books:</b> {booksState.books.length}
            </p>
            <p>
                <b>Total Categories:</b> {categoriesState.categories.length}
            </p>
        </div>
    );
}

export default Totals