import {
  GET_PROPERTIES_AVAIBLE,
  GET_ALL_PROPERTIES,
  GET_PROPERTY_DETAIL,
  GET_PROPERTIES_BY_NAME,
  POST_NEW_PROPERTY,
  ENABLED_PROPERTY,
  APPLY_FILTERS,
  ORDER_PRICE,
  FIRST_PAGE,
  NEXT_PAGE,
  PREV_PAGE,
  SEARCH_BY_TITLE,
  GET_USERS,
  GET_USER,
  ENABLED_USER,
  GET_ADMINS,
  REGISTER,
  LOGIN,
  LOGOUT,
  UPDATE_USER,
  REVIEWS_PROPERTY,
  GET_REVIEWS_PROPERTY,
  ENABLED_REVIEW,
  RESET_DETAIL_PROPERTY,
  GET_USER_PROPERTIES,
  RESET_USER,
  UPDATE_PROPERTY,
  GET_USER_FAVORITES,
  ADD_USER_FAVORITES,
  DELETE_USER_FAVORITES,
  GET_USER_PROFILE
} from "./actionTypes";

const initialState = {
  properties: [],
  propertyDetail: {},
  userFavorites: [],
  allProperties: [],
  userProperties: [],
  propertiesAdmin: [],
  allPropertiesAdmin: [],
  users: [],
  allUsers: [],
  admins: [],
  allAdmins: [],
  review: [],
  allReview: [],
  page: 1,
  searchTerm: "",
  loggedIn: Boolean(localStorage.getItem("loggedIn")) || false,
  id: '',
  user: {},
  userProfile: {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROPERTIES:
      return {
        ...state,
        propertiesAdmin: action.payload,
        allPropertiesAdmin: action.payload,
      };

    case GET_PROPERTIES_AVAIBLE:
      return {
        ...state,
        properties: action.payload,
        allProperties: action.payload,
        searchTerm: "",
      };

    case GET_PROPERTY_DETAIL:
      return {
        ...state,
        propertyDetail: action.payload,
      };

    case GET_PROPERTIES_BY_NAME:
      return {
        ...state,
        searchTerm: action.searchName,
        properties: action.payload,
      };

    case POST_NEW_PROPERTY:
      return {
        ...state
      }

    case SEARCH_BY_TITLE:
      return {
        ...state,
        searchTerm: action.searchName,
        properties: action.payload,
      };

    case ENABLED_PROPERTY:
      return {
        ...state,
      }

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        allUsers: action.payload
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: action.payload
      }

    case UPDATE_PROPERTY:/*
      const newProperties = state.properties.map(prop=>{ 
        prop.id===action.payload.id;
        return action.payload
      })*/
      return {
        ...state
      }

    case ENABLED_USER:
      return {
        ...state,
      }

    case GET_ADMINS:
      const filteredAdmins = action.payload.filter((admin) => admin.id !== localStorage.getItem("loggedIn"));
      return {
        ...state,
        admins: filteredAdmins,
        allAdmins: action.payload,
      }

    case APPLY_FILTERS:
      var filteringProperties = [...state.allProperties];
      // Aplicar el filtro filterByPriceMin
      if (action.payload.filterByPriceMin !== "") {
        filteringProperties = filteringProperties.filter(
          (property) => property.price >= action.payload.filterByPriceMin
        );
      }

      // Aplicar el filtro filterByPriceMax

      if (action.payload.filterByPriceMax !== "") {
        filteringProperties = filteringProperties.filter(
          (property) => property.price <= action.payload.filterByPriceMax
        );
      }

      // Aplicar el filtro filterByCountry
      if (action.payload.FilterByCountry !== "") {
        filteringProperties = filteringProperties.filter((property) =>
          property.country.includes(action.payload.FilterByCountry)
        );
      }

      // Aplicar el filtro filterByTypes
      if (action.payload.filterByTypes.length > 0) {
        filteringProperties = filteringProperties.filter((property) =>
          action.payload.filterByTypes.includes(property.type)
        );
      }
      return {
        ...state,
        properties: filteringProperties,
        page: 1,
      };

    case ORDER_PRICE:
      if (action.payload === "All") {
        return {
          ...state,
          properties: state.properties, // Mostrar los datos sin ordenar
        };
      } else {
        const orderPrice = state.properties.slice().sort((a, b) => {
          if (action.payload === "A") {
            return a.price - b.price;
          } else if (action.payload === "D") {
            return b.price - a.price;
          }
        });
        return {
          ...state,
          properties: orderPrice, // Mostrar los datos ordenados
        };
      };

    case FIRST_PAGE:
      return {
        ...state,
        page: 1,
      };

    case NEXT_PAGE:
      return {
        ...state,
        page: state.page + action.payload,
      };

    case PREV_PAGE:
      return {
        ...state,
        page: state.page - action.payload,
      };

    case REGISTER:
      return {
        ...state
      };

    case LOGIN:
      localStorage.setItem("loggedIn", action.payload);
      return {
        ...state,
        loggedIn: action.payload,
        id: action.payload
      };

    case LOGOUT:
      localStorage.setItem("loggedIn", "");
      return {
        ...state,
        loggedIn: false,
        user: {},
      };

    case UPDATE_USER:
      localStorage.setItem("loggedIn", action.payload);
      return {
        ...state,
        user: action.payload
      };

    case REVIEWS_PROPERTY:
      return {
        ...state
      }

    case GET_REVIEWS_PROPERTY:
      return {
        ...state,
        review: action.payload,
        allReview: action.payload
      };

    case ENABLED_REVIEW:
      return {
        ...state,
        review: state.review.map(el => {
          if (el.id === action.payload.id) {
            return {
              ...el,
              enabled: action.payload.value,
            };
          }
          return el;
        }),
      };
    case RESET_DETAIL_PROPERTY:
      return {
        ...state,
        propertyDetail: {}
      }
    case GET_USER_PROPERTIES:
      return {
        ...state,
        userProperties: action.payload
      }
    case RESET_USER:
      return {
        ...state,
        user: {}
      }
      case GET_USER_FAVORITES:
        return {
            ...state,
            userFavorites: action.payload
        }
      case ADD_USER_FAVORITES: 
        return {
            ...state,
        }
      case DELETE_USER_FAVORITES :
        const updateFavs = state.userFavorites.filter(fav => fav.id !== houseId);
        return{
          ...state,
          userFavorites: updateFavs
        }
        case GET_USER_PROFILE:
          return{
            ...state,
            userProfile: action.payload
          }
    default:
      return state;
  }
};

export default rootReducer;
