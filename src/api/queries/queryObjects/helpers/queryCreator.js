/*************************************************************************
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
 *************************************************************************/

/**
 * Creates an object that can be used to query for a table.
 * The pattern will must follow this:
 * - For each element in the array
 * [
 *  [<The key for the args object>], 
 *  [<The sequelize operator>],
 *  [<Optional: The function that will run first before storing at the end of the function>]
 * ]
 * @param {Array} array The array that holds all of the strings
 * @param {Object} args The object that holds all of the info that will be used for the query
 * @returns {Object} The object that holds all of the queries
 */
export default function queryCreator(array, args) {
    let query = {}
    array.forEach(element => {
        if(args[element[0]]) {
            query[element[0]] = {
                // Check if the 3rd element is not null or undefined
                [element[1]]: (element[2]) ? 
                                // Run the function if it exists
                                (element[2])(args[element[0]]) :
                                
                                // Otherwise store the value as is
                                args[element[0]]
            }
        }
    });
    console.log(query);

    return query;
}