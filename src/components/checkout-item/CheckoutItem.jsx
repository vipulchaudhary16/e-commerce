import './checkout-item.styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, deleteCartItem, removeItemFromCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'

const CheckoutItem = ({ item }) => {
    const dispatch = useDispatch()
    let { name, quantity, imageUrl, price } = item
    const cartItems = useSelector(selectCartItems)

    const handleDeleteItem = (itemToRemove) => dispatch(deleteCartItem(cartItems, itemToRemove))
    const handleAddItem = (itemToAdd) => dispatch(addItemToCart(cartItems, itemToAdd))
    const handleRemoveItem = (itemToRemove) => dispatch(removeItemFromCart(cartItems, itemToRemove))

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt="" />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow"
                    onClick={() => handleRemoveItem(item)}
                >
                    &#10094;
                </div>
                <span className='value'>
                    {quantity}
                </span>
                <div className="arrow"
                    onClick={() => handleAddItem(item)}
                >
                    &#10095;
                </div>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button"
                onClick={() => {
                    handleDeleteItem(item)
                }}
            >&#10005;</div>
        </div>
    )
}

export default CheckoutItem