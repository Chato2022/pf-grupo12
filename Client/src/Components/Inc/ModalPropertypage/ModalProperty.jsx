import { useEffect, useState } from "react";
import { Button, Modal, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUserFavorites, deleteUserFavorites } from "../../../redux/actions";

function FavoritesAddNotification({ title, houseId }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const userId = useSelector((state) => state.id);
  const currentUserFavorites = useSelector((state) => state.userFavorites);
  const [isFavorite, setIsFavorite] = useState(false);

  // Función para verificar si la propiedad está en favoritos
  const checkIsFavorite = () => {
    return currentUserFavorites.some((prop) => prop.id === houseId);
  };

  useEffect(() => {
    setIsFavorite(checkIsFavorite());
  }, [houseId, currentUserFavorites]);

  const handleClose = () => {
    setShow(false);
  };

  const handleDeleteFav = () => {
    dispatch(deleteUserFavorites(userId, houseId));
    setIsFavorite(false);
  };

  const handleAddFav = () => {
    setShow(true);
    setIsFavorite(true);
    dispatch(addUserFavorites(userId, houseId.toString()));
  };

  return (
    <div>
      { isFavorite ? (
        <Button
          className="rounded-circle ms-4"
          variant="dark"
          onClick={handleDeleteFav}
        >
          <i className="bi bi-heart-fill" style={{ color: "red"}}></i>
        </Button>
      ) : (
        <Button
          variant="dark"
          className="rounded-circle ms-4"
          onClick={handleAddFav}
        >
          <i className="bi bi-heart"></i>
        </Button>
      )}
            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
         <Col className="d-flex justify-content-between">
            <small className="fw-semibold">{`${title} added to favorites`}</small>
            <i class="bi bi-x-circle" style={{ cursor: 'pointer'}} onClick={handleClose}></i>
        </Col>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FavoritesAddNotification;