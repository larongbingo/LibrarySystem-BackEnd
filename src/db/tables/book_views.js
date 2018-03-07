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
 * book_views.js
 * Columns: 
 * views_count - The total amount of clicks in a book
 * borrows_count - The total amount of borrows
 * returns_count - The total amount of returns
 * reserves_count - The total amount of reserves
 * unreserves_count - The total amount of cancellation of reserves
 */

import { INTEGER } from "sequelize";
import DB from "../dbConn";

const Book_Views = DB.define("bookViews", {
    views_count: {
        type: INTEGER,
        allowNull: false
    },
    borrows_count: {
        type: INTEGER,
        allowNull: false
    },
    returns_count: {
        type: INTEGER,
        allowNull: false
    },
    reserves_count: {
        type: INTEGER,
        allowNull: false
    },
    unreserves_count: {
        type: INTEGER,
        allowNull: false
    }
});

export default Book_Views;