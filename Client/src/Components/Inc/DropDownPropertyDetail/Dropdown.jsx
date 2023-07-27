import {Dropdown, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


function DropdownProperty({ id }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic" size='sm'> 
        <i class="bi bi-pencil"></i>
      </Dropdown.Toggle>  
      <Dropdown.Menu variant='dark'>
      <Dropdown.Item as={Link} to={`/update-my-property/${id}`}>
      Edit
    </Dropdown.Item>
        <Dropdown.Item href="#/action-2">Delete</Dropdown.Item> 
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownProperty;