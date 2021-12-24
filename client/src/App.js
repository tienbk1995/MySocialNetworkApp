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
import ResetPassword from "./components/auth/ResetPassword";
import RenewPassword from "./components/auth/RenewPassword";
import ChangePassword from "./components/auth/ChangePassword";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import EditExperience from "./components/profile-forms/EditExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import EditEducation from "./components/profile-forms/EditEducation";
import Profiles from "./components/profile/Profiles";
import Profile from "./components/user-profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
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
            {/* Public route */}
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/reset-password" element={<ResetPassword />} />
            <Route exact path="/profiles" element={<Profiles />} />
            <Route exact path="/profile/:id" element={<Profile />} />
            <Route
              exact
              path="/renew-password/:token"
              element={<RenewPassword />}
            />
            {/* Private route */}
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
              path="/edit-experience/:id"
              element={<PrivateRoute element={EditExperience} />}
            />
            <Route
              exact
              path="/add-education"
              element={<PrivateRoute element={AddEducation} />}
            />
            <Route
              exact
              path="/edit-education/:id"
              element={<PrivateRoute element={EditEducation} />}
            />
            <Route
              exact
              path="/posts"
              element={<PrivateRoute element={Posts} />}
            />
            <Route
              exact
              path="/posts/:id"
              element={<PrivateRoute element={Post} />}
            />
            <Route
              exact
              path="/change-password"
              element={<PrivateRoute element={ChangePassword} />}
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
