import React, { useState } from "react";
import { TextField, Box, InputLabel, Input } from "@mui/material";
import { useFormik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import BookButton from "../../components/BookButton";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  title: string;
  author: string;
  genre: string;
  description: string;
  img: File | null;
}

const initialValues: FormData = {
  title: "",
  author: "",
  genre: "",
  description: "",
  img: null,
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  genre: Yup.string().required("Genre is required"),
  description: Yup.string().required("Description is required"),
  img: Yup.mixed().required("Image is required"),
});

const AddBookPage: React.FC = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: FormData) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("genre", values.genre);
      formData.append("description", values.description);
      formData.append("img", values.img as File);

      await axios.post("http://localhost:5001/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/allBooks");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("img", file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box m="100px">
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            id="title"
            name="title"
            label="Title"
            variant="filled"
            fullWidth
            sx={{ gridColumn: "span 4" }}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            id="author"
            name="author"
            label="Author"
            variant="filled"
            fullWidth
            sx={{ gridColumn: "span 2" }}
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            id="genre"
            name="genre"
            label="Genre"
            variant="filled"
            fullWidth
            sx={{ gridColumn: "span 2" }}
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            id="description"
            name="description"
            label="Description"
            variant="filled"
            fullWidth
            sx={{ gridColumn: "span 4", gridRow: "span 4" }}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Box
            sx={{
              gridColumn: "span 4",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <InputLabel htmlFor="img-input" sx={{ textAlign: "center" }}>
              Choose Image
            </InputLabel>

            <Input
              fullWidth
              id="img"
              name="img"
              disableUnderline
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleImageChange}
              error={formik.touched.img && !!formik.errors.img}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="preview-images"
              />
            )}
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
          <BookButton type="submit" disabled={formik.isSubmitting}>
            Add Book
          </BookButton>
        </Box>
      </form>
    </Box>
  );
};

export default AddBookPage;
