import { React, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Footer from "./Footer";
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

const App = ({ fetchUser }) => {
	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return (
		<div className="container">
			<BrowserRouter>
				<div>
					<Header />
					<Routes>
						<Route path="/" /* exact = {true} this used to be used but is no longer needed, the router now by default matches for exact route, instead of searching if the route is available within the said route ( like / is in /surveys)*/ element={<Landing />} />
						<Route path="/surveys" element={<Dashboard />} />
						<Route path="/surveys/new" element={<SurveyNew />} />
					</Routes>
					<Footer />
				</div>
			</BrowserRouter>
		</div>
	);
};

export default connect(null, actions)(App);