import style from '../../Views/Landing/landing.module.css';
import Col from 'react-bootstrap/Col';


function AboutUsItem(props) {

const { img, title, text } = props;

  return (
    <Col lg={4} md={4} sm={12} xs={12} className='g-2 d-flex justify-content-center align-items-center mt-5'>
        <div className={`${style.item} rounded shadow p-2`} value={title} style={{ cursor: 'default' }}>
            <img src={img} alt="" className='' style={{ width: '50px'}}/>
            <h6 className='text-center fw-bold mt-2 text-dark mb-3'>{title}</h6>
            <small className='mt-5' style={{ textAlign: 'justify' }}>{text}</small>
        </div>
     </Col>
  );
}

export default AboutUsItem;