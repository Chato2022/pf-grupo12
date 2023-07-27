import { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getUser, getUserFavorites } from '../../../redux/actions';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FavoritesItem from '../../Inc/FavoritesItem/FavoritesItem';
import style from './favorites.module.css';

function Favorites(){
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const userFavorites = useSelector(state => state.userFavorites);

    useEffect(() => {

        async function userFavorites(id) {
            try {
              const data = getUserFavorites(id);
              dispatch(data);
            } catch (error) {
              console.log(error);
            }
        }
        userFavorites(id)
    }, [])



    return(
        <>
        { userFavorites.length > 0
            ?  <Container fluid className={`${style.favoriteContainer} py-5 mt-1`}>
                <Row className='mx-auto'>
                    <Col className='col-12 text-lg-start text-md-start text-center' >
                        <h1 className='fw-bolder'>
                            Favorites
                        </h1>
                    </Col>
                    <FavoritesItem favorites={userFavorites}/>
                </Row>
                </Container>
          : <Container fluid style={{ height: '100vh'}} className='py-5 mt-5'>
                <Row className='d-flex justify-content-center align-items-center py-5 mt-5'>
                    <Col className='col-12'>
                        <h6 className='d-block mx-auto fw-bolder text-center py-5 mt-5 text-uppercase'>You don't have any favorites yet. Feel free to explore and choose your favorite properties!</h6>
                        <Button variant='danger' onClick={ () => navigate('/home')}>Start exploring</Button>
                    </Col>
                </Row>
            </Container>
         }
         </>
    )
}


export default Favorites;
