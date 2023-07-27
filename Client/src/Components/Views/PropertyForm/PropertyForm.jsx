import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import { countries } from "../../../utils/countries";
import styles from "./PropertyForm.module.css";
import { newPostProperty } from "../../../redux/actions";
import { Link, useParams, useNavigate} from "react-router-dom";
import Swal from 'sweetalert2'


import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  title: Yup.string()
  .required("Title is required")
  .test("is-not-only-spaces", "Title cannot contain only spaces", (value) => {
    return value && value.trim().length > 0;
  }),
  type: Yup.string().required("Type is required"),
  address: Yup.string()
  .required("Address is required")
  .test("is-not-only-spaces", "Address cannot contain only spaces", (value) => {
    return value && value.trim().length > 0;
  }),
  country: Yup.string().required("Country is required"),
  guests: Yup.number().required("Guests is required"),
  price: Yup.number().required("Price is required"),
  description: Yup.string()
    .required("Description is required")
    .test("is-not-only-spaces", "Description cannot contain only spaces", (value) => {
      return value && value.trim().length > 0;
    }),
  startDate: Yup.date()
    .required("Start Date is required")
    .min(new Date(), "Start Date must be in the future")
    .max(Yup.ref("endDate"), "Start Date must be before End Date"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date must be after Start Date"),
});

const PropertyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = localStorage.getItem("loggedIn");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "aloharsur88");
      formData.append("cloud_name", "dgsnukgdu");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgsnukgdu/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;
      values.image = imageUrl;

      dispatch(newPostProperty(id, values));
      
      localStorage.setItem("Form", "{}");
      resetForm();

      Swal.fire({
        title: `Property posted successfully`,
        text: "Go home?",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Go home',
        cancelButtonText:`Keep posting`
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/home")
        }
      })


      
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setPreviewImage(null);
    }
  };

  const handleChange = (event) => {
    const values = event.currentTarget.elements;
    localStorage.setItem(
      "Form",
      JSON.stringify({
        address: values.address.value,
        title: values.title.value,
        type: values.type.value,
        country: values.country.value,
        guests: parseInt(values.guests.value),
        price: parseInt(values.price.value),
        description: values.description.value,
        startDate: values.startDate.value,
        endDate: values.endDate.value,
      })
    );
  };

  const submitImage = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "aloharsur88");
    formData.append("cloud_name", "dgsnukgdu");

    axios
      .post("https://api.cloudinary.com/v1_1/dgsnukgdu/image/upload", formData)
      .then((response) => {
        const imageUrl = response.data.secure_url;
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div className={styles.containerUltraPrincipal}>
      <Formik
      initialValues={
        JSON.parse(localStorage.getItem("Form")) || {
          title: "",
          type: "",
          address: "",
          country: "",
          guests: 0,
          price: 0,
          description: "",
          startDate: "",
          endDate: "",
        }
      }
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      >
      {({ isSubmitting }) => (
        <div className={styles.containerPrincipal}>
          <Form className={styles.form} onChange={handleChange}>
            <h2>New Property</h2>
            <div className={styles.container}>
              <div className={styles.container1}>
                <div className={`form-group ${styles.formGroup}`}>
                  <label htmlFor="title">Title</label>
                  <Field
                    type="text"
                    name="title"
                    className={`form-control ${styles.formControl}`}
                    required
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className={`error-message ${styles.error}`}
                  />
                </div>

                <div className={styles.selects}>
                  {/* TIPOS DE PROPIEDADES */}

                  <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="type">Type</label>
                    <Field
                      as="select"
                      name="type"
                      className={`form-control ${styles.formControl}`}
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Hotel">Hotel</option>
                      <option value="House">House</option>
                      <option value="Cabin">Cabin</option>
                    </Field>
                    <ErrorMessage
                      name="type"
                      component="div"
                      className={`error-message ${styles.error}`}
                    />
                  </div>

                  {/* COUNTRIES */}

                  <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="country">Country</label>
                    <Field
                      as="select"
                      name="country"
                      className={`form-control ${styles.formControl}`}
                      required
                    >
                      <option value="">Países</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="country"
                      component="div"
                      className={`error-message ${styles.error}`}
                    />
                  </div>
                </div>

                <div className={`form-group ${styles.formGroup}`}>
                  <label htmlFor="address">Address</label>
                  <Field
                    type="text"
                    name="address"
                    className={`form-control ${styles.formControl}`}
                    required
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className={`error-message ${styles.error}`}
                  />
                </div>

                {/* GUESTS AND PRICE */}

                <div className={styles.selects}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="startDate">Start Date</label>
                    <Field
                      type="date"
                      name="startDate"
                      className={`form-control ${styles.formControl}`}
                      required
                    />
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className={`error-message ${styles.error}`}
                    />
                  </div>

                  <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="price">Price</label>
                    <Field
                      type="number"
                      name="price"
                      className={`form-control ${styles.formControl}`}
                      required
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className={`error-message ${styles.error}`}
                    />
                  </div>
                </div>

                {/* START DATE AND END DATE */}

                <div className={styles.selects}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="endDate">End Date</label>
                    <Field
                      type="date"
                      name="endDate"
                      className={`form-control ${styles.formControl}`}
                      required
                    />
                    <ErrorMessage
                      name="endDate"
                      component="div"
                      className={`error-message ${styles.error}`}
                    />
                  </div>

                  <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="guests">Guests</label>
                    <Field
                      type="number"
                      name="guests"
                      className={`form-control ${styles.formControl}`}
                      required
                    />
                    <ErrorMessage
                      name="guests"
                      component="div"
                      className={`error-message ${styles.error}`}
                    />
                  </div>
                </div>
              </div>

              {/* DESCRIPTION AND IMAGE */}

              <div className={styles.container2}>
                <div className={`form-group ${styles.formGroup}`}>
                  <label htmlFor="description">Description</label>
                  <Field
                    as="textarea"
                    rows={3}
                    name="description"
                    className={`form-control ${styles.formControl}`}
                    required
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className={`error-message ${styles.error}`}
                  />
                </div>

                <div className={`form-group ${styles.formGroupImg}`}>
                  {/* <label htmlFor="image">Image</label> */}
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    required
                  />
                  {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className={styles.imagePreview}
                      />
                  )}

                  <ErrorMessage
                    name="image"
                    component="div"
                    className={`error-message invalid-feedback ${styles.error}`}
                  />
                </div>
                {/* <Button className={styles["btn-green"]} onClick={submitImage}>
            Cargar imagen
          </Button> */}
              </div>
            </div>

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className={styles.submit}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>

          </Form>
        </div>
      )}
      </Formik>
    </div>
  );
};

export default PropertyForm;
