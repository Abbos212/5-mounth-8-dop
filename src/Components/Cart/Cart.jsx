import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import fetchAllCartItems, { fetchToAddItem, fetchToRemuveItem, fetchToDeleteItem } from '../../store/reducer/CartCreated';




const Cart = () => {

    

    const dispatch = useDispatch();
    const { cart, cartError, cartStatus } = useSelector((state) => state.cartList);

    useEffect(() => {
        dispatch(fetchAllCartItems());
    }, [])
    function getTotalSum(){
        let totalsum = 0
        cart.map((book) =>{
            totalsum += book.total
        })
        return totalsum
    }

    const renderItem = (item, idx) => {
        const { title, id, count, total } = item;
        const onAddToCart = () => dispatch(fetchToAddItem(id));
        const onRemuveCart = () => dispatch(fetchToRemuveItem(id));
        const onDeleteCart = () => dispatch(fetchToDeleteItem(id));


        return (
            <tr key={`item-${id}`}>
                <td>{idx + 1}</td>
                <td>{title}</td>
                <td>{count}</td>
                <td>{total}$</td>
                <td>
                    <Button onClick={onAddToCart} className="mx-1" variant='outlin-success'>
                        <i className='fa-solid fa-plus'></i>
                    </Button>
                    <Button onClick={onRemuveCart} className="mx-1" variant='outlin-success'>
                        <i className='fa-solid fa-minus'></i>
                    </Button>
                    <Button onClick={ onDeleteCart } className="mx-1" variant='outlin-success'>
                        <i className='fa-solid fa-trash'></i>
                    </Button>
                </td>
            </tr>
        )
    };

    const cases = {
        pending: <Spinner style={{ margin: '100px auto' }} />,
        // fulfilled: cart.map((item) => renderItem(item)),
        rejected: <div style={{ textAlign: 'center' }}>{cartError}</div>,
        empty: <div style={{ textAlign: 'center' }}>No data</div>,
    }

    return (
        <div>
            <h1>Your order</h1>
            {cartStatus === "fulfilled" ? (
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Count</th>
                            <th>Total</th>
                            <th>Action</th>



                        </tr>
                    </thead>

                    <tbody>
                        {cart.map(renderItem)}
                    </tbody>
                </Table>
            ) : (
                cases[cartStatus]
            )

            }

      <div>Общая цена: {
        getTotalSum()
        }$</div>

        </div>
    );
}

export default Cart;
