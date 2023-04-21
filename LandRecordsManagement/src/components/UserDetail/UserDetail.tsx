import React, { useEffect, useState, FC, useContext } from "react";
import { getDataAsUrl } from "../../utils/ipfs";
import "./style.scss";
import FileViewer from "react-file-viewer";
import { verifyUser } from "../../utils/govOfficial";
import LoginContext from "../../contexts/LoginContext";

interface Props {
	content: any;
	update: boolean;
	setUpdate: any;
}

const UserDetail: FC<Props> = ({ content, update, setUpdate }) => {
	console.log("content", content);
	const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
	const [officialDocUrl, setOfficialDocUrl] = useState("");
	const [view, setView] = useState(false);
	const [check, setCheck] = useState(false);
	const { userContract, accounts } = useContext(LoginContext);

	const handleView = () => {
		setView(!view);
	};

	const handleVerify = async (user_address: any) => {
		try {
			await verifyUser(userContract, accounts, user_address);
			setUpdate(!update);
		} catch (error) {
			console.log("error", error);
			setUpdate(!update);
		}
	};

	useEffect(() => {
		(async function () {
			console.log("hey");
			try {
				console.log("content.profilePhoto", content.officialDocument);
				const temp = await getDataAsUrl(content.profilePhoto, "image/jpeg");
				const temp2 = await getDataAsUrl(
					content.officialDocument,
					"image/jpeg"
				);
				console.log("temp :>> ", temp);
				setProfilePhotoUrl(temp);
				setOfficialDocUrl(temp2);
			} catch (err) {
				console.log("err :>> ", err);
			}
		})();
	}, []);
	console.log("profilePhotoUrl", profilePhotoUrl);
	console.log("check :>> ", check);
	return (
		<div id="user-container">
			<div className="profile-img">
				<img src={profilePhotoUrl} alt="profile" className="image" />
				<span className="label">Profile Image</span>
			</div>
			<div className="content">
				<div className="ele">
					<span className="label">Adhaar Number</span>
					<span className="value">{content.aadharNumber}</span>
				</div>
				<div className="ele">
					<span className="label">Name</span>
					<span className="value">{content.name}</span>
				</div>
				<div className="ele">
					<span className="label">Date Of Birth</span>
					<span className="value">{content.dateOfBirth}</span>
				</div>
				<div className="ele">
					<span className="label">Verification Status</span>
					<span className="value">
						{content.isVerified ? "Verified" : "Not Verified"}
					</span>
				</div>
				<div className="ele file-viewer">
					{/* <span className="label">Official Document</span> */}
					{view && <FileViewer fileType="jpeg" filePath={officialDocUrl} />}
					<button className="btn" onClick={handleView}>
						View Document
					</button>
				</div>
			</div>
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
					className={content.isVerified || !check ? "disabled" : ""}
					onClick={() => handleVerify(content.my)}
					disabled={content.isVerified || !check}
				>
					{" "}
					Verify{" "}
				</button>
			</div>
		</div>
	);
};

export default UserDetail;
