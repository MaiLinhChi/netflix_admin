import clsx from 'clsx';

import Navbar from '../components/Navbar';
import SideBar from '../components/Sidebar/Sidebar';
import style from './DefaultLayout.module.scss';

const DefaultLayout = ({ children }) => {
    return (
        <div className={clsx(style.wrapper)}>
            <Navbar />
            <div className={clsx(style['wrapper-body'])}>
                <SideBar />
                <div className={clsx(style.container)}>{children}</div>
            </div>
        </div>
    );
};

export default DefaultLayout;
