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

import ErrorUserResponse from "../classes/responses/ErrorUserResponseClass";

const STATUS_CODES = {
    1: new ErrorUserResponse(1, "Internal Error Occurred, try again later"),
    2: new ErrorUserResponse(2, "User does not exist"),
    3: new ErrorUserResponse(3, "Invalid Token"),
    4: new ErrorUserResponse(4, "Expired Token"),
    5: new ErrorUserResponse(5, "Invalid userType"),
    6: new ErrorUserResponse(6, "Username already taken"),
    7: new ErrorUserResponse(7, "Book is currently lended to someone", "This message is deprecated!"), // DEPRECATED!!!
    8: new ErrorUserResponse(8, "Borrowing of a book must be validated by a staff or admin"),
    9: new ErrorUserResponse(9, "User does not exist", "This message is deprecated"), // DEPRECATED! USE #2 INSTEAD!
    10: new ErrorUserResponse(10, "Token ID is not valid, the id in your account is correct!"), 
    11: new ErrorUserResponse(11, "Wrong username or password"),
    12: new ErrorUserResponse(12, "User is not logged in"),
    13: new ErrorUserResponse(13, "Book is borrowed or reserved by someone"), // Use #13 instead of #7 for books that is borrowed or reserved to someone
    14: new ErrorUserResponse(14, "Book is not borrowed by the requestee"),
    15: new ErrorUserResponse(15, "Book is not yet borrowed"),
    16: new ErrorUserResponse(16, "Returning of a book must be validated by a staff or admin"),
    17: new ErrorUserResponse(17, "Book does not exist"),
    18: new ErrorUserResponse(18, "Book is not reserved to the requestee"),
    19: new ErrorUserResponse(19, "Depracated API/Route"),
    20: new ErrorUserResponse(20, "An admin or staff can only add books to the system"),
    21: new ErrorUserResponse(21, "The account must be an admin or a staff userType/accountType") // Will be used to replace #16, #8, and # 20
};

export default STATUS_CODES;