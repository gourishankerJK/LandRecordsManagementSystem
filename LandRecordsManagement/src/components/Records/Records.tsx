import { dataLength } from "ethers";
import React, { FC } from "react";
import { DetailsIcon, Unverified, Verified } from "../../assets";
import "./style.scss";
import LandModal from "../Land/LandModal";

interface recordsProps {
	title: string;
	heading: Array<Array<string>>;
	item: Array<any>;
	load?: any;
	setLoad?: any;
}

const Records: FC<recordsProps> = ({ title, heading, item, load, setLoad }) => {
	let subtitle: any;
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [selectedland, setSelectedLand] = React.useState({
		id: "",
		mutationNumber: "",
		price: "",
		isForSale: "",
		isVerified: "",
		location: {
			state: "",
			district: "",
			tehsil: "",
			village: "",
			pincode: "",
			latitude: "",
			longitude: "",
			area: "",
		},
	});

	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		subtitle.style.color = "#f00";
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<div id="records">
			<h3 className="record-heading">{title}</h3>
			<div className="record-table">
				<table>
					<thead>
						<tr>
							<th>{heading[0][0]}</th>
							<th>{heading[1][0]} </th>
							<th>{heading[2][0]}</th>
							<th>{heading[3][0]}</th>
							<th>{heading[4][0]}</th>
							<th>{heading[5][0]}</th>
						</tr>
					</thead>

					<tbody>
						{item?.map((ele) => {
							return (
								<tr key={ele[heading[0][1]]}>
									<td> {ele[heading[0][1]]}</td>
									<td>{ele[heading[1][1]]}</td>
									<td>{ele[heading[2][1]]}</td>
									<td>
										{heading[3][0] !== "Desp" ? (
											<div className="status">
												{ele[heading[3][1]] ==='1' ? (
													<img src={Verified} alt="" />
												) : (
													<img
														className="unverified-badge"
														src={Unverified}
														alt=""
													/>
												)}
											</div>
										) : (
											<p>{ele[heading[3][1]]}</p>
										)}
									</td>
									<td>
										{heading[4][0] === "Date"
											? ele[heading[4][1]]
											: ele[heading[4][1]]
											? "Yes"
											: "No"}
									</td>
									<td>
										{heading[4][0] !== "Date" && (
											<button
												className="record-btn"
												onClick={() => {
													setSelectedLand(ele);
													openModal();
												}}
											>
												View
											</button>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<LandModal
				land={selectedland}
				title={"Land Details"}
				afterOpenModal={afterOpenModal}
				closeModal={closeModal}
				modalIsOpen={modalIsOpen}
				openModal={openModal}
				subtitle={subtitle}
				load={load}
				setLoad={setLoad}
			/>
		</div>
	);
};

export default Records;
