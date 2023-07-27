import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/actions';
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../FormPerfil/FormPerfil.module.css';
import * as Yup from "yup";
import Swal from 'sweetalert2'

const FormMyPerfil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const oldUser = useSelector(state=> state.userProfile)

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test("no-empty-spaces", "name cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),

    lastname: Yup.string()
      .test("no-empty-spaces", "lastname cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),

    country: Yup.string()
    .test("no-empty-spaces", "Guests cannot contain only spaces", (value) => {
      return !/^\s*$/.test(value);
    }),

    phonenumber: Yup.string()
      .test("no-empty-spaces", "phonenumber cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),

      language: Yup.string()
      .test("no-empty-spaces", "language cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),

    description: Yup.string()
      .test("no-empty-spaces", "Description cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),
  });

  const initialValues = {
    name: '',
    lastname: '',
    country: '',
    phonenumber: '',
    language: '',
    image: '',
  };

  const handleImageChange = (e, setFieldValue) => {
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

    setFieldValue('image', selectedImage);
  };

  const id = localStorage.getItem("loggedIn");
  const handleSubmit = async (values) => {
    // Se sube la imagen a Cloudinary y obtenemos la URL
  
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "aloharsur88");
      formData.append("cloud_name", "dgsnukgdu");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dgsnukgdu/image/upload",
          formData
        );
        const imageUrl = response.data.secure_url;

        // Realizar la actualización del usuario en la base de datos con la URL de la imagen
        dispatch(updateUser(id, { ...values, image: imageUrl }));
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
        ;
      }
      // Si no hay imagen seleccionada solo se actualiza el resto de los datos
      dispatch(updateUser(id, values));

    Swal.fire({
      title: `Profile updated successfully`,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Go to Profile',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/user/${id}`)
      }
    })
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
              <Card.Title as="h5" style={{ fontSize: '30px' }}>Update your Profile</Card.Title>

              {/* Texto */}
              <Card.Text style={{ fontSize: '30px' }}>
                Here you can update your profile
              </Card.Text>

              {/* Fecha */}
              <Card.Text style={{ fontSize: '20px' }}>
                <small>Guests will see this information</small>
              </Card.Text>
            </div>
          </div>
        </Card>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue }) => (
            <Form className={styles.propertyForm}>
              <div className={styles.field}>
                <label htmlFor="">name</label>
                <Field type="text" name="name" placeholder={oldUser.name} />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="">lastname</label>
                <Field type="text" name="lastname" placeholder={oldUser.lastname} />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="">country</label>
                <Field type="text" name="country" placeholder={oldUser.country} />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="">phonenumber</label>
                <Field type="tel" name="phonenumber" placeholder={oldUser.phonenumber} />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="">language</label>
                <Field type="text" name="language" placeholder={oldUser.language} />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />
              </div>
              

              <div className={`form-group ${styles.formGroupImg}`}>
                {/* <label htmlFor="image">Image</label> */}
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
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

              <Button type="submit" variant="primary">Update user</Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>



    
  );
};

export default FormMyPerfil;