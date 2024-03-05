import { Grid, Input, InputLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import BookButton from "../../components/BookButton";
import useSWR from "swr";
import { deleteBook, editBook, getBooks } from "../../services/bookServices";
import { useEffect, useState } from "react";
import Information from "../../components/Information";
import PhotoButton from "../../components/PhotoButton";
import Title from "../../components/Title";

interface FormValues {
  title: string;
  author: string;
  genre: string;
  description: string;
  img: File | null;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  genre: Yup.string().required("Genre is required"),
  description: Yup.string().required("Description is required"),
  img: Yup.mixed().required("Image is required"),
});

export default function EditBookPage() {
  const { id } = useParams<{ id?: string }>();

  const { data: book, error: fetchingBookError } = useSWR(
    `http://localhost:5001/books/${id}`,
    getBooks
  );
  const [imagePreview, setImagePreview] = useState<string>();

  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<FormValues>({
    title: "",
    author: "",
    genre: "",
    description: "",
    img: null,
  });

  useEffect(() => {
    if (book) {
      setInitialValues({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "",
        description: book.description || "",
        img: book.img || null,
      });
    }
    if (book && book.img) {
      setImagePreview(`data:image/jpeg;base64, ${book.img}`);
    }
  }, [book]);

  const handleSubmit = async (values: FormValues) => {
    if (id) {
      editBook(id, values);
      console.log(values);
    }
    navigate("/allBooks");
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
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

  const handleDelete = async () => {
    if (id) {
      deleteBook(id);
    }
    navigate("/allBooks");
  };

  if (fetchingBookError)
    return <Information text="Error fetching book data." />;
  if (!book) return <Information text="Loading..." />;

  return (
    <>
      <Title title={book.title} />
      <Grid container justifyContent="center">
        <Grid item xs={10} md={10}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Title"
                  onChange={formik.handleChange}
                  name="title"
                  value={formik.values.title}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Author"
                  onChange={formik.handleChange}
                  name="author"
                  value={formik.values.author}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Genre"
                  onChange={formik.handleChange}
                  name="genre"
                  value={formik.values.genre}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Description"
                  onChange={formik.handleChange}
                  name="description"
                  value={formik.values.description}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
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
                <BookButton type="submit">Save Changes</BookButton>
                <BookButton type="button" onClick={handleDelete}>
                  Delete book
                </BookButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
