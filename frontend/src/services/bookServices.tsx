import axios from "axios";

interface FormData {
  title: string;
  author: string;
  genre: string;
  description: string;
  img: File | null;
}

export const getBooks = async (url: string): Promise<any> => {
  const response = await axios.get(url);
  return response.data;
};
