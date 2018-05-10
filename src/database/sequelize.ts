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

import { Sequelize, ISequelizeConfig } from "sequelize-typescript";
import { transports, Logger } from "winston";
import * as models from "./models";

var loggerObj = new Logger({
    level: "verbose",
    transports: [
        new transports.File({ 
            filename: "sequelize.test.logs.txt",
            json: false
        })
    ]
});

/**
 * Prints all messages as verbose logs to file
 * @param msg The message that needs to be printed
 */
function logger(msg: string) {
    loggerObj.log("verbose", msg);
}

export const config: ISequelizeConfig = {
    dialect: "mysql",
    database: "library_system_ts_db",
    username: "root",
    password: "root",
    logging: (process.env.NODE_ENV === "testing") ? logger : true
};

export const sequelize: Sequelize = new Sequelize(config);

sequelize.addModels([models.User]);
sequelize.addModels([models.Book]);
sequelize.addModels([models.Transaction]);
sequelize.addModels([models.Session]);

export default sequelize;