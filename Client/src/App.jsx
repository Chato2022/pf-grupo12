import React, { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DetailPropertyPage from "./Components/Views/DetailProperty/DetailPropertyPage";
import HomePage from "./Components/Views/Home/HomePage";
import PropertyForm from "./Components/Views/PropertyForm/PropertyForm";
import PerfilUser from './Components/Views/PerfilUser/perfilUser';
import { useLocation } from "react-router-dom";
import NavBar from "./Components/Inc/NavBar/NavBar";
import Footer from "./Components/Inc/Footer/Footer";
import Landing from "./Components/Views/Landing/Landing";
import { getUser, login, logout } from "./redux/actions";
import FormPerfil from "./Components/Inc/FormPerfil/FormPerfil";
import FormProperty from "./Components/Inc/FormProperty/FormProperty";
import Payment from "./Components/Views/Payment/Payment";
import Dashboard from "./Components/Views/Dashboard/Dashboard";
import firebaseApp from "./fb";
import { getAuth } from "firebase/auth";
import Favorites from './Components/Views/userFavorites/userFavorites';  

const auth = getAuth(firebaseApp);


const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loggedIn);
  const userRole = useSelector(state => state.user.role)

  useEffect(() => {

    // Verifica el estado de autenticación en cada carga de página
    auth.onAuthStateChanged((user) => {
      if (user) {
        // El usuario está autenticado
        dispatch(getUser(user.uid));
        dispatch(login(user.uid));
      } else {
        // El usuario no está autenticado
        dispatch(logout())
        navigate("/")
      }
    });
  }, []);

  return (
    <div className="app">
      
      {loggedIn
      ? (
        <>
          {/* Si estoy logueado puedo usar estas rutas */}
          {location.pathname !== "/" && location.pathname !== "/admin-dashboard" && <NavBar />}
          <Routes>
            <Route path='/' element={<Navigate to='/home' replace/>} />{/* Si yo quiero retrocer a landing, al estar logueado no me deja y redirije a home */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/rooms/:id" element={<DetailPropertyPage />} />
            <Route path="/new-property" element={<PropertyForm />} />{/* actualizar ruta en demas componentes */}
            <Route path="/payment" element={<Payment />} />
            <Route path="/Miperfilform" element={<FormPerfil />} />
            <Route path='/user/:id' element={<PerfilUser/>} />
            <Route path="/user/:id/favorites" element={<Favorites/>}/>
            <Route path="/update-my-property/:id" element={<FormProperty />} />
            {
              userRole==="admin"?<Route path="/admin-dashboard" element={<Dashboard />} />:null
            }
          </Routes>
          {location.pathname !== "/" && location.pathname !== "/admin-dashboard" && <Footer />}
        </>
      ) 
      : (
        <>
          {/* Sino estoy logueado puedo utilizar estas rutas */}
          {location.pathname !== "/" && <NavBar />}
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
          {location.pathname !== "/" && <Footer />}
        </>
      )}
    </div>
  );
};

export default App;
