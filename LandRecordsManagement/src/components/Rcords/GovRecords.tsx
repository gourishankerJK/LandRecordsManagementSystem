import { dataLength } from "ethers";
import React, { FC, useState } from "react";
import { DetailsIcon, Verified } from "../../assets";
import Popup from "../../pages/GovOfficialDashboard/Popup";
import LandDetails from "../../pages/LandDetails/LandDetails";
import LandDetail from "../LandDetail/LandDetail";
import LoginModal from "../LoginModal/LoginModal";
import UserDetail from "../UserDetail/UserDetail";
import "./style.scss";
import { Unverified } from "../../assets";

interface recordsProps {
	title: string;
	heading: Array<string>;
	item: Array<any>;
	update: boolean;
	setUpdate: any;
}

const GovRecords: FC<recordsProps> = ({
	title,
	heading,
	item,
	update,
	setUpdate,
}) => {
	console.log("item", item);
	const [popupId, setPopupId] = useState(0);

	let subtitle: any;
	const [modalIsOpen, setIsOpen] = useState(false);

	function openModal(id: any) {
		setIsOpen(true);
		setPopupId(id);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = "#f00";
	}

	function closeModal() {
		setIsOpen(false);
		setPopupId(0);
	}

	return (
		<div id="records">
			<h3 className="record-heading">{title}</h3>
			<div className="record-table">
				<table>
					<thead>
						<tr>
							<th>{heading[0]}</th>
							<th>{heading[1]} </th>
							<th>{heading[2]}</th>
							<th>{heading[3]} </th>
						</tr>
					</thead>

					<tbody>
						{item?.map((ele) => {
							return (
								<tr
									key={
										ele &&
										(ele.mutationNumber ? ele.mutationNumber : ele.aadharNumber)
									}
								>
									<td>
										{ele.mutationNumber ? ele.mutationNumber : ele.aadharNumber}
									</td>
									<td>{ele.name}</td>
									<td>
										{ele.isVerified ? <img className = 'verified-badge' src={Verified} alt="" /> : <img className = 'unverified-badge' src={Unverified}/>}
										
									</td>
									<td>
										<button
										   style={{ border:"none", background:"none", fontWeight:"500", letterSpacing:"0.03em", color:"#FF8533" }}
											onClick={() =>
												openModal(
													ele.aadharNumber
														? ele.aadharNumber
														: ele.mutationNumber
												)
											}
										>
											View
										</button>
										{modalIsOpen && (
											<LoginModal
												title={ele.aadharNumber ? "User Detail" : "Land Detail"}
												children={
													ele.aadharNumber ? (
														<UserDetail
															content={item.find(
																(e) => e.aadharNumber === popupId
															)}
															update={update}
															setUpdate={setUpdate}
														/>
													) : (
														<LandDetail
															content={item.find(
																(e) => e.mutationNumber === popupId
															)}
															update={update}
															setUpdate={setUpdate}
														/>
													)
												}
												afterOpenModal={afterOpenModal}
												closeModal={closeModal}
												modalIsOpen={modalIsOpen}
												subtitle={subtitle}
											/>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const children = () => {
	return <h1>Hello World</h1>;
};
export default GovRecords;
