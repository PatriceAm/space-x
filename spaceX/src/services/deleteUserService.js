import axios from "axios";
const baseUrl = "/api/users/";

let token;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const deleteUser = async (user) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios.delete(`${baseUrl}${user}`, config);
};

const deleteUserService = {deleteUser, setToken};
export default deleteUserService;
