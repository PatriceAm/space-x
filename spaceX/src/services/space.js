import axios from "axios";

export const getInitialData = async () => {
  const initialData = await axios.get("https://api.spacexdata.com/v3/launches");
  return initialData.data;
};
