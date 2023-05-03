import React from "react";
import LandItem from "./LandItem";

interface Props {
	land: any;
	children? : string | React.ReactNode
}

const LandDetails: React.FC<Props> = ({ land , children = "" }) => {
	console.log('land', land)
	return (
		<div className="land-details-container">
			<div className="land-details-card">
				<LandItem label="State:" value={land.location.state} />
				<LandItem label="District:" value={land.location.district} />
				<LandItem label="Village:" value={land.location.village} />
				<LandItem label="Tehsil:" value={land.location.tehsil} />
				<LandItem label="Pincode:" value={land.location.pincode} />
				<LandItem label="Latitude:" value={land.location.latitude} />
				<LandItem label="Longitude:" value={land.location.longitude} />
				<LandItem label="Area:" value={`${land.location.area} sq. ft.`} />
				<LandItem label="Mutation Number:" value={land.mutationNumber} />
				<LandItem label="Current Price:" value={land.price} />
				<LandItem label="Is for Sale:" value={land.isForSale ? "Yes" : "No"} />
				<LandItem
					label="Verification Status:"
					value={land.isVerified === '1' ? "Verified" : land.isVerified === '0' ?"Pending" : 'Rejected'}
					className={land.isVerified === '1' ? "verified" : "unverified"}
				/>
				{children}
			</div>
		</div>
	);
};

export default LandDetails;
