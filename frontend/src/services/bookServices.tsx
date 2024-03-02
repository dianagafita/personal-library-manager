import axios from "axios";

interface FormData {
  title: string;
  author: string;
  genre: string;
  description: string;
  img: File | null;
}

export const allBooks = async (url: string): Promise<any> => {
  const response = await axios.get(url);
  return response.data;
};

export const bookById = async (url: string): Promise<any> => {
  const response = await axios.get(url);
  return response.data;
};

export const addBook = async (values: FormData) => {
  await axios.post("http://localhost:5001/books", values);
};

export const editBook = async (values: FormData, id: string | undefined) => {
  await axios.put(`http://localhost:5001/books/${id}`, values);
};
