/**
 * syncDB.js
 * Syncs the changes from the ORM to the Database.
 * It only adds the admin account.
 */

import DB from "../db/dbMap";

DB.sync({force: true})
.then(() => {
    return DB.models.users.create({
        firstName: 'admin', 
        lastName: 'admin',
        userID: 'ADMIN0001',
        userType: "ADMINISTRATOR",
        username: "admin",
        password: "admin"
    });
})
.then(() => {
    process.exit(0);
})
