import { useContext, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import style from "./Users.module.scss";
import Table from "@/components/Table";
import Button from "@/components/Button";
import config from "@/config";
import { AuthContext } from "@/context/authContext/AuthContext";
import * as userService from "@/services/users";
import { LoadingContext } from "@/context/LoadingContext/Loading";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);
  useEffect(() => {
    const getAllUser = async () => {
      try {
        setLoading(true);
        const res = await userService.getUsers(user);
        setUsers(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getAllUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLoading]);

  const handleDelete = async (id) => {
    try {
      await userService.deleteUser(id);
      const res = await userService.getUsers(user);
      setUsers(res);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Avatar",
        accessor: "profilePicture",
        Cell: ({ cell: { value } }) => (
          <img src={value} alt="avatar" className={clsx(style.avatar)} />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell: { value } }) => (
          <span className={clsx(style.name)}>{value}</span>
        ),
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ cell: { value } }) => (
          <span className={clsx(style.email)}>{value}</span>
        ),
      },
      {
        Header: "Address",
        accessor: "address",
        Cell: ({ cell: { value } }) => (
          <span className={clsx(style.address)}>{value}</span>
        ),
      },
      {
        Header: "Phone",
        accessor: "phone",
        Cell: ({ cell: { value } }) => (
          <span className={clsx(style.phone)}>{value}</span>
        ),
      },
      {
        Header: "Job",
        accessor: "job",
        Cell: ({ cell: { value } }) => (
          <span className={clsx(style.job)}>{value}</span>
        ),
      },
      {
        Header: "Duty",
        accessor: "isAdmin",
        Cell: ({ cell: { value } }) => (
          <span className={clsx(style.duty)}>{value ? "Admin" : "User"}</span>
        ),
      },
      {
        Header: "Created at",
        accessor: "createdAt",
        Cell: ({ cell: { value } }) => (
          <span className={clsx(style.date)}>{value}</span>
        ),
      },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: (props) => (
          <div className={clsx(style["wrapper-btn"])}>
            <Button
              to={`/user/${props.row?.original._id}`}
              state={props.row?.original}
            >
              <AiFillEdit className={clsx(style["edit-icon"])} />
            </Button>
            <BsTrash
              className={clsx(style["delete-icon"])}
              onClick={() => handleDelete(props.row?.original._id)}
            />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className={clsx(style["user-list"])}>
      <div className={clsx(style.header)}>
        <h1 className={clsx(style.title)}>Users</h1>
        <Button small darkblue to={config.routes.createUser}>
          Create
        </Button>
      </div>
      <Table data={users} columns={columns} />
    </div>
  );
};

export default Users;
