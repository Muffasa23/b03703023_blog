const initialState = {
    newPostTitle:'',
    newPostContent: '',
    totalPost:[],
    currentTitle:'',
    currentContent:''
}

export function posts(state=initialState, action){
    switch(action.type){
        case 'GET_TITLE':
            return {...state, newPostTitle: action.title};
        case 'GET_CONTENT':
            return{...state, newPostContent: action.content};
        case 'UPDATE_POSTS':
            return{...state, totalPost: action.posts}
        default:
            return state;
    }
}