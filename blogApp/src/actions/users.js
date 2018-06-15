export const updateUsers = (users) => {
    return{
        type:'UPDATE_USERS',
        users
    };
}

export const userLogin = (user) => {
    return{
        type:'GET_LOGIN',
        user
    };
}