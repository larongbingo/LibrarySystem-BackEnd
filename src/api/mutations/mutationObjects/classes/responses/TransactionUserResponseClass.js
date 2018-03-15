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

/**
 * Holds all of the details a user needs to see
 * based on a given transaction object
 */
class TransactionUserResponse extends UserResponse {
    /**
     * Creates a bew TransactionUserResponse Object
     * @param {Object} transaction The instance of transaction at transactions table
     */
    constructor(transaction) {
        super(true, 0, {
            transactionID: transaction.id,
            transactionType: transaction.transactionType,
            transactionRemarks: transaction.transactionRemarks
        });
    }
}

export default TransactionUserResponse;