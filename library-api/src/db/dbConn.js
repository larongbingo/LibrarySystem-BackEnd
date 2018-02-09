import Sequelize from "sequelize";

export default new Sequelize("librarySystems", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});