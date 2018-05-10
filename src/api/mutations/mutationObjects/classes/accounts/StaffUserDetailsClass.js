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

import UserDetails from "./UserDetailsClass";

/**
 * Holds all of the details for all Staff Accounts
 */
class StaffUserDetails extends UserDetails {

    /**
     * Creates a new Staff Account that can be added to the db
     * @param {Object} args The data in the GraphQL API
     */
    constructor(args) {
        super(args);
        this.userType = "STAFF";
    }
}

export default StaffUserDetails;