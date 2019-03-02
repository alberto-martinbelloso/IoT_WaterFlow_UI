import React, {PureComponent} from 'react';
import {
    LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import Typography from "@material-ui/core/Typography/Typography";

const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];

export default class LineChart extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

    render() {
        return (
            <div className={'chart-container'} >
                <Typography variant="h5"style={{textAlign:'center'}} gutterBottom>
                    Current Consumption
                </Typography>
                <ResponsiveContainer  className={'chart-content'} width="80%" height={280} minHeight={200}>
                    <ReLineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone" dataKey="pv" stroke="#455559"/>
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeDasharray="5 5"/>
                    </ReLineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
