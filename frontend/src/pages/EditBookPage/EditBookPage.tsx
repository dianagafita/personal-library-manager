// import { Box, Input, InputLabel, TextField } from "@mui/material";
// import { useFormik } from "formik";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useNavigate, useParams } from "react-router-dom";
// import * as Yup from "yup";
// import BookButton from "../../components/BookButton";
// import useSWR from "swr";
// import { allBooks } from "../../services/bookServices";
// import axios from "axios";

// interface FormValues {
//   title: string;
//   author: string;
//   genre: string;
//   description: string;
//   img: File | null;
// }

// const validationSchema = Yup.object().shape({
//   title: Yup.string().required("Title is required"),
//   author: Yup.string().required("Author is required"),
//   genre: Yup.string().required("Genre is required"),
//   description: Yup.string().required("Description is required"),
//   img: Yup.mixed().required("Image is required"),
// });

// export default function EditBookPage() {
//   const { id } = useParams<{ id: string }>();

//   const { data: book } = useSWR(
//     id ? `http://localhost:5001/books/${id}` : null,
//     allBooks
//   );

//   console.log(book);
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const navigate = useNavigate();

//   const initialValues: FormValues = {
//     title: book?.title || "",
//     author: book?.author || "",
//     genre: book?.genre || "",
//     description: book?.description || "",
//     img: book?.img || null,
//   };

//   const formik = useFormik({
//     initialValues,
//     enableReinitialize: true,
//     onSubmit: async (values: FormValues) => {
//       try {
//         const formData = new FormData();
//         formData.append("title", values.title);
//         formData.append("author", values.author);
//         formData.append("genre", values.genre);
//         formData.append("description", values.description);
//         if (values.img instanceof File) {
//           formData.append("img", values.img);
//           console.log("f", formData);
//         }

//         await axios.put(`http://localhost:5001/books/${id}`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         console.log(formData);
//         navigate("/allBooks");
//       } catch (error) {
//         console.error("Error updating book:", error);
//       }
//     },
//     validationSchema: validationSchema,
//   });

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       formik.setFieldValue("img", file);
//       const reader = new FileReader();
//       reader.onload = () => {};
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDelete = () => {};

//   if (!book) return <div>Loading...</div>;

//   return (
//     <Box m="100px">
//       <h1>{book.title}</h1>
//       <form onSubmit={formik.handleSubmit}>
//         <Box
//           display="grid"
//           gap="30px"
//           gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//           sx={{
//             "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//           }}
//         >
//           <TextField
//             fullWidth
//             variant="filled"
//             type="text"
//             label="Title"
//             {...formik.getFieldProps("title")}
//             error={formik.touched.title && !!formik.errors.title}
//             helperText={formik.touched.title && formik.errors.title}
//             onChange={formik.handleChange}
//             sx={{ gridColumn: "span 4" }}
//           />
//           <TextField
//             fullWidth
//             variant="filled"
//             type="text"
//             label="Author"
//             {...formik.getFieldProps("author")}
//             error={formik.touched.author && !!formik.errors.author}
//             helperText={formik.touched.author && formik.errors.author}
//             sx={{ gridColumn: "span 2" }}
//             onChange={formik.handleChange}
//           />
//           <TextField
//             fullWidth
//             variant="filled"
//             type="text"
//             label="Genre"
//             {...formik.getFieldProps("genre")}
//             error={formik.touched.genre && !!formik.errors.genre}
//             helperText={formik.touched.genre && formik.errors.genre}
//             sx={{ gridColumn: "span 2" }}
//             onChange={formik.handleChange}
//           />

//           <TextField
//             fullWidth
//             variant="filled"
//             type="text"
//             label="Description"
//             {...formik.getFieldProps("description")}
//             error={formik.touched.description && !!formik.errors.description}
//             helperText={formik.touched.description && formik.errors.description}
//             sx={{ gridColumn: "span 4", gridRow: "span 4" }}
//             onChange={formik.handleChange}
//           />
//           <Box
//             sx={{
//               gridColumn: "span 4",
//               margin: "auto",
//               textAlign: "center",
//             }}
//           >
//             <InputLabel htmlFor="img-input" sx={{ textAlign: "center" }}>
//               Choose Image
//             </InputLabel>

//             <Input
//               fullWidth
//               id="img-input"
//               title="img"
//               disableUnderline
//               type="file"
//               inputProps={{ accept: "image/*" }}
//               onChange={handleImageChange}
//             />
//             <img
//               src={`data:image/jpeg;base64, ${book.img}`}
//               alt=""
//               classtitle="preview-images"
//             />
//           </Box>
//         </Box>
//         <Box display="flex" justifyContent="center" mt="20px">
//           <BookButton type="submit">Save Changes</BookButton>
//           <BookButton type="button" onClick={handleDelete}>
//             Delete book
//           </BookButton>
//         </Box>
//       </form>
//     </Box>
//   );
// }

import { Box, Input, InputLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import BookButton from "../../components/BookButton";
import useSWR from "swr";
import axios from "axios";
import { allBooks } from "../../services/bookServices";
import { useEffect, useState } from "react";

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
  const { id } = useParams<{ id: string }>();

  const { data: book } = useSWR(`http://localhost:5001/books/${id}`, allBooks);
  const [imagePreview, setImagePreview] = useState<string>();

  const isNonMobile = useMediaQuery("(min-width:600px)");
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
    console.log(values);

    await axios.put(`http://localhost:5001/books/${id}`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    navigate("/allBooks");
    console.log(values);
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

  const handleDelete = () => {};

  if (!book) return <div>Loading...</div>;

  return (
    <Box m="100px">
      <h1>{book.title}</h1>
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
            fullWidth
            variant="filled"
            type="text"
            label="Title"
            onChange={formik.handleChange}
            name="title"
            value={formik.values.title}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Author"
            onChange={formik.handleChange}
            name="author"
            value={formik.values.author}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Genre"
            onChange={formik.handleChange}
            name="genre"
            value={formik.values.genre}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Description"
            onChange={formik.handleChange}
            name="description"
            value={formik.values.description}
            sx={{ gridColumn: "span 4", gridRow: "span 4" }}
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
              id="img-input"
              title="img"
              disableUnderline
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleImageChange}
            />
            {/* <img
              src={`data:image/jpeg;base64, ${book.img}`}
              alt=""
              className="preview-images"
            /> */}
            <img src={imagePreview} alt="Preview" className="preview-images" />
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
          <BookButton type="submit">Save Changes</BookButton>
          <BookButton type="button" onClick={handleDelete}>
            Delete book
          </BookButton>
        </Box>
      </form>
    </Box>
  );
}
