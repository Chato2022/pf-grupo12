import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/actions';
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../FormPerfil/FormPerfil.module.css';
import * as Yup from "yup";
import Swal from 'sweetalert2'
import profilePicGuess from '../../../assets/guessProfilePic.webp';

const FormMyPerfil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const oldUser = useSelector(state => state.userProfile)
  const [previewImage, setPreviewImage] = useState(oldUser.image || profilePicGuess); 

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test("no-empty-spaces", "Name cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),
    lastname: Yup.string()
      .test("no-empty-spaces", "Lastname cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),
    country: Yup.string()
      .test("no-empty-spaces", "Country cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),
    phonenumber: Yup.string()
      .test("no-empty-spaces", "Phonenumber cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),
    language: Yup.string()
      .test("no-empty-spaces", "Language cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),
    description: Yup.string()
      .test("no-empty-spaces", "Description cannot contain only spaces", (value) => {
        return !/^\s*$/.test(value);
      }),
  });

  const initialValues = {
    name: oldUser.name || '',
    lastname: oldUser.lastname || '',
    country: oldUser.country || '',
    phonenumber: oldUser.phonenumber || '',
    language: oldUser.language || '',
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
      setPreviewImage(oldUser.image || profilePicGuess); // Usamos la imagen inicial o la imagen por defecto si no hay imagen seleccionada
    }

    setFieldValue('image', selectedImage);
  };

  const id = localStorage.getItem("loggedIn");
  const handleSubmit = async (values) => {
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

      dispatch(updateUser(id, { ...values, image: imageUrl }));

      Swal.fire({
        title: `Profile updated successfully`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Go to Profile',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/user/${id}`)
        }
      });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card className={styles.mainCard}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue }) => (
            <Form className={styles.propertyForm}>
              <div className={styles.containerPrinc}>

                <div className={`form-group ${styles.formGroupImg}`}>

                  <div className={styles.imageContainer}>
                    {previewImage && (

                      <img
                        src={previewImage}
                        alt="Preview"
                        className={styles.imagePreview}
                      />

                    )}
                  </div>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                  />
                </div>



                <div className={styles.inputs}>

                  <div className={styles.names}>
                    < div className={styles.field}>
                      <label htmlFor="name">Name</label>
                      <Field type="text" name="name" className={styles.input}/>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="lastname">Lastname</label>
                      <Field type="text" name="lastname"  className={styles.input}/>
                      <ErrorMessage
                        name="lastname"
                        component="div"
                        className="text-danger"
                        value={initialValues.lastname}
                      />
                    </div>



                  </div>

                  <div className={styles.field}>
                    <label htmlFor="country">Country</label>
                    <Field type="text" name="country" className={styles.inputCountry}/>
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className={styles.phoneLan}>

                    <div className={styles.field}>
                      <label htmlFor="phonenumber">Phonenumber</label>
                      <Field type="tel" name="phonenumber" className={styles.input} />
                      <ErrorMessage
                        name="phonenumber"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="language">Language</label>
                      <Field type="text" name="language" className={styles.input}/>
                      <ErrorMessage
                        name="language"
                        component="div"
                        className="text-danger"
                      />
                    </div>


                  </div>

                  <Button type="submit" variant="primary" className={styles.button}>Update user</Button>
                </div>

              </div>

            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default FormMyPerfil;
