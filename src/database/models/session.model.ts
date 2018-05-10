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

    public static LogIn(username: string, password_hash: string): Bluebird<boolean> {
        return new Bluebird(function(resolve, reject) {
            return User.findOne({
                where: {
                    username: username
                }
            })
            .then(user => {
                if(!user) {
                    resolve(false);
                    return;
                }

                compare(user.password, password_hash)
                .then((isSame) => {
                    if(isSame) {
                        let token = sign(user, process.env.KEY);
                        Session.create({sessionToken: token});
                    }

                    return isSame;
                })
                .then(resolve);
            })
            .catch(reject);
        });
    }
}

export default Session;