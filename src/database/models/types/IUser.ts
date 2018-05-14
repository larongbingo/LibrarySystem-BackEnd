
/**
 * The columns that can be found in the User Model
 */
export interface IUser {
    /**
     * The First Name of the user
     */
    firstName: string;
    
    /**
     * The Last Name of the user
     */
    lastName: string;

    /**
     * The email addresss of the user
     */
    email: string;

    /**
     * The account type of the account
     */
    accountType?: string;

    /**
     * The username of the account
     */
    username: string;

    /**
     * The HASHED password of the account
     */
    hashed_password: string; 
}

export default IUser;