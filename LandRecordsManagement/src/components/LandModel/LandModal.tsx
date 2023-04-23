import React, { useState, useContext } from "react";
import Modal from "react-modal";
// import "./style.scss";

import LoginContext from "../../contexts/LoginContext";
import Input from "../common/Input";
import { buyLand } from "../../utils/lands";
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
    land : any
    load? : any
    setLoad? : any
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
    const {landContract , web3 , accounts} = useContext(LoginContext);
   
    const handleBuy = ()=>{
      (async () =>{
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
    }
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
						<div className="land-details-card">
							<div className="land-details-row">
								<span className="land-details-label">State:</span>
								<span className="land-details-value">
									{land.location.state}
								</span>
							</div>
							<div className="land-details-row">
								<span className="land-details-label">District:</span>
								<span className="land-details-value">
									{land.location.district}
								</span>
							</div>
							<div className="land-details-row">
								<span className="land-details-label">Village:</span>
								<span className="land-details-value">
									{land.location.village}
								</span>
							</div>
							<div className="land-details-row">
								<span className="land-details-label">Tehsil:</span>
								<span className="land-details-value">
									{land.location.tehsil}
								</span>
							</div>
							<div className="land-details-row">
								<span className="land-details-label">Pincode:</span>
								<span className="land-details-value">
									{land.location.pincode}
								</span>
							</div>
							<div className="land-details-row">
								<span className="land-details-label">Latitude:</span>
								<span className="land-details-value">
									{land.location.latitude}
								</span>
							</div>
							<div className="land-details-row">
								<span className="land-details-label">Longitude:</span>
								<span className="land-details-value">
									{land.location.longitude}
								</span>
							</div>
							<div className="land-details-row">
								<span className="land-details-label">Area:</span>
								<span className="land-details-value">
									{land.location.area} sq. ft.
								</span>
							</div>
							<div className="land-details-row">
								<span className="land-details-label">Mutation Number:</span>
								<span className="land-details-value">
									{land.mutationNumber}
								</span>
							</div>
							<div className="land-details-row">
								<span className="land-details-label">Current Price:</span>
								<span className="land-details-value">{land.price}</span>
							</div>
							<div className="land-details-row">
								<span className="land-details-label">Is for Sale:</span>
								<span className="land-details-value">
									{land.isForSale ? "Yes" : "No"}
								</span>
							</div>
							<div className="land-details-row">
								<span className="land-details-label">Verification Status:</span>
								<span
									className={`land-details-value ${
										land.isVerified ? "verified" : "unverified"
									}`}
								>
									{land.isVerified ? "Verified" : "Not Verified"}
								</span>
							</div>
							<div className="land-details-row">
								<button className="submit" style={{fontSize:"18px", cursor:"pointer"}} onClick={() => handleBuy()}>Buy Land</button>
							</div>
						</div>
				</div>
			</div>
		</Modal>
	);
};

export default LandModal;
