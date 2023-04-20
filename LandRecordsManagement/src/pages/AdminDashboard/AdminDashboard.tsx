
import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import LoginContext from "../../contexts/LoginContext";
import { addOffical, getAllUsers, checkOffical } from "../../utils/admin";




const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [officals, setOfficals] = useState([]);
    const [newOfficalAddress, setNewOfficialAddress] = useState('');
    const { userContract, accounts, updateMetaMask, setError } = useContext(LoginContext);

    const handleAddOfficial = (address) => {
        if(address)  (async () => await addOffical(userContract, accounts, address))();
        else (async () => await addOffical(userContract, accounts, newOfficalAddress))();
    }
    const handleCheckOfficial = () => {
        setError("Gouri");
        (async () => {
            const data = await checkOffical(userContract, accounts, newOfficalAddress);
            if (data) alert('Yes');
            else alert('No');
        })();
    }

    const handleRemoveOfficial = (address) => {

    }

    const handlePromoteUser = (address) => {
        handleAddOfficial(address);

    }
    useEffect(() => {

        (async () => {
            const data = await getAllUsers(userContract, accounts);
            console.log(data);
            if (data) {
                let temp = [...data[0]];
                for (let i = 0; i < temp.length; i++) {
                    temp[i] = { ...temp[i], "isGovt": data[1][i] }
                }
                setUsers(temp);
            }
        })();

    }, [userContract])
    console.log(users);
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
                        if (official.isGovt)
                            return (<li key={official.my}>  {official.name}
                                <button onClick={() => handleRemoveOfficial(official.my)}>Remove</button>
                            </li>)
                    })}
                </ul>
            </div>
            <div className="users">
                <h2> Users</h2>
                <ul>
                    {users.map((user) => {
                        if (!user.isGovt) {
                            return <li key={user.my}>{user.name}
                                <button onClick={() => handlePromoteUser(user.my)}>Promote</button>
                            </li>
                        }

                    })}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;  