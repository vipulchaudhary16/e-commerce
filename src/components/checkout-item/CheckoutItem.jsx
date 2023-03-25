import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import './checkout-item.styles.scss'

const CheckoutItem = ({ item }) => {
    let { name, quantity, imageUrl, price } = item
    const { addItemTocart, removeItemFromCart, deleteCartItem } = useContext(CartContext)
    const handleDeleteItem = (itemToRemove) => deleteCartItem({ ...itemToRemove, quantity: 1 })
    const handleAddItem = (itemToAdd) => addItemTocart(itemToAdd)
    const handleRemoveItem = (itemToRemove) => removeItemFromCart(itemToRemove)
    
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