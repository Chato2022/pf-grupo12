import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ContactHostModal({ owner, ownerNumber, ownerEmail }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Contact Host
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Contact {owner}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='fw-semibold' style={{ height: '100px'}}>
            <p>Phone number: {ownerNumber}</p>
            <p>Email: {ownerEmail}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ContactHostModal;