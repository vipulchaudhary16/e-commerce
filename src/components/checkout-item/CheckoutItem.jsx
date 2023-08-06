import './checkout-item.styles.scss';
import { useDispatch } from 'react-redux';
import {
	addItemToCart,
	deleteCartItem,
	removeItemFromCart,
} from '../../store/cart/cart.slice';

const CheckoutItem = ({ item }) => {
	const dispatch = useDispatch();
	let { name, quantity, imageUrl, price } = item;
	const handleDeleteItem = (itemToDelete) =>
		dispatch(deleteCartItem(itemToDelete));
	const handleAddItem = (itemToAdd) => dispatch(addItemToCart(itemToAdd));
	const handleRemoveItem = (itemToRemove) =>
		dispatch(removeItemFromCart(itemToRemove));

	return (
		<div className='checkout-item-container'>
			<div className='image-container'>
				<img src={imageUrl} alt='' />
			</div>
			<span className='name'>{name}</span>
			<span className='quantity'>
				<div className='arrow' onClick={() => handleRemoveItem(item)}>
					&#10094;
				</div>
				<span className='value'>{quantity}</span>
				<div className='arrow' onClick={() => handleAddItem(item)}>
					&#10095;
				</div>
			</span>
			<span className='price'>{price}</span>
			<div
				className='remove-button'
				onClick={() => {
					handleDeleteItem(item);
				}}
			>
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;
