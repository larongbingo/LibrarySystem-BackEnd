/*****************************************************************************
 *  The backend of cvsu library app, handles data storage and processing
 *  Copyright (C) 2018  Renz Christen Yeomer A. Pagulayan
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 ****************************************************************************/

import { Table, Model, Column, DataType, AllowNull } from "sequelize-typescript";

/**
 * Holds all of the changes in all models
 */
@Table({ paranoid: true, timestamps: true })
export class Transaction extends Model<Transaction> {
    /**
     * The Database ID of the user that was involved in the transaction
     */
    @AllowNull(false)
    @Column(DataType.INTEGER)
    protected userID!: number;

    /**
     * The Database ID of the book that was involved in the transaction
     */
    @AllowNull(true)
    @Column(DataType.INTEGER)
    protected bookID!: number;

    /**
     * The Database ID of the admin user that processes the user
     */
    @AllowNull(true)
    @Column(DataType.INTEGER)
    protected adminUserID!: number;
    
    /**
     * The title of the transaction that happened
     */
    @AllowNull(false)
    @Column(DataType.STRING)
    protected type!: string;

    /**
     * Remark or comment of the transaction
     */
    @AllowNull(true)
    @Column(DataType.STRING)
    protected comment!: string;
}

export default Transaction;