import React, { useState, useContext } from "react";
import Modal from "react-modal";
import "./style.scss";

import LoginContext from "../../contexts/LoginContext";
const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		maxHeight : '90vh'
	},
	overlay: { zIndex: 999},
};

interface loginModalProps {
	modalIsOpen: boolean;
	openModal?: () => void;
	afterOpenModal: () => void;
	closeModal: () => void;
	subtitle: any;
	error?: any;
	title: string;
	children: JSX.Element;
}
const LoginModal: React.FC<loginModalProps> = ({
	modalIsOpen,
	afterOpenModal,
	closeModal,
	subtitle,
	title,
	children,
	error,
}) => {
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
			<div className="contain">{children}</div>
			{error && (
				<div className="footer">
					<span className="error">{error}</span>
					<span className="link">
						Download MetaMask,{" "}
						<a href="https://metamask.io/download/">Click Here</a>{" "}
					</span>
				</div>
			)}
		</Modal>
	);
};

export default LoginModal;
