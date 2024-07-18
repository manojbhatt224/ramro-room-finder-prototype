import React from 'react'
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-container">
    <div className="error-content">
      <h2 className="error-title">Oops! Something went wrong</h2>
      <p className="error-message">We apologize for the inconvenience. Please try again later.</p>
    </div>
  </div>
  )
}

export default ErrorPage