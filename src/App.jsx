import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import Home from './pages/Home/Home';
import Users from './pages/Users';
import UpdateUser from './pages/UpdateUser';
import CreateUser from './pages/CreateUser';
import Movies from './pages/Movies';
import UpdateMovie from './pages/UpdateMovie';
import CreateMovie from './pages/CreateMovie';
import Lists from './pages/Lists';
import UpdateList from './pages/UpdateList';
import CreateList from './pages/CreateList';
import Login from './pages/Login/Login';
import DefaultLayout from './layouts/DefaultLayout';
import { AuthContext } from './context/authContext/AuthContext';
import config from './config';
import Loading from './components/Loading';
import { LoadingContext } from './context/LoadingContext/Loading';

function App() {
    const { user } = useContext(AuthContext);
    const { loading } = useContext(LoadingContext);

    return (
        <Router>
            {loading && <Loading />}
            <Routes>
                <Route path={config.routes.login} element={user ? <Navigate to={config.routes.home} /> : <Login />} />
                <Route
                    exact
                    path={config.routes.home}
                    element={
                        user ? (
                            <DefaultLayout>
                                <Home />
                            </DefaultLayout>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                {user && (
                    <>
                        <Route
                            path={config.routes.users}
                            element={
                                <DefaultLayout>
                                    <Users />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path={config.routes.updateUser}
                            element={
                                <DefaultLayout>
                                    <UpdateUser />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path={config.routes.createUser}
                            element={
                                <DefaultLayout>
                                    <CreateUser />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path={config.routes.movies}
                            element={
                                <DefaultLayout>
                                    <Movies />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path={config.routes.updateMovie}
                            element={
                                <DefaultLayout>
                                    <UpdateMovie />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path={config.routes.createMovie}
                            element={
                                <DefaultLayout>
                                    <CreateMovie />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path={config.routes.lists}
                            element={
                                <DefaultLayout>
                                    <Lists />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path={config.routes.updateList}
                            element={
                                <DefaultLayout>
                                    <UpdateList />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path={config.routes.createList}
                            element={
                                <DefaultLayout>
                                    <CreateList />
                                </DefaultLayout>
                            }
                        />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;
