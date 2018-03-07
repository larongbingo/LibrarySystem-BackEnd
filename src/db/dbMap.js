/**
 * dbMap.js
 * Sets the relationships between each table
 * 
 * License
 * The Library System Back End, handles all of the CRUD operations
 * of the CvSU Imus Library System
 * Copyright (C) 2018  Renz Christen Yeomer A. Pagulayan
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Imports
import DB from "./dbConn";
import UsersTable from "./tables/users";
import BooksTable from "./tables/books";
import TransactionsTable from "./tables/transactions";
import SessionsTable from "./tables/sessions";
import BookViewsTable from "./tables/book_views";

// Many Books to One User
UsersTable.hasMany(BooksTable);
BooksTable.belongsTo(UsersTable);

// Many Transactions to One User
UsersTable.hasMany(TransactionsTable);
TransactionsTable.belongsTo(UsersTable);

// Many Transactions to One Book
BooksTable.hasMany(TransactionsTable);
TransactionsTable.belongsTo(BooksTable);

// One Book to One BookViews
BooksTable.hasOne(BookViewsTable);
BookViewsTable.belongsTo(BooksTable);

export default DB;