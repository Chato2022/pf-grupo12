import style from '../../Views/Landing/landing.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import img from '../../../assets/AboutUsImage.webp'
import AboutUsItem from '../AboutUsItems/itemsAboutUs';
import Secure from '../../../assets/securityIcon.svg';
import Comfortable from '../../../assets/comfortableIcon.svg';
import Fast from '../../../assets/fastIcon.svg';


const AboutUs = () => {
  return (
   <Container fluid className='mb-5'>
      <Row style={{ backgroundColor: '#fff', height: '70vh'}}> 
        <Col className='col-12 d-flex justify-content-center text-uppercase align-text-center text-nowrap'>
              <h2 className='fw-bolder text-dark fw'>
                  About <span className='fw-bolder text-danger'>Us</span>
              </h2>
          </Col>
          <div className={`d-lg-flex d-md-flex justify-content-center align-items-center d-none ${style.abouText}`}>
            <Col lg={6} md={6} sm={12} xs={12}>
              <p className="lh-lg fst-italic fw-bold text-center" style={{ textAlign: 'justify', fontFamily: 'Open Sans, sans-serif' }}>
                Alohar, founded in 2023 by 6 Henry students, Edinson, Fabio, Facundo, Ivan, Julio, Nahuel and Micaela, with the mission of making your experience comfortable, fast, and secure. With our carefully selected accommodations and commitment to quality, we strive to provide you with unforgettable memories. We look forward to being part of your amazing journey through this beautiful continent South America.
              </p>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12} className='d-flex justify-content-center p-5'>
              <img src={img} alt="" style={{ width: '500px', height: '450px' }} className='ms-1' />
            </Col>
          </div>
          <Col className='d-lg-none d-md-none'>
              <p className="lh-lg fst-italic fw-bold text-center" style={{ textAlign: 'justify', fontFamily: 'Open Sans, sans-serif' }}>
                Alohar, founded in 2023 by 6 Henry students, Edinson, Fabio, Facundo, Ivan, Julio, Nahuel and Micaela, with the mission of making your experience comfortable, fast, and secure. With our carefully selected accommodations and commitment to quality, we strive to provide you with unforgettable memories. We look forward to being part of your amazing journey through this beautiful continent South America.
              </p>
            </Col>
          </Row>
         <Row>
          <Col className='col-12'>
            <h3 className='text-danger text-start text-uppercase text-decoration-underline'>Why Us?</h3>
          </Col>
            <AboutUsItem img={Secure} title={'Secure'} text={'We collaborate with verified and trustworthy hosts who have undergone rigorous selection processes'}/>
            <AboutUsItem img={Comfortable} title={'Comfortable'} text={'We offer a carefully chosen accommodations for your perfect stay. Wide selection to meet your needs.'}/>
            <AboutUsItem img={Fast} title={'Fast'} text={'We provide a function of instant bookings, allowing you to secure your accommodation quickly and hassle-free.'}/>
         </Row>
   </Container>
  );
};

export default AboutUs;
