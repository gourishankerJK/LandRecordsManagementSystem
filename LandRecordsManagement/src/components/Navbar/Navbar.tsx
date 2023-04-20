import React, { FC, useContext } from 'react'
import './style.scss'
import { Logo, Login } from '../../assets'
import LoginModal from '../LoginModal/LoginModal'
import LoginContext from '../../contexts/LoginContext'
import { Link } from 'react-router-dom'

interface navbarProps {
  modalIsOpen: boolean
  openModal: () => void
  afterOpenModal: () => void
  closeModal: () => void
  subtitle: any
}
const Navbar: FC<navbarProps> = ({
  modalIsOpen,
  openModal,
  afterOpenModal,
  subtitle,
  closeModal,
}) => {
  const { accounts, connectMetamask, error } = useContext(LoginContext)
  let title = 'Login With MetaMask'
  return (
    <nav id='navbar'>
      <div className='left'>
        <img src={Logo} alt='' />
        <span>LandRecord</span>
      </div>
      <div className='right'>
        <ul className='nav-links'>
          <li className='nav-link'>
            <div className='ele'>
              <img src={Login} alt='' />
              <span>ABOUT</span>
            </div>
          </li>
          <li className='nav-link'>
            <div className='ele'>
              <img src={Login} alt='' />
              <span>CONTACT US</span>
            </div>
          </li>
          {accounts && accounts.length > 0 ? (
            <li className='nav-link'>
              <div className='ele'>
                <img src={Login} alt='' />
                <span>
                  <Link to='/dashboard/profile'>Dashboard</Link>
                </span>
              </div>
            </li>
          ) : (
            <li className='nav-link'>
              <div className='ele'>
                <img src={Login} alt='' />
                <span onClick={openModal}>LOGIN</span>
                <LoginModal
                  children={children(connectMetamask)}
                  title={title}
                  afterOpenModal={afterOpenModal}
                  openModal={openModal}
                  modalIsOpen={modalIsOpen}
                  closeModal={closeModal}
                  subtitle={subtitle}
                />
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

function children(connectMetamask: any) {
  return (
    <button className='login-btn' onClick={connectMetamask}>
      Connect Wallet
    </button>
  )
}

export default Navbar
