import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { updateProperty } from '../../../redux/actions';
import styles from "../FormProperty/FormProperty.module.css";
import { countries } from "../../../utils/countries";
import Swal from 'sweetalert2'
import {useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const FormMyProperty = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .test("no-empty-spaces", "Title cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),
    address: Yup.string()
      .test("no-empty-spaces", "Address cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),

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

      dispatch(updateProperty(id, values));
      
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

  return (
    <div className="d-flex p-0 justify-content-center align-items-center">
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



              <div className={styles.field}>
                <label htmlFor="">Title</label>
                <Field type="text" name="title" className="rounded" />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className={styles.TypCount}>

                <div className={styles.fieldPar}>
                  <label htmlFor="">Type</label>
                  <Field as="select" name="type" className="rounded ">
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

                <div className={styles.fieldPar}>
                  <label htmlFor="">Country</label>
                  <Field
                    as="select"
                    name="country"
                    className="rounded"

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

              </div>


              <div className={styles.field}>
                <label htmlFor="">Address</label>
                <Field type="tel" name="address" className="rounded" />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-danger"
                />
              </div>



              <div className={styles.guestPrice}>
                <div className={styles.fieldPar}>
                  <label htmlFor="">Guests</label>
                  <Field type="number" name="guests" placeholder="Max guests" min="1" className="rounded" />
                  <ErrorMessage
                    name="guests"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className={styles.fieldPar}>
                  <label htmlFor="">Price</label>
                  <Field
                    type="number"
                    name="price"
                    placeholder="Price per night"
                    min="0"
                    className="rounded"

                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-danger"
                  />
                </div>

              </div>




              <div className={styles.field}>
                <label htmlFor="">Description</label>
                <Field as="textarea" name="description" className="rounded" />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger "

                />
              </div>


              <div className={`form-group ${styles.formGroupImg}`}>
                <input
                  key="imageInput"
                  type="file"
                  name="image"
                  onChange={(e) => {
                    handleImageChange(e);
                    setFieldValue('image', ''); // Limpia el valor del input para permitir cargar la misma imagen en actualizaciones posteriores
                  }}

                />
                <div className={styles.imageContainer}>
                  {previewImage && (

                    <img
                      src={previewImage}
                      alt="Preview"
                      className={styles.imagePreview}
                    />

                  )}
                </div>
              </div>

              <Button variant="primary" type="submit" disabled={isSubmitting} className={styles.button}>
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