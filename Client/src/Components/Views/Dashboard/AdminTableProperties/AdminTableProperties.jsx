import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AdminTableProperties.module.css"
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TablePagination,Paper,TextField,Switch,Typography,Grid,Modal,Backdrop,Fade} from "@mui/material";import '@fontsource/roboto/400.css';
import { Button, Card, Carousel} from "react-bootstrap";
import { Link } from "react-router-dom";
import { changeEnabledProperty, getAllProperties } from "../../../../redux/actions";


const AdminTableProperties = () => {   
  const dispatch = useDispatch();
  //propiedades estado todas las propiedades tanto habilitadas como deshabilitadas
	const properties  = useSelector((state) => state.propertiesAdmin);
	const [ data, setData ] = useState(properties);
  //Paginado estados
	const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //Search estado
  const [searchText, setSearchText] = useState('');

  //Cambia el estado enabled de una propiedad
  const handleToggle = (id,enabled) => {
		setData((prevState) =>
			prevState.map((prop) => {
        if (prop.id === id) {
          dispatch(changeEnabledProperty(id,{ enabled: enabled}));
          return { ...prop, enabled: enabled}
        }
        return prop;
      })
		);
	};
  //Cambio de pagina
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //Ordenar el numero de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //Busqueda de propiedad mediante dueño
  const filteredData = data.filter((prop) =>
    (`${prop.User.name} ${prop.User.lastname}`).toLowerCase().includes(searchText.toLowerCase())
  );

  //FUNCIONES DE MODAL
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState({});

  const openModal = (property) => {
    console.log(property);
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Titulo */}
      <Typography variant="h5" gutterBottom>
        Table Properties
      </Typography>
      {/* Search */}
      <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Search by owner"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
      <div style={{ marginBottom: '16px' }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Post date</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Enabled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prop) => (
              <TableRow key={prop.id} className={styles.fila}>
                <TableCell onClick={() => openModal(prop)} style={{ cursor: "pointer" }}>{prop.id}</TableCell>
                <TableCell onClick={() => openModal(prop)} style={{ cursor: "pointer" }}>{prop.title}</TableCell>
                <TableCell onClick={() => openModal(prop)} style={{ cursor: "pointer" }}>{prop.createdAt}</TableCell>
                <TableCell onClick={() => openModal(prop)} style={{ cursor: "pointer" }}>{prop.User.name || prop.User.lastname?`${prop.User.name} ${prop.User.lastname}`:"Not registered"}</TableCell>
                <TableCell>
                  <Switch
                    checked={prop.enabled}
                    color="primary"
                    inputProps={{ 'aria-label': 'controlled' }}
                    onChange={() => handleToggle(prop.id, !prop.enabled)}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {prop.enabled ? 'Enabled' : 'Disabled'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginBottom: '8px' }}></div>
      {/* Paginado */}
      <TablePagination
        className={styles.customPagination}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />



      <Modal
        open={isModalOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={styles.modalContainer}
      >
        <Fade in={isModalOpen} className={styles.fade}>{/* Add the content of the modal using selectedProperty */}
          <Card className={styles.propertyCard}>
            <Card.Header className={styles.cardHeader}><h5>Id: {selectedProperty.id}</h5><h5>Owner: {selectedProperty.User?.name || "Name not registered"}</h5></Card.Header> 
            <Card.Img variant="top" src={selectedProperty.image} className={styles.cardImage}/>
            <Card.Title className={styles.cardTitle}>{selectedProperty.title}</Card.Title>
            <Card.Body className={styles.cardBody}>
              <div className={styles.cardInfo}>
                <h6 className={styles.cardData}>Country: {selectedProperty.country}</h6>
                <h6 className={styles.cardData}>Guests: {selectedProperty.guests}</h6>
                <h6 className={styles.cardData}>Price per night: ${selectedProperty.price} USD</h6>
                <h6 className={styles.cardData}>Address: {selectedProperty.address}</h6>
                <h6 className={styles.cardData}>Type: {selectedProperty.type}</h6>
                <h6 className={styles.cardData}>Dates: {selectedProperty.startDate} - {selectedProperty.endDate}</h6>
              </div>
              
              <Button variant="primary" as={Link} to={`/rooms/${selectedProperty.id}`} className={styles.cardButton}>Go to Property Detail</Button>
            </Card.Body>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
};

export default AdminTableProperties;