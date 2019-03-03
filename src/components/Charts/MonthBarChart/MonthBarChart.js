import React, {PureComponent} from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import Typography from "@material-ui/core/Typography/Typography";
import {bindActionCreators} from "redux";
import * as billsActions from "../../../actions/Bills";
import connect from "react-redux/es/connect/connect";


class MonthBarChart extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

    constructor(props) {
        super();
    }


    render() {
        return (
            <div className={'chart-container'}>
                <Typography variant="h5" style={{textAlign: 'center'}} gutterBottom>
                    Month Bills
                </Typography>
                <ResponsiveContainer className={'chart-content'} width="80%" height={280} minHeight={200}>
                    <BarChart
                        width={500}
                        height={300}
                        data={this.props.bills.bills}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="Month"/>
                        <YAxis/>
                        <Tooltip formatter={(value) => `${value} DKK`}/>
                        <Legend/>
                        <Bar dataKey="import" fill="#455559"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        bills: state.bills,
        token: state.authentication.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        billsActions: bindActionCreators(billsActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthBarChart);