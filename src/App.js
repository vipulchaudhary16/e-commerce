import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Authentication from "./routes/authentication/Authentication";
import Checkout from "./components/checkout/Checkout";
import Home from "./routes/home/Home";
import Navigation from "./routes/navigation/Navigation";
import { Shop } from './routes/shop/Shop'
import { onAuthStateChangedListener } from "./utils/firebase/fireabase";
import { setCurrentUser } from "./store/user/user.action";

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		return onAuthStateChangedListener((user) => {
			dispatch(setCurrentUser(user))
		})
	}, [])
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index={true} element={<Home />} />
				<Route path="/shop/*" element={<Shop />} />
				<Route path="/auth" element={<Authentication />} />
				<Route path="/checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;
