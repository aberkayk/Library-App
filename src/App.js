import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import Error from "./components/Error";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import EditBook from "./pages/EditBook";
import CategoriesHome from "./pages/CategoriesHome";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import Login from "./pages/Login";

import api from "./api/api";
import urls from "./api/urls";

function App() {
  const { booksState, categoriesState, loginState } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    /* Get Books Start*/
    dispatch({ type: actionTypes.bookActions.GET_BOOKS_START });
    api
      .get(urls.books)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.GET_BOOKS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.bookActions.GET_BOOKS_FAIL,
          payload: "Error occured while loading books",
        });
      });
    /* Get Books End*/
    /* Get Categories Start*/
    dispatch({ type: actionTypes.categoryActions.GET_CATEGORIES_START });
    api
      .get(urls.categories)
      .then((res) => {
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_FAIL,
          payload: "Error occured while loading categories",
        });
      });
    /* Get Categories End*/
  }, []);

  if (booksState.pending === true || categoriesState.pending === true) return <Loading />
  if (booksState.error === true || categoriesState.error === true) return <Error />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loginState.success ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/add-book" element={loginState.success ? <AddBook /> : <Navigate to={"/login"} />} />
        <Route path="/book-detail/:bookId" element={loginState.success ? <BookDetail /> : <Navigate to={"/login"} />} />
        <Route path="/edit-book/:bookId" element={loginState.success ? <EditBook /> : <Navigate to={"/login"} />} />
        <Route path="/categories" element={loginState.success ? <CategoriesHome /> : <Navigate to={"/login"} />} />
        <Route path="/add-category" element={loginState.success ? <AddCategory /> : <Navigate to={"/login"} />} />
        <Route path="/edit-category/:categoryId" element={loginState.success ? <EditCategory /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;