import axios from "axios";

const baseUrl = "/api/users";

const createUser = async (registerData) => {
  const response = await axios.post(baseUrl, registerData);
  return response.data;
};

const registerServices = {createUser};
export default registerServices;
