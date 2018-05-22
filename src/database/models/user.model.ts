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

import { Model, Column, Table, DataType, BeforeCreate, BeforeUpdate, AllowNull, HasMany, BeforeValidate, Length } from "sequelize-typescript";
import { hashSync } from "bcryptjs";
import { IUser } from "./types";
import * as Bluebird from "bluebird";

/**
 * Holds the details of all students and staffs
 */
@Table({ paranoid: true, timestamps: true })
export class User extends Model<User> implements IUser {

    @AllowNull(false)
    @Column(DataType.STRING)
    firstName!: string;
    
    @AllowNull(false)
    @Column(DataType.STRING)
    lastName!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    email!: string;

    @AllowNull(false)
    @Column(DataType.ENUM({values: ["STUDENT", "STAFF", "ADMIN"]}))
    accountType!: string;

    @AllowNull(false)
    @Length({min: 8})
    @Column(DataType.STRING)
    username!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    hashed_password!: string; 

    /**
     * Hashes the password to a Bcrypt Hash
     * @param instance The user of the account
     */
    @BeforeCreate
    @BeforeUpdate
    @BeforeValidate
    private static HashPassword(instance: User): void {
        instance.hashed_password = hashSync(String(instance.dataValues.hashed_password) + String(instance.dataValues.username) + String(instance.dataValues.id));
    }
}

export default User;