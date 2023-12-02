import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import style from "./CreateList.module.scss";
import Button from "@/components/Button";
import * as movieService from "@/services/movies";
import * as listService from "@/services/lists";
import { LoadingContext } from "@/context/loading/LoadingContext";

const NewList = () => {
  const [list, setList] = useState({ type: "movies" });
  const { setLoading } = useContext(LoadingContext);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getMovieAll = async () => {
      try {
        setLoading(true);
        const res = await movieService.getAllMovie();
        setMovies(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getMovieAll();
  }, [setLoading]);

  const handleChange = (e) => {
    if (e.target.value !== " ") {
      const value = e.target.value;
      setList({ ...list, [e.target.name]: value });
    }
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, idMovies: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await listService.createList(list);
    } catch (error) {
      console.log(error);
    }
    navigate("/lists");
  };

  return (
    <div className={clsx(style["create-list"])}>
      <h1 className={clsx(style.title)}>New List</h1>
      <form action="" className={clsx(style.form)}>
        <div className={clsx(style.left)}>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Title"
              id="title"
              name="title"
              value={list.title || ""}
              onChange={handleChange}
            />
          </div>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              placeholder="Genre"
              id="genre"
              name="genre"
              value={list.genre || ""}
              onChange={handleChange}
            />
          </div>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="listId">List ID</label>
            <textarea
              type="text"
              placeholder="List ID"
              value={list.idMovies || ""}
              onChange={handleChange}
              id="listId"
            />
          </div>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="type">Type</label>
            <select name="type" id="type" onChange={handleChange}>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className={clsx(style.right)}>
          <div className={clsx(style["form-group"])}>
            <label htmlFor="listMovie">List Movies</label>
            <select
              multiple
              name="listMovie"
              id="listMovie"
              style={{ height: "300px" }}
              onChange={handleSelect}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <Button small darkblue onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewList;
