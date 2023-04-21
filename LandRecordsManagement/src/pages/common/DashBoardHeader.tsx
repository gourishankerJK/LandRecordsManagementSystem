import React from "react";
import { Verified, ProfileIcon } from "../../assets";
import "./styles.scss";

const DashboardHeader = ({ value }) => {
	return (
		<div id="header-dashboard">
			<div className="header">
				<h1 className="dash-heading">Welcome to Your Dashboard...</h1>
				<div className="user-info">
					<span className="icon">{value.name ? value.name[0] : <img src={ProfileIcon} className="profile-avatar" alt="P" />}</span>
					<div className="user">
						<span className="name">{value.name}</span>
						<img src={Verified} alt="verify" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardHeader;
