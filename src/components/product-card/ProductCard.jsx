import React from 'react'
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button'
import './product-card.styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  
  const cartItems = useSelector(selectCartItems)
  
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product))
  
  const { name, price, imageUrl } = product
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
    </div>
  )
}

export default ProductCard
