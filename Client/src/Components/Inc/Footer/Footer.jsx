import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./Footer.module.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={`${styles.footer} bg-dark text-light py-4`}>
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <h5>Links</h5>
            <ul className="list-unstyled">{/*CAMBIAR POR ETIQUETAS LINK*/ }
              <li>
                <Link to={"/home"}>Home</Link>
              </li>
              <li>
                <Link to={"/new-property"}>Post a property</Link>
              </li>
              <li>
                <Link to={`/user/${localStorage.getItem("loggedIn")}`}>My profile</Link>
              </li>
              <li>
                <a href="https://github.com/NahueSanz/pf-grupo12">Contact</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h5>Social Media</h5> {/*CAMBIAR POR BOOTSTRAP ICONS*/ }
            <ul className="list-unstyled">
              <li>
                <a href="https://m.facebook.com/">Facebook</a>
              </li>
              <li>
                <a href="https://m.Twitter.com/">Twitter</a>
              </li>
              <li>
                <a href="https://m.Instagram.com/">Instagram</a>
              </li>
              <li>
                <a href="https://m.LinkedIn.com/">LinkedIn</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: example@example.com</li>
              <li>Phone: 123-456-7890</li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
