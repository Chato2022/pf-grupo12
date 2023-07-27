import { Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";



function PerfilUserAbout ({ user, profileIsCurrentUser }) {
    return(
        <Col>
                    <Col className='d-flex align-items-center justify-content-between'><h1 className='fw-bolder text-start d-none d-md-block d-lg-block'>About {user.name}</h1></Col>
                    <Col className='col-12 d-flex mb-4 mt-3'>
                    { profileIsCurrentUser && <Button className='btn-light btn-outline-dark d-none d-md-block d-lg-block'  as={Link} to="/Miperfilform" >Edit profile</Button> }
                    </Col>
                    <Col>
                     {user.language && <p className='text-start'> <i class="bi bi-globe-americas"></i>  Speaks {user.language}.  </p>}
                     {user.country && <p className='text-start'> <i class="bi bi-geo-alt-fill"></i> Lives in {user.country}. </p>}
                     {user.phonenumber && <p className='text-start'> <i class="bi bi-telephone-fill"> </i>Contact {user.phonenumber}. </p>}
                     {user.description && <p className='text-start'>{user.description}</p>}
                    </Col>
        </Col> 
    )
}


export default PerfilUserAbout;