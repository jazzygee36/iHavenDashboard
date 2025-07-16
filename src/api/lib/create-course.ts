
import axios from "axios";


export const createCourse = async (data: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/create-course`,
    data
  );

  return res.data;
};
