import * as httpRequest from '../util/httpRequest';

export const getStats = async (user) => {
    const res = await httpRequest.Get('/users/stats', {
        headers: {
            token: `Bearer ${user.accessToken}`,
        },
    });
    return res.data;
};

export const getUsers = async (user, isNew = false) => {
    const res = await httpRequest.Get('/users', {
        params: {
            new: isNew,
        },
        headers: {
            token: `Bearer ${user.accessToken}`,
        },
    });
    return res.data;
};

export const createUser = async (user) => {
    const res = await httpRequest.Post('/users/create', user, {
        headers: {
            token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
    });
    return res.data;
};

export const updateUser = async (user, id) => {
    const res = await httpRequest.Patch(`/users/${id}`, user, {
        headers: {
            token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
    });
    return res.data;
};

export const deleteUser = async (id) => {
    const res = await httpRequest.Delete(`/users/${id}`, {
        headers: {
            token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
    });
    return res.data;
};
