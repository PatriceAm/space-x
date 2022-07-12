import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const baseUrl = `${serverUrl}/api/users`;

const createUser = async (registerData) => {
  const response = await axios.post(baseUrl, registerData);
  return response.data;
};

const registerServices = {createUser};
export default registerServices;
