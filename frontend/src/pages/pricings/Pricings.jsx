import React from 'react'
import './Pricings.css'
const Pricings = () => {
  return (
    <div className="container page-container">
    <h1>Pricing</h1>
    <div className="pricing-plan">
      <h2>Standard</h2>
      <p>$29.99/month</p>
      <ul>
        <li>Basic vehicles</li>
        <li>3-day rental maximum</li>
        <li>Email support</li>
      </ul>
    </div>
    <div className="pricing-plan">
      <h2>Premium</h2>
      <p>$49.99/month</p>
      <ul>
        <li>Premium vehicles</li>
        <li>No rental period limit</li>
        <li>24/7 phone and email support</li>
        <li>Free GPS and insurance</li>
      </ul>
    </div>
  </div>
  )
}

export default Pricings