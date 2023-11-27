import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import style from './UpdateList.module.scss';
import Button from '@/components/Button';
import config from '@/config';
import * as movieService from '@/services/movies';
import * as listService from '@/services/lists';

const List = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const list = location.state;
    const [movies, setMovies] = useState([]);
    const [newList, setNewList] = useState({
        ...list,
    });

    useEffect(() => {
        const getAllMovie = async () => {
            try {
                const res = await movieService.getAllMovie();
                setMovies(res);
            } catch (error) {
                console.log(error);
            }
        };
        getAllMovie();
    }, []);

    const handleChange = (e) => {
        setNewList({ ...newList, [e.target.name]: e.target.value });
    };

    const handleSelect = (e) => {
        let value = Array.from(e.target.selectedOptions, (option) => option.value);
        setNewList({ ...newList, idMovies: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await listService.updateList(newList, list._id);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        navigate(config.routes.lists);
    };

    return (
        <div className={clsx(style['update-list'])}>
            <div className={clsx(style.header)}>
                <h1 className={clsx(style.title)}>List</h1>
                <Button small darkblue to={config.routes.createList}>
                    Create
                </Button>
            </div>
            <div className={clsx(style.show)}>
                <div className={clsx(style.item)}>
                    <label>ID:</label>
                    <span>{list._id}</span>
                </div>
                <div className={clsx(style.item)}>
                    <label>Title:</label>
                    <span>{list.title}</span>
                </div>
                <div className={clsx(style.item)}>
                    <label>Type:</label>
                    <span>{list.type}</span>
                </div>
                <div className={clsx(style.item)}>
                    <label>Genre:</label>
                    <span>{list.genre}</span>
                </div>
                <div className={clsx(style.item)}>
                    <label>List Id:</label>
                    <span>{list.idMovies.join(', ')}</span>
                </div>
            </div>
            <div className={clsx(style.update)}>
                <form action="" className={clsx(style.form)}>
                    <div className={clsx(style['form-group'])}>
                        <label htmlFor="title">Title</label>
                        <input type="text" value={newList.title} id="title" name="title" onChange={handleChange} />
                    </div>
                    <div className={clsx(style['form-group'])}>
                        <label htmlFor="genre">Genre</label>
                        <input type="text" value={newList.genre} id="genre" name="genre" onChange={handleChange} />
                    </div>
                    <div className={clsx(style['form-group'])}>
                        <label htmlFor="type">Type</label>
                        <input type="text" value={newList.type} id="type" name="type" onChange={handleChange} />
                    </div>
                    <div className={clsx(style['form-group'])}>
                        <label htmlFor="listId">List ID</label>
                        <textarea
                            type="text"
                            value={newList.idMovies.join(', ')}
                            id="listId"
                            name="idMovies"
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <Button small steal onClick={handleSubmit}>
                        Update
                    </Button>
                </form>
                <div className={clsx(style['list-movies'])}>
                    <label htmlFor="listMovie">List Movies</label>
                    <select
                        multiple
                        name="listMovie"
                        id="listMovie"
                        style={{ height: '300px' }}
                        onChange={handleSelect}
                        value={newList.idMovies}
                    >
                        {movies.map((movie) => (
                            <option key={movie._id} value={movie._id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default List;
