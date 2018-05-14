export interface IBook {
    /**
     * The title of the book
     */
    title: string;

    /**
     * The author of the book
     */
    author: string;

    /**
     * The classification of the book
     */
    classification: string;

    /**
     * The DATABASE ID of the user that borrowed or reserved the book
     */
    userID: number;

    /**
     * A flag that indicates if the book is borrowed
     */
    isBorrowed: boolean;
}

export default IBook;