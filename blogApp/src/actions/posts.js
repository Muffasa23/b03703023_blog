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

export const getContent = (content) => {
    return{
        type:'GET_Content',
        content
    };
}