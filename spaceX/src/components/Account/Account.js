import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import {updatePasswordR} from "../../reducers/updateReducer";
import {showNotificationR} from "../../reducers/notificationReducer";
import {deleteAccountR} from "../../reducers/deleteUserReducer";
import "./Account.css";

const Account = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      dispatch(showNotificationR("error", "Passwords do not match", 5));
    } else {
      const userData = {username, name, newPassword};
      dispatch(updatePasswordR(userData));
    }
  };

  const handleDeleteAcc = () => {
    dispatch(deleteAccountR(loggedInUser));
  };

  return (
    <div className="account_container">
      <div className="account_inner-container">
        <form className="account_form" onSubmit={handleUpdate}>
          <div className="account-title">
            <h1>Welcome, {loggedInUser.username}</h1>
            <p>
              Manage your info, privacy and security to make SpaceX work better
              for you
            </p>
          </div>

          <div className="account_input-container">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">
              <span className="account_name">Username</span>
            </label>
          </div>
          <div className="account_input-container">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name">
              <span className="account_name">Name</span>
            </label>
          </div>

          <div className="account_input-container">
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label htmlFor="newPassword">
              <span className="account_name">New Password</span>
            </label>
          </div>

          <div className="account_input-container">
            <input
              id="newPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="newPassword">
              <span className="account_name">Repeat Password</span>
            </label>
          </div>
          <div>
            <button className="account-btn">Update My Password</button>
          </div>
        </form>
        <button onClick={handleDeleteAcc} className="delete-account-btn">
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default Account;
