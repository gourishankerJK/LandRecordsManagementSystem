import React, { useEffect, useState, FC, useContext } from "react";
import { getDataAsUrl } from "../../utils/ipfs";
import "./style.scss";
import LoginContext from "../../contexts/LoginContext";
import { verifyLand } from "../../utils/govOfficial";
import { LandDetails, LandPopUp, LandItem } from "../../components/Land/index";
import { rejectLandRecord } from "../../utils/lands";

interface Props {
	content: any;
	update: boolean;
	setUpdate: any;
}

const LandDetail: FC<Props> = ({ content, update, setUpdate }) => {
	const [officialDocUrl, setOfficialDocUrl] = useState("");
	const [check, setCheck] = useState(false);
	const [selectedLand, setSelectedLand] = useState(null);
	const { landContract, accounts } = useContext(LoginContext);

	const handleClose = () => {
		setSelectedLand(null);
	};
	const handleOpen = (land : any) => {
		setSelectedLand(land);
	};

	const handleVerify = async (land_id: any) => {
		await verifyLand(landContract, accounts, land_id);
		setUpdate(!update);
	};

	const handleReject = async (land_id : any)=>{
		 await rejectLandRecord(landContract , accounts , land_id);
		 setUpdate(!update);
	}
	const getChildren = (content: any) => {
		if (content.isVerified ==='1' || content.isVerified === '-1') return <></>;

		return (
			<>
				<LandItem
					label=""
					value= {<button onClick={() => handleOpen(content)}>View Document</button>}
				/>
				<LandItem
					label=""
					value={
						<>
							<input
								type="checkbox"
								className="value"
								onClick={() => setCheck(!check)}
							/>
							<span className="label">
								I have verified all the details and documents{" "}
							</span>
						</>
					}
				/>
				<LandItem
					label=""
					boxClass="verify-land"
					className="btn-verify-reject"
					value={
						<>
						<button
							type="button"
							className={!check ? "disabled" : ""}
							onClick={() => handleVerify(content.mutationNumber)}
							disabled={!check}
						>
							Verify
						</button>
						<button
						type="button"
						className={!check ? "disabled" : ""}
						onClick={() => handleReject(content.mutationNumber)}
						disabled={!check}
						style={{backgroundColor : "red"}}
					>
						Reject
					</button>
					</>
					}
				/>
				{selectedLand && (
					<LandPopUp
						className="landModel"
						selectedLand={selectedLand}
						documentUrl={officialDocUrl}
						closeModal={handleClose}
					/>
				)}
			</>
		);
	};

	useEffect(() => {
		(async function () {
			const temp = await getDataAsUrl(content.recordHash, "image/jpeg");
			setOfficialDocUrl(temp);
		})();
	}, []);

	return (
		<div id="landdetails-container">
			<LandDetails land={content} />
			{getChildren(content)}
		</div>
	);
};

export default LandDetail;
