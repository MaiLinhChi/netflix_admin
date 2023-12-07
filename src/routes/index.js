import { routes } from "../config";

import DefaultLayout from "@/layouts/DefaultLayout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import { CreateUser, UpdateUser, ViewUsers } from "@/pages/Users";
import { CreateMovie, UpdateMovie, ViewMovies } from "@/pages/Movies";
import { CreateList, UpdateList, ViewLists } from "@/pages/Lists";

const publicRoutes = [{ path: routes.login, component: Login, layout: null }];

const protectedRoutes = [
  { path: routes.home, component: Home, layout: DefaultLayout },
  { path: routes.users, component: ViewUsers, layout: DefaultLayout },
  { path: routes.createUser, component: CreateUser, layout: DefaultLayout },
  { path: routes.updateUser, component: UpdateUser, layout: DefaultLayout },
  { path: routes.movies, component: ViewMovies, layout: DefaultLayout },
  { path: routes.createMovie, component: CreateMovie, layout: DefaultLayout },
  { path: routes.updateMovie, component: UpdateMovie, layout: DefaultLayout },
  { path: routes.lists, component: ViewLists, layout: DefaultLayout },
  { path: routes.createList, component: CreateList, layout: DefaultLayout },
  { path: routes.updateList, component: UpdateList, layout: DefaultLayout },
];

export { publicRoutes, protectedRoutes };
