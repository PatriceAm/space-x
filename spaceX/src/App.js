import React, {useState} from "react";
import {Routes, Route, useLocation, Navigate} from "react-router-dom";

import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {getAllLaunchesR} from "./reducers/launchReducer";
import {selectLaunchR} from "./reducers/selecLaunchRed";
import {loadUserR} from "./reducers/loginReducer";

import Details from "./components/Details/Details";
import Card from "./components/Card/Card";
import Search from "./components/Search/Search";
import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Scroll from "./components/Scroll/Scroll";
import Loader from "./components/Loader/Loader";
import Account from "./components/Account/Account";
import Notification from "./components/Notification/Notification";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const launches = useSelector((state) => state.launches);
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  const [searchBy, setSearchBy] = useState("");
  const [selMissName, setSelMissName] = useState(null);
  const location = useLocation();

  useEffect(() => {
    dispatch(getAllLaunchesR());
    if (user) {
      dispatch(loadUserR());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (selMissName) {
      const selMission = launches.find(
        (launch) => launch.mission_name === selMissName
      );
      dispatch(selectLaunchR(selMission));
    }
  }, [launches, selMissName, dispatch]);

  const sendSearch = (sby) => {
    setSelMissName(null);
    setSearchBy(sby);
  };

  const missionSelector = (mName) => {
    setSelMissName(mName);
  };

  return (
    <div>
      <Navigation />
      {notification && <Notification />}
      <div className="app_container">
        {location.pathname === "/" ? (
          <>
            <Search sendSearch={sendSearch} />
          </>
        ) : (
          ""
        )}
        <Routes>
          <Route
            path="/update/:username"
            element={user ? <Account /> : <Navigate replace to="/" />}
          />
          <Route
            path="/details"
            element={
              user ? (
                <Details sendSearch={sendSearch} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              !launches.length ? (
                <Loader />
              ) : (
                <Scroll>
                  <Card searchBy={searchBy} missionSelector={missionSelector} />
                </Scroll>
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
