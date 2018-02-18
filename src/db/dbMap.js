/**
 * dbMap.js
 * Sets the relationships between each table
 */

// Imports
import DB from "./dbConn";
import UsersTable from "./tables/users";
import BooksTable from "./tables/books";
import TransactionsTable from "./tables/transactions";
import SessionsTable from "./tables/sessions";

// Many Books to One User
UsersTable.hasMany(BooksTable);
BooksTable.belongsTo(UsersTable);

// Many Transactions to One User
UsersTable.hasMany(TransactionsTable);
TransactionsTable.belongsTo(UsersTable);

// Many Transactions to One Book
BooksTable.hasMany(TransactionsTable);
TransactionsTable.belongsTo(BooksTable);

export default DB;