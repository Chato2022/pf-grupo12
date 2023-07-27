const { Property, User, Review } = require("../db");
const { Op } = require("sequelize");

/********************* CONTROLLERS PUBLICOS *********************/

//Obtiene las propiedades buscando por su titulo
const getPropertiesbyTitle = async (title) => {
  try {
    const properties = await Property.findAll({
      where: {
        enabled:true,
        title: { [Op.iLike]: "%" + title + "%" },
      },
    });
    if (properties.length !== 0) {
      return properties;
    } else {
      throw new Error("No se encontraron propiedades con ese título");
    }
  } catch (error) {
    throw new Error("Error al realizar la búsqueda");
  }
};

//Crear un nuevo usuario en la BDD
const createUser = async (email,id, name, lastname) => {
  const [newUser, created] = await User.findOrCreate({
    //busca por estos datos al usuario
    where: { email, id, name, lastname},
    //sino lo encuentra lo crea con los valores del defaults
    defaults: { email, id, name, lastname},
  });
  if (!created) {
    throw new Error("User already exists");
  }
  return newUser;
};

//Obtener todas las propiedades de la BDD que esten habilitadas
const getAllProperties = async () => {
  try {
    const properties = await Property.findAll({
      where:{
        enabled:true
      },
      include: [
        {
          model: Review,
          attributes: ["score", "enabled"],
        },
        {
          model: User,
          attributes: ["name","lastname"],
        }
      ],

    });

    return properties;
  } catch (error) {
    throw new Error("Error getting all properties");
  }
};

//Obtener un usuario buscandolo por su email en la BDD
const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw new Error("Error while finding user by email");
  }
};

//Obtener la info de una propiedad con alguna informacion de su usuario(propietario)
const getPropertyDetail = async (id) => {
  try {
    const property = await Property.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: [
            "id",
            "name",
            "phonenumber",
            "language",
            "image",
            "description",
            "email"
          ],
        },
      ],
    });

    return property;
  } catch (error) {
    throw new Error("Error getting detail property");
  }
};

module.exports = {
  createUser,
  getAllProperties,
  findUserByEmail,
  getPropertyDetail,
  getPropertiesbyTitle,
};
