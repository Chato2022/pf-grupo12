import axios from "axios";
import { 
  GET_PROPERTIES_AVAIBLE,
  GET_ALL_PROPERTIES,
  GET_PROPERTY_DETAIL,
  GET_PROPERTIES_BY_NAME,
  POST_NEW_PROPERTY,
  SEARCH_BY_TITLE,
  ENABLED_PROPERTY,
  APPLY_FILTERS,
  ORDER_PRICE,
  FIRST_PAGE,
  NEXT_PAGE,
  PREV_PAGE,
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  UPDATE_PROPERTY,
  ENABLED_USER,
  GET_ADMINS,
  REGISTER,
  LOGIN,
  LOGOUT,
  REVIEWS_PROPERTY,
  GET_REVIEWS_PROPERTY,
  ENABLED_REVIEW,
  RESET_DETAIL_PROPERTY,
  GET_USER_PROPERTIES,
  RESET_USER,
  GET_USER_FAVORITES,
  ADD_USER_FAVORITES,
  DELETE_USER_FAVORITES,
  GET_USER_PROFILE
} from "./actionTypes";


const url = `http://localhost:3001`; //URL GENERAL
// const url = `https://pf-grupo12-production-75d0.up.railway.app`; //URL Data-base deploy

//Trae todos los usuarios con rol user de la BDD(solo para admin)
export function getUsers() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/admin/users`); //All users
      return dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
//Trae la informacion del usuario por su ID
export const getUser = (id) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/user/info/${id}`); //get User
      return dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
//Actualizar las propiedades del usuario
export const updateUser = (id, userData) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`${url}/user/update/${id}`, userData);
      return dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProperty = (id, userData) => {

  return async function (dispatch) {
    try {
      await axios.put(`${url}/user/property/${id}`, userData);

    } catch (error) {
      console.log(error);
    }

    getAllProperties()
    getPropertiesAvaible()
  };
};
//Cambia el estado del usuario del campo enabled, para habilitarlo o deshabilitarlo
export const changeEnabledUser = (id,enabled) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`${url}/admin/user/enabled/${id}`, enabled);
      return dispatch({
        type: ENABLED_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
//Trae todos los usuarios con rol admin de la BDD(solo para admin)
export function getAdmins() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/admin/admins`); //All admins
      return dispatch({
        type: GET_ADMINS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
//Trae todas las propiedades de la BDD (solo para admin)
export function getAllProperties() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/admin/properties`); //All properties
      return dispatch({
        type: GET_ALL_PROPERTIES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
//Trae todas las propiedades habilitadas de la BDD
export function getPropertiesAvaible() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/public/properties`); //All properties
      return dispatch({
        type: GET_PROPERTIES_AVAIBLE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
//Busca propiedades por su titulo
export function searchPropertiesByTitle(title) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/public/properties?title=${title}`); //Search properties by title
      return dispatch({
        type: SEARCH_BY_TITLE,
        searchName: title,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
//Trae la informacion del detalle de la propiedad
export function getPropertyDetail(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/public/property/detail/${id}`); //One property
      //console.log(res.data);
      return dispatch({
        type: GET_PROPERTY_DETAIL,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPropertiesByName(searchName) {
  //SIN USAR? QUIZA SE PUEDA BORRAR
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/countries/name?name=${searchName}`); //Property by name
      return dispatch({
        type: GET_PROPERTIES_BY_NAME,
        searchName: searchName,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function newPostProperty(id,values) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/user/${id}/property`, values);
      //const res = await axios.post(`${url}/user/${id}/property`, values);
      return dispatch({
        type: POST_NEW_PROPERTY,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
//Cambia el estado de la propiedad del campo enabled, para habilitarlo o deshabilitarlo
export const changeEnabledProperty = (id,enabled) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`${url}/admin/property/enabled/${id}`, enabled);
      return dispatch({
        type: ENABLED_PROPERTY,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export function applyFilters(
  filterByPriceMin,
  filterByPriceMax,
  FilterByCountry,
  filterByTypes
) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: APPLY_FILTERS,
        payload: {
          filterByPriceMin: filterByPriceMin,
          filterByPriceMax: filterByPriceMax,
          FilterByCountry: FilterByCountry,
          filterByTypes: filterByTypes,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const orderPrice = (order) => {
  return { type: ORDER_PRICE, payload: order };
};

export function firstPage() {
  return {
    type: FIRST_PAGE,
  };
}

export function prevPage(quantity) {
  return {
    type: PREV_PAGE,
    payload: quantity,
  };
}

export function nextPage(quantity) {
  return {
    type: NEXT_PAGE,
    payload: quantity,
  };
}

export function register(userData) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/public/register`,userData);
      //const res = await axios.post(`${url}/public/register`,userData);
     
      return dispatch({
        type: REGISTER,
        payload: res.data,
       
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
//se le pasa un id al loguearse
export const login = (id) => ({
  type: LOGIN,
  payload: id,
});
//salir sesion
export const logout = () => ({
  type: LOGOUT,
});

export const postReviewsProperty = (idCasa, values)=>{
  return async function (dispatch){
        try {
          const res = await axios.post(`${url}/user/property/${idCasa}/review`, values); 

          return dispatch({
            type: REVIEWS_PROPERTY,
            payload: res.data,
          });
        } catch (error) {
          console.log(error);
        }
      };
    }

export const getReviewsProperty = (idCasa) =>{
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/user/property/${idCasa}/review`);
      return dispatch({
        type: GET_REVIEWS_PROPERTY,
        payload: res.data.Reviews,
      });
    } catch (error) {
      console.log(error);
    }
  };

}

export const changeEnabledReview = (id,enabled) => {
  console.log(enabled)
  return async function (dispatch) {
    try {
      const res = await axios.put(`${url}/user/review/enabled/${id}`, {enabled:enabled});
      

      return dispatch({
        type: ENABLED_REVIEW,
        payload:{
          id,
          value: enabled,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export const resetDetailProperty = () => ({
  type: RESET_DETAIL_PROPERTY
})


export const getUserProperties = (id) => {
  return async function(dispatch){
    try {
      const { data } = await axios.get(`${url}/user/${id}/property`);
      return dispatch({
        type: GET_USER_PROPERTIES,
        payload: data
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const resetUser = () => ({
  type: RESET_USER
})

export const getUserFavorites = (id) => {
  return async function(dispatch){
    try {
      const { data } = await axios.get(`${url}/user/property/${id}/fav`);
      return dispatch({
        type: GET_USER_FAVORITES,
        payload: data
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const addUserFavorites = (userId, houseId) => {
  return async function(dispatch){
    try {
      const { data } = await axios.post(`${url}/user/property/${userId}/fav`, { houseId });
      return dispatch({
        type: ADD_USER_FAVORITES,
        payload: data
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const deleteUserFavorites = (userId, houseId) => {
  return async function(dispatch){
    try {
      await axios.delete(`${url}/user/property/${userId}/fav/${houseId}`);
      return dispatch({
        type: DELETE_USER_FAVORITES,
        payload: houseId
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const getUserProfile = (id) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/user/info/${id}`); //get User
      return dispatch({
        type: GET_USER_PROFILE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};