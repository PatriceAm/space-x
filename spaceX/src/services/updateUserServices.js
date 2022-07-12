import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const baseUrl = `${serverUrl}/api/users/update`;

let token;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const updateUser = async (user) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.put(`${baseUrl}/${user.username}`, user, config);
  return response.data;
};

const updateUserServices = {updateUser, setToken};
export default updateUserServices;
