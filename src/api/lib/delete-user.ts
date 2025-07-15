import axios from "axios";
import { getCookie } from "cookies-next";

export const deleteUser = async (id: string) => {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/delete-user/${id}`);
  return res.data;
};
