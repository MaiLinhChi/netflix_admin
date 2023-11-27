import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";

import style from "./Movies.module.scss";
import Table from "@/components/Table";
import Button from "@/components/Button";
import config from "@/config";
import * as movieService from "@/services/movies";
import { LoadingContext } from "@/context/LoadingContext/Loading";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const getMovieAll = async () => {
      try {
        setLoading(true);
        const res = await movieService.getAllMovie();
        setMovies(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getMovieAll();
  }, [setLoading]);

  const handleDelete = async (id) => {
    try {
      await movieService.deleteMovie(id);
      const res = await movieService.getAllMovie();
      setMovies(res);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      accessor: "image",
      Header: "Image",
      Cell: (params) => {
        return (
          <img
            className={clsx(style.image)}
            src={params.row?.original.image}
            alt={params.row?.original.title}
          />
        );
      },
    },
    {
      accessor: "imageTitle",
      Header: "Image Title",
      Cell: (params) => {
        return (
          <img
            className={clsx(style.image)}
            src={params.row?.original.imageTitle}
            alt={params.row?.original.title}
          />
        );
      },
    },
    {
      accessor: "imageSmall",
      Header: "Image Small",
      Cell: (params) => {
        return (
          <img
            className={clsx(style.image)}
            src={params.row?.original.imageSmall}
            alt={params.row?.original.title}
          />
        );
      },
    },
    {
      accessor: "title",
      Header: "Title",
      Cell: (params) => {
        return (
          <span className={clsx(style.title)}>
            {params.row?.original.title}
          </span>
        );
      },
    },
    {
      accessor: "description",
      Header: "Description",
      Cell: (params) => {
        return (
          <p className={clsx(style.description)}>
            {params.row?.original.description}
          </p>
        );
      },
    },
    {
      accessor: "year",
      Header: "Year",
      Cell: (params) => {
        return (
          <span className={clsx(style.year)}>{params.row?.original.year}</span>
        );
      },
    },
    {
      accessor: "limit",
      Header: "Limit",
      Cell: (params) => {
        return (
          <span className={clsx(style.limit)}>
            {params.row?.original.limit}
          </span>
        );
      },
    },
    {
      accessor: "duration",
      Header: "Duration",
      Cell: (params) => {
        return (
          <span className={clsx(style.duration)}>
            {params.row?.original.duration}
          </span>
        );
      },
    },
    {
      accessor: "type",
      Header: "Type",
      Cell: (params) => {
        return (
          <span className={clsx(style.type)}>{params.row?.original.type}</span>
        );
      },
    },
    {
      accessor: "genre",
      Header: "Genre",
      Cell: (params) => {
        return (
          <p className={clsx(style.genre)}>
            {params.row?.original.genre.join(", ")}
          </p>
        );
      },
    },
    {
      accessor: "starring",
      Header: "Starring",
      Cell: (params) => {
        return (
          <p className={clsx(style.starring)}>
            {params.row?.original.starring.join(", ")}
          </p>
        );
      },
    },
    {
      Header: "Actions",
      Cell: (params) => {
        return (
          <>
            <Button
              to={"/movie/" + params.row?.original._id}
              state={params.row?.original}
              className={clsx(style["custom-btn"])}
            >
              <AiFillEdit className={clsx(style["edit-icon"])} />
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
    <div className={clsx(style["product-list"])}>
      <div className={clsx(style.header)}>
        <h1 className={clsx(style.title)}>Lists</h1>
        <Button small darkblue to={config.routes.createMovie}>
          Create
        </Button>
      </div>
      <Table data={movies} columns={columns} />
    </div>
  );
};

export default Movies;
