import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import LoginContext from "../../contexts/LoginContext";
import {
	addOffical,
	getAllUsers,
	checkOffical,
	removeOffical,
} from "../../utils/admin";

const AdminDashboard = () => {
	const [users, setUsers] = useState([]);
	const [newOfficalAddress, setNewOfficialAddress] = useState("");
	const [officialAdded, setOfficialAdded] = useState(false);
	const { userContract, accounts } = useContext(LoginContext);

	const handleAddOfficial = (address : any) => {
		if (address)
			(async () => {
				await addOffical(userContract, accounts, address);
				setOfficialAdded(!officialAdded);
			})();
		else
			(async () => {
				await addOffical(userContract, accounts, newOfficalAddress);
				setOfficialAdded(!officialAdded);
			})();
	};
	const handleCheckOfficial = () => {
		(async () => {
			const { errors: E, result: data } = await checkOffical(
				userContract,
				accounts,
				newOfficalAddress
			);
			if (data) alert("Yes");
			else alert("No");
		})();
	};

	const handleRemoveOfficial = (address : any) => {
		(async () => {
			await removeOffical(userContract, accounts, address);
			setOfficialAdded(!officialAdded);
		})();
	};

	const handlePromoteUser = (address : any) => {
		handleAddOfficial(address);
	};
	useEffect(() => {
		(async () => {
			const { errors, result } = await getAllUsers(userContract, accounts);
			if (!errors) setUsers(result);
		})();
	}, [userContract, officialAdded]);
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
					{users.map((official) => {
						if (official.role.includes("2"))
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
					{users.map((user) => {
						if (!user.role.includes("2")) {
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
