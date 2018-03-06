/**
 * syncDB.js
 * Syncs the changes from the ORM to the Database.
 * It only adds the admin account.
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

import DB from "../db/dbMap";

DB.sync({force: true})
.then(() => {
    // Create the Admin Account
    return DB.models.users.create({
        firstName: 'admin', 
        lastName: 'admin',
        userID: 'ADMIN0001',
        userType: "ADMINISTRATOR",
        username: "admin",
        password: "admin",
        isActive: true
    });
})
.then(() => {
    process.exit(0);
})
