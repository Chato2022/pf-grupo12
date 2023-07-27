import { useEffect } from 'react';
import { Button, Col } from 'react-bootstrap';
import { getUserProperties } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import UserPropertiesItem from './UserPropertiesItem';
import { Link } from "react-router-dom";


 
function UserProperties ({ user }) {
    const { id } = user;
    const dispatch = useDispatch();
    const userProperties = useSelector(state => state.userProperties);

    useEffect(() => {
        async function getProperties(id) {
            try {
              const data = getUserProperties(id);
              dispatch(data);
            } catch (error) {
              console.log(error);
            }
        }
        getProperties(id);
    }, [id]);


    return(
        <Col className='py-1'>
            { userProperties 
            ? (
                <>
                <h2 className='text-lg-start text-md-start text-center'>{user.name}'s properties</h2>
                <UserPropertiesItem properties={userProperties}/>
                </>
                )
            : (
                <div className='d-flex justify-content-center align-items-center'>
                    <h2 className='text=-center fw-bolder'>Become Host and earn money with Alohar</h2>
                    <Button as={Link} to="/new-property">Become host</Button>
                </div>
            )}
        </Col>  
    )
}

export default UserProperties;