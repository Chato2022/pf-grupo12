const { Property, User } = require("../db");

/********************* CONTROLLERS PUBLICOS *********************/
const getPropertiesbyTitle = async (title) => {
  try {
    const searchTitle = title;
    let properties = await Property.findAll({
      where: {
        title: { [Op.iLike]: "%" + title + "%" },
      },
    });
    if (properties.length !== 0) {
      return properties;
    } else {
      throw new Error("No se encontraron propiedades con ese título");
    }
  } catch (error) {
    console.log(error.message);
    throw new Error("Error al realizar la búsqueda");
  }
};

//Crear un nuevo usuario en la BDD
const createUser = async (
  name,
  lastname,
  email,
  password,
  country,
  phonenumber,
  language,
  description,
  image,
  role
) => {
  const [newUser, created] = await User.findOrCreate({
    //busca por estos datos al usuario
    where: { email, phonenumber },
    //sino lo encuentra lo crea con los valores del defaults
    defaults: {
      name,
      lastname,
      email,
      password,
      country,
      phonenumber,
      language,
      description,
      image,
      role,
    },
  });
  if (!created) {
    throw new Error("User already exists");
  }
  return newUser;
};
//Obtener todas las propiedades de la BDD
const getAllProperties = async () => {
  try {
    const properties = await Property.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "phonenumber", "language"],
        },
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
