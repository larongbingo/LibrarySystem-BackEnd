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

import createResponse from "./createResponse";

const STATUS_CODES = {
    1: createResponse(false, 1, {reason: "Internal Error Occurred, try again later"}),
    2: createResponse(false, 2, {reason: "User does not exist"}),
    3: createResponse(false, 3, {reason: "Invalid Token"}),
    4: createResponse(false, 4, {reason: "Expired Token"}),
    5: createResponse(false, 5, {reason: "Invalid userType"}),
    6: createResponse(false, 6, {reason: "Username already taken"}),
    7: createResponse(false, 7, {reason: "Book is currently lended to someone", message: "This message is deprecated!"}), // DEPRECATED!!!
    8: createResponse(false, 8, {reason: "Borrowing of a book must be validated by a staff or admin"}),
    9: createResponse(false, 9, {reason: "User does not exist"}),
    10: createResponse(false, 10, {reason: "Token ID is not valid"}),
    11: createResponse(false, 11, {reason: "Wrong username or password"}),
    12: createResponse(false, 12, {reason: "User is not logged in"}),
    13: createResponse(false, 13, {reason: "Book is borrowed or reserved by someone"}), // Use #13 instead of #7 for books that is borrowed or reserved to someone
    14: createResponse(false, 14, {reason: "Book is not borrowed by the requestee"}),
    15: createResponse(false, 15, {reason: "Book is not yet borrowed"}),
    16: createResponse(false, 16, {reason: "Returning of a book must be validated by a staff or admin"}),
    17: createResponse(false, 17, {reason: "Book does not exist"}),
    18: createResponse(false, 18, {reason: "Book is not reserved to the requestee"}),
    19: createResponse(false, 19, {reason: "Depracated API/Route"}),
    20: createResponse(false, 20, {reason: "An admin or staff can only add books to the system"}),
    21: createResponse(false, 21, {reason: "The account must be an admin or a staff userType/accountType"}) // Will be used to replace #16, #8, and # 20
};

export default STATUS_CODES;