/**
 * genRandData.js
 * Adds random testing data to the Database.
 * Also adds the admin account.
 */

import Faker from "faker";
import _ from "lodash";
import DB from "../db/dbMap";
import UsersTable from "../db/tables/users";
import BooksTable from "../db/tables/books";
import TransactionsTable from "../db/tables/transactions";
import SessionsTable from "../db/tables/sessions";

DB.sync({force: true})
.then(() => {
    UsersTable.create({
        firstName: 'admin',
        lastName: 'admin',
        userID: 'ADMIN0001',
        userType: "ADMINISTRATOR",
        username: "admin",
        password: "admin"
    })
    .then(() => {
        return _.times(10, (i) => {
            let firstName = Faker.name.firstName();
            let lastName = Faker.name.lastName(); 
    
            let userData = {
                firstName: firstName,
                lastName: lastName,
                userID: i,
                userType: "USER",
                username: Faker.internet.userName(firstName, lastName),
                password: Faker.internet.password(8, true)
            };
    
            console.log(userData);
    
            return UsersTable.create(userData);
        })
    })
    .then(() => {
        return BooksTable.create({
            title: "Testing Book",
            author: "Testing Author",
            ISBN: "TESTING-ISBN-TEST",
            isBorrowed: false
        })
    })
    .then(() => {
        return _.times(10, (i) => {
            BooksTable.create({
                title: Faker.hacker.adjective(),
                author: Faker.name.firstName(),
                ISBN: Faker.random.number({
                    min: 0,
                    max: 1000000000
                }),
                isBorrowed: false
            })
        })
    })
    .then(() => {
        return TransactionsTable.create({
            transactionType: "TESTING",
            transactionRemarks: "This is a test"
        })
    })
    .then(() => {
        return SessionsTable.create({
            token: "THIS IS A TESTING TOKEN"
        })
        .then((session) => {
            return session.destroy();
        })
    }) 
    .then(() => {
        process.exit(0);
    })
})