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

import UserResponse from "./UserResponseClass";

class ErrorUserResponse extends UserResponse {
    constructor(errorCode, message, deprecationReason) {
        let object = objectify("reason", message);

        if(deprecationReason) {
            object = objectify("message", deprecationReason, object);
        }

        super(false, errorCode, object);
    }
}

function objectify(objectKey, objectValue, object) {
    if(object) {
        return object[objectKey] = objectValue;
    }

    return {[objectKey]: objectValue};
}

export default ErrorUserResponse;