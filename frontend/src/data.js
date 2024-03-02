import { useFormik } from "formik";
import React from "react";
import "./product-form.css";

export default function ProductForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      image: "",
    },
    validate: (values) => {
      let errors = {};

      if (values.name.length === 0) {
        errors.name = "This field is required";
      }

      if (values.price.length === 0) {
        errors.price = "This field is required";
      }

      if (values.image.length === 0) {
        errors.image = "This is required.";
      } else {
        let type = values.image.type.split("/")[0];

        if (type !== "image") {
          errors.image = "The Uploaded file must be a Image.";
        }
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log(`values`, values);
    },
  });

  return (
    <div className="container">
      <div className="center">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>Product Name</label>
            <div>
              <input
                type="text"
                onChange={formik.handleChange}
                name="name"
                value={formik.values.name}
              />
              {formik.errors.name ? <div>{formik.errors.name}</div> : null}
            </div>
          </div>

          <div>
            <label>Product Price</label>
            <div>
              <input
                onChange={formik.handleChange}
                name="price"
                value={formik.values.price}
                type="number"
                step="any"
              />
              {formik.errors.price ? <div>{formik.errors.price}</div> : null}
            </div>
          </div>

          <div>
            <label>Product Image</label>
            <div>
              <input
                type="file"
                onChange={(e) =>
                  formik.setFieldValue("image", e.target.files[0])
                }
                name="image"
              />
              {formik.errors.image ? <div>{formik.errors.image}</div> : null}
            </div>
          </div>

          <div>
            <input type="submit" className="mt-20" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
}
