import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import LoginContext from "../../contexts/LoginContext";
import { addOffical, getAllUsers, checkOffical, removeOffical } from "../../utils/admin";

const AdminDashboard = () => {
	const [users, setUsers] = useState([]);
	const [newOfficalAddress, setNewOfficialAddress] = useState("");
	const [officialAdded, setOfficialAdded] = useState(false);
	const { userContract, accounts } = useContext(LoginContext);

	const handleAddOfficial = (address) => {
		if (address)
			(async () => {await addOffical(userContract, accounts, address);
				setOfficialAdded(!officialAdded);
			})();
		else
			(async () =>{
				await addOffical(userContract, accounts, newOfficalAddress);
				setOfficialAdded(!officialAdded);
			})();
			
	};
	const handleCheckOfficial = () => {
		(async () => {
			const data = await checkOffical(
				userContract,
				accounts,
				newOfficalAddress
			);
			if (data) alert("Yes");
			else alert("No");
		})();
	};

	const handleRemoveOfficial = (address) => {
		(async () => {
			 await removeOffical(
				userContract,
				accounts,
				address
			);
			setOfficialAdded(!officialAdded);
		})();
		
	};

	const handlePromoteUser = (address) => {
		handleAddOfficial(address);
	};
	useEffect(() => {
		console.log("I was called");
		(async () => {
			const data = await getAllUsers(userContract, accounts);
			if (data) setUsers(data);
		})();
	}, [userContract , officialAdded]);
	return (
		<div className="admin-dashboard">
			<div className="add-official">
				<input
					type="text"
					placeholder="Enter address of the User"
					value={newOfficalAddress}
					onChange={(e) => setNewOfficialAddress(e.target.value)}
				/>
				<button onClick={handleAddOfficial}>Add Official</button>
			</div>
			<div className="add-official">
				<input
					type="text"
					placeholder="Enter address of the User"
					value={newOfficalAddress}
					onChange={(e) => setNewOfficialAddress(e.target.value)}
				/>
				<button onClick={handleCheckOfficial}>Check Official</button>
			</div>
			<div className="officials">
				<h2>Officials</h2>
				<ul>
					{users.map(({isGovt , user : official}) => {
						if (isGovt)
							return (
								<li key={official.my}>
									<span>{official.name}</span>
									<span>{official.my}</span>
									<button onClick={() => handleRemoveOfficial(official.my)}>
										Remove
									</button>
								</li>
							);
					})}
				</ul>
			</div>
			<div className="users">
				<h2> Users</h2>
				<ul>
					{users.map(({isGovt , user}) => {
						if (!isGovt) {
							return (
								<li key={user.my}>
									<span>{user.name}</span>
									<span>{user.my}</span>
									<button onClick={() => handlePromoteUser(user.my)}>
										Promote
									</button>
								</li>
							);
						}
					})}
				</ul>
			</div>
		</div>
	);
};

export default AdminDashboard;
