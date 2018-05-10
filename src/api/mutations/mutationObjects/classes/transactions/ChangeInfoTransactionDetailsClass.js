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

import TransactionDetails from "./TransactionDetailsClass";

class ChangeInfoTransactionDetails extends TransactionDetails {
    constructor(data, updatedFields, transactionType) {
        super(transactionType, "Changed the ff: " + updatedFields);
        this.userId = (data.decoded.userId) ? data.decoded.userId : null;
        this.bookId = (data.decoded.bookId) ? data.decoded.bookId : null;
    }
}

export default ChangeInfoTransactionDetails;