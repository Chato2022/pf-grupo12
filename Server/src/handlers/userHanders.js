//Importar los controllers


/************** HANDLERS DEL USUARIO AUTENTICADO ****************/

//Usuario por ID
const getUserByIdHandler = async (req,res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (!user) {
            throw Error("User not found");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}
//Actualizar usuario
const updateUserHandler = (req,res) => {
    const { id } = req.params;
    const props = req.body;
    try {
        
    } catch (error) {
        
    }
}
//Propiedades del usuario
const getAllPropertiesUserHandler = async (req,res) => {
    try {
        const userProperties = await getAllUserProperties();
        if (userProperties.length===0) {
            throw Error("User has not properties")
        }
        res.status(200).json(userProperties);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}
//Crear propiedad del usuario
const createPropertyUserHandler = async (req,res) => {
    const { title, owner, type, address, country, guests, price, description, startDate, endDate, image } = req.body;
    try {
        if (!title || !owner || !type || !address || !country || !guests || !price || !description || !startDate || !endDate || !image) {
            throw Error("All fields are not complete");
        }
        const newProperty = await createUserProperty(title, owner, type, address, country, guests, price, description, startDate, endDate, image);
        if(!newProperty){
            throw Error("Property is not created");
        }
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}
//Propiedad del usuario por ID
const getPropertyUserByIdHandler = async (req,res) => {
    const { id } = req.params;
    try {
        const userProperty = await getUserPropertyById(id);
        if(!userProperty){
            throw Error("User property not found");
        }
        res.status(200).json(userProperty);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}
//Actualizar propiedad por ID
const updatePropertyUserHandler = (req,res) => {
    const { id } = req.params;
    const props = req.body;
    try {
        
    } catch (error) {
        
    }
}
//Eliminar propiedad por ID
const deletePropertyUserHandler = async (req,res) => {
    const { id } = req.params;
    try {
        const deleteProperty = await deleteUserProperty(id);
        if(deleteProperty !== "User property deleted"){
            throw Error("User property not found to delete");
        }
        res.status(200).json(deleteProperty);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}

module.exports = {
    getUserByIdHandler,
    updateUserHandler,
    getAllPropertiesUserHandler,
    createPropertyUserHandler,
    getPropertyUserByIdHandler,
    updatePropertyUserHandler,
    deletePropertyUserHandler,
}