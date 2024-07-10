import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Todo, ControlPanel } from '../components';
import { selectTodos, selectSearchPhrase, selectIsAlphabetSorting } from '../selectors';
import { readTodoAsync } from '../actions';
import styles from './app.module.css';

export const App = () => {
	const todos = useSelector(selectTodos);
	const searchPhrase = useSelector(selectSearchPhrase);
	const isAlphabetSorting = useSelector(selectIsAlphabetSorting);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(readTodoAsync(searchPhrase, isAlphabetSorting));
	}, [searchPhrase, isAlphabetSorting]);

	return (
		<div className={styles.App}>
			<ControlPanel />
			<div className={styles.todos}>
				{todos.map(({ id, title, completed }) => (
					<Todo key={id} id={id} title={title} completed={completed} />
				))}
			</div>
		</div>
	);
};
