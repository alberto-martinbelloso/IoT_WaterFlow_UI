import React, {PureComponent} from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import Typography from "@material-ui/core/Typography/Typography";
import {bindActionCreators} from "redux";
import * as billsActions from "../../../actions/Bills";
import connect from "react-redux/es/connect/connect";
import Select from "@material-ui/core/Select/Select";
import './MonthBarChart.css'
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";

class MonthBarChart extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

    constructor(props) {
        super();
        this.state = {
            user: '',
            userOptions: []
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.bills.bills.length > 0) {
            let options = new Set();
            nextProps.bills.bills.forEach(bill => {
                options.add(bill.username)
            });
            this.state.userOptions = Array.from(options)
        }
        this.state.user = this.state.userOptions[0]
    }

    render() {
        const bills = [];
        this.props.bills.bills.forEach(bill => {
            if (bill.username === this.state.user)
                bills[bills.length] = bill
        });
        return (
            <div className={'chart-container'}>
                <Typography variant="h5" style={{textAlign: 'center'}} gutterBottom>
                    Consumption History
                </Typography>
                {this.props.role === 'admin' && (
                    <FormControl style={{width: '100%'}}>
                        <div className={'choose-container'}>
                            <FormHelperText style={{margin:'5px'}}>Choose user</FormHelperText>
                            <Select
                                native
                                label={'User name'}
                                value={this.state.user}
                                onChange={this.handleChange('user')}>
                                {this.state.userOptions.map((user, id) => {
                                    return <option value={user} key={id}>{user}</option>
                                })}
                            </Select>
                        </div>
                    </FormControl>
                )}
                <ResponsiveContainer className={'chart-content'} width="80%" height={280} minHeight={200}>
                    <BarChart
                        width={500}
                        height={300}
                        data={bills}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="Month"/>
                        <YAxis/>
                        <Tooltip formatter={(value) => `${value} liters`}/>
                        <Legend/>
                        <Bar dataKey="waterflow" fill="#455559"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        bills: state.bills,
        role: state.authentication.role,
        token: state.authentication.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        billsActions: bindActionCreators(billsActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthBarChart);