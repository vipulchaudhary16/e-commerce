import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import CheckoutItem from '../checkout-item/CheckoutItem'
import './checkout.styles.scss'

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext)
    return (
        <div className='checkout-container'>
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((item) => {
                    let { id } = item
                    return (
                        <CheckoutItem item={item} key={id}/>
                    )
                })
            }
            <span className='total' >Total: {cartTotal}</span>
        </div>
    )
}

export default Checkout