const { db } = require("../database/sqlite");

const getAllRolesOfUser = async () => {
  try {
    const roles = await db.all("SELECT * FROM rol"); // Use db.all for select queries
    console.log(roles);
    return roles;
  } catch (error) {
    console.error("Error to get all roles of user:", error);
    throw error;
  }
};

const createRoleOfUser = async (nombre_rol) => {
  try {
    await db.run("INSERT INTO rol (nombre_rol) VALUES (?)", [nombre_rol]); // db.run is fine for insert
  } catch (error) {
    console.error("Error to create role of user:", error);
    throw error;
  }
};

module.exports = {
  getAllRolesOfUser,
  createRoleOfUser,
};
