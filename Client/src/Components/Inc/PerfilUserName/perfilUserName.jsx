import { Col } from 'react-bootstrap';
import profilePicGuess from '../../../assets/guessProfilePic.webp';
import style from './perfilUserName.module.css'

function PerfilUserName({ user }) {

    const userImg = user.image || profilePicGuess
    
    return(     
            <Col className={`py-5 ${style.container}`} >
                <div className={style.containerImg}>
                {<img src={userImg} alt="User image" className={`rounded-circle mb-3 ${style.img}`} style={{ width: '100px'}}/>}
                </div>
                   
                    <h1 className='fw-bolder mt-3'> {user.name}</h1>
                    <p>{user.email}</p>
            </Col>  
    )
}


export default PerfilUserName;