import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomeScreen, Dashboard } from "./pages";
import React, { useEffect, useContext } from "react";
import LoginContext from "./contexts/LoginContext";
import ProtectedRoute from "./components/common/ProtectedRoutes";
import NotFound from "./components/NotFound/NotFound";

function App() {
	const { updateMetaMask, accounts, isAuthenticated } =
		useContext(LoginContext);
	const refresh = useLocation();
	useEffect(() => {
		updateMetaMask();
	}, [refresh]);

	return (
		<>
			<Routes>
				<Route path="/" element={<HomeScreen />} />
				<Route path="/dashboard/404" element={<NotFound />} />
				<Route
					path="/dashboard/*"
					element={
						<ProtectedRoute
							redirectPath="/"
							isAuthenticated={isAuthenticated}
							children={<Dashboard />}
						/>
					}
				></Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
