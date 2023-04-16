import React ,{useContext} from 'react'
import './style.scss'
import { Routes, Route, Link } from 'react-router-dom'
import { Logo, Add, DashboradIcon, NotificationIcon, LogoutIcon, Details, SettingIcon } from '../../assets'
<<<<<<< HEAD
import LoginContext from '../../contexts/LoginContext';

=======
import AddRecord from '../AddRecord/AddRecord'
import UserDashboard from '../UserDashboard/UserDashboard'
>>>>>>> d05101a7836e03e68bbe4fcb76988232d6e0eea8
const Dashboard = () => {
  const {handleLogout} = useContext(LoginContext);
  return (
    <div id='dashboard'>
      {/* Sidebar  */}
      <div className="sidebar">
        <div className="logo">
          <img src={Logo} alt="" />
          <span >LandRecord</span>
        </div>
        <div className="side-menu">
          <div className="side-menu-top" >
            <ul>
              <Link style={{textDecoration: "none"}} to='/dashboard/addrecord'>
              <li className='side-nav-item add'>
                <img src={Add} alt="" />
                <span>Add Record</span>
              </li>
              </Link>
              <Link style={{textDecoration: "none"}} to='/dashboard/user'>
              <li className='side-nav-item'>
                <img src={DashboradIcon} alt="" />
                <span>Dashboard</span>
              </li>
              </Link>
              <li className='side-nav-item'>
                <img src={Details} alt="" />
                <span>Land Details</span>
              </li>
              <li className='side-nav-item'>
                <img src={SettingIcon} alt="" />
                <span>Profile</span>
              </li>
            </ul>
          </div>
          <div className="side-menu-bottom" >
            <ul>
              <li className='side-nav-item'>
                <img src={NotificationIcon} alt="" />
                <span>Notifications</span>
              </li>
              <li className='side-nav-item'>
                <img src={LogoutIcon} alt="" />
                <span style={{ color: "#FF8533" }} onClick = {handleLogout}>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="main-page">
        <Routes>
          <Route path="addrecord" element={<AddRecord />} />
          <Route path="user" element={<UserDashboard />} />
        </Routes>
      </div>
      {/* Page Content  */}
    </div>
  )
}

export default Dashboard