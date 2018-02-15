
import { STRING } from "sequelize";
import DB from "../dbConn";

export default DB.define("sessions", {
    token: {
        type: STRING,
        allowNull: false
    }
});