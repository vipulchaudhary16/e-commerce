import './cart-icon.styles.scss'
import { ReactComponent as ShopingIcon } from '../../assets/shopping-bag.svg'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CartIcon = () => {
  const {isCartOpen, setIsCartOpen} = useContext(CartContext)

  return (
    <div className='cart-icon-container'>
      <ShopingIcon className='shopping-icon' onClick={()=>setIsCartOpen(!isCartOpen)}  />
      <span className='item-count'>0</span>
    </div>
  )
}

export default CartIcon