import { Box, Input, InputLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";

interface FormValues {
  title: string;
  author: string;
  description: string;
  genre: string;
  img: File | null;
}

interface BookFormProps {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  genre: Yup.string().required("Genre is required"),
  description: Yup.string().required("Description is required"),
  img: Yup.mixed().required("Image is required"),
});

export default function BookForm({ initialValues, onSubmit }: BookFormProps) {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values: FormValues) => {
      onSubmit(values);
      navigate("/allBooks");
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
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt="20px"></Box>
      </form>
    </Box>
  );
}
