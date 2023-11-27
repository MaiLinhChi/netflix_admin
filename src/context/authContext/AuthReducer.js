const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                error: false,
            };
        case 'LOGIN_FAILURE':
            return {
                user: null,
                error: true,
            };
        case 'LOGOUT':
            return {
                user: null,
                error: false,
            };
        default:
            return { ...state };
    }
};

export default AuthReducer;
