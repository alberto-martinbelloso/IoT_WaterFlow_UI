import React, {PureComponent} from 'react';
import {
    LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import Typography from "@material-ui/core/Typography/Typography";
import {bindActionCreators} from "redux";
import * as waterflowActions from "../../../actions/waterflow";
import connect from "react-redux/es/connect/connect";
import * as _ from 'lodash'

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

class LineChart extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

    constructor() {
        super();
        this.state = {
            data: [],
            currentMonth: new Date().getMonth(),
            pastMonth: new Date().getMonth() === 0 ? 11 : new Date().getMonth() - 1
        }

    }

    componentDidMount() {

        if (this.props.devices.count > 0){
            this.fetchData(this.props.devices.devices[0])
        }
    }

    fetchData(device) {
        let current = new Date();

        this.props.waterflowActions.fetchMonthWaterFlow(
            device.device_id,
            new Date(current.getFullYear(), current.getMonth()).getTime(),
            current.getTime(),
            this.props.token,
            '1d',
            'current'
        );

        let current_month = current.getMonth();
        let past = new Date(current_month === 0 ? current.getFullYear() - 1 : current.getFullYear(),
            current_month === 0 ? 11 : current_month - 1,
            current_month - 1);

        this.props.waterflowActions.fetchMonthWaterFlow(
            device.device_id,
            past.getTime(),
            new Date(current.getFullYear(), current.getMonth()).getTime(),
            this.props.token,
            '1d',
            'past'
        )
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.data.length === 0) {
            if (nextProps.current_month.length > 0) {
                this.state.data = nextProps.current_month.map((data, i) => {
                    let aux = {};
                    aux['time'] = i;
                    aux[monthNames[this.state.currentMonth]] = data.value;
                    return aux
                })
            } else {
                this.state.data = nextProps.past_month.map((data, i) => {
                    let aux = {};
                    aux['time'] = i;
                    aux[monthNames[this.state.pastMonth]] = data.value;
                    return aux
                })
            }
        } else {
            let res = [];

            for (let i = 0; i < nextProps.past_month.length; i++) {
                let v = 0;
                if (i >= nextProps.current_month.length)
                    v = null;
                else
                    v = nextProps.current_month[i].value;

                res[i] = {
                    time: i
                };

                res[i][monthNames[this.state.currentMonth]] = v;
                res[i][monthNames[this.state.pastMonth]] = nextProps.past_month[i].value;
            }
            this.state.data = res
        }

        if (this.props.devices.count === 0 && nextProps.devices.count > 0) {
            this.fetchData(nextProps.devices.devices[0])
        }
        return true
    }


    render() {
        return (
            <div className={'chart-container'}>
                <Typography variant="h5" style={{textAlign: 'center'}} gutterBottom>
                    Current Consumption
                </Typography>
                <ResponsiveContainer className={'chart-content'} width="80%" height={280} minHeight={200}>
                    <ReLineChart
                        width={500}
                        height={300}
                        data={this.state.data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="time"/>
                        <YAxis/>
                        <Tooltip
                            formatter={(value, name, props) => value}/>
                        <Legend/>
                        <Line type="monotone" dataKey={monthNames[this.state.currentMonth]} stroke="#455559"/>
                        <Line type="monotone" dataKey={monthNames[this.state.pastMonth]} stroke="#82ca9d" strokeDasharray="5 5"/>
                    </ReLineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        current_month: state.waterflow.current_month,
        past_month: state.waterflow.past_month,
        devices: state.devices,
        token: state.authentication.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        waterflowActions: bindActionCreators(waterflowActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);