import React, { useEffect, useState, FC, useContext } from "react";
import { getDataAsUrl } from "../../utils/ipfs";
import "./style.scss";
import { verifyUser } from "../../utils/govOfficial";
import LoginContext from "../../contexts/LoginContext";
import { UserItem, UserPopUp } from "../../components/User/index";

interface Props {
	content: any;
	update: boolean;
	setUpdate: any;
}

const UserDetail: FC<Props> = ({ content, update, setUpdate }) => {
	const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
	const [officialDocUrl, setOfficialDocUrl] = useState("");
	const [view, setView] = useState(false);
	const [check, setCheck] = useState(false);
	const { userContract, accounts } = useContext(LoginContext);

	const handleView = () => {
		setView(!view);
	};

	const handleVerify = async (user_address: any) => {
		await verifyUser(userContract, accounts, user_address);
		setUpdate(!update);
	};

	useEffect(() => {
		(async function () {
			const temp = await getDataAsUrl(content.profilePhoto, "image/jpeg");
			const temp2 = await getDataAsUrl(content.officialDocument, "image/jpeg");
			setProfilePhotoUrl(temp);
			setOfficialDocUrl(temp2);
		})();
	}, []);

	const getChildren = () => {
		if (view)
			return <UserPopUp closeModal={handleView} documentUrl={officialDocUrl} />;
		return <button onClick={handleView}>View Document</button>;
	};

	const renderVerify = () => {
		if (content.isVerified === "0") {
			return (
				<>
					<div className="ele line">
						<input
							type="checkbox"
							className="value"
							onClick={() => setCheck(!check)}
						/>
						<span className="label">
							I have verified all the details and documents
						</span>
					</div>
					<div className="verify">
						<button
							type="button"
							className={!check ? "disabled" : ""}
							onClick={() => handleVerify(content.my)}
							disabled={!check}
							style={{ margin: ".8rem" }}
						>
							Verify
						</button>
					</div>
				</>
			);
		}
		return <></>;
	};
	return (
		<>
			<div id="user-container">
				<div className="profile-img">
					<img src={profilePhotoUrl} alt="profile" className="image" />
					<span className="label">Profile Image</span>
				</div>
				<div className="content">
					<UserItem label="Aadhaar Number" value={content.aadharNumber} />
					<UserItem label="Name" value={content.name} />
					<UserItem label="Date Of Birth" value={content.dateOfBirth} />
					<UserItem
						label="Verification Status"
						value={content.isVerified === "1" ? "Verified" : "Not Verified"}
					/>
				</div>
				{renderVerify()}
			</div>
			{getChildren()}
		</>
	);
};

export default UserDetail;
