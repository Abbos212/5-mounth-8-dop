import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchAllBooks from '../../store/reducer/BookListCreated';
import BookLisItem from './BookLisItem';
import { fetchToAddItem } from '../../store/reducer/CartCreated';

const BookList = () => {

    const dispatch = useDispatch();
    const { books, booksError, bookListStatus } = useSelector((state) => state.bookList);
    const onAddToCart = (id) => dispatch(fetchToAddItem(id));

    useEffect(() => {
        dispatch(fetchAllBooks());
    }, []);

    const cases = {
        pending: 'loading...',
        // fulfilled: <BookLisItem books={books} anAddToCart={(id) => console.log('hello', id)} />,
        fulfilled: books.map((book) => (<BookLisItem key={`book-${book.id}`} book={book} onAddToCart={onAddToCart} />)),
        rejected: booksError,
    }

    

    // console.log(cases['pending']);

    return (
        <ul>
            {cases[bookListStatus]}
        </ul>
    );
}

export default BookList;
