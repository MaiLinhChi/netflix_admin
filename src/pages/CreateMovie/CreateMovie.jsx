import { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { storage, ref, uploadBytesResumable, getDownloadURL } from '@/firebase/config';
import style from './CreateMovie.module.scss';
import Button from '@/components/Button';
import * as movieService from '@/services/movies';
import config from '@/config';

const CreateMovie = () => {
    const [movie, setMovie] = useState({ type: 'movie' });
    const [uploaded, setUploaded] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        let value;
        if (e.target.type === 'file') {
            value = e.target.files[0];
        } else {
            value = e.target.value;
        }
        setMovie({ ...movie, [e.target.name]: value });
    };

    const upload = (items) => {
        items.forEach((item) => {
            const fileName = new Date().getTime() + item.label;
            let storageRef = ref(storage, `/${item.type}/${item.page}/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress === 100) {
                        setUploaded(true);
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setMovie((prev) => ({ ...prev, [item.label]: url }));
                    });
                },
            );
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            { file: movie.trailer, label: 'trailer', type: 'videos', page: 'movies' },
            { file: movie.imageTitle, label: 'imageTitle', type: 'images', page: 'movies' },
            { file: movie.imageSmall, label: 'imageSmall', type: 'images', page: 'movies' },
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await movieService.createMovie(movie);
        navigate(config.routes.movies);
    };

    return (
        <div className={clsx(style['create-movie'])}>
            <h1 className={clsx(style.title)}>New Movie</h1>
            <form className={clsx(style.form)}>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="imgTitle">Title Image</label>
                    <input type="file" id="imgTitle" name="imageTitle" onChange={handleChange} />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="imgSm">Thumbnail Image</label>
                    <input type="file" id="imgSm" name="imageSmall" onChange={handleChange} />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="movieTrailer">Trailer</label>
                    <input type="file" id="movieTrailer" name="trailer" onChange={handleChange} />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="img">Image</label>
                    <input type="text" placeholder="Image" id="img" name="image" onChange={handleChange} />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="movieVideo">Video</label>
                    <input type="text" id="movieVideo" placeholder="Video" name="video" onChange={handleChange} />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="movieTitle">Title</label>
                    <input type="text" placeholder="Title" id="movieTitle" name="title" onChange={handleChange} />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        placeholder="Description"
                        id="description"
                        name="description"
                        onChange={handleChange}
                    />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="year">Year</label>
                    <input type="text" placeholder="Year" id="year" name="year" onChange={handleChange} />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="limit">Limit</label>
                    <input type="text" placeholder="Limit" id="limit" name="limit" onChange={handleChange} />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="duration">Duration</label>
                    <input type="text" placeholder="Duration" id="duration" name="duration" onChange={handleChange} />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="country">Country</label>
                    <input type="text" placeholder="Country" id="country" name="country" onChange={handleChange} />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="genre">Genre</label>
                    <input type="text" placeholder="Genre" id="genre" name="genre" onChange={handleChange} />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="starring">Starring</label>
                    <input type="text" placeholder="Starring" id="starring" name="starring" onChange={handleChange} />
                </div>
                <div className={clsx(style['form-group'])}>
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type" onChange={handleChange}>
                        <option value="movies">Movies</option>
                        <option value="series">Series</option>
                    </select>
                </div>
                <div style={{ width: '100%' }}>
                    {uploaded ? (
                        <Button small darkblue onClick={handleSubmit}>
                            Create
                        </Button>
                    ) : (
                        <Button small darkblue onClick={handleUpload}>
                            Upload
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateMovie;
