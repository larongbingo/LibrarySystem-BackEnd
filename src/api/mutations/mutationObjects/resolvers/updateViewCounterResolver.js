import DB from "../../../../db/dbMap";
import UserResponse from "../classes/responses/UserResponseClass";

function resolve(root, args) {
    return DB.models.bookViews.findOne({
        where: {
            id: args.bookId
        }
    })
    .then(book => {
        book.update({
            views_count: book.views_count + 1
        });

        return book;
    })
    .then((book) => {
        return new UserResponse(true, 0, {bookId: book.views_count})
    })
}

export default resolve;