## Redux

What is Redux?
- Redux is a predictable state container for JavaScript apps.

Why Redux?
- Redux is a state management library that can be used with any UI library/framework.
- By using Redux, we can avoid prop drilling.

Components of Redux
- Store: A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it.
- Action: Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.
- Reducer: Reducers specify how the application's state changes in response to actions sent to the store.
- Middleware: Middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.

Redux Flow
- Action -> Middleware -> Reducer -> Store -> React Component

Use selector
- useSelector is a hook that takes the current state as an argument and returns whatever data you want from it.

Use dispatch
- useDispatch is a hook that returns a reference to the dispatch function from the Redux store.

Reselect
- Reselect is a library for creating memoized selectors.

Redux Thunk
- Redux Thunk is a middleware that allows you to return functions, rather than just actions, within Redux. This allows for delayed actions, including working with promises.
