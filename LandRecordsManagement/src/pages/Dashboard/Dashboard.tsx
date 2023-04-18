import React, { useContext } from 'react'
import './style.scss'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { Logo, Add, DashboradIcon, NotificationIcon, LogoutIcon, Details, SettingIcon } from '../../assets'
import { AddRecord, UserDashboard, Profile } from '../index'
import LandDetails from '../LandDetails/LandDetails'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import DashboardHeader from '../common/DashBoardHeader'
const Dashboard = () => {
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
              <Link style={{ textDecoration: "none" }} to='/dashboard/addrecord'>
                <li className='side-nav-item add'>
                  <img src={Add} alt="" />
                  <span>Add Record</span>
                </li>
              </Link>
              <Link style={{ textDecoration: "none" }} to='/dashboard/user'>
                <li className='side-nav-item'>
                  <img src={DashboradIcon} alt="" />
                  <span>Dashboard</span>
                </li>
              </Link>
              <Link style={{ textDecoration: "none" }} to='/dashboard/land-details'>
                <li className='side-nav-item'>
                  <img src={Details} alt="" />
                  <span>Land Details</span>
                </li>
              </Link>
              <Link style={{ textDecoration: "none" }} to='/dashboard/profile'>
                <li className='side-nav-item'>
                  <img src={SettingIcon} alt="" />
                  <span>Profile</span>
                </li>
              </Link>
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
                <span style={{ color: "#FF8533" }}>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="main-page">
        <DashboardHeader value = "Gouri Shanker"></DashboardHeader>
        <Routes>
          <Route path="addrecord" element={<AddRecord />} />
          <Route path="user" element={<UserDashboard />} />
          <Route path="profile" element={<Profile name= { "Gouri Shanker"} aadharNumber='1234542131' verified  ={ true} photo ={DashboradIcon}  />} />
          <Route path="land-details" element={<LandDetails />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="/" element={null} />
          <Route path="*" element={<Navigate to='404' />} />
        </Routes>
      </div>
      {/* Page Content  */}
    </div>
  )
}

export default Dashboard