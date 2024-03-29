## Redux

### <u>What is Redux?</u>

- Redux is a predictable state container for JavaScript apps.

### <u>Why Redux?</u>

- Redux is a state management library that can be used with any UI library/framework.
- By using Redux, we can avoid prop drilling.

### <u>Components of Redux</u>

- Store: A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it.
- Action: Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.
- Reducer: Reducers specify how the application's state changes in response to actions sent to the store.
- Middleware: Middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.

### <u>Redux Flow</u>

- Action -> Middleware -> Reducer -> Store -> React Component

### <u>Use selector</u>

- useSelector is a hook that takes the current state as an argument and returns whatever data you want from it.

### <u>Use dispatch</u>

- useDispatch is a hook that returns a reference to the dispatch function from the Redux store.

### <u>Reselect</u>

- Reselect is a library for creating memoized selectors.

selector.js

```js
import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
	//first -> input selector
	[selectCategoryReducer],
	//output selector
	(categoriesSlice) => categoriesSlice.categories //run only when categoriesSlice changes
);

export const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories) => {
		console.log('selector called: category');
		return categories.reduce((acc, category) => {
			const { title, items } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {});
	}
);
```

### <u>Redux persist</u>

- Redux Persist takes your Redux state object and saves it to persisted storage. Then on app launch it retrieves this persisted state and saves it back to redux.

store.js

```js
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
//...other imports

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['user'],
};

//...other code for store

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const persistor = persistStore(store);
```

index.js

```js
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';

ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);
```

### <u>Redux Thunk</u>

- Redux Thunk is a middleware that allows you to return functions, rather than just actions, within Redux. This allows for delayed actions, including working with promises.

store.js

```js
import thunk from 'redux-thunk';
const middlewares = [thunk];
```

action.js

```js
import { getCategoriesAndDocuments } from '../../utils/firebase/fireabase';
import { createAction } from '../../utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

export const fetchCategoriesStart = () =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
	dispatch(fetchCategoriesStart());
	try {
		const categoriesArray = await getCategoriesAndDocuments();
		dispatch(fetchCategoriesSuccess(categoriesArray));
	} catch (error) {
		dispatch(fetchCategoriesFailed(error));
	}
};
```

component.js

```js
useEffect(() => {
	dispatch(fetchCategoriesAsync());
}, []);
```

### <u>Redux Saga</u>

- Redux Saga is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.
- It follows a pattern called CQRS (Command Query Responsibility Segregation).

#### How to use Redux Saga?

- Create a saga (categories.saga.js) file.

```js
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/fireabase';
import {
	fetchCategoriesFailed,
	fetchCategoriesSuccess,
} from './categories.action';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

//generator
export function* fetchCategoriesAsync() {
	try {
		const categoriesArray = yield call(getCategoriesAndDocuments, ''); //2nd args is parameter to function at 1st args
		yield put(fetchCategoriesSuccess(categoriesArray)); //dispatch --> put
	} catch (error) {
		yield put(fetchCategoriesFailed(error));
	}
}

export function* onFetchCategories() {
	yield takeLatest(
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
		fetchCategoriesAsync
	);
}

export function* categoriesSaga() {
	yield all([call(onFetchCategories)]);
}
```

- Create a root saga file.

```js
import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './categories/categories.saga';

export function* rootSaga() {
	yield all([call(categoriesSaga)]);
}
```

- Add saga middleware to store.js

```js
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

sagaMiddleware.run(rootSaga);

//...other code for store
```

- Dispatch action from component.

```js
const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCategoriesStart());
	}, []);
```



