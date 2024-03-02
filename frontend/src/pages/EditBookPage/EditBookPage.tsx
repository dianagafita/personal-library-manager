// import { Box, Input, InputLabel, TextField } from "@mui/material";
// import { useFormik } from "formik";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useNavigate, useParams } from "react-router-dom";
// import * as Yup from "yup";
// import { useState, useEffect } from "react";
// import BookButton from "../../components/NavigationBar/BookButton";
// import useSWR from "swr";
// import { allBooks, bookById } from "../../services/bookServices";

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
//     `http://localhost:5001/books/${id}`,
//     allBooks
//   );
//   console.log(book);

//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const navigate = useNavigate();
//   const [imagePreview, setImagePreview] = useState(book ? book.img : null);

//   const initialValues = {
//     title: book.title,
//     author: book.author,
//     genre: book.genre,
//     description: book.description,
//     img: book.img,
//   };

//   const formik = useFormik({
//     initialValues,
//     onSubmit: async (values: FormValues) => {
//       navigate("/allBooks");
//       console.log(values);
//     },
//     validationSchema: validationSchema,
//   });

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       formik.setFieldValue("img", file);

//       const reader = new FileReader();
//       reader.onload = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDelete = () => {};

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
//               name="img"
//               disableUnderline
//               type="file"
//               inputProps={{ accept: "image/*" }}
//               onChange={handleImageChange}
//               error={formik.touched.img && !!formik.errors.img}
//             />

//             <img src={`data:image/jpeg;base64, ${book.img}`} alt="" />
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
import { useState, useEffect } from "react";
import BookButton from "../../components/NavigationBar/BookButton";
import useSWR from "swr";
import { allBooks, bookById } from "../../services/bookServices";

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

  const { data: book, error } = useSWR(
    id ? `http://localhost:5001/books/${id}` : null,
    allBooks
  );

  console.log(book);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // const [initialValues, setInitialValues] = useState<FormValues>({
  //   title: "",
  //   author: "",
  //   genre: "",
  //   description: "",
  //   img: null,
  // });

  const initialValues: FormValues = {
    title: "",
    author: "",
    genre: "",
    description: "",
    img: null,
  };
  // useEffect(() => {
  //   if (book) {
  //     setInitialValues({
  //       title: book.title,
  //       author: book.author,
  //       genre: book.genre,
  //       description: book.description,
  //       img: book.img,
  //     });
  //   }
  // }, [book]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // Allow the form to reinitialize when initial values change

    onSubmit: async (values: FormValues) => {
      navigate("/allBooks");
      console.log(values);
    },
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
  useEffect(() => {
    if (book) {
      formik.setValues({
        title: book.title,
        author: book.author,
        genre: book.genre,
        description: book.description,
        img: book.img,
      });
    }
  }, [book, formik]);

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
            {...formik.getFieldProps("title")}
            error={formik.touched.title && !!formik.errors.title}
            helperText={formik.touched.title && formik.errors.title}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Author"
            {...formik.getFieldProps("author")}
            error={formik.touched.author && !!formik.errors.author}
            helperText={formik.touched.author && formik.errors.author}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Genre"
            {...formik.getFieldProps("genre")}
            error={formik.touched.genre && !!formik.errors.genre}
            helperText={formik.touched.genre && formik.errors.genre}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Description"
            {...formik.getFieldProps("description")}
            error={formik.touched.description && !!formik.errors.description}
            helperText={formik.touched.description && formik.errors.description}
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
              name="img"
              disableUnderline
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleImageChange}
              error={formik.touched.img && !!formik.errors.img}
            />
            <img
              src={`data:image/jpeg;base64, ${book.img}`}
              alt=""
              className="preview-images"
            />
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
