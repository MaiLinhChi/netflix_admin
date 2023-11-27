import clsx from 'clsx';
import { ComposedChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, YAxis } from 'recharts';

import style from './Chart.module.scss';

const Chart = ({ title, data, dataKey }) => {
    return (
        <div className={clsx(style.chart)}>
            <h3 className={clsx(style.title)}>{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <ComposedChart data={data}>
                    <XAxis dataKey="month" interval="preserveStartEnd" tick={{ stroke: '#5550bd' }} />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="2" />
                    <Line type="monotone" dataKey={dataKey} tick={{ stroke: '#5550bd' }} />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
