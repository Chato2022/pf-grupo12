import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import style from '../../Views/userFavorites/favorites.module.css';
import FavoritesAddNotification from "../ModalPropertypage/ModalProperty";

function FavoritesItem({ favorites }) {
  const navigate = useNavigate();

  return (
    <>
      {favorites?.map(fav => (
        <Col key={fav.id} lg={4} md={4} sm={12} xs={12} className={`${style.favItem} mt-3`} style={{ cursor: 'pointer' }}>
          <div style={{ position: 'relative' }}>
            <img src={fav.image} alt="property Image" className={`${style.favImage}`} onClick={() => navigate(`/rooms/${fav.id}`)} />
            <div className={`${style.FavoritesAddNotification}`} >
              <FavoritesAddNotification houseId={fav.id} title={fav.title}/>
            </div>
            <div className="d-flex justify-content-between">
                <span className={`${style.favTitle}`} onClick={() => navigate(`/rooms/${fav.id}`)}>{fav.title.length > 26 ? fav.title.slice(0, 16).concat('...') : fav.title}</span>
                <small className={`${style.favPrice}`}>${fav.price} USD</small>
            </div>
          </div>
        </Col>
      ))}
    </>
  );
}

export default FavoritesItem;