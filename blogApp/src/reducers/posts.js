const initialState = {
    totalPost:[],
    currentTitle:'',
    currentContent:'',
    currentTime:'',
    redirect: false,
}

export function posts(state=initialState, action){
    switch(action.type){
        case 'GET_TITLE':
            return {...state, currentTitle: action.title};
        case 'GET_TIME':
            return{...state, currentTime: action.time};
        case 'GET_CONTENT':
            return{...state, currentContent: action.content};
        case 'UPDATE_POSTS':
            return{...state, totalPost: action.posts}
        case 'SUBMIT':
            return{...state, redirect: true}
        case 'REDIRECT_FALSE':
            return{...state, redirect: false}
        default:
            return state;
    }
}