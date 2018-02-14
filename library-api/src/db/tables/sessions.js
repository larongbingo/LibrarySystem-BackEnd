
import { STRING } from "sequelize";
import DB from "../dbConn";

export default DB.define("sessions", {
    tokens: {
        type: STRING,
        allowNull: false
    }
});