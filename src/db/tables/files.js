/*************************************************************************
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
 *************************************************************************/

/**
 * files.js
 * Holds all of the pdf files
 * 
 * Columns:
 * filename - The filename of the pdf file
 * file_binaries - The files content turned into string
 */

import {STRING, BLOB} from "sequelize";
import DB from "../dbConn";

export default DB.define("files", {
    file_title: {
        type: STRING,
        allowNull: false
    },
    file_name: {
        type: STRING,
        allowNull: false
    },
    file_type: {
        type: STRING,
        allowNull: false
    },
    file_binaries: {
        type: BLOB({length: "long"}),
        allowNull: false
    }
});