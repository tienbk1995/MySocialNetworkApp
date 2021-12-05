// Ultility
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import "./App.css";
// React Components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import PrivateRoute from "./components/routing/PrivateRoute";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { setAuthToken } from "./ultils/setAuthToken";

// Current token is in localStorage
if (localStorage.token) {
  // Attach token to x-auth-token header
  setAuthToken(localStorage.token);
}

const App = () => {
  // Send token to server-side if existed to maintain user's session
  useEffect(() => store.dispatch(loadUser()), []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route
              exact
              path="/dashboard"
              element={<PrivateRoute element={Dashboard} />}
            />
            <Route
              exact
              path="/create-profile"
              element={<PrivateRoute element={CreateProfile} />}
            />
            <Route
              exact
              path="/edit-profile"
              element={<PrivateRoute element={EditProfile} />}
            />
            <Route
              exact
              path="/add-experience"
              element={<PrivateRoute element={AddExperience} />}
            />
            <Route
              exact
              path="/add-education"
              element={<PrivateRoute element={AddEducation} />}
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
