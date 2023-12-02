import * as httpRequest from '../util/httpRequest';

export const getAllList = async () => {
    const res = await httpRequest.Get('/lists', {
        headers: {
            token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
    });
    return res.data;
};

export const createList = async (list) => {
    const res = await httpRequest.Post('/lists/create', list, {
        headers: {
            token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
    });
    return res.data;
};

export const updateList = async (list, id) => {
    const res = await httpRequest.Patch(`/lists/${id}`, list, {
        headers: {
            token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
    });
    return res.data;
};

export const deleteList = async (id) => {
    const res = await httpRequest.Delete(`/lists/${id}`, {
        headers: {
            token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
    });
    return res.data;
};
