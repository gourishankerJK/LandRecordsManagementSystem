import React, { useState, useContext } from "react";
import Modal from "react-modal";
// import "./style.scss";

import LoginContext from "../../contexts/LoginContext";
import Input from "../common/Input";
import { buyLand } from "../../utils/lands";
import { LandDetails, LandItem } from "./index";
const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		maxHeight: "90vh",
	},
	overlay: { zIndex: 999 },
};

interface landModalProps {
	modalIsOpen: boolean;
	openModal?: () => void;
	afterOpenModal: () => void;
	closeModal: () => void;
	subtitle: any;
	title: string;
	land: any;
	load?: any;
	setLoad?: any;
}
const LandModal: React.FC<landModalProps> = ({
	modalIsOpen,
	afterOpenModal,
	closeModal,
	subtitle,
	title,
	land,
	load,
	setLoad,
}) => {
	const { landContract, web3, accounts } = useContext(LoginContext);

	const handleBuy = () => {
		(async () => {
			await buyLand(
				landContract,
				accounts,
				web3,
				land.mutationNumber,
				land.price
			);
			setLoad(!load);
			closeModal();
		})();
	};
	return (
		<Modal
			isOpen={modalIsOpen}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<div className="header">
				<h2 className="heading" ref={(_subtitle) => (subtitle = _subtitle)}>
					{title}
				</h2>
				<button onClick={closeModal}>&#10006;</button>
			</div>
			<div className="contain">
				<div className="land-details-container">
					<LandDetails
						land={land}
						children={
							<LandItem
								label=""
								value={
									<button
										className="submit"
										style={{ fontSize: "18px", cursor: "pointer" }}
										onClick={() => handleBuy()}
									>
										Buy Land
									</button>
								}
							/>
						}
					/>
				</div>
			</div>
		</Modal>
	);
};

export default LandModal;
