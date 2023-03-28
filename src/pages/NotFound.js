import React from 'react'
import Header from '../components/Header'
import Logout from '../components/Logout'

const NotFound = () => {
  return (
    <div>
      <Header />
      <div className='d-flex justify-content-center my-5'>
        <h1>404 Not Found</h1>
      </div>
      <div>
        <Logout />
      </div>
    </div>
  )
}

export default NotFound