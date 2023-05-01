import React, { ReactNode } from "react";

interface LandItemProps {
	label: string;
	value: string | ReactNode;
	boxClass?: string;
	className?: string;
	[key: string]: any;
}

const LandItem: React.FC<LandItemProps> = ({
	label,
	value,
	boxClass = "",
	className = "",
	...res
}) => {
	return (
		<div className={`${boxClass} land-details-row`}>
			<span className="land-details-label">{label}</span>
			<span className={`${className} land-details-value`} {...res}>
				{value}
			</span>
		</div>
	);
};

export default LandItem;
