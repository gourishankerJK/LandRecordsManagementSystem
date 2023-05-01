import { FC } from "react";

import "./UserPopUp.scss";

interface UserPopProps {
	closeModal: () => void;
	documentUrl: string;
	className?: string;
}

const UserPopUp: FC<UserPopProps> = ({
	closeModal,
	documentUrl,
	className = "",
}) => {
	return (
		<div className={`modal ${className}`}>
			<div className="modal-content">
				<span className="close" onClick={closeModal}>
					&times;
				</span>
				<img className="user-document" src={documentUrl} />
			</div>
		</div>
	);
};

export default UserPopUp;
