/**
 * sessions.js
 * Holds all of the valid JWT for the APIs.
 * 
 * Columns:
 * token - The valid JWT token
 */

import { STRING } from "sequelize";
import DB from "../dbConn";

export default DB.define("sessions", {
    token: {
        type: STRING,
        allowNull: false
    }
});