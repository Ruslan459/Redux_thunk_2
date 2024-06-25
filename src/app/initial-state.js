export const initialState = {
	todos: [],
	editingTodo: {
		id: null,
		title: '',
	},
	options: {
		searchInput: '',
		searchPhrase: '',
		isAplhabetSorting: false,
		isLoading: true,
	},
};
