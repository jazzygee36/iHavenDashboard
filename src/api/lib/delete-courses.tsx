import axios from "axios";
import { getCookie } from "cookies-next";

export const deleteCourse = async (id: string) => {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${id}`);
  return res.data;
};
