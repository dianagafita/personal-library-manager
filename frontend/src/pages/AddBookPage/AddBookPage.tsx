import React, { useState } from "react";
import { TextField, Grid, InputLabel, Input } from "@mui/material";
import { useFormik } from "formik";
import BookButton from "../../components/BookButton";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import PhotoButton from "../../components/PhotoButton";
import Title from "../../components/Title";
import { addBook } from "../../services/bookServices";

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

export default function AddBookPage() {
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

      addBook(values);
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
    <>
      <Title title="Add Book " />
      <Grid container justifyContent="center">
        <Grid item xs={10} md={10}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="title"
                  name="title"
                  label="Title"
                  variant="filled"
                  fullWidth
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="author"
                  name="author"
                  label="Author"
                  variant="filled"
                  fullWidth
                  value={formik.values.author}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.author && Boolean(formik.errors.author)}
                  helperText={formik.touched.author && formik.errors.author}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="genre"
                  name="genre"
                  label="Genre"
                  variant="filled"
                  fullWidth
                  value={formik.values.genre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.genre && Boolean(formik.errors.genre)}
                  helperText={formik.touched.genre && formik.errors.genre}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  variant="filled"
                  fullWidth
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <InputLabel htmlFor="img-input">
                  Choose Image
                  <Input
                    id="img-input"
                    name="img"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    error={formik.touched.img && !!formik.errors.img}
                  />
                  <PhotoButton />
                </InputLabel>
                {!imagePreview && <span>No file chosen</span>}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      marginTop: "10px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} textAlign="center">
                <BookButton type="submit" disabled={formik.isSubmitting}>
                  Add Book
                </BookButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
