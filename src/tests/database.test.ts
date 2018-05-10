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

//#region References

import sequelize, { Book, User, Transaction, Session } from "database";
import { expect, assert } from "chai";
import { Logger, transports } from "winston";
import * as Bluebird from "bluebird";
import { times } from "lodash";
import "mocha";
import { resolve } from "url";

//#endregion

//#region CustomTypes

interface IUser {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
};

interface IBook {
    title: string;
    author: string;
    classification?: string;
    userID?: number;
}

//#endregion

const SIZE: number = 50;

//#region GlobalHelpers

const loggerObject = new Logger({
    level: "verbose",
    transports: [
        new transports.File({
            filename: "test.logs.txt",
            json: false
        })
    ]
});

function logMessageAndObjects(message: string, ...objects: Object[]) {
    loggerObject.log("verbose", message);
    objects.forEach(function(object) {
        loggerObject.log("verbose", JSON.stringify(object));
    })
}

//#endregion

describe("Database Tests", function() {
    before("Sync Tables", function() {
        this.timeout(5000);
        return sequelize.sync({force: true});
    });

    describe("Sequelize - Database Connection", function() {
        it("should authenticate with the database server", function() {
            return sequelize.authenticate();
        });
    });

    describe("Model Tests", function() {
        describe("User Model", function() {
            it(`should store ${SIZE} random User details`, function() {
                return new Bluebird(function(res, rej) {
                    let userDetails: IUser[] = [];
    
                    const tempUser: IUser = {
                        firstName: "A",
                        lastName: "B",
                        username: "C",
                        password: "D",
                        email: "ASD"
                    };
    
                    times(SIZE, function() {
                        userDetails.push(tempUser);
                    });
    
                    sequelize.models.User
                    .bulkCreate(userDetails)
                    .then(res)
                    .catch(rej);
                });
            });
    
            it(`should have a length of ${SIZE} when findAll is invoked`, function() {
                return sequelize.models.User
                .findAndCountAll()
                .then(function(data) {
                    expect(data.count).equal(SIZE);
                })
                .catch((data) => assert.fail(data, SIZE, `data.count not equal to ${SIZE}`));
            });
    
            it(`should delete all ${SIZE} Users`, function() {
                return new Bluebird(function(res, rej) {
                    sequelize.models.User
                    .destroy({
                        truncate: true,
                        force: true
                    })
                    .then(res)
                    .catch(rej);
                });
            });
    
            it(`should have a length of 1 when findAll is invoked`, function() {
                return sequelize.models.User
                .findAndCountAll()
                .then(function(data) {
                    expect(data.count).equal(0);
                })
                .catch((data) => assert.fail(data, 0, "data.count not equal to 0"));
            });
        });
    
        describe("Book Model", function() {
            it(`should store ${SIZE} random Book details`, function() {
                return new Bluebird(function(res, rej) {
                    let bookDetails: IBook[] = [];
    
                    const tempBook: IBook = {
                        title: "A",
                        author: "B",
                        classification: "C",
                        userID: null
                    };
    
                    times(SIZE, () => bookDetails.push(tempBook));
    
                    sequelize.models.Book
                    .bulkCreate(bookDetails)
                    .then(res)
                    .catch(rej);
                });
            });
    
            it(`should have a length of ${SIZE} when findAll is invoked`, function() {
                return sequelize.models.Book
                .findAndCountAll()
                .then(function(data) {
                    expect(data.count).equal(SIZE);
                })
                .catch((data) => assert.fail(data, SIZE, `the count of books did not match ${SIZE} or an error occurred`));
            });
    
            it(`should delete all ${SIZE} Books`, function() {
                return new Bluebird(function(res, rej) {
                    sequelize.models.Book
                    .destroy({
                        truncate: true,
                        force: true
                    })
                    .then(res)
                    .catch(rej);
                });
            });
    
            it(`should have a length of 1 when findAll is invoked`, function() {
                return sequelize.models.Book
                .findAndCountAll()
                .then(function(data) {
                    expect(data.count).equal(0);
                })
                .catch((data) => assert.fail(data, 0, `value did not match or an error occurred`));
            });
        });

        describe("Transaction Model", function() {
            it(`should have a length of ${SIZE * 2} after running Books and Users Tests`, function() {
                return new Bluebird(function(resolve, reject) {
                    return Transaction
                    .findAndCountAll()
                    .then(vals => expect(vals.count).equal(SIZE * 2))
                    .then(resolve)
                    .catch(reject);
                });
            });
        }); 

        describe("Session Model", function() {
            before(`Create ${SIZE} Users`, function() {

            });

            after(`Delete ${SIZE} Users`, function() {
                
            });

            it(`should have ${SIZE} Sessions`);
        });
    });

    describe("Model Relationship Tests", function() {
        describe("Book - User Relationship", function() {

            //#region Constants

            const users: IUser[] = [
                {
                    firstName: "AB",
                    lastName: "AB",
                    username: "AB",
                    password: "AB",
                    email: "AB"
                },
                {
                    firstName: "BA",
                    lastName: "BA",
                    username: "BA",
                    password: "BA",
                    email: "BA"
                }
            ];

            const books: IBook[] = [
                {
                    title: "A",
                    author: "A"
                },
                {
                    title: "B",
                    author: "B"
                }
            ];

            //#endregion

            //#region LocalHelpers

            function findUser0() {
                return User.findOne({where: users[0]});
            }

            function findUser1() {
                return User.findOne({where: users[1]});
            }

            function findBook0() {
                return Book.find({where: books[0]});
            }

            function findBook1() {
                return Book.find({where: books[1]});
            }

            //#endregion

            before("Add Users and Books for Testing", function() {
                return new Bluebird(function(resolve, reject) {
                    return Bluebird
                    .all([
                        User.bulkCreate(users),
                        Book.bulkCreate(books)
                    ])
                    .then(resolve)
                    .catch(reject);
                });
            });

            describe("Expected Behaviors", function() {
                it("Updates when User0 reserves Book0", function() {
                    return new Bluebird(function(resolve, reject) {
                        return findUser0()
                        .then(user => {
                            return findBook0()
                            .then(book => {
                                logMessageAndObjects("Updates when User0 reserves Book0", user, book);
                                return book.MarkBookAsReserved(user);
                            })
                            .then(status => expect(status).equal(true))
                            .then(resolve)
                        })
                        .catch(reject)
                    });
                });
    
                it("Updates when reservation is cancelled on Book0", function() {
                    return new Bluebird(function(resolve, reject) {
                        return findBook0()
                        .then(book => {
                            logMessageAndObjects("Updates when reservation is cancelled on Book0", book);
                            return book.RemoveMarkReserved();
                        })
                        .then(status => expect(status).equal(true))
                        .then(resolve)
                        .catch(reject);
                    });
                });
    
                it("Updates when User0 borrows Book0", function() {
                    return new Bluebird(function(resolve, reject) {
                        return findUser0()
                        .then(user => {
                            return findBook0()
                            .then(book => {
                                logMessageAndObjects("Updates when User0 borrows Book0", user, book);
                                return book.MarkBookAsBorrowed(user)
                            })
                            .then(status => expect(status).equal(true))
                            .then(resolve);
                        })
                        .catch(reject);
                    });
                });
    
                it("Updates when User0 returns Book0", function() {
                    return new Bluebird(function(resolve, reject) {
                        return findUser0()
                        .then(user => {
                            return findBook0()
                            .then(book => {
                                logMessageAndObjects("Updates when User0 returns Book0", user, book);
                                return book.MarkBookAsReturned();
                            })
                            .then(status => expect(status).equal(true))
                            .then(resolve)
                        })
                        .catch(reject);
                    });
                });
    
                it("Updates when User0 reserves Book0", function() {
                    return new Bluebird(function(resolve, reject) {
                        return findUser0()
                        .then(user => {
                            return findBook0()
                            .then(book => {
                                logMessageAndObjects("Updates when User0 reserves Book0", user, book);
                                return book.MarkBookAsReserved(user);
                            })
                            .then(status => expect(status).equal(true))
                            .then(resolve)
                        })
                        .catch(reject)
                    });
                });
                
                it("Updates when User1 reserves Book1", function() {
                    return new Bluebird(function(resolve, reject) {
                        return findUser1()
                        .then(user => {
                            return findBook1()
                            .then(book => {
                                logMessageAndObjects("Updates when User1 reserves Book1", user, book);
                                return book.MarkBookAsReserved(user);
                            })
                            .then(status => expect(status).equal(true))
                            .then(resolve)
                        })
                        .catch(reject)
                    });
                });
    
                it("Updates when reservation is cancelled on Book1", function() {
                    return new Bluebird(function(resolve, reject) {
                        return findBook1()
                        .then(book => {
                            logMessageAndObjects("Updates when reservation is cancelled on Book1", book);
                            return book.RemoveMarkReserved();
                        })
                        .then(status => expect(status).equal(true))
                        .then(resolve)
                        .catch(reject);
                    });
                });
    
                it("Updates when User1 borrows Book1", function() {
                    return new Bluebird(function(resolve, reject) {
                        return findUser1()
                        .then(user => {
                            return findBook1()
                            .then(book => {
                                logMessageAndObjects("Updates when User1 borrows Book1", user, book);
                                return book.MarkBookAsBorrowed(user)
                            })
                            .then(status => expect(status).equal(true))
                            .then(resolve);
                        })
                        .catch(reject);
                    });
                });
    
                it("Updates when User1 returns Book1", function() {
                    return new Bluebird(function(resolve, reject) {
                        return findUser1()
                        .then(user => {
                            return findBook1()
                            .then(book => {
                                logMessageAndObjects("Updates when User1 returns Book1", user, book);
                                return book.MarkBookAsReturned();
                            })
                            .then(status => expect(status).equal(true))
                            .then(resolve)
                        })
                        .catch(reject);
                    });
                });
    
                it("Updates when User1 reserves Book1", function() {
                    return new Bluebird(function(resolve, reject) {
                        return findUser1()
                        .then(user => {
                            return findBook1()
                            .then(book => {
                                logMessageAndObjects("Updates when User1 reserves Book1", user, book);
                                return book.MarkBookAsReserved(user);
                            })
                            .then(status => expect(status).equal(true))
                            .then(resolve)
                        })
                        .catch(reject)
                    });
                });
            });
            
            describe("Unexpected Behaviors", function() {
                it("Doesn't update when User0 borrows Book1", function() {
                    return new Bluebird(function(resolve, reject) {
                        findUser0()
                        .then(user => {
                            return findBook1()
                            .then(book => book.MarkBookAsBorrowed(user))
                            .then(status => expect(status).equal(false))
                            .then(resolve);
                        }) 
                        .catch(reject);
                    });
                });

                it("Doesn't update when User0 reserves Book1", function() {
                    return new Bluebird(function(resolve, reject) {
                        return findUser0()
                        .then(user => {
                            return findBook1()
                            .then(book => book.MarkBookAsReserved(user))
                            .then(status => expect(status).equal(false))
                            .then(resolve)
                        })
                        .catch(reject);
                    })
                });

                it("Doesn't update when User1 borrows Book0", function() {
                    return new Bluebird(function(resolve, reject) {
                        return findUser1()
                        .then(user => {
                            return findBook0()
                            .then(book => book.MarkBookAsBorrowed(user))
                            .then(status => expect(status).equal(false))
                            .then(resolve);
                        })
                        .catch(reject);    
                    })
                });

                it("Doesn't update when User1 reserves Book0", function() {
                    return new Bluebird(function(resolve, reject) {
                        return findUser1()
                        .then(user => {
                            return findBook0()
                            .then(book => book.MarkBookAsReserved(user))
                            .then(status => expect(status).equal(false))
                            .then(resolve);
                        })
                        .catch(reject);    
                    })
                });
            });
        });
    });
});