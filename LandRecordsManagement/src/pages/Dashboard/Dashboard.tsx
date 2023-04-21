import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import {
	Logo,
	Add,
	DashboradIcon,
	NotificationIcon,
	LogoutIcon,
	Details,
	SettingIcon,
} from "../../assets";
import { AddRecord , Profile } from "../index";
import LandDetails from "../LandDetails/LandDetails";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import DashboardHeader from "../common/DashBoardHeader";
import LoginContext from "../../contexts/LoginContext";
import ProfileContext from "../../contexts/ProfileContext";
import { getProfile } from "../../utils/admin";
import { getDataAsUrl } from "../../utils/ipfs";
import GovDashboard from "../GovOfficialDashboard/GovDashboard";
import ProtectedRoute from "../../components/common/ProtectedRoutes";

const Dashboard = () => {
	const { userContract, accounts } = useContext(LoginContext);
	const { userProfile, updateProfile, setProfilePhoto } =
		useContext(ProfileContext);
	useEffect(() => {
		(async function fetch() {
			const data = await getProfile(userContract, accounts);
			if (data) {
				const temp = await getDataAsUrl(data.profilePhoto, "image/jpeg");

				updateProfile(data);
				setProfilePhoto(temp);
			}
		})();
	}, [userContract]);

	return (
		<div id="dashboard">
			{/* Sidebar  */}
			<div className="sidebar">
				<div className="logo">
					<img src={Logo} alt="" />
					<span>LandRecord</span>
				</div>
				<div className="side-menu">
					<div className="side-menu-top">
						<ul>
							<Link
								style={{ textDecoration: "none" }}
								to="/dashboard/addrecord"
							>
								<li className="side-nav-item add">
									<img src={Add} alt="" />
									<span>Add Record</span>
								</li>
							</Link>
							<Link style={{ textDecoration: "none" }} to="/dashboard/user">
								<li className="side-nav-item">
									<img src={DashboradIcon} alt="" />
									<span>Dashboard</span>
								</li>
							</Link>
							<Link style={{ textDecoration: "none" }} to="/dashboard/gov">
								<li className="side-nav-item">
									<img src={DashboradIcon} alt="" />
									<span>Dashboard</span>
								</li>
							</Link>
							<Link style={{ textDecoration: "none" }} to="/dashboard/admin">
								<li className="side-nav-item">
									<img src={DashboradIcon} alt="" />
									<span>Dashboard</span>
								</li>
							</Link>
							<Link
								style={{ textDecoration: "none" }}
								to="/dashboard/land-details"
							>
								<li className="side-nav-item">
									<img src={Details} alt="" />
									<span>My Lands</span>
								</li>
							</Link>
							<Link style={{ textDecoration: "none" }} to="/dashboard/profile">
								<li className="side-nav-item">
									<img src={SettingIcon} alt="" />
									<span>Profile</span>
								</li>
							</Link>
						</ul>
					</div>
					<div className="side-menu-bottom">
						<ul>
							<li className="side-nav-item">
								<img src={NotificationIcon} alt="" />
								<span>Notifications</span>
							</li>
							<li className="side-nav-item">
								<img src={LogoutIcon} alt="" />
								<span style={{ color: "#FF8533" }}>Logout</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="main-page">
				<DashboardHeader value={userProfile}></DashboardHeader>
				<Routes>
					<Route path="addrecord" element={<AddRecord />} />
					<Route path="profile" element={<Profile />} />
					<Route path="land-details" element={<LandDetails />} />
					<Route
						path="admin"
						element={
							<ProtectedRoute
								redirectPath="/dashboard/profile"
								isAuthenticated={() => userProfile.role && userProfile.role.includes('3')}
								children={<AdminDashboard />}
							></ProtectedRoute>
						}
					/>
					<Route path="gov" element={<ProtectedRoute
								redirectPath="/dashboard/profile"
								isAuthenticated={() => userProfile.role && userProfile.role.includes('2')}
								children={<GovDashboard />}
							></ProtectedRoute>} />
					<Route path="/" element={null} />
					<Route path="*" element={<Navigate to="404" />} />
				</Routes>
			</div>
			{/* Page Content  */}
		</div>
	);
};

export default Dashboard;
