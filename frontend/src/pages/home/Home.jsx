import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
    <div className="home-page-container home-content">
      <h4>Welcome to Our Rental Service</h4><br/>
      <h2><u>Explore our features and pricing plans.</u></h2><br/>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero a tortor convallis, vel ullamcorper nisi dapibus. Duis aliquam, ex ac tempus elementum, lectus lorem faucibus dui, in gravida erat leo ut Integer eget tempor nisi, non tristique justo. Proin auctor lorem eu nisi feugiat gravida. Curabitur in tristique eros. Phasellus gravida, libero sed efficitur maximus, velit magna aliquet eros, ac auctor purus ipsum at nibh.</p>
      <div className="button-container">
        <button className="dashboard-button home-button">Go to Dashboard</button>
        <button className="join-button home-button">Join Us</button>
      </div>
    </div>
  </div>
  )
}

export default Home