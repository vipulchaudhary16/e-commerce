import './cart-icon.styles.scss'
import { ReactComponent as ShopingIcon } from '../../assets/shopping-bag.svg'
import { useDispatch, useSelector } from "react-redux"
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.slice'

const CartIcon = () => {
  const dispatch = useDispatch()

  const isCartOpen = useSelector(selectIsCartOpen) //selecting isCartOpen value from store
  const cartCount = useSelector(selectCartCount) //selecting cartCount value from store

  const toggleCart = () => dispatch(setIsCartOpen(!isCartOpen)) //dispatching action for setIsCartOpen

  return (
    <div className='cart-icon-container' onClick={() => toggleCart()}>
      <ShopingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon
