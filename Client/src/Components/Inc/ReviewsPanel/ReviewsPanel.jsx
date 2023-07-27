import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StarRatings from 'react-star-ratings';
import Form from 'react-bootstrap/Form';
import { getAuth } from "firebase/auth";
import { postReviewsProperty } from "../../../redux/actions";
import style from "./ReviewsPanel.module.css"

function ReviewsPanel({idCasa}) {
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);
  const [formData, setFormData] = useState({
    review: '',
  });

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleScoreChange = (newScore) => {
    setScore(newScore);

  };

  

  const handleSubmit = (event) => {
    event.preventDefault();

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const uid = currentUser.uid;

    // Agregar el rating al objeto formData antes de enviarlo
    const dataToSend = {
      ...formData,
      score: score,
      user: uid,
    };

    // Llamar a la acción para enviar la reseña al backend
    dispatch(postReviewsProperty(idCasa, dataToSend));

    // Cerrar el modal después de enviar la reseña
    handleClose();

    window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className='d-flex ms-2 mt-5'>
        <Button variant="danger" onClick={handleShow}>
            Qualify
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          {/* <Modal.Title className={style.title}>Review</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className={style.modal}>
          <StarRatings
            rating={score}
            starRatedColor="#FFC107"
            starHoverColor="#FFC107"
            changeRating={handleScoreChange}
            numberOfStars={5}
            starDimension="40px"
            starSpacing="6px"
            className={style.rating}
          
          />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="reviewForm">
              <div className={style.comentario}>
              <Form.Label>Please leave your opinion about this property</Form.Label>
              <Form.Control
                as="textarea"
                name="review"
                rows={3}
                value={formData.review}
                onChange={handleChange}
                // className={style.comentario}
              />

              </div>
              
              <div className='mt-2 d-flex justify-content-center'>
                <Button type="submit" variant='danger'>Submit</Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReviewsPanel;
