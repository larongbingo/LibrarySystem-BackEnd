/**
 * dbConn.js
 * Defines the connection between the ORM and the Database
 * 
 * License
 * The Library System Back End, handles all of the CRUD operations
 * of the CvSU Imus Library System
 * Copyright (C) 2018  Renz Christen Yeomer A. Pagulayan
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import Sequelize from "sequelize";

let conn;

// Assign the database connection to the IBM Cloud if for production
if(process.env.NODE_ENV === "production") {
    conn = new Sequelize("LibrarySystems", process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        dialect: "mysql"
    });
}
else {
    conn = new Sequelize("LibrarySystems", "root", "root", {
        dialect: "mysql"
    });
}

export default conn;