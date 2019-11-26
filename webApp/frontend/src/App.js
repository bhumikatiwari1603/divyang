import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import './App.css';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import RegisterEmployer from './components/auth/RegisterEmployer';
import Login from "./components/auth/Login";

import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardEmployer from "./components/dashboard/DashboardEmployer";
import ProfileUser from "./components/profile/ProfileUser";
import ProfileEmployer from "./components/profile/ProfileEmployer";
import MyResume from "./components/profile/MyResume";

import DisabilityAdd from "./components/disabilities/DisabilityAdd";
import DisabilityView from "./components/disabilities/DisabilityView";
import DisabilityEdit from "./components/disabilities/DisabilityEdit";

import SkillAdd from "./components/skills/SkillAdd";
import SkillView from "./components/skills/SkillView";
import SkillEdit from "./components/skills/SkillEdit";

import QualificationAdd from "./components/qualifications/QualificationAdd";
import QualificationView from "./components/qualifications/QualificationView";
import QualificationEdit from "./components/qualifications/QualificationEdit";

import EmploymentAdd from "./components/employments/EmploymentAdd";
import EmploymentView from "./components/employments/EmploymentView";
import EmploymentEdit from "./components/employments/EmploymentEdit";

import OpeningAdd from "./components/openings/OpeningAdd";
import OpeningView from "./components/openings/OpeningView";
import OpeningEdit from "./components/openings/OpeningEdit";
import ArchivedOpeningView from "./components/openings/ArchivedOpeningView";
import OpeningAll from "./components/openings/OpeningAll";

import MyActiveApplications from "./components/openings/MyActiveApplications";

import UserApplications from "./components/openings/UserApplications";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());    // Redirect to login
    window.location.href = "./login";
  }
}



class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/registerEmployer" component={RegisterEmployer} />
          <Route exact path="/login" component={Login} />
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/dashboardEmployer" component={DashboardEmployer} />
              <PrivateRoute exact path="/profileUser" component={ProfileUser} />
              <PrivateRoute exact path="/profileEmployer" component={ProfileEmployer} />
              <PrivateRoute exact path="/myResume" component={MyResume} />

              <PrivateRoute exact path="/addDisability" component={DisabilityAdd} />
              <PrivateRoute exact path="/allDisabilities" component={DisabilityView} />
              <PrivateRoute exact path="/editDisability" component={DisabilityEdit} />

              <PrivateRoute exact path="/addSkill" component={SkillAdd} />
              <PrivateRoute exact path="/allSkills" component={SkillView} />
              <PrivateRoute exact path="/editSkill" component={SkillEdit} />

              <PrivateRoute exact path="/addQualification" component={QualificationAdd} />
              <PrivateRoute exact path="/allQualifications" component={QualificationView} />
              <PrivateRoute exact path="/editQualification" component={QualificationEdit} />

              <PrivateRoute exact path="/addEmployment" component={EmploymentAdd} />
              <PrivateRoute exact path="/allEmployments" component={EmploymentView} />
              <PrivateRoute exact path="/editEmployment" component={EmploymentEdit} />

              <PrivateRoute exact path="/addOpening" component={OpeningAdd} />
              <PrivateRoute exact path="/myAllOpenings" component={OpeningView} />
              <PrivateRoute exact path="/editOpening" component={OpeningEdit} />
              <PrivateRoute exact path="/allArchivedOpenings" component={ArchivedOpeningView} />
              <PrivateRoute exact path="/allOpenings" component={OpeningAll} />

              <PrivateRoute exact path="/myActiveApplications" component={MyActiveApplications} />

              <PrivateRoute exact path="/userApplications" component={UserApplications} />

          </Switch>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
