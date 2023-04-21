import React, { useEffect, useState, FC, useContext } from "react";
import { getDataAsUrl } from "../../utils/ipfs";
import "./style.scss";
import FileViewer from "react-file-viewer";
import LoginContext from "../../contexts/LoginContext";
import { verifyLand } from "../../utils/govOfficial";

interface Props {
	content: any;
	update: boolean;
	setUpdate: any;
}

const LandDetail: FC<Props> = ({ content, update, setUpdate }) => {
	const [officialDocUrl, setOfficialDocUrl] = useState("");
	const [view, setView] = useState(false);
	const [check, setCheck] = useState(false);
	const { landContract, accounts } = useContext(LoginContext);

	const handleView = () => {
		setView(!view);
	};

	const handleVerify = async (land_id: any) => {
		try {
			await verifyLand(landContract, accounts, land_id);
			setUpdate(!update);
		} catch (error) {
			console.log("error", error);
			setUpdate(!update);
		}
	};

	useEffect(() => {
		(async function () {
			try {
				const temp = await getDataAsUrl(content.recordHash, "image/jpeg");
				setOfficialDocUrl(temp);
			} catch (err) {
				console.log("err :>> ", err);
			}
		})();
	}, []);

	return (
		<div id="landdetails-container">
			<div className="row">
				<div className="col">
					<div className="ele">
						<span className="label">ID:</span>
						<span className="value">{content.id}</span>
					</div>
				</div>
				<div className="col">
					<div className="ele">
						<span className="label">Mutation Number:</span>
						<span className="value">{content.mutationNumber}</span>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<div className="ele">
						<span className="label">Owner:</span>
						<span className="value">{content.name}</span>
					</div>
				</div>
				<div className="col">
					<div className="ele">
						<span className="label">State:</span>
						<span className="value">{content.location.state}</span>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col">
					<div className="ele">
						<span className="label">District</span>
						<span className="value">{content.location.district}</span>
					</div>
				</div>
				<div className="col">
					<div className="ele">
						<span className="label">Village:</span>
						<span className="value">{content.location.village}</span>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<div className="ele">
						<span className="label">Verification Status:</span>
						<span className="value">
							{content.isVerified ? "Verified" : "Verification pending"}
						</span>
					</div>
				</div>
				<div className="col">
					<div className="ele">
						<span className="label">Price:</span>
						<span className="value">{content.price}</span>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<div className="ele">
						<span className="label">Area:</span>
						<span className="value">{content.location.area} sq feet</span>
					</div>
				</div>
			</div>
			<div className="image">
				<div className="col">
					<div className="ele">
						{view && <FileViewer fileType="jpeg" filePath={officialDocUrl} />}
						<span className="preview" onClick={handleView}>
							View Document 
						</span>
					</div>
				</div>
			</div>
			<div className="line">
				<div className="ele">
					<input
						type="checkbox"
						className="value"
						onClick={() => setCheck(!check)}
					/>
					<span className="label">
						{" "}
						I have verified all the details and documents
					</span>
				</div>
			</div>
			<div className="verify">
				<button
					type="button"
					className={content.isVerified || !check ? "disabled" : ""}
					onClick={() => handleVerify(content.id)}
					disabled={content.isVerified || !check}
				>
					{" "}
					Verify{" "}
				</button>
			</div>
		</div>
	);
};

export default LandDetail;
