import React from 'react';
import classes from './BookList.module.css';
import {Button} from 'react-bootstrap';

const BookLisItem = ({ book, onAddToCart }) => {
    const { id, title, author, price, imgUrl } = book;

    const handleOnAddToCart = () => onAddToCart(id);

    return (<li className={classes.list_item}>
        <div className={classes.list_item_cover}>
            <img src={imgUrl} alt={`book-${title}`} />
        </div>

        <div className={classes.list_item_detail}>
            <h4>{title}</h4>
            <div>{author}</div>
            <div className={classes.list_item_price}>{price}$</div>
            <Button onClick={handleOnAddToCart}>Add to cart</Button>


            
        </div>
        
    </li>);

        

}

export default BookLisItem;
