import style from '../../Views/Landing/landing.module.css';
import { Container, Row, Col, Button} from 'react-bootstrap';
import LoginPanel from "../../Inc/Login/LoginPanel"
import PanelRegistrarse from "../../Inc/PanelRegistrarse/PanelRegistrarse"

function Hero () {
    return(
        <Container fluid className={`${style.containerHero}`} >
        <Row className='mt-5'>
        <Col className='col-12 d-flex text-start text-uppercase align-text-center'>
            <h1 className='fw-bolder text-light display-5 fw'>
                Welcome to <span className='fw-bolder text-danger'>Alohar</span>
            </h1>
        </Col>
        <Col className='col-12 text-start'>
              <h3 className='fw-semibold text-light'>
                Find and reserve your perfect place.
              </h3>
        </Col>
        <Col className='col-12 mt-4 d-flex justify-content-start mb-5'>
            <LoginPanel/>
        </Col>
        <Col className='col-12 d-flex justify-content-center align-items-center'>
            <small className='text-light fw-semibold mb-2 p-2' style={{ position: 'absolute', bottom: '0', backgroundColor: 'rgba(11, 12, 13, 0.4)'}}> 
                You do not have an account? <PanelRegistrarse />
            </small>
        </Col>
        </Row>
      </Container>
    )
}


export default Hero;
