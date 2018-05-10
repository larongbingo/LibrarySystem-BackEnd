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

import { Model, Column, Table, DataType, BeforeValidate, AllowNull, HasMany } from "sequelize-typescript";
import { hashSync } from "bcryptjs";
import * as Bluebird from "bluebird";

/**
 * Holds the details of all students and staffs
 */
@Table({ paranoid: true, timestamps: true })
export class User extends Model<User> {
    /**
     * The First Name of the user
     */
    @AllowNull(false)
    @Column(DataType.STRING)
    firstName!: string;
    
    /**
     * The Last Name of the user
     */
    @AllowNull(false)
    @Column(DataType.STRING)
    lastName!: string;

    /**
     * The email addresss of the user
     */
    @AllowNull(false)
    @Column(DataType.STRING)
    email!: string;

    /**
     * The account type of the account
     */
    @AllowNull(false)
    @Column(DataType.ENUM({values: ["STUDENT", "STAFF", "ADMIN"]}))
    accountType!: string;

    /**
     * The username of the account
     */
    @AllowNull(false)
    @Column(DataType.STRING)
    username!: string;

    /**
     * The HASHED password of the account
     */
    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string;

    /**
     * Hashes the password to a Bcrypt Hash
     * @param instance The user of the account
     */
    @BeforeValidate
    private static HashPassword(instance: User): void {
        instance.password = hashSync(instance.password + instance.username + instance.id);
    }
}

export default User;