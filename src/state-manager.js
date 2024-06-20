import { createContext, useState } from 'react';

const StateManagerContect = createContext({
	state: null,

	updateState: () => {},
});

const checkEmptyObject = (obj) => Object.keys(obj).length === 0;

const getUpdatedState = (state, newStateData) =>
	Array.isArray(newStateData)
		? updateStateArray(state, newStateData)
		: updateStateObject(state, newStateData);

const updateStateArray = (state, newStateData) =>
	newStateData.reduce((updateState, { id, ...newItemData }) => {
		const foundItem = state.find(({ id: itemId }) => itemId === id);

		if (!foundItem) {
			return [{ id, ...newItemData }, ...updateState];
		}

		if (checkEmptyObject(newItemData)) {
			return updateState.filter(({ id: idToCheck }) => idToCheck !== id);
		}

		return updateState.map((item) =>
			item.id === id ? { ...item, ...newItemData } : item,
		);
	}, state);

const updateStateObject = (state, newStateData) =>
	Object.entries(newStateData).reduce(
		(updatedState, [key, value]) => ({
			...updatedState,
			[key]:
				typeof value === 'object'
					? updateStateObject(state, newStateData)
					: value,
		}),
		state,
	);

export const StateManager = ({ children, initialState }) => {
	const [state, setState] = useState(initialState);

	const updateState = (newStateData) => setState(getUpdatedState(state, newStateData));

	return (
		<StateManagerContect.Provider value={{ state, updateState }}>
			{children}
		</StateManagerContect.Provider>
	);
};
