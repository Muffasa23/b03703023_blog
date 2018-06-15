const initialState = {
    userInfo: [
        { username: 'Randy', role: 'admin', password: '123', created_at: '2018-06-13 11:08:33', updated_at: '2018-06-13 11:08:33'}
    ],
    isGuest: true,
    registerSuccess: false,
    currentUsername: '',
}

export function users(state=initialState, action){
    switch(action.type){
        case 'GET_LOGIN':
            return {...state, isGuest: false, currentUsername: action.user};
        case 'UPDATEUSERS':
            return{...state, userInfo: action.users, registerSuccess: true}
        default:
            return state;
    }
}