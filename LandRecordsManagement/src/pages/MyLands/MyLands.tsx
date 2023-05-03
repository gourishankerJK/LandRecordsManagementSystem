import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { getMyLandRecords, sellLand, updateDocument } from "../../utils/lands";
import LoginContext from "../../contexts/LoginContext";
import { Loader } from "../../components";
import { addData, getDataAsUrl } from "../../utils/ipfs";
import NotFound from "../../components/NotFound/NotFound";
import Input from "../../components/common/Input";
import { LandDetails, LandPopUp, LandItem } from "../../components/Land/index";
import { toast } from "react-toastify";

const MyLands = () => {
	const [lands, setLands] = useState([]);
	const [file, setFile] = useState(null);
	const { accounts, landContract } = useContext(LoginContext);
	const [loading, setLoading] = useState(false);
	const [load, setLoad] = useState(false);
	const [price, setPrice] = useState(0);
	const [selectedLand, setSelectedLand] = useState(null);
	const [documentUrl, setDocumentUrl] = useState("");

	const handleSaleIt = (land: any) => {
		(async () => {
			await sellLand(landContract, accounts, land.mutationNumber, price);
			setLoad(!load);
		})();
	};
	const openModal = (land: any) => {
		(async () => {
			const url = await getDataAsUrl(land.recordHash, "image/jpeg");
			setDocumentUrl(url);
			setSelectedLand(land);
		})();
	};

	const closeModal = () => {
		setSelectedLand(null);
	};

	const handleReUpload = (mutationNumber : number) => {
		if(!file) toast.error("Choose a file first");
		(async () => {
			const cid = await addData(file);
			await updateDocument(landContract, accounts, cid , mutationNumber);
			toast.success("Document Reupload");
			setFile(null);
		})();
	};
	useEffect(() => {
		setLoading(true);
		(async () => {
			const { errors, result } = await getMyLandRecords(landContract, accounts);
			if (!errors) setLands(result);
		})();
		setLoading(false);
	}, [accounts, load, loading ,file]);

	const getChildren = (land: any) => {
		let children;
		if (land.isVerified === "1") {
			if (!land.isForSale) {
				children = (
					<LandItem
						className="item land-item"
						label=""
						value={
							<div className="item land-item">
								<Input
									name="price"
									id="price"
									label="Set New Price"
									type="number"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								/>
								<button
									className="submit"
									style={{ fontSize: "18px", marginTop: "2rem" }}
									onClick={() => handleSaleIt(land)}
								>
									{" "}
									Sell{" "}
								</button>
							</div>
						}
					/>
				);
			} else {
				children = (
					<LandItem
						style={{ color: "green", marginTop: "10px" }}
						label=""
						className="land-message"
						value="***Already Listed for Sale. :)"
					/>
				);
			}
		} else if (land.isVerified === "-1") {
			children = (
				<LandItem
					label=""
					className=""
					value={
						<>
							<Input
								id="ReUpload Your Documents"
								type="file"
								value={file}
								accept="image/*"
								onChange={(e) => setFile(e.target.files[0])}
								label="ReUpload Your Documents"
								name="ReUpload Your Documents"
								style ={{width : '90%'}}
							/>
							<button className="submit" onClick={()=>handleReUpload(land.mutationNumber)}>
								ReUpload
							</button>
						</>
					}
				/>
			);
		} else if (!land.isForSale) {
			children = (
				<LandItem
					label=""
					className="land-message"
					style={{ color: "red", margin: "10px" }}
					value="***Not Available for Sale , not yet verified :("
				/>
			);
		}

		return (
			<>
				{children}
				<LandItem
					boxClass="item land-item land-item-view"
					className="item land-item"
					label=""
					value={
						<button
							className="submit"
							style={{ fontSize: "18px", cursor: "pointer" }}
							onClick={() => openModal(land)}
						>
							View Document
						</button>
					}
				/>
			</>
		);
	};

	if (loading) return <Loader />;
	if (lands.length == 0)
		return <NotFound message={"You haven't added any Land"} />;
	return (
		<div className="land-details-container">
			{lands.map((land) => (
				<LandDetails land={land} children={getChildren(land)} />
			))}
			{selectedLand && (
				<LandPopUp
					selectedLand={selectedLand}
					documentUrl={documentUrl}
					closeModal={closeModal}
				/>
			)}
		</div>
	);
};

export default MyLands;
