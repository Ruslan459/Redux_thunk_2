import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { todosReducer, editingTodoReducer, optionReducer } from './reducers';

const reducer = combineReducers({
	todos: todosReducer,
	editingTodo: editingTodoReducer,
	options: optionReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
