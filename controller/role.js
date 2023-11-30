const { getAllRolesOfUser, createRoleOfUser } = require("../model/role");

const roles = async (req, res) => {
  try {
    const roles = await getAllRolesOfUser();
    res.json(roles);
  } catch (error) {
    console.log(`Error del parte del servidor ${error}`);
    res.json(error);
  }
};

const insertRole = async (req, res) => {
  try {
    const { nombre_rol } = req.body;
    await createRoleOfUser(nombre_rol);
    res.status(201).send({ message: "Role created successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  roles,
  insertRole,
};
