export interface ITransaction {
    /**
     * The Database ID of the user that was involved in the transaction
     */
    userID: number;

    /**
     * The Database ID of the book that was involved in the transaction
     */
    bookID: number;

    /**
     * The Database ID of the admin user that processes the user
     */
    adminUserID: number;
    
    /**
     * The title of the transaction that happened
     */
    type: string;

    /**
     * Remark or comment of the transaction
     */
    comment: string;
}

export default ITransaction;