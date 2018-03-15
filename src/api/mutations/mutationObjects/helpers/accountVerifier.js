/**
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

import JWT from "jsonwebtoken";
import DB from "../../../../db/dbMap";
import STATUS_CODES from "./statusCodes";

/**
 * Checks if the token is valid and has a valid session
 * @param {String} token The token of the user
 * @returns {Promise} The async process that will determine the response for the user
 */
export default function accountVerifier(token) {
    return new Promise((resolve, reject) => {
        // Check if the JWT is valid
        JWT.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            console.log(decoded);
            if(err || !decoded) {
                resolve(3);
            }
            else {
                // Check if the JWT has an entry at Sessions
                DB.models.sessions.findOne({
                    where: {
                        token: token
                    }
                })
                .then(token => {
                    if(!token) {
                        (resolve(4));
                    }
                    else {
                        // Check if the account associated with the account is still active
                        console.log(decoded.userId);
                        DB.models.users.findOne({
                            where: {
                                id: decoded.userId
                            }
                        })
                        .then(user => {
                            if(!user) {
                                resolve(9);
                            }
                            else {
                                // Send a message that account is active and valid
                                resolve({
                                    status_code: 0, 
                                    decoded, 
                                    isAdminOrStaff: decoded.position === "ADMINISTRATOR" || decoded.position === "STAFF"
                                });
                            }  
                        })
                    }
                })
            }
        });
    })
}
