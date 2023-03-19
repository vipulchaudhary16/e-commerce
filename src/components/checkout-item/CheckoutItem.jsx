import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import './checkout-item.styles.scss'

const CheckoutItem = ({ item }) => {
    let { name, quantity, imageUrl, price } = item
    const { deleteCartItem } = useContext(CartContext)
    
    const handleRemoveItem = (itemToRemove) => {
        deleteCartItem({ ...itemToRemove, quantity: 1 })
    }
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt="" />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">{quantity}</span>
            <span className="price">{price}</span>
            <div className="remove-button"
                onClick={() => {
                    handleRemoveItem(item)
                }}
            >&#10005;</div>
        </div>
    )
}

export default CheckoutItem