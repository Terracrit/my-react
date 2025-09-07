import axios from "axios";

const useDel = async (id) => {
  await axios.delete(`${BASE_URL}posts/${id}`);
  setValue((prevValue) => prevValue.filter((item) => item.id !== id));
};
