import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyDetail, resetDetailProperty } from '../../../redux/actions';
import Carousel from '../../Inc/Carousel/CarouselPropertyPage';
import Container  from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import FavoritesAddNotification from '../../Inc/ModalPropertypage/ModalProperty';
import profilePicGuess from '../../../assets/guessProfilePic.webp';
import PanelComentarios from '../../Inc/PanelComentarios/PanelComentarios'
import style from './PropertyPage.module.css'
import { Link } from "react-router-dom";
import DropdownProperty from '../../Inc/DropDownPropertyDetail/Dropdown';
import { useNavigate } from "react-router-dom";
import ReviewsPanel from '../../Inc/ReviewsPanel/ReviewsPanel';
import SpinnerLoading from '../../Inc/SpinnerLoading/Spinner';
import ContactHostModal from '../../Inc/ContactHostModal/ContactHost';

function calcularPromedio(arr) {
  if (arr.length === 0) return 0;
  
  const suma = arr.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
  const promedio = suma / arr.length;
  return promedio;
}


function DetailPropertyPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const property = useSelector((state) => state.propertyDetail);
  const currentUserID = useSelector(state => state.id);
  const reviews = useSelector((state) => state.review);
  const arrScore= reviews.map(el=>el.score)
  const promedio= calcularPromedio(arrScore);
  const owner = property.User?.name;
  const ownerImage = property.User?.image || profilePicGuess;
  const ownerId = property.User?.id
  const ownerLanguage = property.User?.language;
  const ownerDescription = property.User?.description;
  const ownerNumber = property.User?.phonenumber;
  const ownerEmail = property.User?.email;
  const [ currentUserIsOwner, setCurrentUserIsOwner ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if(currentUserID === ownerId) {
      setCurrentUserIsOwner(true);
    }else {
      setCurrentUserIsOwner(false);
    }
  }, [currentUserID, ownerId]);


  useEffect(() => {
    async function getPropertyData(id) {
      try {
        setIsLoading(true);
        const data = getPropertyDetail(id);
        dispatch(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getPropertyData(id);

  }, [dispatch, id]);

    return (
      <Container className={`${style.container} container-fluid container pt-5`}>
        {showSpinner && (
                <Col className="d-flex justify-content-center" style={{ height: '100vh' }}>
                    <SpinnerLoading/>
                </Col>
            )}
            { !showSpinner && (
              <>
              <Row>
        <Col className='col-12 d-flex justify-content-end'> 
          {currentUserIsOwner ? <DropdownProperty id={id}/> : null }
        </Col>
        <Col className='p-3 col-12'>
          <Carousel image={property.image}/>
        </Col>
        <Col className='mx-1 text-start col-12'>
          <div className="d-flex align-items-center">
            <p><span className="mr-2 fw-bolder">${property.price} USD</span> night  │ </p>
            <p className='d-inline-flex align-items-center'>
              <small className='fw-normal'>{property.guests} guests </small>
            </p>
          </div>
        </Col>
        <Col className='d-flex align-items-center text-start col-12'>
            <h2 className='fw-bold text-uppercase mt-2'>{property.title}</h2>
            {!currentUserIsOwner ? <FavoritesAddNotification title={property.title} houseId={property.id} image={property.image} className="ms-3" /> : ""}
        </Col>
        <Col className='d-inline-flex text-start col-12 mt-3 mx-auto'>
              <h6>{property.type} hosted by <a onClick={ () => navigate(`/user/${ownerId}`)} className='link-danger link-offset-1' style={{ cursor: 'pointer'}}>{owner}</a></h6>
        </Col>
        <Col className='text-start mt-3 col-12'>
          <p className='d-inline-flex align-items-center' style={{ cursor: 'pointer'}}>
            <i class="bi bi-geo-alt-fill"/><a href="#" className='link-dark link-offset-2'>{`${property.address}, ${property.country}`}</a>
          </p>
        </Col>
        
        <Col className='p-3 mb-5 rounded' sm={12} md={12} lg={12}>
              <hr className='mb-4 border-top border-secondary' style={{ width: "100%" }} />
              <h3 className='fw-semibold mb-4'>About this space</h3>
              <p className='lh-sm mt-4 paragraph mb-4'>
                  { property.description?.length > 475 ? property.description.slice(0, 475).concat('...') : property.description }
              </p>
              { property.description?.length > 475 && <ReadMore description={property.description} /> }
          </Col>
          <Col className='p-3 rounded' sm={12} md={12} lg={12}>
            <hr className='mb-4 border-top border-secondary' style={{ width: "100%" }} />
            <PanelComentarios idCasa={id}/>
            { !currentUserIsOwner && <ReviewsPanel idCasa={id}/>}
          </Col>
          <Col className='p-3 mb-5 rounded text-start col-12'>
            <hr className='mb-4 border-top border-secondary' style={{ width: "100%" }} />
            <div className="d-flex align-items-center">
              <div className={`${style.containerImg}`}>
              <img src={ownerImage} className={` ${style.imgPerfil}`}
 alt="User picture" style={{ }} />
              </div>
              
              <div>
                <h4 className='fw-semibold my-4'>Hosted by {owner}</h4>
              </div>
            </div>
            <Col className='d-flex align-items-center text-start'>
            {ownerLanguage && <span className='ms-2'>  <i class="bi bi-globe-americas"/> Languages: {ownerLanguage} </span>}
            </Col>
              <p className='lh-sm mt-4 paragraph mb-4'>
                  { ownerDescription?.length > 475 ? ownerDescription.slice(0, 475).concat('...') : ownerDescription }
              </p>
              { ownerDescription?.length > 475 && <ReadMore description={ ownerDescription } /> } 
              { currentUserIsOwner ? <div className='d-flex justify-content-end'> <Button className='btn-dark' href='/Miperfilform'>Edit profile</Button></div> : <div className='d-flex justify-content-end'><ContactHostModal ownerNumber={ownerNumber} owner={owner} ownerEmail={ownerEmail}/></div> }
          </Col>
        <Row className={`${style.reserveSm} reserve-sm  shadow bg-body rounded mx-auto border border-white`}>
            <Col className='col-12 text-start'>
              <small>${property.price}USD night</small>
              <div className='mt-1'>
                <input type="date" className=' rounded border border-light'/>
              </div>
             <div className='d-flex justify-content-end'>
              <Button className='btn-danger btn-sm mb-2 ms-2'>Reserve</Button>
             </div>
            </Col>
        </Row>
      </Row>
      {
        !currentUserIsOwner 
        ? <>
          <Row className={`${style.owner} owner ms-2 shadow rounded pt-3`}>
            <Col className='text-center'>
            <small className="fw-bolder">${property.price} USD night</small>
            <Button className='btn-danger btn-lg my-2 mx-2' as={Link} to="/payment">Reserve</Button>
              </Col>
            </Row>
          </>
          : null
      }        
              </>
            )}
    </Container>
      );
}

export default DetailPropertyPage;
