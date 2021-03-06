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

/**
 * Creates a response for the user
 * @param {Boolean} success True if the API has finished all of the I/Os without errors 
 * @param {Number} statusCode The error code that corresponds to the error (Non zero values only)
 * @param {Object} dataObject The additional info for the user
 */
export default function createResponse(success, statusCode, dataObject) {
    return {
        success: success,
        statusCode: statusCode,
        iat: Date.now(),
        data: dataObject
    }
}