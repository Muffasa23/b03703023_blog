export const updatePosts = (posts) => {
    return{
        type:'UPDATE_POSTS',
        posts
    };
}

export const getTitle = (title) => {
    return{
        type:'GET_TITLE',
        title
    };
}

export const getTime = (time) => {
    return{
        type:'GET_TIME',
        time
    };
}

export const getContent = (content) => {
    return{
        type:'GET_CONTENT',
        content
    };
}

export const submit = () => {
    return{
        type:'SUBMIT',
    };
}

export const redirectFalse = () => {
    return{
        type:'REDIRECT_FALSE',
    };
}