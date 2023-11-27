import * as httpRequest from '../util/httpRequest';

export const login = async (user) => {
    try {
        const res = await httpRequest.Post(`/auth/login`, user);
        return res;
    } catch (error) {
        console.log(error);
    }
};
