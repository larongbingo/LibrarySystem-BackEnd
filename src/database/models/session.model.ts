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

import { Model, Column, Table, DataType, AllowNull } from "sequelize-typescript";
import * as Bluebird from "bluebird";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "./user.model";

@Table({ timestamps: true })
export class Session extends Model<Session> {
    @AllowNull(false)
    @Column(DataType.STRING)
    sessionToken!: string;

    /**
     * Adds a new hash if the given credentials are valid
     * @param username The username of the account
     * @param password_hash The password of the account
     * @returns returns a string if the credentials are valid, returns null if otherwise
     */
    public static LogIn(username: string, password_hash: string): Bluebird<string | null> {
        return new Bluebird(function(resolve, reject) {
            return User.findOne({
                where: {
                    username: username
                }
            })
            .then(user => {
                if(!user) {
                    resolve(null);
                    return;
                }

                compare(password_hash, user.password)
                .then(isSame => {
                    if(!isSame) {
                        resolve(null);
                        return;
                    }

                    resolve(sign(user, process.env.KEY));
                })
            })
            .catch(reject);
        });
    }

    /**
     * Removes the given sessionToken from the database
     * @param sessionToken The token that needs to be removed
     * @returns true if successfully removed, false otherwise
     */
    public static LogOut(sessionToken: string): Bluebird<boolean> {
        return new Bluebird(function(resolve, reject) {
            return Session.findOne({
                where: {
                    sessionToken: sessionToken
                }
            })
            .then(session => {
                if(!session) {
                    resolve(false);
                    return;
                }
                else {    
                    session
                    .destroy()
                    .then(() => resolve(true));
                }
            })
            .catch(reject);
        });
    }

    /**
     * Checks if the given hash is stored in the Sessions Table/Model
     * @param sessionToken The token that needs to be validated
     */
    public static VerifyToken(sessionToken: string): Bluebird<boolean> {
        return new Bluebird(function(resolve, reject) {
            return Session
            .findOne({
                where: {
                    sessionToken: sessionToken
                }
            })
            .then(session => resolve(Boolean(session)))
            .catch(reject);
        });
    }
}

export default Session;