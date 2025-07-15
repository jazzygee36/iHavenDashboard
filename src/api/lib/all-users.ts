import axios from 'axios';
// import { getCookie } from 'cookies-next';

export const getAllUsers = async () => {
  // const token = getCookie("token"); 

  // if (!token) {
  //   throw new Error("No token found in cookies.");
  // }

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/all-users`,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

  return res.data;
};
