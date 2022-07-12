import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const baseUrl = `${serverUrl}/api/login`;

const login = async (loginData) => {
  const response = await axios.post(baseUrl, loginData);
  return response.data;
};

const loginServices = {login};
export default loginServices;
