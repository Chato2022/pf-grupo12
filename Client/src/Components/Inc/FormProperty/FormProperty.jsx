import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { updateProperty } from '../../../redux/actions';
import styles from "../FormProperty/FormProperty.module.css";
import { countries } from "../../../utils/countries";
import Swal from 'sweetalert2'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FormMyProperty = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .test("no-empty-spaces", "Title cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),
    type: Yup.string().required("Type is required"),
    address: Yup.string()
      .test("no-empty-spaces", "Address cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),
    country: Yup.string().required("Country is required"),
    guests: Yup.string()
      .test("no-empty-spaces", "Guests cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),
    price: Yup.string()
      .test("no-empty-spaces", "Price cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),
    description: Yup.string()
      .test("no-empty-spaces", "Description cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),
  });

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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "aloharsur88");
      formData.append("cloud_name", "dgsnukgdu");

      if (image) {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dgsnukgdu/image/upload",
          formData
        );
        const imageUrl = response.data.secure_url;
        values.image = imageUrl;
      }
   

      dispatch(updateProperty(id, values));

      setImage(null);
      setPreviewImage(null);
      setSubmitting(false);

      Swal.fire({
        title: `Property updated successfully`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Go to Property Detail',
      }).then((result) => {
        if (result.isConfirmed) {
          
          navigate(`/rooms/${id}`)
        }
      })
    } catch (error) {
      console.error("Error al actualizar la propiedad:", error);
      setSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card className={styles.mainCard}>
        <Card className={styles.banner}>
          {/* Imagen de la tarjeta */}
          <Card.Img
            src="https://img.freepik.com/foto-gratis/tiro-vertical-edificio-blanco-cielo-despejado_181624-4575.jpg?w=360&t=st=1690351675~exp=1690352275~hmac=f1f7ad40d64d44e7b2fed03416aebd22abefbc043046533a59aa864a7ce48f05"
            className={styles.image}
            alt="casa"
          />

          {/* Contenido superpuesto */}
          <div className={`card-img-overlay ${styles.overlay}`}>
            {/* Título */}
            <div className={styles.imageText}>
              <Card.Title as="h5" style={{ fontSize: '30px' }}>Update your Property</Card.Title>

              {/* Texto */}
              <Card.Text style={{ fontSize: '30px' }}>
                Here you can update your posted Property
              </Card.Text>

              {/* Fecha */}
              <Card.Text style={{ fontSize: '20px' }}>
                <small>Remember to fill all fields</small>
              </Card.Text>
            </div>
          </div>
        </Card>

        <Formik
          initialValues={{
            image: "",
            title: "",
            type: "",
            address: "",
            country: "",
            guests: "",
            price: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className={styles.propertyForm}>


              <div className={`form-group ${styles.formGroupImg}`}>
                {/* <label htmlFor="image">Image</label> */}
                <input
                  key="imageInput"
                  type="file"
                  name="image"
                  onChange={(e) => {
                    handleImageChange(e);
                    setFieldValue('image', ''); // Limpia el valor del input para permitir cargar la misma imagen en actualizaciones posteriores
                  }}

                />
                {previewImage && (
                  <div className={styles.imageContainer}>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className={styles.imagePreview}
                    />
                  </div>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="">title</label>
                <Field type="text" name="title" />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="">Type</label>
                <Field as="select" name="type">
                  <option value="">Select type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Hotel">Hotel</option>
                  <option value="House">House</option>
                  <option value="Cabin">Cabin</option>
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="">Address</label>
                <Field type="tel" name="address" />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="">Country</label>
                <Field
                  as="select"
                  name="country"

                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="">Guests</label>
                <Field type="number" name="guests" placeholder="Max guests" min="1" />
                <ErrorMessage
                  name="guests"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="">Price</label>
                <Field
                  type="number"
                  name="price"
                  placeholder="Price per night"
                  min="0"

                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="">Description</label>
                <Field as="textarea" name="description" />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"

                />
              </div>

              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Update Property
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default FormMyProperty;