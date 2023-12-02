import { CircleLoader } from 'react-spinners';
import style from './Loading.module.scss';

const Loading = () => {
    return (
        <div className={style.wrapper}>
            <CircleLoader color="red" />
        </div>
    );
};

export default Loading;
