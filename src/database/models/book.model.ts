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

import { Model, Table, Column, DataType, AllowNull, Default } from "sequelize-typescript";
import User from "./user.model";
import * as Bluebird from "bluebird";

/**
 * Holds the details of all books
 */
@Table({ paranoid: true, timestamps: true })
export class Book extends Model<Book> {
    //#region Columns

    /**
     * The title of the book
     */
    @AllowNull(false)
    @Column(DataType.STRING)
    title!: string;

    /**
     * The author of the book
     */
    @AllowNull(false)
    @Column(DataType.STRING)
    author!: string;

    /**
     * The classification of the book
     */
    @AllowNull(true)
    @Column(DataType.STRING)
    classification!: string;

    /**
     * The DATABASE ID of the user that borrowed or reserved the book
     */
    @AllowNull(true)
    @Default(null)
    @Column(DataType.STRING)
    protected userID!: number;

    /**
     * A flag that indicates if the book is borrowed
     */
    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    protected isBorrowed: boolean;

    //#endregion

    //#region PublicMethods

    /**
     * Mark the book as reserved using the details of the user
     * @param user The user that wants to reserve the book
     * @returns Returns true if the book is successfully reserved, false otherwise
     */
    public MarkBookAsReserved(user: User): Bluebird<boolean> {
        return new Bluebird((resolve, reject) => {
            try {
                if(!this.IsBookReserved()) {
                    return this.update({
                        userID: user.id
                    })
                    .then(() => resolve(true));
                }
                else {
                    // Book is already reserved
                    // Book is borrowed
                    resolve(false);
                }
            }
            catch(err) {
                reject(err);
            }
        });
    }

    /**
     * Remove the mark reserved on the book
     * @returns Returns true if the book is successfully unreserved, false otherwise
     */
    public RemoveMarkReserved(): Bluebird<boolean> {
        return new Bluebird((resolve, reject) => {
            try {
                if(!this.isBorrowed && Boolean(this.userID)) {
                    return this.update({
                        "userID": null
                    })
                    .then(() => resolve(true));
                }
                else {
                    return resolve(false);
                }
            }
            catch(err) {
                reject(err);
            }
        });
    }

    /**
     * Marks the book as borrowed using the details of the user
     * @param user The user that wants to borrow the book
     * @returns Returns true if the book is successfully borrowed, false otherwise
     */
    public MarkBookAsBorrowed(user: User): Bluebird<boolean> {
        // TODO: Refactor this
        return new Bluebird((resolve, reject) => {
            try {
                if(!this.isBorrowed) {
                    // Book is Reserved
                    if(Boolean(this.userID)) {
                        // Check if the ids are the same
                        if(this.userID === user.id) {
                            this.update({
                                isBorrowed: true
                            })
                            .then(() => resolve(true));
                        }
                        else {
                            resolve(false);
                        }
                    }
                    else {
                        // Book is not reserved
                        this.update({
                            isBorrowed: true,
                            userID: user.id
                        })
                        .then(() => resolve(true));
                    }
                }
                else {
                    resolve(false);
                }
            }
            catch(err) {
                reject(err);
            }
        });
    }

    /**
     * Remove the mark borrowed on the book 
     * @returns Returns true if the book is successfully marked as returned, false otherwise
     */
    public MarkBookAsReturned(): Bluebird<boolean> {
        return new Bluebird((resolve, reject) => {
            try {
                // Check if book is borrowed
                if(this.isBorrowed && Boolean(this.userID)) {
                    // Update as returned
                    return this.update({
                        userID: null,
                        isBorrowed: false
                    })
                    .then(() => resolve(true));
                }
                else {
                    resolve(false);
                }
            }
            catch(err) {
                reject(err)
            }
        });
    }

    /**
     * Indicates if the book is reserved or not
     * @returns Indicates if the book is reserved and not borrowed
     */
    public IsBookReserved(): boolean {
        return !this.isBorrowed && Boolean(this.userID);
    }

    /**
     * Indicates if the book is borrowed or not
     * @returns Indicates if the book is reserved and borrowed
     */
    public IsBookBorrowed(): boolean {
        return this.isBorrowed && Boolean(this.userID);
    }

    //#endregion
}

export default Book;