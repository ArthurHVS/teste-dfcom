import { createStore } from 'redux';
const INITIAL_STATE = {
    isLogged: false,
    userId: null,
    myFavs: []
};

function actions(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            {
                return { ...state, isLogged: true, myFavs: action.data.myFavs, userId: action.data.userId}
            }
        default:
            return state;
    }
}
const store = createStore(actions);

export default store
