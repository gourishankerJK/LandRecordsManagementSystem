
import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import LoginContext from "../../contexts/LoginContext";
import { getAllUsers } from "../../utils/admin";




const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [officals, setOfficals] = useState([]);
    const [newOfficalAddress, setNewOfficialAddress] = useState('');
    const { userContract, accounts } = useContext(LoginContext);

    const handleAddOfficial = () => {

    }

    const handleRemoveOfficial = (address) => {

    }

    const handlePromoteUser = (address) => {

    }

    useEffect(() => {
        getAllUsers(userContract, accounts);
        // setOfficals(of);
        //setUsers(u);

    }, [])
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
            <div className="officials">
                <h2>Officials</h2>
                <ul>
                    {officals.map((official) => (
                        <li key={official.my}> {officals.name} {officals.my}
                            <button onClick={() => handleRemoveOfficial(official.my)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="users">
                <h2> Users</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.my}>{user.name}
                            <button onClick={() => handlePromoteUser(user.my)}>Promote</button>)
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;  