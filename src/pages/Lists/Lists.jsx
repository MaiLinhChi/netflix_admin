import { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { AiOutlineDelete, AiFillEdit } from 'react-icons/ai';

import style from './Lists.module.scss';
import Button from '@/components/Button';
import Table from '@/components/Table';
import config from '@/config';
import * as listService from '@/services/lists';
import { LoadingContext } from '@/context/LoadingContext/Loading';

const Lists = () => {
    const [lists, setLists] = useState([]);
    const { setLoading } = useContext(LoadingContext);

    useEffect(() => {
        const getListAll = async () => {
            try {
                setLoading(true);
                const res = await listService.getAllList();
                setLists(res);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getListAll();
    }, [setLoading]);

    const handleDelete = async (id) => {
        try {
            await listService.deleteList(id);
            const res = await listService.getAllList();
            setLists(res);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            accessor: 'title',
            Header: 'Title',
        },
        {
            accessor: 'genre',
            Header: 'Genre',
        },
        {
            accessor: 'type',
            Header: 'Type',
        },
        {
            accessor: 'idMovies',
            Header: 'List Movie ID',
            Cell: (params) => {
                return params.row?.original.idMovies.map((item, index) => <div key={index}>{item}</div>);
            },
        },
        {
            Header: 'Action',
            Cell: (params) => {
                return (
                    <>
                        <Button to={'/list/' + params.row?.original._id} state={params.row?.original}>
                            <AiFillEdit className={clsx(style['edit-icon'])} />
                        </Button>
                        <AiOutlineDelete
                            className={clsx(style.icon)}
                            onClick={() => handleDelete(params.row?.original._id)}
                        />
                    </>
                );
            },
        },
    ];
    return (
        <div className={clsx(style.lists)}>
            <div className={clsx(style.header)}>
                <h1 className={clsx(style.title)}>Lists</h1>
                <Button small darkblue to={config.routes.createList}>
                    Create
                </Button>
            </div>
            <Table data={lists} columns={columns} />
        </div>
    );
};

export default Lists;
