/**
 * syncDB.js
 * Syncs the changes from the ORM to the Database.
 * It only adds the admin account.
 */

import DB from "../db/dbMap";
import UsersTable from "../db/tables/users";
import BooksTable from "../db/tables/books";
import TransactionsTable from "../db/tables/transactions";

DB.sync({force: true}).then(() => {
    return UsersTable.create({
        firstName: 'admin',
        lastName: 'admin',
        userID: 'ADMIN0001',
        userType: "ADMINISTRATOR",
        username: "admin",
        password: "admin"
    }).then((user) => {
        return BooksTable.create({
            title: "Testing Book",
            author: "Testing Author",
            ISBN: "TESTING-ISBN-TEST",
            isBorrowed: false
        })
        .then(book => {
            if(process.env.NODE_ENV === "production")
                book.destroy();
        })
    }).then(() => {
        return TransactionsTable.create({
            transactionType: "TESTING",
            transactionRemarks: "This is a test"
        })
        .then(transaction => {
            if(process.env.NODE_ENV === "production")
                transaction.destroy();
        })
    }).then(() => {
        DB.close();
        process.exit(0);
    })
});
