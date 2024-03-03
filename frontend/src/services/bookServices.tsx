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

export const addBook = async (values: FormData) => {
  await axios.post("http://localhost:5001/books", values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editBook = async (id: string, values: FormData) => {
  try {
    await axios.put(`http://localhost:5001/books/${id}`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};

export const deleteBook = async (id: string) => {
  await axios.delete(`http://localhost:5001/books/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
