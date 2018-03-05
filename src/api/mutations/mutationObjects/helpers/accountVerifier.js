
import JWT from "jsonwebtoken";
import DB from "../../../../db/dbMap";
import STATUS_CODES from "./statusCodes";

/**
 * Checks if the token is valid and has a valid session
 * @param {String} token The token of the user
 * @returns {Promise} The async process that will determine the response for the user
 */
export default function accountVerifier(token) {
    return new Promise((resolve, reject) => {
        // Check if the JWT is valid
        JWT.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            console.log(decoded);
            if(err || !decoded) {
                resolve(3);
            }
            else {
                // Check if the JWT has an entry at Sessions
                DB.models.sessions.findOne({
                    where: {
                        token: token
                    }
                })
                .then(token => {
                    if(!token) {
                        (resolve(4));
                    }
                    else {
                        // Check if the account associated with the account is still active
                        console.log(decoded.userId);
                        DB.models.users.findOne({
                            where: {
                                id: decoded.userId
                            }
                        })
                        .then(user => {
                            if(!user) {
                                resolve(9);
                            }
                            else {
                                // Send a message that account is active and valid
                                resolve({
                                    status_code: 0, 
                                    decoded, 
                                    isAdminOrStaff: decoded.position === "ADMINISTRATOR" || decoded.position === "STAFF"
                                });
                            }  
                        })
                    }
                })
            }
        });
    })
}