import React, { useState } from 'react'
import { Navbar, ServiceCard } from '../../components';
import { Secure, bgSvg, Bg, Records, Realiable, Efficient, Touch } from '../../assets';
import './style.scss'

const HomeScreen = () => {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <div id="home">
        <Navbar afterOpenModal={afterOpenModal} closeModal={closeModal} modalIsOpen={modalIsOpen} openModal={openModal} subtitle={subtitle} />
        <div className="main">
          <div className="container">
            <div className="left">
              <div className="content">
                <div className="main-header">
                  <h1>Land Record Management System</h1>
                  <p>Revolutionizing the land registration process with blockchain technology</p>
                </div>
                <div className='header-btn'>
                  <button type='button' className='btn start' onClick={openModal}>Get Started</button>
                  <div className="explore">
                    <button type='button' className='btn explore'>Explore</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="images">
                <img src={Bg} alt="" className='main-bg' />
                <img src={Realiable} alt="" className='reliable-bg' />
                <img src={Secure} alt="" className='top-bg' />
                <img src={Records} alt="" className='right-bg' />
              </div>
            </div>
          </div>
          <img src={bgSvg} alt="" />
        </div>
        <h1 className='section-heading'> Services & Features</h1>
        <section id='features'>
          <div className="grid">
            <div className="grid-item">
              <ServiceCard imgSource={Efficient} desc={"Our system eliminates the need for intermediaries such as lawyers or notaries, reducing the cost and time associated with the land registration process. With our platform, landowners can easily register their properties and record their ownership details on the blockchain, ensuring that the information is tamper-proof and cannot be altered or deleted by any party."} cardHeading={"Efficient and Transparent"} />
            </div>
            <div className="grid-item">
              <ServiceCard imgSource={Secure} desc={"Our platform provides a transparent and secure way to store and share land records. All transactions are verified by the network of nodes on the Ethereum blockchain, which ensures that the data is accurate and trustworthy. With our platform, users can access all the relevant information about a particular property, including ownership details, property boundaries, and any liens or encumbrances, in a secure and transparent manner."} cardHeading={"Secure and Trustworthy"} />
            </div>
            <div className="grid-item">
              <ServiceCard imgSource={Realiable} desc={"Our team of experienced developers and blockchain experts is dedicated to delivering a user-friendly and reliable platform for land record management. We are committed to ensuring the highest level of security and privacy for our users, and we are constantly working to improve our platform's functionality and user experience."} cardHeading={"User-Friendly and Reliable"} />
            </div>
            <div className="grid-item">
              <ServiceCard imgSource={Touch} desc={"If you're interested in learning more about our Land Record Management System on Ethereum, please don't hesitate to contact us. We'd be happy to answer any questions you may have and show you how our platform can help streamline your land registration process."} cardHeading={"Get In Touch"} />
            </div>
          </div>
        </section>
        <h1 className='section-heading'>Contact Us</h1>
        <section id="contact">

          <div className="right">
            <h3> Fill the Contact Form to Connect Us</h3>
            <p className="desc" style={{ color: "grey" }}>
              Network analysis refers to a family of methods that describe
              relationships between units of analysis. A network is comprised of
              nodes as well as the edges or connections between them.
            </p>
          </div>
          <div className="left">
            <form id="form" className="form-container">
              <div className="form-element">
                <label htmlFor="name" className="required">Name</label>
                <input type="text" id="name" name="name" />
              </div>
              <div className="form-element">
                <label htmlFor="email" className="required">Email</label>
                <input type="text" id="email" name="email" />
              </div>
              <div className="form-element" id="password-element">
                <label htmlFor="password" className="required">Mobile No.</label>
                <input type="tel" id="password" name="password" />
              </div>
              <button type="submit" className="form-submit">
                Submit
              </button>
            </form>
          </div>
        </section>

        <footer id="footer">
          <div className="left">
            <h3>More About US</h3>
            <p style={{ color: "grey" }}>
              A land record management system based on Ethereum blockchain can revolutionize the way
              land records are managed. The use of blockchain technology, a distributed ledger system,
              ensures secure and transparent transactions without intermediaries. Smart contracts can
              automate land transactions, reducing the need for intermediaries and speeding up the process.
              This technology can increase transparency and accountability, reducing the risk of fraud and
              corruption. A blockchain-based land record management system ensures a tamper-proof and immutable
              recording of all land transactions, avoiding disputes over ownership or boundaries. Overall, a land
              record management system based on Ethereum blockchain brings significant benefits to the real estate
              industry, making transactions more secure, efficient, and trustworthy.
            </p>
          </div>
          <div className="center">
            <h3 style={{ color: "grey" }}>Keep Connected</h3>
            <div className="social-icons">
              <span><i className="fab fa-linkedin icon"></i> LinekedIn</span>
              <span> <i className="fab fa-instagram icon"></i> Instagram</span>
              <span> <i className="fab fa-twitter icon"></i> twitter</span>
              <span> <i className="fab fa-facebook icon"></i> Facebook</span>
            </div>
          </div>
          <div className="right">
            <h3 style={{ color: "grey" }}>Contact Information</h3>
            <div className="social-icons">
              <p className="info"><i className="fa fa-home"></i> Compnay Name</p>
              <p className="info"><i className="fa fa-phone"></i>+91 7860965109</p>
              <p className="info"><i className="fa fa-phone"></i>+91 7860965109</p>
              <p className="info"><i className="fa fa-phone"></i>+91 7860965109</p>
            </div>
          </div>
        </footer>
        <p style={{ textAlign: "center", background: "#eee", padding: "1rem 0" }}> copy@2023 by Rahul Chaudhary</p>
      </div>
    </>
  )
}

export default HomeScreen;