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

import sequelize, { Session } from "database";

describe("Database Unit Tests", function() {
    before("Sync Tables and Models", function() {
        return sequelize.sync({ force: true });
    });

    describe("Session Model Functions", function() {
        describe("LogIn", function() {
            
        });

        describe("LogOut", function() {

        });

        describe("VerifyToken", function() {

        });
    });
});