import Sequelize from "sequelize";

/**
 * Updates all of fields using the args object
 * @param {Object} data The result of account verification async function
 * @param {Array} args_array An array of fields that needs to be updated 
 * @param {Object} args The default paramter of GraphQL that holds all of the user passed data
 * @param {Sequelize} DB The Sequelize object that stores the table models
 * @param {String} table_name The name of the table that needs to be updated
 * @returns {String} The names of the fields that has been updated
 */
function updateFields(data, args_array, args, DB, table_name) {
    // Reset the log of changed fields
    let updatedFields = "";

    args_array.forEach((element) => {

        // Check all of the non null fields in the args
        if (args[element[0]]) {
            updatedFields += element[0] + ", ";

            updateGivenField(element, args, data);
        }
    });

    return updatedFields;
}

/**
 * Updates a SINGLE field using the element parameter
 * @param {Array} element An element in ARG_FIELDS
 * @param {Object} args The default parameter of GraphQL that holds all of the user passed data
 * @param {Object} data The result of account verification
 */
function updateGivenField(element, args, data, DB, table_name) {
    // Update all of the values
    DB.models[table_name].update(
        JSON.parse(`{"${element[1]}": "${args[element[0]]}"}`), 
        {
            where: {
                id: data.decoded.userId
            }
        }
    );
}

export default updateFields;