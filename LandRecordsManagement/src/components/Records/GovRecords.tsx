import React, { FC, useState } from "react";
import { DetailsIcon, Verified } from "../../assets";
import LoginModal from "../LoginModal/LoginModal";
import UserDetail from "../../pages/UserDetails/UserDetail";
import "./style.scss";
import { Unverified } from "../../assets";
import Lands from "../../pages/Lands/Lands";

interface recordsProps {
	title: string;
	heading: Array<Array<string>>;
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
							<th>{heading[0][0]}</th>
							<th>{heading[1][0]} </th>
							<th>{heading[2][0]}</th>
							<th>{heading[3][0]} </th>
						</tr>
					</thead>

					<tbody>
						{item?.map((ele) => {
							return (
								<tr key={ele && ele[heading[0][1]]}>
									<td>{ele[heading[0][1]]}</td>
									<td>{ele[heading[1][1]]}</td>
									<td className="status">
										{ele[heading[2][1]] === "1" ? (
											<img className="verified-badge" src={Verified} alt="" />
										) : (
											<img
												className="unverified-badge"
												style={{
													height: "20px",
													width: "20px",
													objectFit: "contain",
												}}
												src={Unverified}
											/>
										)}
									</td>
									<td>
										<button
											className="record-btn"
											onClick={() => openModal(ele[heading[0][1]])}
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
														<Lands
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

export default GovRecords;
