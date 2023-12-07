import { useState, useEffect } from "react";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";

import style from "./UpdateMovie.module.scss";
import Button from "@/components/Button";
import { routes } from "@/config";

const UpdateMovie = () => {
  const location = useLocation();
  const movie = location.state;
  const [imageTitle, setImageTitle] = useState({});
  const [imageSmall, setImageSmall] = useState({});
  const [newMovie, setNewMovie] = useState({
    ...movie,
    genre: movie.genre.join(", "),
    starring: movie.starring.join(", "),
  });

  useEffect(() => {
    return () => imageTitle.preview && URL.revokeObjectURL(imageTitle.preview);
  }, [imageTitle]);
  useEffect(() => {
    return () => imageSmall.preview && URL.revokeObjectURL(imageSmall.preview);
  }, [imageSmall]);

  const handleChange = (e) => {
    if (e.target.name === "imageTitle") {
      if (e.target.files[0]) {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImageTitle(file);
      }
    } else if (e.target.name === "imageSmall") {
      if (e.target.files[0]) {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImageSmall(file);
      }
    }
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  return (
    <div className={clsx(style["update-movie"])}>
      <div className={clsx(style.header)}>
        <h1 className={clsx(style.title)}>Update Movie</h1>
        <Button small darkblue to={routes.createMovie}>
          Create
        </Button>
      </div>
      <div className={clsx(style.show)}>
        <div className={clsx(style.left)}>
          <img
            src={movie.image}
            alt={movie.title}
            className={clsx(style.avatar)}
          />
          <img
            src={movie.imageTitle}
            alt={movie.title}
            className={clsx(style.avatar)}
          />
          <img
            src={movie.imageSmall}
            alt={movie.title}
            className={clsx(style.avatar)}
          />
        </div>
        <div className={clsx(style.right)}>
          <div className={clsx(style.item)}>
            <label>Title:</label>
            <span>{movie.title}</span>
          </div>
          <div className={clsx(style.item)}>
            <label>Description:</label>
            <span>{movie.description}</span>
          </div>
          <div className={clsx(style.item)}>
            <label>Year:</label>
            <span>{movie.year}</span>
          </div>
          <div className={clsx(style.item)}>
            <label>Limit:</label>
            <span>{movie.limit}</span>
          </div>
          <div className={clsx(style.item)}>
            <label>Duration:</label>
            <span>{movie.duration}</span>
          </div>
          <div className={clsx(style.item)}>
            <label>Genre:</label>
            <span>{movie.genre.join(", ")}</span>
          </div>
          <div className={clsx(style.item)}>
            <label>Starring:</label>
            <span>{movie.starring.join(", ")}</span>
          </div>
          <div className={clsx(style.item)}>
            <label>Type:</label>
            <span>{movie.type}</span>
          </div>
          <div className={clsx(style.item)}>
            <label>Country:</label>
            <span>{movie.country}</span>
          </div>
        </div>
      </div>
      <form action="" className={clsx(style.form)}>
        <div className={clsx(style.left)}>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={newMovie.title}
              id="title"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="image">Image</label>
            <input
              type="text"
              value={newMovie.image}
              id="image"
              name="image"
              onChange={handleChange}
            />
          </div>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="video">Video</label>
            <input
              type="text"
              value={newMovie.video}
              id="video"
              name="video"
              onChange={handleChange}
            />
          </div>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              value={newMovie.description}
              id="description"
              onChange={handleChange}
              name="description"
            ></textarea>
          </div>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="year">Year</label>
            <input
              type="text"
              value={newMovie.year}
              id="year"
              name="year"
              onChange={handleChange}
            />
          </div>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="limit">Limit</label>
            <input
              type="text"
              value={newMovie.limit}
              id="limit"
              name="limit"
              onChange={handleChange}
            />
          </div>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              value={newMovie.duration}
              id="duration"
              name="duration"
              onChange={handleChange}
            />
          </div>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              value={newMovie.genre}
              id="genre"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="starring">Starring</label>
            <input
              type="text"
              value={newMovie.starring}
              id="starring"
              name="starring"
              onChange={handleChange}
            />
          </div>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="type">Type</label>
            <input
              type="text"
              value={newMovie.type}
              id="type"
              name="type"
              onChange={handleChange}
            />
          </div>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              value={newMovie.country}
              id="country"
              name="country"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={clsx(style.right)}>
          <div className={clsx(style.upload)}>
            <div className={clsx(style["wrapper-item"])}>
              <img
                src={imageTitle.preview || newMovie.imageTitle}
                alt={movie.title}
                className={clsx(style.avatar)}
              />
              <label htmlFor="file">
                <AiOutlineUpload className={clsx(style.icon)} />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleChange}
                name="imageTitle"
              />
            </div>
            <div className={clsx(style["wrapper-item"])}>
              <img
                src={imageSmall.preview || newMovie.imageSmall}
                alt={movie.title}
                className={clsx(style.avatar)}
              />
              <label htmlFor="file">
                <AiOutlineUpload className={clsx(style.icon)} />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleChange}
                name="imageSmall"
              />
            </div>
          </div>
          <Button small steal>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovie;
