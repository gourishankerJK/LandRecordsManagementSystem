import React ,{useContext} from 'react'
import './style.scss'
import { Logo, Add, DashboradIcon, NotificationIcon, LogoutIcon, Details, SettingIcon } from '../../assets'
import LoginContext from '../../contexts/LoginContext';

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
              <li className='side-nav-item add'>
                <img src={Add} alt="" />
                <span>Add Record</span>
              </li>
              <li className='side-nav-item'>
                <img src={DashboradIcon} alt="" />
                <span>Dashboard</span>
              </li>
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
        Main
      </div>
      {/* Page Content  */}
    </div>
  )
}

export default Dashboard